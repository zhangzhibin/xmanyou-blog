---
title: "#Cocos Creator# 获得Label动态尺寸的解决方法"
description: "如何让背景的尺寸跟着文本标签的尺寸自动变化"
pubDate: 2019-07-09T01:58:28.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
draft: false
type: post
slug: "cocos-creator-label-dynamic-size"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>有一个带背景的文本标签，文本内容是可变的，希望背景图的宽度也跟着文本一起变化。</p>
<pre><code>label.string = text; // 设置文本
label_bg.width = label.node.width; // 修改背景尺寸 BUG: 这里只能获得标签的初始width
</code></pre>
<p>测试发现，标签节点的宽度并没有在设置完文本以后立即改变。</p>
<p><img src="/images/2019/07/Snip20190709_81.png" alt="带背景的文本标签"></p>
<h2 id="">原因</h2>
<p>原因是因为，在Cocos Creator中，label的尺寸是在渲染时计算出来的，在设置string时并没有立即计算。</p>
<h2 id="">解决方法</h2>
<p>参考Cocos 论坛上的方法，在设置完string以后，手动调用一次label._updateRenderData(true)</p>
<p><img src="/images/2019/07/Snip20190709_80.png" alt="动态获得Label尺寸的方法"></p>
<p>新的js代码如下：</p>
<pre><code>label.string = text; // 设置文本
label._updateRenderData(true); // 这里调用一次手动渲染
label_bg.width = label.node.width; // 修改背景尺寸
</code></pre>
<h2 id="">参考</h2>
<blockquote>
<ol>
<li><a href="https://forum.cocos.com/t/2-0-node-width/68227">https://forum.cocos.com/t/2-0-node-width/68227</a></li>
<li><a href="https://forum.cocos.com/t/label/65851/3">https://forum.cocos.com/t/label/65851/3</a></li>
</ol>
</blockquote>
<h2 id="">重要更新</h2>
<p>Cocos Creator 2.2.0 已经移除了_updateRenderData方法。</p>
<p><img src="/images/2019/11/CocosCreator_Label_updaterenderdata_missing.png" alt="CocosCreator_Label_updaterenderdata_missing"></p>
<p>经测试，可用_forceUpdateRenderData方法替代。</p>
<p><img src="/images/2019/11/CocosCreator_Label_updaterenderdata.png" alt="CocosCreator_Label_updaterenderdata"></p>
<!--kg-card-end: markdown-->