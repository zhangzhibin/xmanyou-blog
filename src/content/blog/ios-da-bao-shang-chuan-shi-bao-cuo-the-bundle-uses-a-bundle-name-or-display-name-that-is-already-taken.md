---
title: "#Unity# iOS打包上传时报错 The bundle uses a bundle name or display name that is already taken"
description: "为什么有时候使用了明显没有冲突的App Name也会报错呢？"
pubDate: 2019-07-11T11:23:17.000Z
author: "阿斌"
tags: ["开发笔记", "Unity", "App Store"]
tagSlugs: ["dev", "unity", "app-store"]
draft: false
type: post
slug: "ios-da-bao-shang-chuan-shi-bao-cuo-the-bundle-uses-a-bundle-name-or-display-name-that-is-already-taken"
authorSlug: "dev"
---

<p></p><!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>最近在做一个相机类App，在正式上传之前，我们已经创建好bundle id，并把想好的名字提交到了苹果网站的itune connect。</p>
<p>但是，打包上传的时候，却报了这么个错误：</p>
<pre><code>The bundle uses a bundle name or display name that is already taken
</code></pre>
<p><img src="/content/images/2019/07/Snip20190711_11.png" alt="打包上传时报错 The bundle uses a bundle name or display name that is already taken"></p>
<h2 id="">原因</h2>
<p>为什么使用了一个已经创建好的App名字，依然会报错呢？</p>
<p>StackOverFlow上有个小哥也遇到了这个问题：<br>
<a href="https://stackoverflow.com/questions/46447268/error-while-validate-or-upload-on-app-store-the-bundle-uses-a-bundle-name-or-di?noredirect=1&amp;lq=1">Error while validate or upload on App Store “The bundle uses a bundle name or display name that is already taken”</a></p>
<p><img src="/content/images/2019/07/Snip20190711_12.png" alt="Error while validate or upload on App Store “The bundle uses a bundle name or display name that is already taken”"></p>
<p>这个小哥提到一个关键点：</p>
<blockquote>
<p>Actually IOS project generate by Unity OSX Mac Editor</p>
</blockquote>
<p>他的XCode工程是用Unity生成的。</p>
<p>小哥在评论里提到了另外一个关键点：<br>
<img src="/content/images/2019/07/Snip20190711_13.png" alt="Existing app threw error while validate or upload on App Store “The bundle uses a bundle name or display name that is already taken”"></p>
<blockquote>
<p>为了占住这个名字，他甚至已经提交过一个空白的工程。</p>
</blockquote>
<p>那么，还有什么可能呢？</p>
<p>看完这个小哥的悲惨遭遇，我又回到了google的搜索结果，发现简书上也有人提到这个问题：<br>
<img src="/content/images/2019/07/Snip20190711_14.png" alt="The bundle uses a bundle name or display name that is already taken"></p>
<p>打开一看，发现他的遭遇跟我的不一样，他因为</p>
<blockquote>
<p>使用了与之前上传的App的名字不一样的名字。</p>
</blockquote>
<p><img src="/content/images/2019/07/Snip20190711_19.png" alt="使用与之前上传的App不一样的名字"></p>
<p>但是，在评论里，有人提到了另一个方向：<br>
<img src="/content/images/2019/07/Snip20190711_15.png" alt="使用苹果内部App的名字会报错"></p>
<blockquote>
<p>排查发现有一个地方写的 Wallet，是与系统的App重复，但不是 bundle id</p>
</blockquote>
<p>于是，我赶紧回去看了一眼我的App：<br>
<img src="/content/images/2019/07/Snip20190711_18.png" alt="Unity自动将bundle id的最后一位作为product name"></p>
<p>原来<strong>Unity生成XCode工程时，自动使用bundle id的最后一段</strong>（比如这个例子中的com.xmanyou.camera中的camera) <strong>作为product name</strong></p>
<p><img src="/content/images/2019/07/Snip20190711_16.png" alt="product name与系统App冲突"></p>
<p>而<strong>XCode工程默认是使用产品名Product Name作为包名Bundle Name</strong>的：<br>
<img src="/content/images/2019/07/Snip20190711_20.png" alt="XCode默认使用Product Name作为Bundle Name"></p>
<p>显然，Camera是系统App的名字的可能性非常大。</p>
<h2 id="">解决方法</h2>
<p>在XCode工程的 Build Settings 中修改可能与系统App冲突的Product Name。</p>
<p><strong>注意</strong>，改完Product Name以后，记得检查你的Bundle Id是否被修改了，这个要与你要与你在iTunes Connect网站上建的一致。</p>
<h2 id="">参考</h2>
<ol>
<li><a href="https://stackoverflow.com/questions/24813726/invalid-binary-error-the-bundle-uses-a-bundle-name-or-display-name-associated-w">https://stackoverflow.com/questions/24813726/invalid-binary-error-the-bundle-uses-a-bundle-name-or-display-name-associated-w</a></li>
<li><a href="https://stackoverflow.com/questions/46447268/error-while-validate-or-upload-on-app-store-the-bundle-uses-a-bundle-name-or-di?noredirect=1&amp;lq=1">https://stackoverflow.com/questions/46447268/error-while-validate-or-upload-on-app-store-the-bundle-uses-a-bundle-name-or-di?noredirect=1&amp;lq=1</a></li>
<li><a href="https://www.jianshu.com/p/621e98b05244">https://www.jianshu.com/p/621e98b05244</a></li>
</ol>
<!--kg-card-end: markdown-->