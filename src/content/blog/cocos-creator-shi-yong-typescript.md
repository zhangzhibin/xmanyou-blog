---
title: "如何在Cocos Creator中使用TypeScript"
description: "在Cocos Creator 中使用TypeScript真的好吗？"
pubDate: 2018-08-22T12:42:41.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-shi-yong-typescript"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>在折腾了一年的Egret之后，我决定尝试一下Cocos Creator，现在的最新版本是2.0。</p>
<p>Egret给我最好的印象是TypeScript，这极大地降低了我对“随心所欲”的脚本语言的恐惧心理。</p>
<p>所以，在听说了Cocos Creator也可以用TypeScript之后，我决定尝试在Cocos Creator中使用TypeScript。</p>
<p>检查列表：</p>
<ol>
<li>使用TS编写组件  [o]<br>
直接在cc中创建ts文件，自带组件模板，需要用标注的方式，把需要显示在面板上的属性等标注出来</li>
<li>TS引用TS组件   [o]<br>
用 import {组件名} from &quot;组件文件（不含ts）&quot;</li>
<li>调用TS编写的一般通用逻辑 [o]<br>
用 import * as 自定义库名 from &quot;组件文件路径(不含ts)&quot;</li>
<li>TS调用外部TS库 [o]<br>
<strong>注意，需要用commonjs的方式打包</strong></li>
</ol>
<blockquote>
<p>如果用amd方式编译库,import时会遇到错误：define is undefined</p>
</blockquote>
<ol start="5">
<li>混编：TS调用外部JS库 [o]<br>
直接import</li>
<li>混编：JS调用TS组件 [ ]</li>
<li>.d.ts 文件？[o]<br>
好像不影响</li>
<li>微信小游戏 [o]<br>
打包时有个bug，如果自带的hello world Scene没有删掉，可能会被设置为启动Scene，出现怪异事件。</li>
<li>Web/H5 [o]</li>
<li>Android [ ]</li>
<li>iOS [ ]</li>
<li>PC/Mac [ ]</li>
<li>(IDE) Sublime 语法提示 [ ]</li>
</ol>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->