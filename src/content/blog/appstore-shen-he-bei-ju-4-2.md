---
title: "#AppStore# 审核悲剧4.2"
description: "Facebook Instant Game上架App Store被拒绝，理由4.2。"
pubDate: 2019-03-19T01:13:35.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "App Store"]
tagSlugs: ["dev", "h5", "app-store"]
draft: false
type: post
slug: "appstore-shen-he-bei-ju-4-2"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>最近在Facebook上架了一个Instant Game小游戏 Stacky Stack：<br>
<img src="/images/2019/03/Banner1200x675.png" alt="Banner1200x675"></p>
<p>游戏地址：</p>
<blockquote>
<p><a href="https://www.facebook.com/instantgames/play/2333613016921232/?source=www_play_url">https://www.facebook.com/instantgames/play/2333613016921232/?source=www_play_url</a></p>
</blockquote>
<p>后来，又尝试将这个小游戏上架到苹果的App Store上，结果悲剧了。</p>
<p>苹果的拒绝理由是:</p>
<pre><code>Guideline 4.2 - Design - Minimum Functionality


Your app provides a limited user experience as it is not sufficiently different from a mobile browsing experience. As such, the experience it provides is similar to the general experience of using Safari. Including iOS features such as push notifications, Core Location, and sharing do not provide a robust enough experience to be appropriate for the App Store.

https://www.facebook.com/instantgames/play/2333613016921232/?source=www_play_url

Next Steps

To resolve this issue, please revise your app to provide a more robust user experience by including additional native iOS functionality.



If you cannot - or choose not to - revise your app to be in compliance with the App Store Review Guidelines, you may wish to build an HTML5 web app instead. You can distribute web apps directly on your web site; the App Store does not accept or distribute web apps.

For more information about creating web apps, refer to the Configuring Web Applications section of the Safari Web Content Guide.

For a description of the HTML elements and attributes you can use in Safari on iPhone, check out Safari HTML Reference: Introduction.
</code></pre>
<p>4.2条款的具体内容：</p>
<blockquote>
<p><a href="https://developer.apple.com/cn/app-store/review/guidelines/#minimum-functionality">https://developer.apple.com/cn/app-store/review/guidelines/#minimum-functionality</a></p>
</blockquote>
<pre><code>4.2 最低功能要求
App 应包含功能、内容和 UI，而不仅仅是一个经过重新包装的网站。如果 app 没有什么实用价值、毫无新意或者不太像是一个 app，那它就不适合出现在 App Store 中。如果 app 不能带来持久的娱乐价值，或只是让人感到毛骨悚然，则无法获得批准。如果 app 只是一首歌曲或一部影片，则应提交到 iTunes Store。如果 app 只是一本书籍或游戏指南，则应提交到 iBooks Store。

4.2.1 使用 ARKit 的 app 应提供丰富而完整的增强现实体验，仅将模型放入 AR 视图或重播动画并不足够。
4.2.2 除了目录类 app 之外，app 不应只包含市场营销材料、广告、网络剪报、内容聚合或链接集合。
4.2.3
(i) App 应能独立工作，无需安装其他 app。
(ii) 确保 app 发布时在其二进制文件中包含有正常运行所需的充足内容。
(iii) 如果 app 需要下载其他资源，请披露下载大小并在下载之前提醒用户。现有 app 在 2019 年 1 月 1 日后提交的所有更新都必须遵循这一准则。
4.2.4 与表盘类似的 Apple Watch app 可能会令人感到困惑，因为用户会认为这些 app 能与各种设备功能 (如轻扫、通知和第三方功能栏) 配合使用。将创意性的时间表现方式用作 app 界面是个好点子 (例如，供冲浪者使用的潮汐时钟)，但是如果您的 app 与表盘过于相像，则可能会被我们拒绝。
4.2.5 主要用作 iCloud 和 iCloud 云盘文件管理器的 app 需要包含更多的 app 功能，才能获得批准。
4.2.6 利用商业化模板或 app 生成服务创建的 app 将被拒绝，除非这个 app 由相应内容的提供商直接提交。这些模板服务若要为不同的客户提供差异化的用户体验，可提供工具来帮助客户自行创建创新的 app，但不应代表客户提交 app。模板提供商也可以考虑创建单一的二进制文件，以汇总或“选取”的模型托管所有客户端内容 (例如：在搜索餐厅的 app 里为每个客户餐厅定制独立的条目或页面，或在聚会活动 app 里为每个客户的活动创建单独的条目)。
4.2.7 远程 App 镜像：如果您的远程桌面 app 用作特定软件或服务的镜像，而不是主机设备的普通镜像，则必须符合以下规定：
(a) 主机设备是归用户所有的个人电脑，并且主机和客户端必须通过本地局域网连接。
(b) 客户端中显示的任何软件或服务应在主机设备屏幕上完整呈现，并且不可使用超出远程桌面传输所需的 API 或平台功能。
(c) 所有帐户的创建和管理均必须从主机设备发起。
(d) 客户端上显示的 UI 不与 iOS 或 App Store 视图类似，不提供商店类界面，也不能供用户浏览、选择或购买用户尚未拥有或授权的软件。为明确起见，在镜像的软件中发生的交易不需要使用 App 内购买，前提是这些交易是在主机设备上处理的。
</code></pre>
<p><strong>疑点</strong><br>
由于苹果直接给出了游戏的地址，推测可能是因为我自己暴露了Facebook的游戏地址。因为审核中，我提供了Facebook游戏的Page作为支持网站，而这个Page上可以玩到Instant Game的版本。</p>
<p><strong>后续操作</strong><br>
这个游戏申诉的话可能也没戏了。<br>
下一个游戏考虑先上App Store审核再上其他H5平台。</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->