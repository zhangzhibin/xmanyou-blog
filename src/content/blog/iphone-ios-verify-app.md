---
title: "#iOS 无法验证App，此App在验证前将不可用"
description: "很多App也提供从App Store之外下载的方式，如币安，但是直接安装以后发现不能使用，这是为什么呢？"
pubDate: 2021-03-11T05:27:22.000Z
author: "阿斌"
tags: ["ios", "mac", "杂七杂八"]
draft: false
type: post
slug: "iphone-ios-verify-app"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>出于安全考虑，苹果一般不允许普通用户从非App Store下载的App。</p>
<p>但是也有例外，有些企业经过苹果允许后，可以自行发布供内部使用的App，这些App不需要从苹果商店App Store下载。</p>
<p>安装这类App之后，需要先进行验证，才可以使用。</p>
<p>否则会出现错误：<br>
<img src="/images/2021/03/ios-app-not-verified-02.png" alt="ios-app-not-verified-02"></p>
<p><img src="/images/2021/03/ios-app-not-verified-03.png" alt="ios-app-not-verified-03"></p>
<p><img src="/images/2021/03/ios-app-not-verified-01.png" alt="ios-app-not-verified-01"></p>
<h1 id="">解决方法</h1>
<p>需要在设置里信任该公司的发布证书。</p>
<p>打开“设置”&gt;“通用”&gt;“描述文件”或“描述文件与设备管理”。</p>
<p>在“企业级应用”标题下方，找到对应的企业证书。</p>
<p><img src="/images/2021/03/iphone-ios-enterprise-settings-general-profiles_device_management.png" alt="iphone-ios-enterprise-settings-general-profiles_device_management"></p>
<p>打开，然后点击信任，注意保持<strong>网络畅通</strong>，然后可以看到<strong>验证通过</strong></p>
<p><img src="/images/2021/03/iphone-ios-enterprise-profile_settings-trust_app.png" alt="iphone-ios-enterprise-profile_settings-trust_app"></p>
<!--kg-card-end: markdown-->