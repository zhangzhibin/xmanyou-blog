---
title: "#CocosCreator笔记# 动态修改PhysicsCollider的尺寸"
description: "最近有个游戏，想要在游戏中动态改变碰撞盒的尺寸。研究了好久才发现，原来有个地方遗漏了，做个笔记。"
pubDate: 2018-11-12T14:44:29.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator"]
draft: false
type: post
slug: "cocoscreator-zhong-dong-tai-xiu-gai-physicscollider"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>最近有个游戏，想要在游戏中动态改变碰撞盒的尺寸。研究了好久才发现，原来有个地方遗漏了，做个笔记。</p>
<p>修改碰撞盒的尺寸：</p>
<pre><code>        let collider = this.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = width;
        collider.size.height = height;
        collider.apply();  // 调用apply以后才会重新生成box2d的相关对象
</code></pre>
<p>这里，最重要的是调用apply方法，文档：</p>
<p><img src="/images/2018/11/Snip20181112_10.png" alt="Snip20181112_10"></p>
<p>参考</p>
<blockquote>
<p><a href="https://docs.cocos.com/creator/api/zh/classes/PhysicsCollider.html">https://docs.cocos.com/creator/api/zh/classes/PhysicsCollider.html</a><br>
<a href="https://github.com/cocos-creator/engine/blob/master/cocos2d/core/physics/collider/CCPhysicsCollider.js">https://github.com/cocos-creator/engine/blob/master/cocos2d/core/physics/collider/CCPhysicsCollider.js</a></p>
</blockquote>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->