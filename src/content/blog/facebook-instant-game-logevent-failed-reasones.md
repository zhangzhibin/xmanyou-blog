---
title: "Facebook 小游戏小技巧：统计事件发送失败的原因总结"
description: "常在河边走，哪能不湿鞋，即使是个普通的api也有很多种错误方法。"
pubDate: 2020-08-04T05:43:37.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "facebook instant game"]
tagSlugs: ["dev", "h5", "facebook-instant-game"]
draft: false
type: post
slug: "facebook-instant-game-logevent-failed-reasones"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Facebook Instant Game（也就是国内俗称的&quot;小游戏&quot;），提供了自带的统计接口，可以统计自定义事件，然后在Facebook的统计后台查看。</p>
<h1 id="1">1. 统计事件接口文档</h1>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3/">https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3/</a></p>
</blockquote>
<ul>
<li>接口: FBInstant.logEvent</li>
<li>参数列表：
<ul>
<li>eventName 类型 string, 只允许数字、字母、下划线和连字符(减号)组合，长度2-40个字符</li>
<li>valueToSum 类型 number</li>
<li>parameters 类型 object, 不超过25组的键值对<br>
示例代码</li>
</ul>
</li>
</ul>
<pre><code>var logged = FBInstant.logEvent(
  'my_custom_event',
  42,
  {custom_property: 'custom_value'}
);
</code></pre>
<h1 id="2">2. 发送事件失败的可能原因</h1>
<h2 id="21">2.1. 定位</h2>
<p>每次调用Facebook的统计接口时，游戏都会向Facebook发送一个请求。所以，我们可以利用浏览器自带的开发者工具来查看请求的情况。<br>
打开开发工具的network页，可以看到很多activities请求，这些就是我们向Facebook发送的请求了。</p>
<p><strong>注意</strong> activities还包含了其他的请求，并不全都是统计事件，比如，还有广告请求。</p>
<p><img src="/images/2020/08/Facebook_Instant_Game_Activities_01.png" alt="Facebook_Instant_Game_Activities_01"></p>
<h2 id="22">2.2. 事件失败原因</h2>
<p>如上图所示，失败的请求，会在列表中显示为红色，并提示原因。上图中，就提示了错误原因是不符合字符串的规则（用正则表达式表示）。</p>
<p>常见的失败原因：</p>
<ul>
<li>
<p>1). 网络问题<br>
由于国内的网络情况，由于网络原因失败，是很常见的一个情况。</p>
</li>
<li>
<p>2). 类型错误<br>
注意看文档，如果调用接口时，传入的参数的类型不对，也会报错。<br>
最常见的是，第二个参数valueToSum，如果传入空字符 &quot;&quot; 或者 字符&quot;0&quot;，都会报错。<br>
这个参数如果没有值，可以填0，或者干脆不填(undefined)</p>
</li>
<li>
<p>3). 格式错误<br>
文档中除了定义了参数的类型，还注明了格式。比如<br>
eventName 就只允许包含</p>
<ul>
<li>数字: 0到9</li>
<li>字母: a到z，A到Z</li>
<li>下划线: _</li>
<li>连接符(或者减号): -</li>
</ul>
</li>
</ul>
<p>而其他字符都是不允许的。特别注意是否有全角字符，以及tab等。</p>
<ul>
<li>4). 长度错误<br>
参数eventName的合法长度是 2-40<br>
参数parameters的属性名也只允许2-40个字符，并且只允许最多25组键值对(key-value pair)</li>
</ul>
<p><strong>事实上</strong> Facebook小游戏的Api中，string类型的参数的要求都是一样的。</p>
<p>以上。</p>
<!--kg-card-end: markdown-->