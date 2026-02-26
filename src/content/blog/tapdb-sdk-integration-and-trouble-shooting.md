---
title: "#TapDB SDK接入指南"
description: "TapDB的接入方法和疑难解答"
pubDate: 2021-07-16T02:56:46.000Z
author: "阿斌"
tags: ["开发笔记", "android", "TapDB"]
draft: false
type: post
slug: "tapdb-sdk-integration-and-trouble-shooting"
---

<!--kg-card-begin: markdown--><p>TapDB是心动/TapTap旗下的一个数据统计后台，可以用来统计游戏的数据。</p>
<p><strong>官方网站</strong><br>
<a href="https://www.tapdb.com/">https://www.tapdb.com/</a></p>
<p><strong>官方接入文档</strong></p>
<ul>
<li>安卓游戏接入<br>
<a href="https://www.tapdb.com/docs/zh_CN/sdk/Android.html">https://www.tapdb.com/docs/zh_CN/sdk/Android.html</a></li>
<li>iOS游戏接入<br>
<a href="https://www.tapdb.com/docs/zh_CN/sdk/iOS.html">https://www.tapdb.com/docs/zh_CN/sdk/iOS.html</a></li>
</ul>
<p>TapDB的接入非常简单，以安卓游戏为例，详细接入步骤如下：</p>
<h1 id="tapdbsdk">TapDB安卓SDK详细接入步骤</h1>
<h2 id="0tapdb">0. 在TapDB后台创建应用</h2>
<ul>
<li>创建TapDB账号</li>
<li>登录后台</li>
<li>创建企业</li>
<li>创建项目</li>
</ul>
<p>获取项目的应用id，后边需要用到。</p>
<p><strong>注意</strong><br>
新创建的项目是调试状态。</p>
<h2 id="1tapdbsdk">1.下载并添加TapDB SDK包</h2>
<p>在TapDB官网下载SDK包<br>
<a href="https://www.tapdb.com/docs/zh_CN/download/SDK.html">https://www.tapdb.com/docs/zh_CN/download/SDK.html</a></p>
<p><strong>注意</strong><br>
认准官网标志哈，不要从第三方下载。</p>
<p>与很多sdk不同，TapDB的sdk提供的是aar的包，而不是maven之类的网络库，所以下载后，解压，然后复制到工程里。</p>
<p><img src="/images/2021/07/tapdb-sdk-integration-01.png" alt="tapdb-sdk-integration-01"></p>
<h2 id="2gradletapdbsdk">2.在Gradle中引用TapDB SDK</h2>
<pre><code>dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
    // 其他lib...
}
</code></pre>
<h2 id="3androidmanifestxml">3.在AndroidManifest.xml设置必要的权限</h2>
<pre><code>&lt;!--必选权限--&gt;
&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;
&lt;uses-permission android:name=&quot;android.permission.ACCESS_WIFI_STATE&quot; /&gt;
&lt;uses-permission android:name=&quot;android.permission.ACCESS_NETWORK_STATE&quot;/&gt;

&lt;!--强烈建议权限  sdk 获取 IMEI 时会需要此权限；获取不到不影响功能正常使用，IMEI 用于辅助数据分析，使统计结果更加精确--&gt; 
&lt;uses-permission android:name=&quot;android.permission.READ_PHONE_STATE&quot; /&gt;
</code></pre>
<h2 id="4tapdbsdk">4.初始化TapDB SDK</h2>
<p><strong>注意</strong><br>
必须使用以下两个方法之一来初始化TapDB SDK</p>
<pre><code>// 1). 
public static void init(Context context, String appId, String channel, String appVersion)

// 2). 
public static void init(Context context, String appId, String channel, String appVersion, JSONObject properties)
</code></pre>
<h2 id="5tapdbsdk">5.测试TapDB SDK</h2>
<h3 id="1">1). 添加测试设备</h3>
<p>下载并安装TapDB客户端，然后在企业管理界面中，扫描二维码来添加测试设备。</p>
<p><img src="/images/2021/07/tapdb-sdk-integration-02.png" alt="tapdb-sdk-integration-02"></p>
<p><img src="/images/2021/07/tapdb-sdk-integration-03.png" alt="tapdb-sdk-integration-03"></p>
<h3 id="2">2). 运行测试应用</h3>
<p>使用添加到后台的测试设备进入游戏，如果一切正常，TapDB后台会显示激活的设备数量，并提示<br>
<strong>调试完成，进入项目</strong></p>
<p><img src="/images/2021/07/tapdb-sdk-integration-04.png" alt="tapdb-sdk-integration-04"></p>
<h2 id="6">6. 常见问题</h2>
<h3 id="61tapdb">6.1. TapDB后台显示项目一直处于调试状态，始终无法变成正式项目。</h3>
<p>检查以下几点：</p>
<ul>
<li>1). 必须用测试设备进行游戏</li>
<li>2). 保证测试设备可以联网</li>
<li>3). 检查初始化TapDB时的id是否正确</li>
<li>4). 检查初始化TapDB的init方法是否正确<br>
TapDB的初始化方法有好几个，必须用带version参数的那两个：</li>
</ul>
<pre><code>TapDB.init(app, TAPDB_ID, CHANNEL_ID, version, null);
</code></pre>
<p>如果在日志中看到以下信息，表示使用的init方法不对：<br>
<img src="/images/2021/07/tapdb-sdk-integration-05.png" alt="tapdb-sdk-integration-05"></p>
<p>正确姿势<br>
<img src="/images/2021/07/tapdb-sdk-integration-06.png" alt="tapdb-sdk-integration-06"></p>
<h1 id="">官方技术支持</h1>
<p>如果接入一直遇到问题，可以联系TapDB的官方技术支持，在网站上可以找到他们的企业微信联系方式。</p>
<!--kg-card-end: markdown-->