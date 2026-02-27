---
title: "#sdkbox# 错误 FATAL: unsupported cocos2d-x major version:unknown"
description: "怎样正确使用sdkbox命令行"
pubDate: 2019-08-13T16:16:31.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "sdkbox", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "sdkbox", "h5"]
draft: false
type: post
slug: "sdkbox-fatal-unsupported-cocos2d-x-major-version-unknown"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>手动从命令行导入sdkbox插件，提示错误：</p>
<pre><code>#FATAL: unsupported cocos2d-x major version:unknown
</code></pre>
<p><img src="/content/images/2019/08/sdkbox_unsupported_cocos2d-x_major_version_unknown.png" alt="sdkbox_unsupported_cocos2d-x_major_version_unknown"></p>
<h2 id="">原因</h2>
<p>因为执行sdkbox命令的路径不对。</p>
<h2 id="">解决方法</h2>
<p>到 build/jsb-link目录下执行。</p>
<h2 id="">参考</h2>
<p><a href="http://www.sdkbox.com/answers/question/fatal-unsupported-cocos2d-x-major-version/">http://www.sdkbox.com/answers/question/fatal-unsupported-cocos2d-x-major-version/</a><br>
<img src="/content/images/2019/08/sdkbox_unsupported_cocos2d-x_major_version_unknown_02.png" alt="sdkbox_unsupported_cocos2d-x_major_version_unknown_02"></p>
<!--kg-card-end: markdown-->