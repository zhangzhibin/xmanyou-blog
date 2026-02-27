---
title: "Laya如何发布Facebook小游戏简明教程"
description: "H5游戏出海赚美元咯~"
pubDate: 2020-07-01T04:07:08.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "laya"]
tagSlugs: ["dev", "h5", "laya"]
draft: false
type: post
slug: "laya-how-to-publish-to-facebook-instant-game"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="1">1. 官方文档</h2>
<ul>
<li>Facebook小游戏官方入门教程</li>
</ul>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/getting-started">https://developers.facebook.com/docs/games/instant-games/getting-started</a></p>
</blockquote>
<ul>
<li>SDK文档</li>
</ul>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3/">https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3/</a></p>
</blockquote>
<h2 id="2facebooksdk">2. 添加Facebook小游戏SDK引用</h2>
<p>在调用任何Facebook小游戏接口前，需要先添加SDK引用。</p>
<ul>
<li>SDK地址：<a href="https://connect.facebook.net/en_US/fbinstant.6.3.js">https://connect.facebook.net/en_US/fbinstant.6.3.js</a>  （6.3版本）</li>
<li>文件：&lt;项目&gt;/bin/index.html</li>
<li>修改：在index.js的引用前添加facebook sdk的引用</li>
<li>示例：</li>
</ul>
<pre><code>&lt;script src=&quot;https://connect.facebook.net/en_US/fbinstant.6.3.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;index.js&quot;&gt;&lt;/script&gt;
</code></pre>
<h2 id="3facebook">3. 初始化并启动Facebook小游戏</h2>
<p>按照Facebook小游戏的开发规范，在进行任何渲染以及Facebook小游戏绝大部分的其他接口之前，<br>
1). 必须先调用</p>
<ul>
<li>FBInstant.initializeAsync() 初始化Facebook小游戏环境</li>
</ul>
<p>2). 该方法成功之后，需要调用</p>
<ul>
<li>FBInstant.startGameAsync() 来启动游戏</li>
</ul>
<p>3). 还可以通过</p>
<ul>
<li>FBInstant.setLoadingProgress() 来告诉Facebook加载进度</li>
</ul>
<p>修改方法</p>
<ul>
<li>文件：游戏的入口文件，Laya 2.x的默认入口文件是 &lt;项目&gt;/src/Main.ts</li>
<li>示例：</li>
</ul>
<pre><code>try{
    // 初始化FB小游戏
    FBInstant.initializeAsync()
        .then(function () {
            // 告诉FB资源已经加载完毕
            FBInstant.setLoadingProgress(100);
            // 启动FB小游戏
            FBInstant.startGameAsync()
                .then(function () {
                    console.info(&quot;Success Load Scene&quot;);
                    fnMain();
                })
                .catch(function (e) {
                    console.error(&quot;Start Game Async failed: &quot;, e);
                });
        })
        .catch(function (e) {
            console.error(&quot;Fail to start, Error: &quot;, e);
        });
}catch (e) {
    console.error(&quot;Fail to init fb, Error: &quot;, e);
}
</code></pre>
<h2 id="4facebook">4. 在游戏逻辑中调用Facebook小游戏其他接口</h2>
<ul>
<li>添加fbinstant.d.ts到&lt;项目&gt;/libs<br>
这个文件可以从网上（比如github）找到。</li>
<li>通过FBInstant调用Facebook小游戏的接口<br>
开发文档：<a href="https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3/">https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.3/</a></li>
</ul>
<h2 id="5facebook">5. 打包发布facebook项目</h2>
<ul>
<li>第一步，添加捆绑包配置文件fbapp-config.json到 &lt;项目&gt;/bin/fbapp-config.json</li>
</ul>
<blockquote>
<p>Facebook小游戏捆绑包配置文档：<a href="https://developers.facebook.com/docs/games/instant-games/bundle-config">https://developers.facebook.com/docs/games/instant-games/bundle-config</a></p>
</blockquote>
<ul>
<li>其中最重要的字段是<br>
orientation 屏幕方向，可选值是：
<ul>
<li>竖屏 PORTRAIT</li>
<li>横屏 LANDSCAPE</li>
</ul>
</li>
<li>示例（从Cocos Creator中拿来的）</li>
</ul>
<pre><code>{
  &quot;instant_games&quot;: {
    &quot;platform_version&quot;: &quot;RICH_GAMEPLAY&quot;,
    &quot;navigation_menu_version&quot;: &quot;NAV_FLOATING&quot;,
    &quot;custom_update_templates&quot;: {
      &quot;play_turn&quot;: {
        &quot;example&quot;: &quot;Edgar played their move&quot;
      }
    },
    &quot;orientation&quot;: &quot;PORTRAIT&quot;
  }
}
</code></pre>
<ul>
<li>第二步，通过Laya IDE 正常发布Web项目</li>
</ul>
<blockquote>
<p>Laya 2.x 的发布地址是： &lt;项目&gt;/release/web</p>
</blockquote>
<ul>
<li>检查项
<ul>
<li>fbapp-config.json 是否存在</li>
<li>index.html 中是否有fbinstant.6.3.js的引用</li>
<li>js/bundle.js （Laya2.x）中是否包含了（步骤3中添加的）Facebook小游戏的启动代码</li>
</ul>
</li>
<li>压缩zip并上传到Facebook小游戏控制台</li>
</ul>
<h2 id="">完成</h2>
<!--kg-card-end: markdown-->