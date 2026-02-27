---
title: "Cocos Creator 接入百度小游戏的几个问题"
description: "一些不大不小但是有点烦人的问题，以及相应的对策。"
pubDate: 2019-11-29T07:36:42.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "baidu", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "baidu", "h5"]
draft: false
type: post
slug: "cocos-creator-baidu-smart-program-some-problems"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>测试版本：Cocos Creator 2.2.0</p>
<h2 id="1">问题1. 无法使用自定义的项目模板</h2>
<blockquote>
<p>参考Cocos 文档《定制项目构建流程》<br>
<a href="https://docs.cocos.com/creator/manual/zh/publish/custom-project-build-template.html">https://docs.cocos.com/creator/manual/zh/publish/custom-project-build-template.html</a></p>
</blockquote>
<p>如果想在游戏入口文件，比如main.js或者game.js，甚至其他json文件中添加自定义的代码或者设置，通常是参考这个文档，在build-templates中，创建对应的文件。Cocos Creator在打包时，会替换相同路径下的文件。</p>
<p>但是，对不起，百度小游戏不行。</p>
<h3 id="">解决方法</h3>
<ol>
<li>每次打包输出后，自己拷贝对应的文件。</li>
<li>写插件来自动拷贝，参考上边的文档。</li>
</ol>
<h2 id="2">问题2. 采用分包加载后，游戏无法启动</h2>
<blockquote>
<p>参考文档 《分包加载》<br>
<a href="https://docs.cocos.com/creator/manual/zh/scripting/subpackage.html">https://docs.cocos.com/creator/manual/zh/scripting/subpackage.html</a></p>
</blockquote>
<p>配置好分包以后，打包输出百度小游戏，可以看到subpackages被正常创建</p>
<p><img src="/content/images/2019/11/Cocos_Creator_subpackages.png" alt="Cocos_Creator_subpackages"></p>
<p>工具中测试也正常，但是，对不起，在真机上无法正常启动，也不报错，看日志应该是找不到分包中的资源。</p>
<h3 id="">解决方法</h3>
<p>在Cocos加载第一个场景前，先加载分包。可以修改百度小游戏入口文件main.js</p>
<p>把</p>
<pre><code>cc.game.run(option, onStart);
</code></pre>
<p>替换成</p>
<pre><code>    let packageName = &quot;GamePackage&quot;;
    const loadTask = swan.loadSubpackage({
        name: packageName, // 分包名字，对应 game.json 中的 name 字段
        success: function(res) {
            // 分包加载成功后通过 success 回调
            console.log(`分包[${packageName}]下载成功 :`, res);
            cc.game.run(option, onStart);
        },
        fail: function(res) {
            // 分包加载失败通过 fail 回调
            console.log(`分包[${packageName}]下载失败 :`, res);
        }
    });
</code></pre>
<!--kg-card-end: markdown-->