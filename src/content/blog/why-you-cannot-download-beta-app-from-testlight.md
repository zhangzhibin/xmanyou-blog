---
title: "给非开发人员解释一下为什么你没法通过TestFlight下载beta版本应用了"
description: "下载一个普通应用，却说什么beta版本，这是怎么回事？"
pubDate: 2021-09-16T14:59:00.000Z
author: "阿斌"
tags: ["App Store", "TestFlight", "开发笔记", "杂七杂八", "ios"]
draft: false
type: post
slug: "why-you-cannot-download-beta-app-from-testlight"
---

<!--kg-card-begin: markdown--><p>最近经常有人问：</p>
<ul>
<li>为什么我的TestFlight不能用了？</li>
<li>为什么下载一个“<strong>普通</strong>”应用，会收到“<strong>此beta版本目前不接受任何新测试员</strong>”这种奇怪的错误？</li>
</ul>
<p>问这些问题的，大多是非开发人员，所以，今天详细解释一下。</p>
<h1 id="1testflight">1. 什么是TestFlight？</h1>
<p>TestFlight是苹果公司为<strong>应用开发者</strong>提供的一个<strong>测试</strong>平台。</p>
<p>TestFlight App应用，也是一个应用，与苹果商店App(App Store App)类似，它可以用来下载应用，但是只能是测试版应用。</p>
<p>所以，可以简单理解为，App Store是正式版商店，而TestFlight是测试版商店。</p>
<p><img src="/images/2021/09/TestFlight-vs-App-Store.png" alt="TestFlight-vs-App-Store"></p>
<h1 id="2testflight">2. 为什么要有TestFlight？</h1>
<p>TestFlight，就像名字所提示的，是用来给开发人员“试飞”的，是个beta版本应用的测试平台。</p>
<h2 id="21testflight">2.1. 在TestFlight之前</h2>
<p>通常来说，在应用正式上架到苹果商店之前，为了测试产品的质量，获取用户反馈，应用开发者会组织测试人员进行测试。在没有TestFlight之前，要进行这种测试，需要经过以下步骤：</p>
<ul>
<li>1). 收集测试设备的设备id，添加到苹果开发者后台</li>
<li>2). 为这些测试设备创建测试证书</li>
<li>3). 使用测试证书打包测试应用</li>
<li>4). 将测试应用分发给测试人员安装到测试设备上</li>
</ul>
<p>可以看到，这一整个测试过程，需要很多人工的参与。尤其是收集测试设备的设备id这一步，由于很多测试人员是普通的手机使用者，而不是开发人员，他们并不知道如何查看和收集自己的设备id。</p>
<p>另外，这种测试方法有很多限制：</p>
<ul>
<li>1). 每个开发者账号能添加的测试设备是有限的</li>
<li>2). 每次添加新的测试设备后，需要重新打包应用</li>
</ul>
<p>所以，整个测试过程，是既繁琐又低效的。</p>
<h2 id="22testflight">2.2. 有TestFlight之后</h2>
<p>为了解决这个问题，苹果推出了TestFlight Beta测试平台。</p>
<p>通过TestFlight，应用开发者可以很方便的把还在测试阶段的应用（通常称为Beta版本）上传到TestFlight平台，然后分发给测试人员试用。</p>
<p>这个过程中，测试人员不需要提供测试设备的设备id，开发者也不需要向测试人员提供安装包，具体步骤：<br>
1). 开发人员上传测试包到TestFlight平台<br>
2). 苹果审核beta测试应用，与正式的应用商店一样，只有通过审核的beta版本才能被下载<br>
3). beta版本审核通过后，开发人员在TestFlight后台生成<strong>测试链接</strong>，发送给测试人员<br>
4). 测试人员打开TestFlight测试链接，接受测试邀请。<br>
5). 如果测试设备中没有安装TestFlight应用，测试人员根据指引，下载TestFlight应用。<br>
6). 测试人员通过测试设备打开测试链接，然后在TestFlight应用里下载要测试的应用。</p>
<p>可以看到，这个过程中，测试人员不需要提供任何信息，只要打开一个链接，就能够安装应用，大大方便了测试流程。</p>
<h2 id="23testflight">2.3. TestFlight的限制</h2>
<p>当然，TestFlight也有一些限制，比如：</p>
<ul>
<li>测试链接有时效性，最长90天。</li>
<li>最多只能10000个人参与测试</li>
</ul>
<p>但是，相比于它的便利性，这点限制算不了什么。</p>
<h1 id="3">3. 针对非开发人员的一些常见问题解答</h1>
<h2 id="31testflight">3.1. 为什么安装应用时，TestFlight报错了？</h2>
<p>之前我以为是正常的应用开发测试过程中遇到的错误，这种情况下，需要联系开发人员来检查是不是后台配置有问题。</p>
<p>但是，后来我发现，很多人安装应用的链接是网上找的，他们并不是在参与正常的应用测试，所以，这种情况下，TestFlight报错，大多是因为测试链接已经失效了。</p>
<p><strong>失效原因</strong>，可能是以下这些：</p>
<ul>
<li>1). 链接发布的时间已经太久了，超过了最长允许时间</li>
<li>2). 通过该链接下载应用的人太多了，超过了允许的最大测试数量</li>
<li>3). 开发人员已经停用了这个测试链接</li>
</ul>
<h2 id="32">3.2. 有什么办法安装失效链接的应用？</h2>
<p>简单说，<strong>没有</strong>。</p>
<p>为什么呢？因为很多人并不是在参与正常的应用测试，联系不到该应用开发者，就无法获取有效的测试链接，所以没法更新应用。</p>
<h2 id="33">3.3. 那怎么办？</h2>
<p>简单说，<strong>没办法</strong>，或者：</p>
<ul>
<li>重新找个链接</li>
<li>找个正式版</li>
</ul>
<h1 id="4">4. 其他</h1>
<ul>
<li>
<p>苹果官方解释: <a href="https://developer.apple.com/testflight/">https://developer.apple.com/testflight/</a></p>
</li>
<li>
<p><a href="https://xmanyou.com/app-store-testflight-this-beta-isnt-accepting-any-new-testers-right-now/">TestFlight 此beta版本目前不接受任何新测试员 是什么情况？</a></p>
</li>
</ul>
<p>最后，还有问题的话，你可以扫<strong>公众号二维码</strong>找我：耿直的IT男阿斌</p>
<!--kg-card-end: markdown-->