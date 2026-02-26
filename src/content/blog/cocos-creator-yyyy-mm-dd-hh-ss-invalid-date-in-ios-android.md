---
title: "#Cocos Creator# YYYY-MM-DD HH:mm:ss格式的日期在iOS或者安卓报错的解决方法"
description: "2019-07-09 12:02:01 转换成Date对象，在不同的平台上表现并不同，需要进行处理才能正常工作。"
pubDate: 2019-07-09T01:30:29.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-yyyy-mm-dd-hh-ss-invalid-date-in-ios-android"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>需要处理一个日期date格式的字段，文档里说的是普通的date数据，即一个大整数（表示从某个时间点开始的毫秒数），但是，后来服务端提前帮前端解析成了一个可读的时间，格式是：YYYY-MM-DD HH:mm:ss，如 2019-07-09 12:02:01 。</p>
<p>代码还是按照旧的文档写的，于是上来就先把进行转换。</p>
<pre><code>var date = new Date(endDate);
</code></pre>
<p>在浏览器里测试时，一直没有报任何错误。<br>
但是，打包到手机上，不管是iOS还是Android，都提示invalid date</p>
<h2 id="">原因</h2>
<p>后来查到原来这种格式并不是所有浏览器都支持的格式</p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/4310953/invalid-date-in-safari">https://stackoverflow.com/questions/4310953/invalid-date-in-safari</a></p>
</blockquote>
<h2 id="">解决方法</h2>
<p>方法很多，最通用健壮的方法是使用一个日期格式化的库。</p>
<p>但是，我不想引入新的库，于是就找了一个偷懒的方式，使用了另外一种格式，把日期和时间中间的空格换成了T，这样子：</p>
<p><strong>YYYY-MM-DDTHH:mm:ss</strong></p>
<p>举例：</p>
<pre><code>2019-07-09 12:02:01 =&gt; 2019-07-09T12:02:01
</code></pre>
<p>代码</p>
<pre><code>var date = new Date(endDate.replace(&quot; &quot;, &quot;T&quot;));
</code></pre>
<p>在ios和安卓、以及Chrome浏览器上测试成功。</p>
<h2 id="">参考</h2>
<blockquote>
<ol>
<li>
<p><a href="https://stackoverflow.com/questions/50029024/utc-date-conversion-to-local-date-does-not-work-safari/50033029#50033029">https://stackoverflow.com/questions/50029024/utc-date-conversion-to-local-date-does-not-work-safari/50033029#50033029</a></p>
</li>
<li>
<p><a href="https://stackoverflow.com/questions/4310953/invalid-date-in-safari">https://stackoverflow.com/questions/4310953/invalid-date-in-safari</a></p>
</li>
</ol>
</blockquote>
<!--kg-card-end: markdown-->