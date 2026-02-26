---
title: "#sdkbox# 错误：Unable to resolve build file: XCBCore.BuildFile"
description: "SDKBox的示例工程打iOS包时报了一个奇怪的错误：Unable to resolve build file: XCBCore.BuildFile "
pubDate: 2019-07-03T01:20:28.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator", "sdkbox"]
tagSlugs: ["dev", "h5", "cocos-creator", "sdkbox"]
draft: false
type: post
slug: "sdkbox-build-error-unable-to-resolve-build-file-xcbcore-buildfile"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">环境</h2>
<p>使用SDKBox的CocosCreator例子工程，在XCode里打开工程，还未开始编译，立即报错：</p>
<pre><code>Showing Recent Messages
:-1: Unable to resolve build file: XCBCore.BuildFile (missingTargetProductReference(&quot;79d71ebbcc59a2e880640b6a34c1bdf59976d97c913f0f92a6528252dcadbc42&quot;)) (in target 'sdkbox-sample-ccc200-mobile')
</code></pre>
<p><img src="/images/2019/07/sdkbox_error.png" alt="sdkbox_error"></p>
<h2 id="">可能原因</h2>
<p><em>参考</em>：<a href="https://stackoverflow.com/questions/50708012/error-unable-to-resolve-build-file-xcbcore-buildfile">https://stackoverflow.com/questions/50708012/error-unable-to-resolve-build-file-xcbcore-buildfile</a></p>
<p>根据stackoverflow上的这个问题描述，可能是因为我在某种情况下无意中多次打开了同一个XCode工程。</p>
<h2 id="">解决方法</h2>
<ol>
<li>关闭所有的Cocos Creator项目</li>
<li>关闭所有XCode窗口</li>
<li>重新打开对于的XCode项目</li>
</ol>
<!--kg-card-end: markdown-->