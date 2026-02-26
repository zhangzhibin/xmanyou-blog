---
title: "ApiSix 3.x 如何配置将根域名从定向到www子域名"
description: "要如何配置redirect插件呢？"
pubDate: 2024-05-22T06:03:57.000Z
author: "影子工作室"
tags: ["Apisix"]
draft: false
type: post
slug: "apisix-how-to-redirect-from-root-domain-to-www-subdomain"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>想要将根域名永久重定向到www子域名，例如：</p>
<ul>
<li>根域名：xmanyou.com</li>
<li>子域名: www.xmanyou.com</li>
</ul>
<h2 id="">解决方法</h2>
<p>这需要使用到ApiSix的redirect插件，在保留协议和请求路径的基础上，替换掉host。</p>
<p>步骤：</p>
<ol>
<li>从dashboard中，添加新路由</li>
<li>重定向选项中，选择 <strong>自定义</strong></li>
<li>自定义重定向
<ul>
<li>填写 <code>$scheme://www.xmanyou.com$request_uri</code></li>
<li>选择 301(永久重定向）</li>
</ul>
</li>
</ol>
<p><img src="/images/2024/05/apisix-how-to-redirect-from-root-domain-to-www-subdomain.jpg" alt="apisix-how-to-redirect-from-root-domain-to-www-subdomain"></p>
<p>完毕。</p>
<!--kg-card-end: markdown-->