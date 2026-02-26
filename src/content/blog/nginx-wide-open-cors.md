---
title: "Nginx 配置允许跨域访问 CORS"
description: "Nginx开放跨域访问的配置"
pubDate: 2020-04-11T08:59:43.000Z
author: "阿斌"
tags: ["开发笔记", "Nginx"]
tagSlugs: ["dev", "nginx"]
draft: false
type: post
slug: "nginx-wide-open-cors"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><blockquote>
<p>原文地址: <a href="https://enable-cors.org/server_nginx.html">https://enable-cors.org/server_nginx.html</a></p>
</blockquote>
<p>在Server段中添加以下</p>
<pre><code>#
# Wide-open CORS config for nginx
#
location / {
     if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
     }
     if ($request_method = 'POST') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     }
     if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     }
}
</code></pre>
<!--kg-card-end: markdown-->