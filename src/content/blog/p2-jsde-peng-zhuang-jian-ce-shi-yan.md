---
title: "物理引擎p2.js的碰撞检测实验"
description: "如果要用p2.js来实现Unity里的 trigger，该怎么配置呢？ 我们先来做个实验。"
pubDate: 2017-12-01T01:38:22.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "p2.js"]
tagSlugs: ["dev", "h5", "p2-js"]
draft: false
type: post
slug: "p2-jsde-peng-zhuang-jian-ce-shi-yan"
image: "/content/images/2017/12/19944868-1.png"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><h3 id="p2">影响p2的碰撞检测的因素</h3>
<p>首先是 <strong>p2.Body.type</strong>: DYNAMIC，STATIC和KINEMATIC。</p>
<p><strong>DYNAMIC</strong></p>
<ul>
<li>动态刚体</li>
<li>一般通过force和velocity由物理引擎来控制位置</li>
</ul>
<p><strong>STATIC</strong></p>
<ul>
<li>静态刚体</li>
<li>一般没有改变位置的需求</li>
</ul>
<p><strong>KINEMATIC</strong></p>
<ul>
<li>动态刚体</li>
<li>不通过引擎来控制位置信息，而是通过直接修改Position来修改位置</li>
</ul>
<p><strong>其他</strong> 可能影响碰撞的属性：</p>
<p><strong>mass</strong><br>
重量</p>
<p><strong>sensor</strong><br>
传感器，充当传感器的刚体，将可以被穿透</p>
<h3 id="">碰撞过滤</h3>
<p>可以通过设置p2.Body的collisionGroup &amp;&amp; collisionMask属性来进行碰撞过滤，避免产生过多无用的碰撞检测消耗时间。</p>
<p><strong>collisionGroup</strong><br>
表示刚体所属的碰撞组</p>
<p><strong>collisionMask</strong><br>
表示可与该刚体发生碰撞的碰撞组</p>
<p>是否进行碰撞的<strong>判定方式</strong>：</p>
<blockquote>
<p>if(shapeA.collisionGroup &amp; shapeB.collisionMask)!=0 &amp;&amp; (shapeB.collisionGroup &amp; shapeA.collisionMask)!=0){<br>
// The shapes can collide<br>
}</p>
</blockquote>
<p><strong>不参与碰撞则设置为0,碰撞所有则为 -1</strong></p>
<blockquote>
<p>allCollisionsShape.collisionMask = -1;<br>
noCollisionsShape.collisionMask = 0;</p>
</blockquote>
<p><strong>注意：当不设置这两个值时，默认是进行碰撞检测的。</strong></p>
<h3 id="">测试</h3>
<p>方法 p2.Body.overlaps(body:p2.Body) 可以在引擎调用step后查询碰撞两个刚体的碰撞结果。以下是分组测试结果：</p>
<p><img src="/content/images/2017/12/89319090.png" alt="89319090"></p>
<p>实验结果图：<br>
<img src="/content/images/2017/12/19944868.png" alt="19944868"></p>
<h3 id="">结论</h3>
<ol>
<li>仅当参与碰撞检测的两个刚体中，至少有一个是DYNAMIC时，引擎才会判定碰撞成功。</li>
<li>mass和sensor的值并不影响碰撞结果。</li>
<li>mass为0的刚体，可能被弹飞。</li>
<li>sensor为true，即设置为传感器的刚体可以被穿透。</li>
<li>对于DYNAMIC类型刚体，如果sensor为false（默认值），碰撞成功时，引擎会自动改变其位置信息，避免穿透。</li>
</ol>
<h3 id="">参考文献</h3>
<blockquote>
<p>p2.js Wiki: <a href="https://github.com/schteppe/p2.js/wiki">https://github.com/schteppe/p2.js/wiki</a></p>
</blockquote>
<h3 id="">问题</h3>
<p>那么问题就来了，如果要用p2.js来实现Unity里的 trigger，该怎么配置呢？</p>
<p><img src="/content/images/2017/12/6888105e-2efa-43d9-8399-825bdb8450fd.png" alt="6888105e-2efa-43d9-8399-825bdb8450fd"></p>
<hr>
<p>如果你有什么问题和评论，欢迎关注我的公众号 <strong>阿斌的日常</strong> 与我讨论。<br>
<img src="/content/images/2017/12/qrcode_for_unitymvp.jpg" alt="qrcode_for_unitymvp"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->