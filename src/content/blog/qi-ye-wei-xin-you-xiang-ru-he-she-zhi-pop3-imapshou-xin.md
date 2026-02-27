---
title: "企业微信邮箱如何设置pop/imap收信"
description: "要通过程序来收企业微信邮箱，需要经过2个步骤。"
pubDate: 2026-02-26T08:00:49.000Z
author: "阿斌"
tags: ["杂七杂八"]
tagSlugs: ["za-qi-za-ba"]
draft: false
type: post
slug: "qi-ye-wei-xin-you-xiang-ru-he-she-zhi-pop3-imapshou-xin"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题</h2>
<p>想用第三方客户端或者程序收取企业微信邮箱的邮件，在企微的邮箱设置里找了半天都没有找到入口。网上搜了一下，也没有找到容易看懂的攻略。</p>
<p>后来才发现，企业微信邮箱是单独的一个应用，无法在企微里获取收信密码，需要登录去企业微信邮箱的后台去找：<a href="https://exmail.qq.com/">https://exmail.qq.com/</a></p>
<h2 id="">解决</h2>
<p>需要两个操作：</p>
<ol>
<li>企业微信管理员，开启客户端访问限制，允许使用pop/imap收信。</li>
<li>邮箱用户，去开启pop/imap服务，并获取访问密码。</li>
</ol>
<h3 id="">企业微信管理员允许客户端访问</h3>
<p>这个步骤由管理员在企业微信后台的操作，邮件 -&gt; 安全管理工具 -&gt; 客户端访问限制</p>
<p><img src="/content/images/2026/02/qiye-weixin-mail-pop-imap-settings-04--1-.png" alt="qiye-weixin-mail-pop-imap-settings-04--1-"></p>
<p><img src="/content/images/2026/02/qiye-weixin-mail-pop-imap-settings-05--1-.png" alt="qiye-weixin-mail-pop-imap-settings-05--1-"></p>
<h3 id="popimap">邮箱用户获取企业微信邮箱 pop/imap 访问密码</h3>
<ol>
<li>登录企业微信邮箱（微信企业邮），注意不是企业微信后台！地址：<a href="https://exmail.qq.com/">https://exmail.qq.com/</a></li>
</ol>
<p><img src="/content/images/2026/02/qiye-weixin-mail-pop-imap-settings-03--1-.png" alt="qiye-weixin-mail-pop-imap-settings-03--1-"></p>
<ol start="2">
<li>设置(邮箱设置)-&gt;收发信设置-&gt;开启IMAP/SMTP服务（或者POP/SMTP服务）</li>
</ol>
<p><img src="/content/images/2026/02/qiye-weixin-mail-pop-imap-settings-01.jpg" alt="qiye-weixin-mail-pop-imap-settings-01"></p>
<ol start="3">
<li>设置(邮箱设置)-&gt;邮箱绑定-&gt;生成新密码<br>
<img src="/content/images/2026/02/qiye-weixin-mail-pop-imap-settings-02.jpg" alt="qiye-weixin-mail-pop-imap-settings-02"></li>
</ol>
<p>完成。</p>
<!--kg-card-end: markdown-->