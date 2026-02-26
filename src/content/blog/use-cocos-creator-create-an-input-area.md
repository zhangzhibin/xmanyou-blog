---
title: "Cocos Creator编写新手引导模块，如何让玩家只能点击允许点击的按钮？"
description: "标记并引导玩家点击相应按钮，是比较常见的做法，要怎么实现呢？"
pubDate: 2019-08-29T15:38:10.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
draft: false
type: post
slug: "use-cocos-creator-create-an-input-area"
---

<!--kg-card-begin: markdown--><h2 id="">前言</h2>
<p>新手引导，是每个做游戏的人都逃不过的宿命……</p>
<p>这玩意，做简单了，跟没做一样。<br>
做复杂了，<s>也跟没做一样</s>恨不得自己写一套脚本。</p>
<p>怎样在简单和复杂之间找到平衡点，是一门<s>讨价还价的</s>艺术。</p>
<h2 id="">方案</h2>
<p>新手引导中，最怕的是什么？</p>
<p>最怕的是，玩家不按套路出牌。</p>
<p>所以，只允许玩家点击允许点击的位置，虽然比较生硬，但是是比较常见的做法。</p>
<p>简单列一下步骤：</p>
<ol>
<li><strong>标记可操作区域（俗称“掏洞”）</strong></li>
</ol>
<p>首先，通常会先把按钮所在区域用高亮显示，提示玩家“只有这里可以点”。</p>
<p>Cocos Creator中，提供了Mask组件，勾选inverted（反向遮罩），可以快速的进行掏洞。</p>
<p><img src="/images/2019/08/CocosCreator_mask_inverted.png" alt="CocosCreator_mask_inverted"></p>
<p>这个组件会在子节点上掏出一个洞来，所以添加一个半透明的黑色子节点，就可以显示高亮区域了。</p>
<p>像这样子：<br>
<img src="/images/2019/08/CocosCreator_use_mask_for_highlight.png" alt="CocosCreator_use_mask_for_highlight"></p>
<ol start="2">
<li><strong>判断玩家的触摸操作是否在可操作区域</strong></li>
</ol>
<p>需要在操作区域上方添加一个Node，监听触摸事件。</p>
<blockquote>
<p>根据需要，可以只监听触摸初始 cc.Node.EventType.TOUCH_START事件。</p>
</blockquote>
<p>然后检查触摸的坐标（默认是世界坐标），是否在高亮区域中。</p>
<p>一般来说，通过矩形判定就好了，并不需要做到像素级别的精准度。</p>
<p>所以，需要先获得可操作性区域在世界坐标下的矩形（一般不是boundingBox）。</p>
<p>这里需要注意下cc.rect的参数，x和y指的是rect的origin，也就是左下角。</p>
<blockquote>
<p><a href="https://xmanyou.com/cocos-creator-cc-rect-x-y-parameter-means-origin/">https://xmanyou.com/cocos-creator-cc-rect-x-y-parameter-means-origin/</a></p>
</blockquote>
<ol start="3">
<li><strong>吞噬不在可操作区域内的触摸事件</strong></li>
</ol>
<p>如果该操作不在可操作区域内，则需要将该事件吞噬，需要调用<em>cc.Node.touchListener.setSwallowTouches(true)</em></p>
<blockquote>
<p>注意，只调用event.stopPropagation是不够的。</p>
</blockquote>
<p>参考代码：</p>
<pre><code>   let pos = evt.getLocation();
   if(!this._inputArea.contains(pos)){
       // 不在高亮区域内则禁止继续传递并吞噬该事件
       evt.stopPropagation();
       this.inputTestLayer[&quot;_touchListener&quot;].setSwallowTouches(true);
       // return true; // 返回true和stopPropagation效果一样，表示不再传递该事件
   }
   // return false;
</code></pre>
<h2 id="">参考</h2>
<ul>
<li>触摸吞噬的讨论：<a href="https://forum.cocos.com/t/topic/45077/4">https://forum.cocos.com/t/topic/45077/4</a></li>
</ul>
<!--kg-card-end: markdown-->