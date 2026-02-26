---
title: "AI 实战：搭一个吉卜力风格的文档站"
description: "https://dns-over-https.org 是一个由AI辅助搭建的吉卜力风格的关于doh的资源站。本文总结了该项目的搭建经验。"
pubDate: 2025-03-29T16:25:27.000Z
author: "阿斌"
tags: ["AI", "Cursor"]
tagSlugs: ["ai", "cursor"]
draft: false
type: post
slug: "ghibli-style-web-design-with-cursor-ai-dns-over-https-org"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p><img src="/images/2025/03/ghibli-style-web-design-dns-over-https-org.png" alt="ghibli-style-web-design-dns-over-https-org"></p>
<p>最近每天花大量时间在用AI编程，能不自己动手的，就绝不多写一行代码。我也逐渐沦为了：<strong>AI监工</strong>。</p>
<p>喏，花了2天，搭了一个，不对，让AI搭了一个 doh，也就是关于 DNS over HTTPS的文档站点。</p>
<p>技术架构：</p>
<ul>
<li><strong>框架</strong>: Astro</li>
<li><strong>样式</strong>: Tailwind CSS + shadcn/ui</li>
<li><strong>内容</strong>: Markdown</li>
<li><strong>国际化</strong>: 支持中文和英文，默认英文</li>
<li><strong>部署</strong>: 静态站点生成 (SSG)</li>
</ul>
<p>第一个版本几乎不到一个小时就弄好了。</p>
<p>然后，为了调亿点点细节，增加国际化功能，又调了一天多。</p>
<p>简单测试完，就上线了：<br>
<a href="https://dns-over-https.org">https://dns-over-https.org</a></p>
<p>闲着无聊，就让豆包点评了一下：</p>
<p><img src="/images/2025/03/doubao-talk-about-dns-over-https-org.jpg" alt="doubao-talk-about-dns-over-https-org"></p>
<p>总结起来就是：就这？</p>
<p>这几天不是openai生成吉卜力风格图片大火吗？然后公众号上也有人推了用ai生成吉卜力风格的网页。</p>
<p>于是乎，我想试一下下。</p>
<p>然后，就是这个了：<br>
<img src="/images/2025/03/ghibli-style-web-design-dns-over-https-org.png" alt="ghibli-style-web-design-dns-over-https-org"></p>
<p>网页风格设计是这次与ai协作的新尝试，遇到了不少坑，很多文字说不清楚的问题，只好截图让ai自己领会。</p>
<h2 id="">总结</h2>
<p>这次项目吸取了之前的经验，加上项目相对比较简单，所以完成的还算顺利。新增加的经验：</p>
<ul>
<li>提前规划好项目的核心功能，比如是不是要多语言，这种，对于项目的架构影响非常大。</li>
<li>如果不得不改到项目基础架构，可以先做减法，减掉一些不重要的模块，基础搭好以后再</li>
<li>遇到问题，让ai去找官方文档，不要用旧的训练数据死磕，有可能是一直都改不出来。</li>
<li>把经常要跟ai沟通的信息记录下来，可以用cursor的rule，也可以直接自己写文档，然后提问前作为附件。比如这个项目用的：</li>
</ul>
<pre><code class="language-ai-guide.md"># AI 协作文档

chat 使用中文

## 官方文档

遇到问题，先查阅官方文档，避免因为训练数据较旧，导致方案过时，引发问题。

### 国际化

- https://docs.astro.build/en/guides/internationalization/

### UI

- https://docs.astro.build/en/basics/astro-components/
- https://docs.astro.build/en/basics/layouts/

</code></pre>
<h2 id="">感谢</h2>
<p>感谢公众号 AI Interface 提供的思路：<br>
<a href="https://mp.weixin.qq.com/s/">https://mp.weixin.qq.com/s/</a><em>ph9</em>-V31TUclFWvzPPCbQ</p>
<p>以上。</p>
<!--kg-card-end: markdown-->