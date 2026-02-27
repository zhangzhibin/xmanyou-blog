---
title: "#Android 添加穿山甲sdk后报错： unexpected element <queries> found in <manifest>"
description: "祖传项目加入新SDK出现了奇怪的问题"
pubDate: 2021-04-02T06:22:18.000Z
author: "阿斌"
tags: ["android", "开发笔记"]
tagSlugs: ["android", "dev"]
draft: false
type: post
slug: "android-pangle-sdk-unexpected-element-queries-found-in-manifest"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>最近一个老的安卓项目需要接入穿山甲广告SDK，按照文档，引入了SDK库以后，居然就报错了：</p>
<pre><code>Execution failed for task ':app:processDebugResources'.
&gt; Android resource linking failed
  Output:  .../android_studio/app/build/intermediates/merged_manifests/debug/processDebugManifest/merged/AndroidManifest.xml:39: error: unexpected element &lt;queries&gt; found in &lt;manifest&gt;.
</code></pre>
<p><img src="/content/images/2021/04/android_studio_unexpected_queries_found_in_manifest_01.png" alt="android_studio_unexpected_queries_found_in_manifest_01"></p>
<p>根据提示，报错的位置是AndroidManifest.xml文件第39行，应该有一个无法识别的queries元素。</p>
<p>但是，却怎么也没有找到！</p>
<p><img src="/content/images/2021/04/android_studio_unexpected_queries_found_in_manifest_02.png" alt="android_studio_unexpected_queries_found_in_manifest_02"></p>
<p>这是怎么回事呢？</p>
<h1 id="">解决方法</h1>
<p>于是上google搜索。</p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/62969917/how-to-fix-unexpected-element-queries-found-in-manifest-error">https://stackoverflow.com/questions/62969917/how-to-fix-unexpected-element-queries-found-in-manifest-error</a></p>
</blockquote>
<p>根据stackoverflow上的说法，这个是因为引用的库的AndroidManifest.xml包含了这个无法识别的元素。</p>
<p>仔细看错误描述的话，确实说的是merged合并后的文件的第39行，而不是项目的原文件。</p>
<p>而解决方法是，升级gralde到能识别queries元素的版本，比如：</p>
<ul>
<li>3.3.3</li>
<li>3.4.3</li>
<li>3.5.4</li>
<li>3.6.4</li>
<li>4.0.1</li>
</ul>
<p>如果是4.1以上版本的话，已经能识别这个元素，不需要升级。</p>
<p>我看了一下，祖传项目里用的还是gradle 3.2.0</p>
<p><img src="/content/images/2021/04/android_studio_unexpected_queries_found_in_manifest_03.png" alt="android_studio_unexpected_queries_found_in_manifest_03"></p>
<p>于是升级到最近的3.3.3</p>
<p><img src="/content/images/2021/04/android_studio_unexpected_queries_found_in_manifest_05.png" alt="android_studio_unexpected_queries_found_in_manifest_05"></p>
<p>重新编译，成功~</p>
<p><img src="/content/images/2021/04/android_studio_unexpected_queries_found_in_manifest_04.png" alt="android_studio_unexpected_queries_found_in_manifest_04"></p>
<!--kg-card-end: markdown-->