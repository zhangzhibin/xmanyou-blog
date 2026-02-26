---
title: "Cocos Creator 3D 1.2.0 如何找到定制引擎入口"
description: "用Cocos做开发，不会自定义引擎可不行，找不到自定义引擎入口就更不行了。"
pubDate: 2020-10-13T02:44:40.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-3d-1-2-0-engine-settings"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>根据官方说法，Cocos Creator 3D 1.2.0是Creator 3D的最后一个版本，这个版本比1.1.x版本做了不少升级，甚至连编辑器都做了很大的改动。</p>
<p>其中之一，就是自定义引擎的位置……虽然官方文档说是一样的……</p>
<blockquote>
<p><a href="https://docs.cocos.com/creator3d/manual/zh/editor/engine-customization/engine-customization.html">https://docs.cocos.com/creator3d/manual/zh/editor/engine-customization/engine-customization.html</a></p>
</blockquote>
<p>与1.1.x版本不同，1.2.0版本的自定义引擎的菜单入口不在“项目设置”中。<br>
对比一下两个版本的“项目设置”：</p>
<ul>
<li>
<p>1.1.x版本<br>
<img src="/images/2020/10/CocosCreator3d-1.1-project-settings01.png" alt="CocosCreator3d-1.1-project-settings01"></p>
</li>
<li>
<p>1.2.x版本<br>
<img src="/images/2020/10/CocosCreator3d-1.2-project-settings.png" alt="CocosCreator3d-1.2-project-settings"></p>
</li>
</ul>
<p><strong>也许</strong> Cocos可能着急将3D与2D功能统一到3.0版本，没有太多时间在1.2版本的文档同步上。</p>
<h1 id="">解决方法</h1>
<p><strong>那么，1.2版本的自定义引擎入口在哪里呢？</strong></p>
<p>如果你是Mac版本，那么可以在<strong>偏好设置</strong>里找到<strong>引擎管理器</strong><br>
<img src="/images/2020/10/CocosCreator3d-1.2-general-settings.png" alt="CocosCreator3d-1.2-general-settings"></p>
<p><img src="/images/2020/10/CocosCreator3d-1.2-enging-settings.png" alt="CocosCreator3d-1.2-enging-settings"></p>
<p>Windows版本请自行寻找各个菜单项。</p>
<!--kg-card-end: markdown-->