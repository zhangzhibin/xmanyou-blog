---
title: "【史上最全】Facebook Instant Game 小游戏广告接入指南"
description: "H5小游戏出海赚美元必备知识"
pubDate: 2021-01-28T08:58:01.000Z
author: "阿斌"
tags: ["facebook instant game", "h5 小游戏开发", "cocos creator", "laya"]
tagSlugs: ["facebook-instant-game", "h5", "cocos-creator", "laya"]
draft: false
type: post
slug: "facebook-instant-game-ad-guide"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>文档更新记录</p>
<ul>
<li>2021.1.28</li>
</ul>
<h1 id="1">1. 文档</h1>
<ul>
<li>
<p>Facebook 小游戏 SDK<br>
<a href="https://developers.facebook.com/docs/games/instant-games/sdk">https://developers.facebook.com/docs/games/instant-games/sdk</a></p>
</li>
<li>
<p>目前的最新版本 6.3<br>
<a href="https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3">https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3</a></p>
</li>
<li>
<p>广告变现指南<br>
<a href="https://developers.facebook.com/docs/games/instant-games/guides/ads-monetization">https://developers.facebook.com/docs/games/instant-games/guides/ads-monetization</a></p>
</li>
</ul>
<h1 id="2">2. 重要提示</h1>
<h2 id="1">重要提示1</h2>
<p>Facebook官方开发文档中的代码<strong>有坑</strong>，仅作为功能参考和测试，不要直接用在实际项目中。</p>
<h2 id="2">重要提示2</h2>
<p>Facebook官方开发文档中的代码<strong>有坑</strong>，仅作为功能参考和测试，不要直接用在实际项目中。</p>
<h2 id="3">重要提示3</h2>
<p>Facebook官方开发文档中的代码<strong>有坑</strong>，仅作为功能参考和测试，不要直接用在实际项目中。</p>
<h1 id="3facebookadinstance">3. Facebook 广告实例(AdInstance)</h1>
<p>Facebook 广告分为</p>
<ul>
<li>插屏广告 InterstitialAd</li>
<li>激励视频广告 RewardedVideo</li>
</ul>
<p>在使用Facebook的广告之前，需要先获取广告实例(AdInstance)。不同广告类型获取广告实例的接口不同。</p>
<ul>
<li>插屏广告 getInterstitialAdAsync</li>
<li>激励视频 getRewardedVideoAsync</li>
</ul>
<p>加载和播放广告的接口是一样的，都是对AdInstance的操作。</p>
<ul>
<li>加载 loadAsync</li>
<li>播放 showAsync</li>
</ul>
<h2 id="31facebook">3.1. Facebook 广告的业务流程</h2>
<p><img src="/content/images/2021/01/fbig-adinstance-process.png" alt="fbig-adinstance-process"></p>
<p>Facebook广告的典型业务流程分为以下几个步骤</p>
<ul>
<li>1). 初始</li>
<li>2). 获取广告实例</li>
<li>3). 加载广告</li>
<li>4). 播放广告</li>
<li>5). 结束</li>
</ul>
<h2 id="32adinstance">3.2. 广告实例AdInstance 的生命状态</h2>
<p><img src="/content/images/2021/01/fbig-adinstance-life-status.png" alt="fbig-adinstance-life-status"></p>
<p>一个广告实例的生命状态可以分为：</p>
<ul>
<li>1). 无效（初始为null或者undefined）</li>
<li>2). 有效未加载</li>
<li>3). 有效加载中</li>
<li>4). 有效已加载</li>
<li>5). 有效播放中</li>
</ul>
<p><strong>特别提示</strong></p>
<ul>
<li>1). 注意处理**“有效加载中”**的状态，广告预加载的过程会比较慢，容易出现这种中间状态，这时候既不要重新获取实例（可能出现实例过多），也不要再次加载（可能会提示加载中，或者频繁请求）。</li>
<li>2). 注意处理**“有效播放中”**，在播放过程中的广告，不要进行其他操作。</li>
<li>3). 已经播放过的广告实例，无论结果如何，都应舍弃，重新获取新的实例。</li>
</ul>
<h1 id="4">4. 常见错误</h1>
<h2 id="40vpn">4.0. 网络与VPN问题</h2>
<p>如果VPN 太慢，容易出现各种奇怪的问题，例如相同的游戏，有的人可以播放广告，有的人不能播放。<br>
所以，出现这类问题请先尝试使用一个稳定的VPN。<br>
特别是免费VPN，由于使用的人太多，容易出问题。</p>
<h2 id="41">4.1. 广告类型错误</h2>
<p>Facebook 广告分为插屏广告(InterstitialAd) 和 激励视频广告(RewardedVideo)，每种广告都有一组相应的API，如果广告ID与广告接口不匹配，会提示相应错误。</p>
<p>接口参考</p>
<ul>
<li>FBInstant.getInterstitialAdAsync</li>
<li>FBInstant.getRewardedVideoAsync</li>
</ul>
<h2 id="42client_unsupported_operation">4.2. 获取广告实例时，错误 CLIENT_UNSUPPORTED_OPERATION</h2>
<ul>
<li>解释<br>
客户端不支持这个操作</li>
<li>原因<br>
有的电脑浏览器不支持广告功能。</li>
<li>解决方法<br>
1). 提前检查是否支持该操作(FBInstant.getSupportedAPIs())。<br>
2). 忽略该错误。</li>
</ul>
<h2 id="43ads_too_many_instances">4.3. 获取广告实例时，错误 ADS_TOO_MANY_INSTANCES</h2>
<ul>
<li>解释<br>
太多的广告实例。</li>
<li>原因<br>
每种类型的广告（插页institential或者激励视频rewarded video）各只能保存3个广告实例AdInstance。</li>
<li>解决方法<br>
1). 对于已经成功获取的广告实例AdInstance 预加载失败以后，可以继续重新加载，不需要重新获取。<br>
2). 如果加载成功，未进行播放的话，不要直接丢弃。<br>
3). 注意处理“有效未加载”的状态，广告预加载的过程会比较慢，容易出现这种状态，这时候不要立即重新获取新实例。</li>
</ul>
<h2 id="44ads_no_fillinstantgamedoesnotpassminimumperformancestandards">4.4. 加载插屏广告时，错误 ADS_NO_FILL，详情  Instant Game does not pass Minimum Performance Standards</h2>
<pre><code>
&quot;code&quot;:&quot;ADS_NO_FILL&quot;,

