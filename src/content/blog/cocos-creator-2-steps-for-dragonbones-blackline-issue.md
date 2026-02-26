---
title: "#Cocos Creator# 2步解决DragonBones的黑边问题"
description: "动作师好不容易做好的动作，放到游戏里却出现了奇怪的黑边问题？"
pubDate: 2020-01-22T03:45:24.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发", "DragonBones"]
draft: false
type: post
slug: "cocos-creator-2-steps-for-dragonbones-blackline-issue"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>龙骨(DragonBones)动画导入Cocos Creator以后，发现出现了一些奇怪的黑边，如图：</p>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines.png" alt="CocosCreator_DragonBones_Blacklines"></p>
<p>这些黑边是出现在各个插槽(Slot)的连接处。</p>
<p>如果是普通的Sprite出现这种问题，我们可以在合图的时候指定Extrude参数来解决，但是DragonBones有一套自己的渲染规则，且导出的图集不能指定Extrude参数，所以无法通过设置这个参数来测试是否可行。</p>
<h2 id="">官方解决方法</h2>
<p>Cocos论坛上，引擎组的同学提供过一个解决方法是，修改渲染方式。</p>
<ol>
<li><a href="https://forum.cocos.org/t/dragon-bones/62214/5">https://forum.cocos.org/t/dragon-bones/62214/5</a></li>
<li><a href="https://forum.cocos.org/t/dragonbones/70312/6">https://forum.cocos.org/t/dragonbones/70312/6</a></li>
</ol>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_01.png" alt="CocosCreator_DragonBones_Blacklines_01"></p>
<p>还给了图示</p>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_02.png" alt="CocosCreator_DragonBones_Blacklines_02"></p>
<p>然而……在Cocos Creator v2.x版本中，龙骨组件并不能直接修改渲染方式：<br>
<img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_03_component.png" alt="CocosCreator_DragonBones_Blacklines_03_component"></p>
<p>怎么办？</p>
<h2 id="">解决方法</h2>
<p>有几个解决方法:</p>
<h3 id="1">1. 自定义引擎，修改龙骨组件的渲染方式。</h3>
<p>参考：<br>
<a href="https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html?h=%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BC%95%E6%93%8E">https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html?h=自定义引擎</a></p>
<p>需要修改文件 engine/extensions/dragonbones/webgl-assembler.js<br>
<img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_modify_engine.png" alt="CocosCreator_DragonBones_Blacklines_modify_engine"></p>
<h3 id="2cocoscreatorv222">2. 修改引擎的时候，发现其实在Cocos Creator v2.2.2版本中（其他版本未测试），已经自带解决方案。</h3>
<p>步骤如下：</p>
<ol>
<li>设置纹理参数: Premultiplied Alpha = true</li>
</ol>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_texture_premultiply_alpha.png" alt="CocosCreator_DragonBones_Blacklines_texture_premultiply_alpha"></p>
<ol start="2">
<li>设置DragonBones组件参数: Premultiplied Alpha = true<br>
是否启用贴图预乘：是</li>
</ol>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_component_premultiply_alpha.png" alt="CocosCreator_DragonBones_Blacklines_component_premultiply_alpha"></p>
<p>哒哒，搞定~~~<br>
对比一下结果：<br>
<img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_03.png" alt="CocosCreator_DragonBones_Blacklines_03"></p>
<h3 id="">其他</h3>
<p>值得一提的是，如果不设置纹理的Premultiplied Alpha为true，在编辑器中依然可以正常显示</p>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_04_in_editor.png" alt="CocosCreator_DragonBones_Blacklines_04_in_editor"></p>
<p>但是，在实际预览时就有新的问题，出现了白边……</p>
<p><img src="/images/2020/01/CocosCreator_DragonBones_Blacklines_05_runtime.png" alt="CocosCreator_DragonBones_Blacklines_05_runtime"></p>
<p>这也是官方论坛中解决方案中没有说清楚的地方，以及容易被忽视的地方。</p>
<!--kg-card-end: markdown-->