---
title: "H5游戏的客户端和服务端如何进行跨域调试？"
description: "H5游戏在与服务端联调时，经常会遇到跨域的问题，这里介绍两种方法。"
pubDate: 2019-11-14T05:50:47.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "h5-client-debug-with-server-side-code-cross-origin"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>H5游戏在于服务端进行联调时，为了提高调试效率，通常不会将他们按照生产环境部署，而是会将游戏的客户端和服务端直接部署在开发机上，方便定位问题，甚至在遇到问题直接修改代码查看效果。</p>
<p>例如，<br>
客户端如果用Cocos Creator开发的话，在调试时，默认运行在<br>
<a href="http://localhost:7457/">http://localhost:7457/</a></p>
<p>而服务端代码，要么跑在服务端开发人员的机器上，或者由客户端开发下载后在本地运行，可能会运行在<br>
<a href="http://localhost:8080/">http://localhost:8080/</a></p>
<p>如果直接从客户端访问服务端的接口，则会出现跨域的问题：<br>
<img src="/images/2019/11/CocosCreator_cross_origin_01.png" alt="CocosCreator_cross_origin_01"></p>
<blockquote>
<p>Access to XMLHttpRequest at 'localhost:8080/login' from origin '<a href="http://localhost:7457">http://localhost:7457</a>' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https</p>
</blockquote>
<h2 id="corspolicy">什么是CORS policy</h2>
<p>参考：<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS</a></p>
<p>CORS 全称是 Cross-Origin Resource Sharing，跨域资源分享。</p>
<blockquote>
<p>Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.</p>
</blockquote>
<p>它是指通过设置指定的header，告知浏览器部署在一个域(origin)的web应用，正在访问另一个域上的资源。</p>
<p><img src="https://mdn.mozillademos.org/files/14295/CORS_principle.png" alt="mozilla_CORS"></p>
<h2 id="">解决方法</h2>
<h3 id="1">1. 在服务端开启跨域访问</h3>
<p>只需要在服务端代码中，返回的response中添加 header:</p>
<pre><code>Access-Control-Allow-Origin: *
</code></pre>
<p>以beego为例实现跨域访问，只需要在Controller类中加入以下代码：</p>
<pre><code>this.Ctx.Output.Header(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;)
this.ServeJSON()
</code></pre>
<p>如果希望只允许特定的客户端访问，则可以用指定的domain来替换&quot;*&quot;, 例如</p>
<pre><code>Access-Control-Allow-Origin: https://foo.example
</code></pre>
<h4 id="">注意</h4>
<p>值得注意的地方是，如果你像我一样，把客户端和服务端都运行在本地，那么，开启跨域访问后，通过Chrome来调试，运行时可能还是不行，那么你可以试试把服务端的地址从localhost 替换成 127.0.0.1</p>
<p><img src="/images/2019/11/CocosCreator_cross_origin_02.png" alt="CocosCreator_cross_origin_02"></p>
<h3 id="2">2. 通过反向代理，让客户端和服务端运行到同一个域上</h3>
<p>既然不在同一个域上，那就想办法让他们“<strong>运行</strong>”在同一个域上，这可以通过反向代理的方式实现。</p>
<p>以Nginx为例，在nginx的配置文件(mac上，默认在 /usr/local/etc/nginx/nginx.conf)</p>
<pre><code># 服务端
location /gameserver/ {
	rewrite ^/gameserver(/.*)$ $1 break;
    proxy_pass http://localhost:8080;
}

# 客户端
location /game/ {
	rewrite ^/game(/.*)$ $1 break;
    proxy_pass http://localhost:7457;
}
</code></pre>
<p>然后，通过浏览器访问 <a href="http://localhost:8888/game/">http://localhost:8888/game/</a> 就可以正常调试了。</p>
<!--kg-card-end: markdown-->