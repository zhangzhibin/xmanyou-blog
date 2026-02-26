---
title: "Google Play审核被拒 Violation of Families Policy Requirements"
description: "不要以为只有苹果审核会拒人，Google Play也会哦~"
pubDate: 2020-10-13T01:34:32.000Z
author: "阿斌"
tags: ["android", "google play", "开发笔记"]
tagSlugs: ["android", "google-play", "dev"]
draft: false
type: post
slug: "google-play-review-violation-of-families-policy-requirements"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>最近在向Google Play提交APK审核时，连续被拒，原因都是：</p>
<pre><code>Issue: Violation of Families Policy Requirements
</code></pre>
<p>详细的邮件是这样子：<br>
<img src="/images/2020/10/GooglePlay-Review-Issue-Violation-of-Families-Policy-Requirements.png" alt="GooglePlay-Review-Issue-Violation-of-Families-Policy-Requirements"></p>
<p><strong>注意：</strong> 不做任何修改，直接重复提交版本的话，会被秒拒。</p>
<h1 id="">解决方法</h1>
<p>原因是，今年App Store和Google Play平台推出了更严格的隐私政策，很多SDK没有跟进，容易出现不合规的情况。</p>
<p>Families Policy是Google Play推出的一个家庭政策，</p>
<blockquote>
<p><a href="https://developer.android.com/google-play/guides/families">https://developer.android.com/google-play/guides/families</a></p>
</blockquote>
<p>正如文档所说，该政策主要是用来<strong>保护儿童</strong>的：<br>
<img src="/images/2020/10/GooglePlay-Review-Issue-Violation-of-Families-Policy-Requirements-02.png" alt="GooglePlay-Review-Issue-Violation-of-Families-Policy-Requirements-02"></p>
<p>Google还给出了一个满足该政策的广告商名单：</p>
<blockquote>
<p><a href="https://support.google.com/googleplay/android-developer/answer/9283445">https://support.google.com/googleplay/android-developer/answer/9283445</a></p>
</blockquote>
<p><img src="/images/2020/10/GooglePlay-Review-Issue-Violation-of-Families-Policy-Requirements-03.png" alt="GooglePlay-Review-Issue-Violation-of-Families-Policy-Requirements-03"></p>
<p><strong>震惊！</strong><br>
仔细看的话会发现，大名鼎鼎的Facebook居然不在其中……</p>
<p>所以，解决方法就是，移除Facebook广告SDK，重新提交版本。</p>
<p><img src="/images/2020/10/Snip20201012_14.png" alt="Snip20201012_14"></p>
<p>完成。</p>
<!--kg-card-end: markdown-->