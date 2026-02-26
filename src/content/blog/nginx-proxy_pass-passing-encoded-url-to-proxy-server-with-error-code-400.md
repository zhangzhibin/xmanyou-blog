---
title: "#Nginx 用proxy_pass做反向代理返回400错误"
description: "包含特殊字符的url进行反向代理的解决方法。"
pubDate: 2021-08-25T10:02:56.000Z
author: "阿斌"
tags: ["Nginx", "h5 小游戏开发", "开发笔记"]
draft: false
type: post
slug: "nginx-proxy_pass-passing-encoded-url-to-proxy-server-with-error-code-400"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>前端web项目，经常会遇到跨域访问的问题，利用Nginx的proxy_pass可以很轻松的配置反向代理，解决这个问题。</p>
<p>假设资源服务器是asset-server，用以下配置，可以把asset-server/app 挂载到 server/app</p>
<pre><code>  location ^~ /app {
    proxy_pass http://asset-server;
  }
</code></pre>
<p>这样能解决大部分的问题，但是当路径包含特殊字符，例如空格等，需要进行转义urlencode时，就回遇到问题。</p>
<h1 id="">解决方法</h1>
<p>需要对uri进行重写：</p>
<pre><code>  location ^~ /app {
    rewrite  ^ $request_uri;            # get original URI
    rewrite  ^/app/(.*)  app/$1 break;  # drop /foo, put /bar
    return 400;   # if the second rewrite won't match

    proxy_pass http://asset-server/$uri;
  }
</code></pre>
<p><strong>特别注意</strong><br>
如果有多层代理，每一层都需要rewrite。</p>
<h1 id="">参考</h1>
<ul>
<li><a href="https://stackoverflow.com/questions/28684300/nginx-pass-proxy-subdirectory-without-url-decoding/37584637#37584637">https://stackoverflow.com/questions/28684300/nginx-pass-proxy-subdirectory-without-url-decoding/37584637#37584637</a></li>
</ul>
<pre><code>  location /api/ {
    rewrite ^ $request_uri;
    rewrite ^/api/(.*) $1 break;
    return 400;
    proxy_pass http://127.0.0.1:82/$uri;
  }
</code></pre>
<!--kg-card-end: markdown-->