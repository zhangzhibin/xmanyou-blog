# 新站与旧站 SEO 对比评估报告

**对比时间**：2026-02-27  
**新站**：Astro 本地 (http://localhost:4321)  
**旧站**：Ghost 线上 (https://xmanyou.com)

---

## 1. 典型页面与路由

| 页面类型 | 新站 (Astro) | 旧站 (Ghost) |
|---------|----------------|----------------|
| 主页 | `/` | `/` |
| 博客列表 | `/blog/` | 无独立 `/blog/`（旧站 404） |
| 博客文章 | `/{slug}/` | `/{slug}/` |
| Tag 页 | `/tag/{slug}/` | `/tag/{slug}/` |
| 静态页 | `/privacy/` 等 | `/privacy/` 等 |

---

## 2. 逐项对比（维度）

### 2.1 主页

| 项目 | 旧站 (Ghost) | 新站 (Astro) 修复前 | 新站 (Astro) 修复后 |
|------|----------------|----------------------|----------------------|
| title | 有 | 有 | 有 |
| meta description | 有 | 有 | 有 |
| viewport | 有 | 有 | 有 |
| canonical | 有 (http) | **无** | **有** (https) |
| og:title / og:description | 有 | 有 | 有 |
| og:type | website | website | website |
| og:url | 有 | **无**（因无 canonical） | 有 |
| og:site_name | 有 | **无** | **有** |
| rel next (分页) | 有 | 无 | 可选后续补充 |
| JSON-LD (WebSite) | 有 | **无** | 无（可选增强） |
| lang | 未显式 | zh-CN | zh-CN |
| h1 | 有 | 有（通过站点描述区） | 有 |

### 2.2 博客文章页

| 项目 | 旧站 (Ghost) | 新站 (Astro) 修复前 | 新站 (Astro) 修复后 |
|------|----------------|----------------------|----------------------|
| canonical | 有 | 有 | 有 |
| og:type | **article** | **website（错误）** | **article** |
| article:published_time | 有 | **无** | **有** |
| article:modified_time | 有 | 无 | 可选（无数据可暂不输出） |
| article:tag | 有 | **无** | **有** |
| article:author | 无（有 publisher） | 无 | **有**（作者名） |
| JSON-LD (Article) | 有 | **无** | 无（可选增强） |

### 2.3 博客列表 / Tag 页

| 项目 | 新站修复前 | 新站修复后 |
|------|------------|------------|
| canonical | **无** | **有**（blog、blog/page/n、tag/slug、tag/slug/page/n） |
| title / description | 有 | 有 |

---

## 3. 站点级

| 项目 | 旧站 | 新站修复前 | 新站修复后 |
|------|------|------------|------------|
| robots.txt | 有，含 Disallow /ghost/ /p/ | 同左（Ghost 遗留） | 已移除上述两条，仅保留 Sitemap |
| sitemap | 有 | 有（@astrojs/sitemap） | 有 |

---

## 4. 已实施修复汇总

1. **Canonical**
   - 首页、博客列表、博客分页、Tag 页、Tag 分页、首页分页均传入 `canonicalSlug`，输出正确 `<link rel="canonical">`。

2. **文章页 og:type 与 article meta**
   - Layout 增加 `ogType`、`articlePublishedTime`、`articleAuthor`、`articleTags` 等 prop。
   - 文章页（`[...slug].astro` 中 type=post）使用 `ogType="article"`，并输出 `article:published_time`、`article:author`、`article:tag`。

3. **og:site_name**
   - 所有页面统一输出 `og:site_name`，与旧站一致。

4. **robots.txt**
   - 删除 Ghost 专属 `Disallow: /ghost/`、`Disallow: /p/`，避免误导爬虫。

---

## 5. 可选后续增强

- **JSON-LD**：首页增加 WebSite + Organization；文章页增加 BlogPosting；列表/Tag 页可增加 BreadcrumbList。
- **rel prev/next**：列表与分页页可增加 `rel="prev"` / `rel="next"` 以利分页发现。
- **Twitter Card**：旧站有 twitter:card、twitter:title 等，新站可酌情补充。
- **RSS**：旧站有 `/rss/`，新站若需可增加 RSS feed。

---

## 6. 结论

新站相比旧站的主要 SEO 缺陷为：**缺少多处 canonical**、**文章页 og:type 错误**、**缺少文章类 og meta**、**无 og:site_name**、**robots 遗留 Ghost 路径**。  
上述问题已通过本次修改修复；与旧站仍存在差距的仅为 **JSON-LD 结构化数据** 与 **rel prev/next / Twitter / RSS** 等可选增强，可按优先级后续迭代。
