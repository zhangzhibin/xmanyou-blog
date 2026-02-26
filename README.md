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

正文和封面图路径已从 `/content/images/` 替换为 `/images/`。

若有旧站点的 `content/images` 目录，请复制到 `public/images`：

```bash
cp -r /path/to/ghost/content/images/* public/images/
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
