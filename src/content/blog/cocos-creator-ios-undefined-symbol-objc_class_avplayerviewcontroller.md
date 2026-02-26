---
title: "Cocos Creator打包报错：\nUndefined symbol: _OBJC_CLASS_$_AVPlayerViewController"
description: "旧工程升级CocosCreator以后打包时出现了奇怪的错误。"
pubDate: 2019-11-07T06:18:52.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "xcode", "ios"]
tagSlugs: ["dev", "cocos-creator", "xcode", "ios"]
draft: false
type: post
slug: "cocos-creator-ios-undefined-symbol-objc_class_avplayerviewcontroller"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Cocos Creator从2.0.9升级到 2.2.0以后，旧工程打iOS包时，居然报错了：</p>
<pre><code>Undefined symbol: _OBJC_CLASS_$_AVPlayerViewController
</code></pre>
<p><img src="/images/2019/11/Undefined_symbol_-_OBJC_CLASS_-_AVPlayerViewController_01.png" alt="Undefined_symbol_-OBJC_CLASS-_AVPlayerViewController_01"></p>
<h2 id="">解决方法</h2>
<p>上网搜了一下这个符号：<em>OBJC_CLASS</em>$_AVPlayerViewController</p>
<p>发现是跟视频播放有关系，AVPlayerViewController</p>
<p>需要添加 AVKit.framework</p>
<p><img src="/images/2019/11/Undefined_symbol_-_OBJC_CLASS_-_AVPlayerViewController_Add_AVKit_02.png" alt="Undefined_symbol_-OBJC_CLASS-_AVPlayerViewController_Add_AVKit_02"></p>
<p>搞定。</p>
<h2 id="">注意</h2>
<p>如果在Cocos Creator的工程配置中，去掉VideoPlayer模块，并不管用。</p>
<p>也许是要重新生成XCode工程，但是我的XCode工程已经添加了不少自己的内容，就不想重新生成了。</p>
<p><img src="/images/2019/11/CocosCreator_project_settings_remove_modules.png" alt="CocosCreator_project_settings_remove_modules"></p>
<!--kg-card-end: markdown-->