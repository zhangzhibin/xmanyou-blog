# 图片目录（与 Ghost 一致）

请将旧博客 Ghost 的 `content/images` 目录整体复制到此目录下，保持年/月子目录结构，例如：

```
public/content/images/
  2017/11/
  2018/04/
  2019/07/
  ...
```

复制命令（在项目根目录执行）：

```bash
mkdir -p public/content
cp -r /path/to/ghost/content/images public/content/
```

复制完成后，站点将通过 `/content/images/YYYY/MM/文件名` 访问图片。
