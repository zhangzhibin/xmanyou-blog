---
title: "#Cocos Creator# TypeScript 如何使用 npm 模块？"
description: "重复造轮子是没有意义的，要怎么做才能使用npm的第三方库呢？"
pubDate: 2018-12-18T08:14:21.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator", "typescript"]
tagSlugs: ["dev", "h5", "cocos-creator", "typescript"]
draft: false
type: post
slug: "cocos-creator-typescript-xia-yin-yong-di-san-fang-nodeku"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>首先，参考一下官方关于第三方库的使用教程<br>
<a href="http://www.cocoscreator.com/docs/creator/scripting/third-party-module.html">http://www.cocoscreator.com/docs/creator/scripting/third-party-module.html</a></p>
<p>所以，以js-base64为例，步骤如下：</p>
<blockquote>
<p><a href="https://www.npmjs.com/package/js-base64">https://www.npmjs.com/package/js-base64</a></p>
</blockquote>
<ol>
<li>安装</li>
</ol>
<pre><code>$ npm install --save js-base64
</code></pre>
<p>别忘记下载 .d.ts</p>
<pre><code>$ npm install --save @types/js-base64
</code></pre>
<ol start="2">
<li>在代码里引用</li>
</ol>
<pre><code>var base64 = require('js-base64'); // 注意，这里不需要指定路径
</code></pre>
<p>但是，慢着，Typescript里已经用import取代require了，所以只直接用require会报错，无法编译。</p>
<p>这里，只需要改成这样既可：</p>
<pre><code>import { Base64 } from 'js-base64';
</code></pre>
<p><img src="/content/images/2018/12/Snipaste_2018-12-18_16-06-18.png" alt="Snipaste_2018-12-18_16-06-18"></p>
<p>特别注意 Cocos Creator官方的注意事项提醒：<br>
<img src="/content/images/2018/12/Snipaste_2018-12-18_16-08-38.png" alt="Snipaste_2018-12-18_16-08-38"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->