&quot;message&quot;:&quot;Instant Game does not pass Minimum Performance Standards.&quot;

</code></pre>
<ul>
<li>
<p>解释<br>
该游戏未通过Facebook月活考核标准。</p>
</li>
<li>
<p>原因<br>
只有通过Facebook的月活考核标准的游戏，才能正常使用插屏广告。</p>
</li>
<li>
<p>解决方法<br>
1). 对于新游戏或者未达标游戏，这个错误是正常的，一般可以忽略。<br>
2). 如果已经达标，需要跟Facebook申诉。</p>
</li>
<li>
<p><strong>月活考核标准</strong></p>
</li>
</ul>
<p>目前的月活考核标准（MAP）是，游戏在</p>
<ul>
<li>1). 过去28天中</li>
<li>2). 至少3000名玩家</li>
<li>3). 游戏时长超过30分钟。</li>
</ul>
<p>在小游戏后台可以查看当前的MAP值：<strong>Instant Games -&gt; Launch Status -&gt; Monthly Active Players</strong><br>
<img src="/content/images/2021/01/fbig-adinstance-map.png" alt="fbig-adinstance-map"></p>
<h2 id="45ads_no_fillnofill">4.5. 加载广告时，错误 ADS_NO_FILL，详情 No fill</h2>
<p><img src="/content/images/2021/01/fbig-adinstance-not-fill.png" alt="fbig-adinstance-not-fill"></p>
<ul>
<li>
<p>解释<br>
广告未填充，无法从Facebook获取广告。</p>
</li>
<li>
<p>原因<br>
1). 广告版位没有审核通过，此时需要添加测试设备id才可以进行测试，建议先审核广告。<br>
2). 广告版位审核通过，但是游戏未上线，填充率会比较低，如果没有其他错误，这是正常情况。<br>
3). 广告版位审核通过，而且已经上线，则需要到后台查看填充率的原因，检查因为违反了Facebook的广告政策被限制。<br>
4). 客户端网络问题，可能被限制广告获取。</p>
</li>
<li>
<p>解决方法<br>
1). 在广告后台检查广告是否已经审核通过，或者添加测试设备id。<br>
2). 检查客户端VPN，尽量不要用免费VPN，或者蓝灯之类服务器经常更换的VPN<br>
3). 广告版位审核通过，而且已经上线，如果后台查看整体的填充率比较低，可查看填充率详情，检查是否因为违反了Facebook的广告政策被限制。<br>
4). 特别的，对于未上线游戏，如果其他设备能正常使用广告功能，可以暂时忽略该错误，等上线后再观察。</p>
</li>
</ul>
<h2 id="46ads_frequent_load">4.6. 加载广告时，错误 ADS_FREQUENT_LOAD</h2>
<ul>
<li>解释<br>
广告加载太频繁</li>
<li>原因<br>
预加载的频率太高</li>
<li>解决方法<br>
不要过于频繁加载广告。</li>
</ul>
<p><strong>注意</strong> 是否正确处理了广告实例**“有效加载中”**的状态。（参考3.2. 广告实例状态）</p>
<h2 id="47invalidadinstance">4.7. 播放广告时，错误 Invalid Ad Instance</h2>
<ul>
<li>解释<br>
错误的广告实例</li>
<li>原因<br>
广告实例一旦进行了播放操作(show)，无论结果如何，都已经失效，不能再次操作(load或者show)。</li>
<li>解决方法<br>
应该舍弃已经播放过的广告实例，（设置为null或者undefined），然后重新获取新实例。</li>
<li>参考代码<br>
<img src="/content/images/2021/01/fbig-adinstance-show.png" alt="fbig-adinstance-show"></li>
</ul>
<h1 id="5">5. 其他事项</h1>
<h2 id="51">5.1. 一些开发与调试建议</h2>
<ul>
<li>
<p>1). 尽量使用TypeScript,<br>
如果可以，优先用TypeScript的await/async语法，用try/catch来捕获错误。<br>
其次选择promise的then/catch。</p>
</li>
<li>
<p>2). 尽量多打日志，监控广告的生命周期</p>
</li>
<li>
<p>3). 如果开发人员的电脑始终无法加载或者播放广告，可以找运营人员配合调试，请提供带调试控制台的版本(vConsole)</p>
<ul>
<li>1). cocos游戏可以直接输出带vConsole的测试版本</li>
<li>2). 其他引擎可以参考 <a href="https://github.com/Tencent/vConsole/blob/dev/doc/tutorial_CN.md">https://github.com/Tencent/vConsole/blob/dev/doc/tutorial_CN.md</a></li>
</ul>
</li>
</ul>
<h2 id="52">5.2. 激励视频广告需要二次确认</h2>
<p>Facebook广告要求为激励视频广告添加二次确认，请在播放广告之前，设置对话框确认。</p>
<p><img src="/content/images/2021/01/fbig-adinstance-confirm.png" alt="fbig-adinstance-confirm"></p>
<h2 id="53vpn">5.3. 使用稳定的VPN网络</h2>
<h1 id="">最后</h1>
<p>祝大家都赚钱~</p>
<p>有小游戏要发行到海外，赚美元，欢迎关注公众号，联系我。</p>
<!--kg-card-end: markdown-->