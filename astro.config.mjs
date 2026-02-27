import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { join } from 'node:path';
import fs from 'node:fs';

// 开发时：仅从 public/content/images/ 提供 /content/images/*（与 Ghost 路径一致，方案 A）
function contentImagesAliasPlugin() {
  return {
    name: 'content-images-serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/content\/images\/(.*)$/);
        if (!match) return next();
        const path = join(process.cwd(), 'public', 'content', 'images', match[1]);
        if (!fs.existsSync(path)) return next();
        res.setHeader('Content-Type', getMime(path));
        fs.createReadStream(path).pipe(res);
      });
    },
  };
}

function getMime(p) {
  if (/\.(png|apng)$/i.test(p)) return 'image/png';
  if (/\.jpe?g$/i.test(p)) return 'image/jpeg';
  if (/\.gif$/i.test(p)) return 'image/gif';
  if (/\.webp$/i.test(p)) return 'image/webp';
  if (/\.svg$/i.test(p)) return 'image/svg+xml';
  return 'application/octet-stream';
}

export default defineConfig({
  site: 'https://xmanyou.com',
  integrations: [sitemap()],
  vite: {
    plugins: [contentImagesAliasPlugin()],
  },
});
