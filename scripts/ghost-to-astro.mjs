#!/usr/bin/env node
/**
 * Ghost 2.x 导出 JSON 转 Astro Content Collection 迁移脚本
 *
 * 用法: node scripts/ghost-to-astro.mjs [ghost-export.json] [output-dir]
 * 默认: ghost/ghost.2026-02-26-13-05-48.json -> src/content/blog
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const GHOST_FILE = process.argv[2] || path.join(ROOT, 'ghost/ghost.2026-02-26-13-05-48.json');
const OUTPUT_DIR = process.argv[3] || path.join(ROOT, 'src/content/blog');

function escapeYaml(str) {
  if (str == null || str === '') return '""';
  const s = String(str);
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
}

function main() {
  console.log('Reading:', GHOST_FILE);
  const raw = fs.readFileSync(GHOST_FILE, 'utf-8');
  const data = JSON.parse(raw);

  const db = data.db?.[0];
  if (!db) {
    console.error('Invalid Ghost export format: missing db[0]');
    process.exit(1);
  }

  const { posts, tags, users, posts_tags, posts_authors } = db.data || {};
  if (!posts || !Array.isArray(posts)) {
    console.error('Invalid Ghost export: missing posts');
    process.exit(1);
  }

  const tagMap = new Map((tags || []).map((t) => [t.id, t]));
  const userMap = new Map((users || []).map((u) => [u.id, u]));

  const postTagsMap = new Map();
  const postTagSlugsMap = new Map();
  for (const pt of posts_tags || []) {
    const tag = tagMap.get(pt.tag_id);
    if (tag) {
      const list = postTagsMap.get(pt.post_id) || [];
      list.push(tag.name);
      postTagsMap.set(pt.post_id, list);
      const slugs = postTagSlugsMap.get(pt.post_id) || [];
      slugs.push(tag.slug);
      postTagSlugsMap.set(pt.post_id, slugs);
    }
  }

  const postAuthorsMap = new Map();
  for (const pa of posts_authors || []) {
    const list = postAuthorsMap.get(pa.post_id) || [];
    const name = userMap.get(pa.author_id)?.name;
    if (name) list.push(name);
    postAuthorsMap.set(pa.post_id, list);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let count = 0;
  for (const post of posts) {
    const status = post.status || 'draft';
    const isPage = post.page === 1;

    const tags = (postTagsMap.get(post.id) || []).filter(Boolean);
    const tagSlugs = postTagSlugsMap.get(post.id) || [];
    const authors = postAuthorsMap.get(post.id) || [];
    const author = authors[0] || userMap.get(post.author_id)?.name || 'Unknown';
    const primaryAuthorId = post.author_id || (posts_authors || []).find((p) => p.post_id === post.id)?.author_id;
    const authorUser = primaryAuthorId ? userMap.get(primaryAuthorId) : null;

    const image = post.feature_image || null;

    const pubDate = post.published_at || post.created_at;
    const draft = status !== 'published';

    const desc = post.custom_excerpt || post.plaintext?.slice(0, 160) || '';
    const authorSlugResolved = authorUser?.slug ?? null;

    const frontmatter = {
      title: post.title,
      description: desc,
      pubDate,
      author,
      tags,
      tagSlugs,
      draft,
      type: isPage ? 'page' : 'post',
      slug: post.slug,
    };
    if (image) frontmatter.image = image;
    if (authorSlugResolved) frontmatter.authorSlug = authorSlugResolved;

    const lines = [
      '---',
      `title: ${escapeYaml(frontmatter.title)}`,
      `description: ${escapeYaml(desc)}`,
      `pubDate: ${frontmatter.pubDate}`,
      `author: ${escapeYaml(frontmatter.author)}`,
      `tags: [${frontmatter.tags.map((t) => escapeYaml(t)).join(', ')}]`,
      `tagSlugs: [${frontmatter.tagSlugs.map((s) => escapeYaml(s)).join(', ')}]`,
      `draft: ${frontmatter.draft}`,
      `type: ${frontmatter.type}`,
      `slug: ${escapeYaml(frontmatter.slug)}`,
    ];
    if (image) lines.push(`image: ${escapeYaml(image)}`);
    if (authorSlugResolved) lines.push(`authorSlug: ${escapeYaml(authorSlugResolved)}`);
    lines.push('---', '');

    const body = post.html || '';
    lines.push(body);

    const filename = `${post.slug || slugify(post.title) || post.id}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, lines.join('\n'), 'utf-8');
    count++;
    console.log('  ', status === 'published' ? '✓' : '○', filename);
  }

  console.log(`\nDone. Migrated ${count} posts to ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('  1. Copy Ghost content/images to public/content/images (if you have the old site files)');
  console.log('  2. Run: npm create astro@latest and add content collection');
  console.log('  3. Update src/content.config.ts schema to match (type, slug optional)');
}

main();
