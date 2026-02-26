---
title: "#Nginx 使用proxy_pass做反向代理的几条建议"
description: "一些简单实用的建议"
pubDate: 2021-09-15T07:35:38.000Z
author: "阿斌"
tags: ["Nginx", "反向代理", "开发笔记", "DevOps"]
tagSlugs: ["nginx", "fan-xiang-dai-li", "dev", "devops"]
draft: false
type: post
slug: "nginx-proxy-guide"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><ul>
<li>1). proxy_pass中，目标服务器不带path</li>
</ul>
<pre><code>proxy_pass http://&lt;目标服务器&gt;:&lt;端口&gt;
</code></pre>
<ul>
<li>2). 使用rewrite来重写新路径</li>
</ul>
<pre><code>   rewrite ^ $request_uri;
   # 自动补充index.html
   rewrite ^/$ /index.html;
   # 补齐真正的路径
   rewrite ^/(.*)$ /newpath/$1 break;
</code></pre>
<ul>
<li>3). 即使路径一致也要用rewrite重写，避免二次转义</li>
<li>4). 使用proxy_intercept_errors捕获错误，避免目标服务器暴露</li>
</ul>
<!--kg-card-end: markdown-->