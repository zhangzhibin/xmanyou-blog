---
title: "macOS 10.15 Catalina中Android Studio无法正常打包编译以及其他一些问题"
description: "macOS 10.15 catalina 初版有较大的问题，不推荐升级。如果遇到Android Studio无法打包，请查看文中解决方法。"
pubDate: 2019-10-09T16:02:44.000Z
author: "阿斌"
tags: ["mac", "catalina"]
tagSlugs: ["mac", "catalina"]
draft: false
type: post
slug: "macos-10-15-catalinade-ji-ge-wen-ti"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p><img src="/images/2019/10/macOS10.15_catalina.jpeg" alt="macOS10.15_catalina"></p>
<p>近日，苹果终于开始推送macOS 10.15 Catalina了。</p>
<p>Catalina在上上次WWDC上，被苹果大吹特吹，但是，鉴于苹果最近的新系统的第一版本总是有bug，如果不是因为所有测试机都不小心升级了iOS13，我还真不愿意升级。</p>
<h2 id="">结论：不推荐</h2>
<p>在经过短暂的使用后，我郑重宣布：<br>
<strong>强烈不推荐升级macOS 10.15 Catalina.</strong></p>
<h2 id="">原因</h2>
<p>原因是当前版本有以下几个问题：</p>
<ol>
<li>频繁提示各种权限</li>
<li>无法进行文件拖放操作</li>
<li>某些APP由于未通过苹果的开发者认证，比如<strong>Android Studio可能无法正常打包编译</strong>。</li>
</ol>
<p>猜测这几个问题都跟苹果提高了安全和隐私级别有关：</p>
<p><img src="/images/2019/10/macOS10.15_catalina_security_and_privacy.png" alt="macOS10.15_catalina_security_and_privacy"></p>
<h2 id="androidstudio">Android Studio无法正常打包编译的解决方法</h2>
<p>其中这个问题是最讨厌的，很影响心情。</p>
<p>在找到认证过的Android Studio版本，之前，有个临时解决方法如下：</p>
<ol>
<li>在弹出是否将未知程序移入废纸篓时，选择取消。</li>
</ol>
<p><img src="/images/2019/10/macOS10.15_catalina_unidentified_developer.png" alt="macOS10.15_catalina_unidentified_developer"></p>
<ol start="2">
<li>到系统设置-&gt;安全性与隐私-&gt;选择“仍然允许”</li>
</ol>
<p><img src="/images/2019/10/macOS10.15_catalina_unidentified_developer_allow.png" alt="macOS10.15_catalina_unidentified_developer_allow"></p>
<ol start="3">
<li>重新编译，这次弹窗中多了“打开”选项，选择“打开”</li>
</ol>
<p><img src="/images/2019/10/macOS10.15_catalina_unidentified_developer_open.png" alt="macOS10.15_catalina_unidentified_developer_open"></p>
<ol start="4">
<li>
<p>继续编译，重复步骤1，直到不再提示未认证的开发者问题</p>
</li>
<li>
<p>编译完成</p>
</li>
</ol>
<p><img src="/images/2019/10/macOS10.15_catalina_unidentified_developer_done.png" alt="macOS10.15_catalina_unidentified_developer_done"></p>
<h2 id="">最后</h2>
<p>强调一下，如果没必要，暂时不要升级，相信很快会有补丁。</p>
<!--kg-card-end: markdown-->