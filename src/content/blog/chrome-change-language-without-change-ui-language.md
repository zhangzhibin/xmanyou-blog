---
title: "如何修改Chrome浏览器的系统语言但是不改变浏览器显示语言呢？"
description: "有时候需要修改浏览器的系统语言来测试与语言相关的相关功能，比如印尼语，或者印地语，但是呢，又不想把浏览器显示语言改成自己看不懂的语言。\n\n要怎么办呢？\n"
pubDate: 2022-03-11T14:51:33.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "Chrome"]
draft: false
type: post
slug: "chrome-change-language-without-change-ui-language"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>有时候需要修改浏览器的系统语言来测试与语言相关的相关功能，比如印尼语，或者印地语，但是呢，又不想把浏览器显示语言改成自己看不懂的语言。</p>
<p>那该怎么办呢？</p>
<h2 id="">解决方法</h2>
<p>每个浏览器都有自己的设置方法，Chrome就支持分别设置</p>
<ul>
<li>浏览器系统语言<br>
和</li>
<li>浏览器的界面显示语言</li>
</ul>
<h3 id="chrome">Chrome浏览器设置语言的方法</h3>
<ul>
<li>第一步，打开浏览器设置菜单，点击<strong>高级</strong> -&gt; <strong>语言</strong><br>
也可以直接在地址栏输入：<code>chrome://settings/languages</code><br>
<img src="/images/2022/03/chrome-change-language-without-change-ui-language-01.png" alt="chrome-change-language-without-change-ui-language-01"></li>
<li>第二步，添加所需的语言</li>
<li>第三步，设置首选语言：打开要设置的首选语言的右侧语言菜单，选中“<strong>移到顶部</strong>”</li>
<li>第四步，设置浏览器语言：在要设置的语言的右侧菜单中，勾选“<strong>以这种语言显示Google Chrome</strong>”<br>
<img src="/images/2022/03/chrome-change-language-without-change-ui-language-02.png" alt="chrome-change-language-without-change-ui-language-02"></li>
</ul>
<p>完成。</p>
<!--kg-card-end: markdown-->