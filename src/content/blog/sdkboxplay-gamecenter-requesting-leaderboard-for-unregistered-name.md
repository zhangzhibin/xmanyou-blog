---
title: "#SDKBox# 打开GameCenter排行榜时，报错：sdkboxplay :Requesting leaderboard for unregistered name: HIGH_SCORE"
description: "用SDKBoxPlay插件可以快速接入GameCenter，可是，看起来很简单的代码，却出错了……为什么呢？"
pubDate: 2019-07-11T16:06:41.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator", "sdkbox"]
draft: false
type: post
slug: "sdkboxplay-gamecenter-requesting-leaderboard-for-unregistered-name"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>使用SDKBox接入苹果的GameCenter，启动后，显示登录GameCenter成功。但是，在提交分数到排行榜，或者显示排行榜的时候，却报了错误：</p>
<pre><code>sdkboxplay :Requesting leaderboard for unregistered name: HIGH_SCORE
</code></pre>
<p><img src="/images/2019/07/sdkbox_gamecenter_requesting_leaderboard_for_unregistered_name_01.png" alt="sdkboxplay gamecenter requesting leaderboard for unregistered name"></p>
<p>检查一下代码和几个相关的定义：</p>
<ol>
<li>Cocos Creator代码：</li>
</ol>
<pre><code>    // 显示排行榜
    showDefaultLeaderBoard(){
        if(!this.isSDKBoxAvailable()){
            return;
        }

        this.showLeaderBoard(this.defaultLeaderBoard); // &lt;= HIGH_SCORE
    }

    // 向排行榜提交分数
    addScoreToLeaderBoard(board:string, score){
        if(!this.isSDKBoxAvailable()){
            return;
        }

        console.info(&quot;[GameCenter] submit score to leaderboard: &quot; + board);
        sdkbox.PluginSdkboxPlay.submitScore(board, score); // board = HIGH_SCORE
    }
</code></pre>
<ol start="2">
<li>sdkbox_config.json的定义：</li>
</ol>
<pre><code>        &quot;sdkboxplay&quot;: {
            &quot;leaderboards&quot;: [
                {
                    &quot;id&quot;: &quot;HIGH_SCORE&quot;, 
                    &quot;name&quot;: &quot;STACK MASTER&quot;
                }
            ], 
</code></pre>
<ol start="3">
<li>App Store Connect的排行榜定义<br>
<img src="/images/2019/07/sdkbox_gamecenter_requesting_leaderboard_for_unregistered_name_04.png" alt="sdkboxplay gamecenter requesting leaderboard for unregistered name"></li>
</ol>
<p>似乎并没有什么错误。。。</p>
<h2 id="">原因</h2>
<p>找了很久，我才意识到，会不会是参数传错了。虽然一般来说，这种方法都是要求传id，但是，这里会不会要求传name？</p>
<p>于是乎，我改了一下参数……</p>
<p>然后，就解决了……</p>
<p>sdkbox的群里有个叫“吉米”同学提示说，用Name是为了跨平台。很有说服力！<br>
<img src="/images/2019/07/sdkbox_gamecenter_requesting_leaderboard_for_unregistered_name_06-1.png" alt="sdkboxplay gamecenter requesting leaderboard for unregistered name"></p>
<p><strong>这样就可以用同一个name来对应不同平台（ios和google play）的排行榜id。</strong></p>
<h2 id="">解决</h2>
<p>使用sdkbox_config.json中排行榜的name而不是id作为参数。</p>
<p>参考接口文档：<br>
<a href="http://docs.sdkbox.com/en/plugins/sdkboxplay/v3-js/#methods">http://docs.sdkbox.com/en/plugins/sdkboxplay/v3-js/#methods</a></p>
<p><img src="/images/2019/07/sdkbox_gamecenter_requesting_leaderboard_for_unregistered_name_05.png" alt="sdkboxplay gamecenter requesting leaderboard for unregistered name"></p>
<h2 id="">参考</h2>
<ol>
<li>SDKBoxPlay <a href="http://docs.sdkbox.com/en/plugins/sdkboxplay/v3-js/">http://docs.sdkbox.com/en/plugins/sdkboxplay/v3-js/</a></li>
</ol>
<h2 id="">特别感谢</h2>
<ol>
<li>sdkbox 官方群：489182678， 这是我见过的最热情的技术群。</li>
<li>吉米同学，一言点醒梦中人。</li>
</ol>
<!--kg-card-end: markdown-->