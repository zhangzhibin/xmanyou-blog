---
title: "#Facebook Instant Game# 尝试打开外部URL，毫不意外地失败了。"
description: "如题"
pubDate: 2019-03-22T14:50:48.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "facebook instant game", "cocos creator"]
tagSlugs: ["dev", "h5", "facebook-instant-game", "cocos-creator"]
draft: false
type: post
slug: "facebook-instant-game-chang-shi-da-kai-wai-bu-url"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>想在Facebook Instant Game中直接打开别的页面，毫不意外地失败了。</p>
<pre><code>        let url = &quot;https://fb.gg/play/stackystackbymokomo&quot;;
        cc.sys.openURL(url);
</code></pre>
<p>错误如下：<br>
<img src="/content/images/2019/03/Snip20190322_16.png" alt="Snip20190322_16"></p>
<p>如果想要跳转到别的小游戏（交叉推广），需要使用API switchGameAsync</p>
<pre><code>switchGameAsync( )
Request that the client switch to a different Instant Game. The API will reject if the switch fails - else, the client will load the new game.

Parameters

appID string
 The Application ID of the Instant Game to switch to. The application must be an Instant Game, and must belong to the same business as the current game. To associate different games with the same business, you can use Business Manager: https://developers.facebook.com/docs/apps/business-manager#update-business.
 
data Object
? An optional data payload. This will be set as the entrypoint data for the game being switched to. Must be less than or equal to 1000 characters when stringified.

Examples

FBInstant.switchGameAsync('12345678').catch(function (e) {
  // Handle game change failure
});

Throws USER_INPUT
Throws INVALID_PARAM
Throws PENDING_REQUEST
Throws CLIENT_REQUIRES_UPDATE

Returns Promise

</code></pre>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->