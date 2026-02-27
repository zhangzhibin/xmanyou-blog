---
title: "#Facebook Instant Game# 什么时候会收到messaging_game_plays 消息？"
description: "Facebook Instant Game与微信小游戏最大的不同点之一，是Facebook推荐使用Bot来提升用户的留存。\n其中 messaging_game_plays 是Instant Game独有的，那要怎么处理这个消息呢？"
pubDate: 2018-12-13T15:19:33.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "facebook instant game"]
tagSlugs: ["dev", "h5", "facebook-instant-game"]
draft: false
type: post
slug: "facebook-instant-game-shi-yao-shi-hou-hui-shou-dao-messaging_game_plays-xiao-xi"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>Facebook Instant Game与微信小游戏最大的不同点之一，是Facebook推荐使用Bot来提升用户的留存。</p>
<p>Facebook的各种应用都可以使用Bot来进行自动化，通过监听不同的消息（Event），做相应的处理。</p>
<p>其中，<strong>messaging_game_plays</strong> 消息是Instant Game独有的。这个消息什么时候发出呢？</p>
<h4 id="">消息时机</h4>
<blockquote>
<p>参考<br>
<a href="https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/">https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/</a></p>
</blockquote>
<p><img src="/content/images/2018/12/Snip20181213_18.png" alt="Snip20181213_18"></p>
<p><strong>官方解释</strong></p>
<blockquote>
<p>This callback occurs after a person played a round of Instant Games.</p>
<p>翻译：玩家每玩完一轮游戏时发出。</p>
</blockquote>
<p>那么，a round （一轮）又具体是指什么呢？</p>
<p><strong>官方另一处说法</strong></p>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/getting-started/bot-setup">https://developers.facebook.com/docs/games/instant-games/getting-started/bot-setup</a><br>
Once your bot is correctly configured, your server application will start receiving messaging_game_plays web hooks every time a player closes the Instant Game.</p>
</blockquote>
<p>这个比较清楚了，当玩家关闭游戏页面时，会发出这个消息。</p>
<p>实际测试的时候，也确实在关闭页面时收到了消息。</p>
<p>测试的消息示例：</p>
<pre><code>{&quot;object&quot;:&quot;page&quot;,
    &quot;entry&quot;:[
        {
            &quot;id&quot;:&quot;1009260959273885&quot;,
            &quot;time&quot;:1544628852444,
            &quot;messaging&quot;:[
                {
                 &quot;recipient&quot;:{&quot;id&quot;:&quot;1009260959273885&quot;},
                 &quot;timestamp&quot;:1544628852444,
                 &quot;sender&quot;:{&quot;id&quot;:&quot;1605880706178143&quot;},
                 &quot;game_play&quot;:
                     {
                         &quot;game_id&quot;:&quot;360189154536649&quot;,
                         &quot;payload&quot;:&quot;{\\&quot;msg\\&quot;:\\&quot;game start\\&quot;}&quot;,
                         &quot;player_id&quot;:&quot;2087169211340109&quot;
                     }
                 }
             ]
         }
     ]
 }
</code></pre>
<p>其中，payload是我在游戏中通过 FBInstant.setSessionData 设置的。</p>
<p><img src="/content/images/2018/12/Snip20181213_20.png" alt="Snip20181213_20"></p>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2">https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2</a></p>
</blockquote>
<p><img src="/content/images/2018/12/Snip20181213_19.png" alt="Snip20181213_19"></p>
<h4 id="">消息格式</h4>
<blockquote>
<p>参考<br>
<a href="https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/">https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_game_plays/</a></p>
</blockquote>
<p><img src="/content/images/2018/12/Snip20181213_21.png" alt="Snip20181213_21"></p>
<p>其中值得注意的几个值</p>
<ol>
<li>context_type<br>
本次游戏的场景，分为：<br>
SOLO - 单人游戏<br>
THREAD - ？？<br>
GROUP - 群组内游戏</li>
<li>score<br>
玩家在该游戏场景中的排行榜分数</li>
<li>payload<br>
可以通过FBInstant.setSessionData来传递的数据</li>
</ol>
<h4 id="">其他</h4>
<p>THREAD和GROUP环境下的游戏，还在摸索中，待续。</p>
<h4 id="">补充</h4>
<p>找到了官方对于Context类型的描述：</p>
<pre><code>The type of the current game context.
POST - A facebook post.  (应该是对应到facebook 的文章吧)
THREAD - A messenger thread. （messenger的聊天窗)
GROUP - A facebook group. (Facebook的群)
SOLO - Default context, where the player is the only participant. (默认，只有当前玩家)
</code></pre>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->