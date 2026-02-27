---
title: "小风车TestFlight报错：该邀请已撤销或无效，请向开发者请求新的邀请。"
description: "好不容易争取到的一个安装邀请怎么就不能用了？"
pubDate: 2021-10-21T12:59:59.000Z
author: "阿斌"
tags: ["TestFlight", "ios", "App Store"]
tagSlugs: ["testflight", "ios", "app-store"]
draft: false
type: post
slug: "testflightgai-yao-qing-yi-che-xiao-huo-wu-xiao-qing-xiang-kai-fa-zhe-qing-qiu-xin-de-yao-qing"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>TestFlight是很方便的测试应用的工具，只需要应用开发者在苹果后台创建一个测试链接，然后添加测试者的邮箱，就能一键发送安装链接到测试者的邮箱。</p>
<p>然后测试者通过邮件的指引就能把应用安装到手机上，而且通常这个链接是可以一直用的。</p>
<p><img src="/content/images/2021/10/TestFlight-invalid-invitation-02.png" alt="TestFlight-invalid-invitation-02"></p>
<p>但是呢，有时候点击链接的时候却会报错：</p>
<pre><code>该邀请已撤销或无效，请向开发者请求新的邀请。
</code></pre>
<p><img src="/content/images/2021/10/TestFlight-invalid-invitation.png" alt="TestFlight-invalid-invitation"></p>
<p>这是怎么回事呢？</p>
<h1 id="">解决方法</h1>
<p>原因有几个：</p>
<ul>
<li>1). 该邀请一直没有被点击，结果过期了。</li>
<li>2). 该测试版本已经过期了</li>
<li>3). 开发者在后台取消了这个测试</li>
</ul>
<p><strong>解决方法</strong><br>
向应用开发者申请一个新的邀请。</p>
<!--kg-card-end: markdown-->