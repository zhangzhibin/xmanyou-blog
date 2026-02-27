#!/usr/bin/env node
/**
 * 保证正文最高级标题为 h2：不能是 h1，也不能是 h3/h4 等（需整体提升）。
 * 先扫描正文（排除代码块）得到最小标题级别 minLevel，再整体偏移使 minLevel 变为 2：
 * - minLevel=1：整体退一级（# -> ##, <h1> -> <h2>, ...）
 * - minLevel=2：不变
 * - minLevel>=3：整体提升（h3->h2, h4->h3, ...），且结果级别限制在 2..6（不产出 h1）
 */

import fs from 'node:fs';
import path from 'node:path';
import { readdirSync } from 'node:fs';

const contentDir = path.join(process.cwd(), 'src/content/blog');

/** 在 body 中扫描最小标题级别（1-6），跳过围栏代码块；无标题返回 0 */
function getMinHeadingLevel(body) {
  const lines = body.split('\n');
  let inFence = false;
  let fenceChar = '';
  let minLevel = 0;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('```')) {
      if (!inFence) {
        inFence = true;
        fenceChar = trimmed.slice(0, 3);
      } else if (trimmed.startsWith(fenceChar)) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;

    const mdMatch = line.match(/^(\s*)(#{1,6})(\s+)/);
    if (mdMatch) {
      const level = mdMatch[2].length;
      minLevel = minLevel === 0 ? level : Math.min(minLevel, level);
    }
    const htmlMatch = line.match(/<h([1-6])\b/g);
    if (htmlMatch) {
      for (const m of htmlMatch) {
        const level = parseInt(m.slice(2, 3), 10);
        minLevel = minLevel === 0 ? level : Math.min(minLevel, level);
      }
    }
  }
  return minLevel;
}

/** 根据偏移 shift（可正可负）生成 1..6 -> 新级别的映射，新级别限制在 2..6 */
function buildLevelMap(shift) {
  const map = {};
  for (let l = 1; l <= 6; l++) {
    map[l] = Math.min(6, Math.max(2, l + shift));
  }
  return map;
}

function processBody(body) {
  const minLevel = getMinHeadingLevel(body);
  if (minLevel === 0) return body;

  const shift = 2 - minLevel;
  const levelMap = buildLevelMap(shift);

  const lines = body.split('\n');
  let inFence = false;
  let fenceChar = '';
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    if (trimmed.startsWith('```')) {
      if (!inFence) {
        inFence = true;
        fenceChar = trimmed.slice(0, 3);
      } else if (trimmed.startsWith(fenceChar)) {
        inFence = false;
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    let newLine = line;

    // Markdown 标题：行首 1–6 个 # + 空格
    const mdMatch = newLine.match(/^(\s*)(#{1,6})(\s+.+)$/);
    if (mdMatch) {
      const level = mdMatch[2].length;
      const newHashes = '#'.repeat(levelMap[level]);
      newLine = mdMatch[1] + newHashes + mdMatch[3];
    } else {
      // HTML 标题：<hN 与 </hN>，只替换级别数字
      newLine = newLine.replace(
        /<(\/?)h([1-6])\b/g,
        (_, close, n) => `<${close}h${levelMap[+n]}`
      );
    }

    out.push(newLine);
  }

  return out.join('\n');
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const dashMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!dashMatch) {
    return { changed: false };
  }
  const [, frontmatter, body] = dashMatch;
  const newBody = processBody(body);
  if (newBody === body) {
    return { changed: false };
  }
  const newRaw = '---\n' + frontmatter + '\n---\n' + newBody;
  fs.writeFileSync(filePath, newRaw, 'utf8');
  return { changed: true };
}

const files = readdirSync(contentDir).filter((f) => f.endsWith('.md'));
let changedCount = 0;
for (const f of files) {
  const result = processFile(path.join(contentDir, f));
  if (result.changed) {
    changedCount++;
    console.log('Updated:', f);
  }
}
console.log('Done. Changed', changedCount, 'files.');
