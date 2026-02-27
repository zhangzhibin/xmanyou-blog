#!/usr/bin/env node
/**
 * 部署到 Cloudflare Pages（项目名 xmanyou）。
 * 部署前检查是否有未提交的修改，若有则退出并提示先提交。
 */

import { execSync } from 'node:child_process';

function run(cmd, options = {}) {
  return execSync(cmd, { encoding: 'utf8', stdio: options.silent ? 'pipe' : 'inherit', ...options });
}

try {
  const status = run('git status --porcelain', { silent: true });
  const hasChanges = status.split('\n').some((line) => line.length > 0 && !line.startsWith('??'));
  if (hasChanges) {
    console.error('错误：存在未提交的修改，请先 git add 并 git commit 后再部署。');
    process.exit(1);
  }

  console.log('无未提交修改，开始构建…');
  run('npm run build');

  console.log('构建完成，上传到 Cloudflare Pages…');
  run('npx wrangler pages deploy dist --project-name=xmanyou');
} catch (err) {
  if (err.status !== undefined) process.exit(err.status);
  throw err;
}
