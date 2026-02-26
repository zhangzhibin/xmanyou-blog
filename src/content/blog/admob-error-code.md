---
title: "AdMob 错误码从0到3都是什么意思？"
description: "如题"
pubDate: 2019-10-10T14:45:53.000Z
author: "阿斌"
tags: ["开发笔记", "AdMob"]
tagSlugs: ["dev", "admob"]
draft: false
type: post
slug: "admob-error-code"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">错误描述</h2>
<ol start="0">
<li>
<p>Error Code 0 : ERROR_CODE_INTERNAL_ERROR<br>
内部出现问题；<br>
例如，收到广告服务器的无效响应。</p>
</li>
<li>
<p>Error Code 1 : ERROR_CODE_INVALID_REQUEST<br>
广告请求无效；<br>
例如，广告单元 ID 不正确。</p>
</li>
<li>
<p>Error Code 2 : ERROR_CODE_NETWORK_ERROR<br>
由于网络连接问题，广告请求失败。</p>
</li>
<li>
<p>Error Code 3 : ERROR_CODE_NO_FILL<br>
广告请求成功，但由于缺少广告资源，未返回广告。</p>
</li>
</ol>
<h2 id="">参考资料</h2>
<p>来自Google的描述<br>
<img src="/images/2019/10/Admob_Events_and_Error_Code.png" alt="Admob_Events_and_Error_Code"></p>
<h2 id="">参考链接</h2>
<ol>
<li><a href="https://support.google.com/admob/thread/3494603?hl=en">https://support.google.com/admob/thread/3494603?hl=en</a></li>
<li><a href="https://developers.google.com/admob/android/banner#ad_events">https://developers.google.com/admob/android/banner#ad_events</a></li>
</ol>
<!--kg-card-end: markdown-->