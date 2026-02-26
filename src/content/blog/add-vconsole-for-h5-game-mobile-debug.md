---
title: "一行代码为H5小游戏添加手机调试神器vConsole"
description: "腾讯前端开发组开源了一个前端调试工具vConsole，为H5游戏的调试，特别是手机端的调试工作，提供了非常大的便利。"
pubDate: 2021-03-03T05:05:45.000Z
author: "阿斌"
tags: ["h5 小游戏开发", "facebook instant game", "微信小游戏"]
tagSlugs: ["h5", "facebook-instant-game", "wxgame"]
draft: false
type: post
slug: "add-vconsole-for-h5-game-mobile-debug"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>任何游戏都需要调试，H5游戏也不例外。</p>
<p>如果是在电脑端，现在各大浏览器都带有开发者工具，可以非常方便地进行调试。</p>
<p>但是，如果是在手机上，特别是一些小游戏平台，由于H5游戏是运行在APP里，就没有开发者工具可以使用了。</p>
<p>今天介绍一个H5小游戏在手机端调试的神器：<strong>vConsole</strong></p>
<h1 id="1vconsole">1. 关于vConsole</h1>
<p>vConsole是腾讯前端组开源的一个调试组件，最简单的用法是查看console输出的日志。而看日志，也是调试应用最基本也是使用频率最高的一个方法。</p>
<p>与浏览器的开发者工具不同，vConsole的原理是，在H5游戏中嵌入一个调试控制台，并截获系统的各种信息。<br>
除了日志，还支持很多特性：</p>
<ul>
<li>查看 console 日志</li>
<li>查看网络请求</li>
<li>查看页面 element 结构</li>
<li>查看 Cookies、localStorage 和 SessionStorage</li>
<li>手动执行 JS 命令行</li>
<li>自定义插件</li>
</ul>
<p>几乎就是一个五脏俱全的开发者工具。</p>
<p>项目地址: <a href="https://github.com/Tencent/vConsole">https://github.com/Tencent/vConsole</a></p>
<h1 id="2">2. 具体步骤</h1>
<h2 id="21vconsole">2.1. 引入vConsole库</h2>
<p>下载vconsole的最新版本：</p>
<blockquote>
<p><a href="https://github.com/Tencent/vConsole/releases/latest">https://github.com/Tencent/vConsole/releases/latest</a></p>
</blockquote>
<p>然后在项目里引入 vconsole.min.js：</p>
<pre><code>&lt;script src=&quot;&lt;vconsole.min.js的路径&gt;&quot;&gt;&lt;/script&gt;
</code></pre>
<h2 id="22vconsole">2.2. 初始化vConsole</h2>
<p>只需要一行代码：</p>
<pre><code>if (typeof VConsole !== 'undefined') {
    window.vConsole = new VConsole();
}
</code></pre>
<p>完成。</p>
<h1 id="3">3. 使用方法</h1>
<p>从手机或者浏览器打开游戏，看到绿色按钮vConsole，表示添加成功。</p>
<p><img src="/images/2021/03/h5-game-debug-log-vconsole-01.png" alt="h5-game-debug-log-vconsole-01"></p>
<p>点击vConsole按钮，调出界面：</p>
<p><img src="/images/2021/03/h5-game-debug-log-vconsole-02.png" alt="h5-game-debug-log-vconsole-02"></p>
<!--kg-card-end: markdown-->