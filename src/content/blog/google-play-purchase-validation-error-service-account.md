---
title: "Google Play 订单校验错误：The project id used to call the Google Play Developer API has not been linked in the Google Play Developer Console"
description: "在调试Google Play订单校验功能时，遇到这么个奇怪的错误，最后的解决方法居然传一个新的apk包……"
pubDate: 2020-03-11T12:59:45.000Z
author: "阿斌"
tags: ["开发笔记", "android", "google play"]
tagSlugs: ["dev", "android", "google-play"]
draft: false
type: post
slug: "google-play-purchase-validation-error-service-account"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>在调试Google Play订单校验功能时，遇到一个非常奇怪的错误：</p>
<pre><code>The project id used to call the Google Play Developer API has not been linked in the Google Play Developer Console
</code></pre>
<h2 id="">解决方法</h2>
<p>首先，确认在Google Play Developer Console中正确配置Service Account，并且已经关联相应的project到Google Play Console。</p>
<p><img src="/content/images/2020/03/Google_Play_Console_API_Access_Service_Account.png" alt="Google_Play_Console_API_Access_Service_Account"></p>
<p>其次，确认代码中用到的账号email和key是正确的。</p>
<p>最后，试一下打一个新包提交到Google Play Console上……</p>
<h2 id="">参考</h2>
<p><a href="https://github.com/googleapis/google-api-php-client/issues/1529">https://github.com/googleapis/google-api-php-client/issues/1529</a></p>
<!--kg-card-end: markdown-->