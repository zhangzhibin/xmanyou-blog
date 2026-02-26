---
title: "Cocos Creator/Android Studio打包报错：packageDebug FAILED"
description: "修改Android Studio的虚拟机内存可能可以解决这问题。"
pubDate: 2019-10-09T15:40:38.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "android"]
tagSlugs: ["dev", "cocos-creator", "android"]
draft: false
type: post
slug: "cocos-creator-android-studioda-bao-bao-cuo-packagedebug-failed"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">原因</h2>
<p>这个错误可能是由于Android Studio的虚拟机内存不足导致。</p>
<h2 id="">解决方法</h2>
<p>修改Android Studio的虚拟内存，步骤如下：</p>
<ol>
<li>通过Android Stuido -&gt; Help -&gt; Edit Custom VM Options ... 选项打开或者创建虚机配置文件。</li>
</ol>
<p><img src="/images/2019/10/Android_Studio_Edit_Custom_VM_Options.png" alt="Android_Studio_Edit_Custom_VM_Options"></p>
<ol start="2">
<li>添加虚拟机内存设置</li>
</ol>
<p><img src="/images/2019/10/Android_Studio_Edit_Custom_VM_Options_Memory.png" alt="Android_Studio_Edit_Custom_VM_Options_Memory"></p>
<pre><code>-Xms128m
-Xmx4096m
-XX:MaxPermSize=1024m
-XX:ReservedCodeCacheSize=200m
-XX:+UseCompressedOops
</code></pre>
<!--kg-card-end: markdown-->