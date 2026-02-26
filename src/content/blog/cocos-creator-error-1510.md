---
title: "#Cocos Creator# 错误 1510：Illegal target which doesn't have uuid or instanceId."
description: "遇到一个奇怪的错误，不要慌。"
pubDate: 2018-12-18T02:40:41.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator"]
draft: false
type: post
slug: "cocos-creator-error-1510"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p><img src="/images/2018/12/Snipaste_2018-12-18_10-33-45.png" alt="Snipaste_2018-12-18_10-33-45"></p>
<p>遇到这个错误，不要慌，检查一下自定义组件类是否定义了属性 _id，像这样子：</p>
<pre><code>   @property(cc.Label)
    txtPrice:cc.Label = null;

    // @property(cc.pr
    @property(cc.Toggle)
    tglSelect:cc.Toggle = null;

    @property(cc.SpriteFrame)
    defaultSpriteFrame:cc.SpriteFrame = null;

    _shopItemId:number = 0;
    _id:number = 0;  // &lt;=== 罪魁祸首
</code></pre>
<p>如果是，那么把_id属性改成别的名字就ok了。</p>
<p>不要问为什么没有提示重复定义什么的，嗯。</p>
<p>以后定义属性的时候小心一点，太通用的名字很可能以后被系统用了, 比如name。</p>
<p>平时可以研究一下以下几个类：</p>
<blockquote>
<p>cc.Component<br>
文档：<a href="https://docs.cocos.com/creator/api/zh/classes/Component.html">https://docs.cocos.com/creator/api/zh/classes/Component.html</a><br>
代码：<a href="https://github.com/cocos-creator/engine/blob/915ccf4e6e273f9003c14560ab1e48f9fa090132/cocos2d/core/components/CCComponent.js">https://github.com/cocos-creator/engine/blob/915ccf4e6e273f9003c14560ab1e48f9fa090132/cocos2d/core/components/CCComponent.js</a></p>
<p>cc.Object<br>
代码：<a href="https://github.com/cocos-creator/engine/blob/915ccf4e6e273f9003c14560ab1e48f9fa090132/cocos2d/core/platform/CCObject.js">https://github.com/cocos-creator/engine/blob/915ccf4e6e273f9003c14560ab1e48f9fa090132/cocos2d/core/platform/CCObject.js</a></p>
</blockquote>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->