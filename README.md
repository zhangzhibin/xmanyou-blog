# xmanyou-blog

从 Ghost 2.x 迁移至 Astro 的博客站点。

## 迁移

已通过 `scripts/ghost-to-astro.mjs` 将 Ghost 导出 JSON 转为 Astro Content Collection 格式。

```bash
# 重新运行迁移（可选）
npm run migrate
# 或指定文件
node scripts/ghost-to-astro.mjs ghost/your-export.json src/content/blog
```

## 图片

正文和封面图路径与 Ghost 一致，使用 `/content/images/YYYY/MM/文件名`。

若有旧站点的 `content/images` 目录，请复制到 `public/content/images`：

```bash
mkdir -p public/content && cp -r /path/to/ghost/content/images public/content/
```

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```
