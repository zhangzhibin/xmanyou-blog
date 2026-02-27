---
title: "Cocos Creator 3D 如何移除插屏提高启动速度？"
description: "本文介绍两种移除插屏提高游戏启动速度的方法"
pubDate: 2020-10-20T05:55:22.000Z
author: "阿斌"
tags: ["cocos creator", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["cocos-creator", "h5", "dev"]
draft: false
type: post
slug: "cocos-creator-3d-remove-default-splash"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>Cocos Creator 3d打包输出后，会自动添加Cocos的插屏，并且强制显示3秒。<br>
<img src="/content/images/2020/10/CocosCreator3d-default-splash.png" alt="CocosCreator3d-default-splash"></p>
<p>这大大延长了游戏的启动速度，影响用户体验。</p>
<p>有什么办法移除Cocos的闪屏呢？</p>
<h1 id="">解决方法</h1>
<h2 id="1">1. 官方方法</h2>
<p>Cocos的文档中提到了如何移除插屏的方法</p>
<blockquote>
<p>文档：<a href="https://docs.cocos.com/creator3d/manual/zh/editor/publish/build-options.html?h=%E6%8F%92%E5%B1%8F">https://docs.cocos.com/creator3d/manual/zh/editor/publish/build-options.html?h=插屏</a></p>
</blockquote>
<p>只需要填写一个调查问卷即可使用移除插屏的功能：<br>
<img src="/content/images/2020/10/CocosCreator3d-remove-splash-01.png" alt="CocosCreator3d-remove-splash-01"></p>
<h2 id="2">2. 修改引擎代码</h2>
<p>也可以选择修改插屏相关代码：</p>
<p>文件路径: engine/cocos/core/splash-screen.ts</p>
<pre><code>        console.info(&quot;......&quot;);
        // 移除Cocos的闪屏
        (this.setting.totalTime as number) = 10;
        (this.setting.base64src as string) = &quot;&quot;;
        (this.setting.displayRatio as number) = 0.4;
        (this.setting.displayWatermark as boolean) = false;

</code></pre>
<!--kg-card-end: markdown-->