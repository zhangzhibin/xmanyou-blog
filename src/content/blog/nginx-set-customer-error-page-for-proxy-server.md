---
title: "#Nginx 重写反向代理proxy_pass的错误页"
description: "添加proxy_intercept_errors on可以捕获300以上错误码，实现自定义错误页。"
pubDate: 2021-09-15T07:30:10.000Z
author: "阿斌"
tags: ["Nginx", "反向代理", "开发笔记"]
tagSlugs: ["nginx", "fan-xiang-dai-li", "dev"]
draft: false
type: post
slug: "nginx-set-customer-error-page-for-proxy-server"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>Nginx经常用来做反向代理，直接将请求转发给目标服务器，然后把响应数据返回给客户端。</p>
<p>但是，有时候目标服务器返回的错误信息中包含了敏感信息，直接发给用户端，可能会暴露目标服务器。</p>
<p>这要怎么处理呢？</p>
<h1 id="">解决方法</h1>
<p>方法就是利用proxy_intercept_errors参数来捕获目标服务器返回的错误，返回自定义错误页给客户端。</p>
<h2 id="1">1). 设置捕获错误</h2>
<pre><code>proxy_intercept_errors on;
</code></pre>
<p>proxy_intercept_errors设置为on以后，目标服务器返回的300以上的错误都会被捕获。</p>
<h2 id="2">2). 设置错误页</h2>
<pre><code>        error_page 404 /404.html;
        location = /404.html {
                root /usr/share/nginx/html;
                internal;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
                root /usr/share/nginx/html;
                internal;
        }
</code></pre>
<!--kg-card-end: markdown-->