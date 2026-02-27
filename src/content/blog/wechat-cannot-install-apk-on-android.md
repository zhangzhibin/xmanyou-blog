---
title: "微信无法直接安装apk文件的两个解决方法"
description: "安卓手机微信会将收到的.apk文件重命名为.apk.1文件，导致无法直接进行安装。\n本文提供两个解决方法。\n"
pubDate: 2019-07-22T08:24:01.000Z
author: "阿斌"
tags: ["杂七杂八", "android", "酷APP"]
tagSlugs: ["za-qi-za-ba", "android", "cool-apps"]
draft: false
type: post
slug: "wechat-cannot-install-apk-on-android"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>有时候，为了快速测试，我们会用微信直接传apk文件给测试人员。</p>
<p><img src="/content/images/2019/07/install_apk_on_wechat_apk.1_00.jpeg" alt="install_apk_on_wechat_apk.1_00"></p>
<p>但是，从手机上收到的.apk文件，会直接被改成.apk.1，直接打开的话<br>
<img src="/content/images/2019/07/install_apk_on_wechat_apk.1_05.png" alt="install_apk_on_wechat_apk.1_05"></p>
<h2 id="">原因</h2>
<p>据说，这是微信出于<em>安全</em>考虑进行的操作。<br>
安卓手机微信会将收到的.apk文件重命名为.apk.1文件，导致无法直接进行安装。</p>
<h2 id="">解决方法</h2>
<ol>
<li><strong>自动模式</strong></li>
</ol>
<p>下载补丁程序：<a href="https://github.com/zhangzhibin/WXAPK/releases/download/build190722/wxapk.1.installer.apk">https://github.com/zhangzhibin/WXAPK/releases/download/build190722/wxapk.1.installer.apk</a></p>
<blockquote>
<p><strong>注意</strong>：如果是在微信里尝试直接下载apk，也是不允许的，需要拷贝链接到浏览器中打开。</p>
</blockquote>
<p>项目源码：<br>
<a href="https://github.com/xmanyou/WXAPK">https://github.com/xmanyou/WXAPK</a></p>
<p><strong>步骤</strong><br>
1). 下载并安装<br>
2). 在微信中打开.apk.1文件<br>
3). 选择“用其他应用程序打开”</p>
<p><img src="/content/images/2019/07/install_apk_on_wechat_apk.1_06.png" alt="install_apk_on_wechat_apk.1_06"></p>
<p>4). 可以顺利进入安装界面<br>
<img src="/content/images/2019/07/install_apk_on_wechat_apk.1_01.jpeg" alt="install_apk_on_wechat_apk.1_01"></p>
<ol start="2">
<li>手动模式<br>
如果不愿意安装补丁程序，可以利用文件管理器来手动安装。<br>
<strong>步骤</strong><br>
1). 打开系统或者第三方的<strong>文件管理器</strong><br>
2). 找到对应的.apk.1文件，可用通过搜索的方式来找<br>
3). 某些系统能够自动识别该文件为安装文件，则点击安装即可<br>
4). 如果系统不能识别，则进入编辑模式，把.apk.1修改为.apk，然后安装。</li>
</ol>
<h2 id="">感谢</h2>
<p>感谢TwiceYuan同学提供的源码<br>
<a href="https://github.com/twiceyuan/WXAPK">https://github.com/twiceyuan/WXAPK</a></p>
<p>欢迎下载TwiceYuan同学上传到Google Play商店的该应用<br>
<a href="https://play.google.com/store/apps/details?id=com.twiceyuan.wxapk">https://play.google.com/store/apps/details?id=com.twiceyuan.wxapk</a></p>
<!--kg-card-end: markdown-->