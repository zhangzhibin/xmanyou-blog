---
title: "beego开启CORS"
description: "几个配置方法"
pubDate: 2020-05-15T06:09:30.000Z
author: "阿斌"
tags: ["开发笔记", "beego", "go"]
draft: false
type: post
slug: "beego-enable-cors"
---

<!--kg-card-begin: markdown--><h2 id="">问题</h2>
<p>要在Beego中开启CORS，需要使用插件cors，并针对不同的路由类型进行设置。</p>
<h2 id="">示例</h2>
<p>普通路由</p>
<pre><code>    beego.InsertFilter(&quot;*&quot;, beego.BeforeRouter, cors.Allow(&amp;cors.Options{
        AllowOrigins:     []string{&quot;*&quot;},
        //AllowMethods:     []string{&quot;POST&quot;, &quot;GET&quot;, &quot;OPTIONS&quot;},
        //AllowHeaders:     []string{&quot;Origin&quot;},
        //ExposeHeaders:    []string{&quot;Content-Length&quot;},
        //AllowCredentials: true,
    }))
</code></pre>
<p>静态文件路由</p>
<pre><code>    beego.InsertFilter(&quot;*&quot;, beego.BeforeStatic, cors.Allow(&amp;cors.Options{
        AllowOrigins:     []string{&quot;*&quot;},
        //AllowMethods:     []string{&quot;POST&quot;, &quot;GET&quot;, &quot;OPTIONS&quot;},
        //AllowHeaders:     []string{&quot;Origin&quot;},
        //ExposeHeaders:    []string{&quot;Content-Length&quot;},
        //AllowCredentials: true,
    }))
</code></pre>
<!--kg-card-end: markdown-->