---
title: "为Android Studio手动安装Gradle"
description: "自动安装Gradle不可用时的一个替代方案"
pubDate: 2020-11-29T16:02:10.000Z
author: "阿斌"
tags: ["android", "开发笔记", "鸿蒙"]
tagSlugs: ["android", "dev", "hong-meng"]
draft: false
type: post
slug: "manual-install-gradle-for-android-studio"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>有时候通过Android Studio安装gradle会非常慢，有没有办法可以自己下载并手动安装呢？</p>
<h2 id="">解决方法</h2>
<p>具体步骤</p>
<ol>
<li>退出Android Studio进程</li>
<li>用下载工具下载gradle文件，通常是gradle+版本号+.zip，例如gradle-6.3-all.zip</li>
<li>找到gradle的缓存目录<br>
如果没有改过，默认是&lt;用户目录&gt;/.gradle/wrapper/dists/&lt;gradle 版本&gt;/&lt;一串数字&gt;</li>
<li>将下载的gradle<version>.zip复制到缓存目录</li>
<li>为该zip文件设置正确权限，需要可执行权限 (chmod +x gradle<version>.zip)</li>
<li>重新启动Android Studio</li>
<li>检查缓存目录，如果自动生成以下文件，则说明安装成功</li>
</ol>
<pre><code> gradle-6.3
 gradle-6.3-all.zip
 gradle-6.3-all.zip.lck
 gradle-6.3-all.zip.ok 

</code></pre>
<p>完成。</p>
<h2 id="">其他</h2>
<p>该方法也适用于鸿蒙的开发工具(DevEco Studio)</p>
<p>可能也适用于其他基于IntelliJ的IDE（仅猜测，未证实）</p>
<!--kg-card-end: markdown-->