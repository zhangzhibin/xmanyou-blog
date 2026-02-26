---
title: "#Unity 2020 H5游戏加载失败"
description: "直接默认选项打包都能出错，你说奇怪不奇怪?"
pubDate: 2021-02-26T15:56:11.000Z
author: "阿斌"
tags: ["Unity", "h5 小游戏开发"]
tagSlugs: ["unity", "h5"]
draft: false
type: post
slug: "unity2020-webgl-unity-framework-not-defined"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>使用Unity 2020，使用默认选项，打包成WebGL游戏，也就是H5游戏，结果游戏启动时报错了，然后卡住了：</p>
<p><img src="/images/2021/02/Unity2020-WebGL-unityFramework-is-not-defined.png" alt="Unity2020-WebGL-unityFramework-is-not-defined"></p>
<p>报错：</p>
<pre><code>Invalid or unexpected token

unityFramework is not defined
</code></pre>
<h1 id="">解决方法</h1>
<p>经过一番搜索，原来是个bug……</p>
<blockquote>
<p><a href="https://forum.unity.com/threads/uncaught-referenceerror-unityframework-is-not-defined-at-htmlscriptelement-script-onload-webgl.803967/">https://forum.unity.com/threads/uncaught-referenceerror-unityframework-is-not-defined-at-htmlscriptelement-script-onload-webgl.803967/</a></p>
</blockquote>
<p><img src="/images/2021/02/Unity2020-WebGL-unityFramework-is-not-defined-03.png" alt="Unity2020-WebGL-unityFramework-is-not-defined-03"></p>
<p>解决方法就是打包的时候不要压缩：</p>
<p><img src="/images/2021/02/Unity2020-WebGL-unityFramework-is-not-defined-02.png" alt="Unity2020-WebGL-unityFramework-is-not-defined-02"></p>
<!--kg-card-end: markdown-->