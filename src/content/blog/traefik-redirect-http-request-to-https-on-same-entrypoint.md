---
title: "#Traefik 配置http自动跳转到https"
description: "有时候需要在同一个非80或者443端口上同时启用http和https请求，并进行重定向，这要怎么做呢？"
pubDate: 2021-08-18T06:52:01.000Z
author: "阿斌"
tags: ["traefik", "开发笔记"]
tagSlugs: ["traefik", "dev"]
draft: false
type: post
slug: "traefik-redirect-http-request-to-https-on-same-entrypoint"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="httphttps">配置http与https使用相同端口</h2>
<p>根据Traefik的文档，从v2开始，要在同一个端口上同时接收http和https请求，需要配置2个router</p>
<blockquote>
<p><a href="https://doc.traefik.io/traefik/routing/routers/#tls">https://doc.traefik.io/traefik/routing/routers/#tls</a></p>
</blockquote>
<p>示例</p>
<pre><code>  routers:
    my-service-https:
      entryPoints:
        - web
      service: myservice
      rule: &quot;Host(`myhost`)&quot;
      tls: {}
      priority: 1
    my-service-http:
      entryPoints:
        - web
      service: myservice
      rule: &quot;Host(`myhost`)&quot;
      priority: 1
</code></pre>
<h2 id="http">配置http自动跳转中间件</h2>
<p>如果要让http请求自动重定向到https，需要配置一个redirectScheme插件</p>
<pre><code>http:
  middlewares:
    redirect-https:
      redirectScheme:
        scheme: https
        permanent: true
</code></pre>
<p>配置http路由使用重定向插件</p>
<pre><code>    my-service-http:
      entryPoints:
        - web
      service: myservice
      rule: &quot;Host(`myhost`)&quot;
      middlewares:
        - redirect-https      
      priority: 1
</code></pre>
<h2 id="">参考</h2>
<ul>
<li><a href="https://doc.traefik.io/traefik/routing/routers/#tls">https://doc.traefik.io/traefik/routing/routers/#tls</a></li>
<li><a href="https://doc.traefik.io/traefik/middlewares/redirectscheme/">https://doc.traefik.io/traefik/middlewares/redirectscheme/</a></li>
<li><a href="https://www.reddit.com/r/Traefik/comments/efel8j/redirect_http_on_some_port_not_80_to_https_on/">https://www.reddit.com/r/Traefik/comments/efel8j/redirect_http_on_some_port_not_80_to_https_on/</a></li>
</ul>
<!--kg-card-end: markdown-->