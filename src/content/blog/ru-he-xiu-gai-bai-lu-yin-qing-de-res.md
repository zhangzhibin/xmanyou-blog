---
title: "如何修改白鹭引擎的Res或者其他扩展库？"
description: "白鹭Egret引擎，最坏的一点是，它是开源项目，最好的一点是，它开源项目。\n\n修改引擎源码的原因，有非常多，其中最重要的是，你可以第一时间获得bug的修复或者新功能。\n\n那么，要怎么修改引擎代码呢？"
pubDate: 2018-04-13T13:34:04.000Z
author: "阿斌"
tags: ["开发笔记", "egret"]
tagSlugs: ["dev", "egret"]
draft: false
type: post
slug: "ru-he-xiu-gai-bai-lu-yin-qing-de-res"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>白鹭Egret引擎，最坏的一点是，它是开源项目，最好的一点是，它开源项目。</p>
<p>修改引擎源码的原因，有非常多，其中最重要的是，你可以第一时间获得bug的修复或者新功能。</p>
<p>那么，要怎么修改引擎代码呢？</p>
<h3 id="1">1. 首先，你得有代码。</h3>
<p>安装完白鹭egret以后，你就已经有egret的源码了，虽然不是全部。</p>
<p>官方的引擎代码库实际上可以分为3个部分：</p>
<ul>
<li>引擎核心代码</li>
<li>引擎内部扩展库</li>
<li>引擎外部扩展库</li>
</ul>
<h4 id="11">1.1.引擎核心代码及内部扩展库</h4>
<p>在命令行输入：egret info，可以得到当前使用的引擎版本和代码位置：<br>
<img src="/content/images/2018/04/Snip20180413_2.png" alt="Snip20180413_2"></p>
<p>这个目录里其实包含了两部分引擎代码：<br>
<img src="/content/images/2018/04/Snip20180413_6.png" alt="Snip20180413_6"></p>
<p>其中<br>
1 为核心代码<br>
2 为内部扩展库，比如eui, res等</p>
<h4 id="12">1.2. 外部扩展库</h4>
<p>而引擎外部扩展库，比如粒子系统，物理系统等，则在另外一个工程: egret-game-library。</p>
<blockquote>
<p><a href="https://github.com/egret-labs/egret-game-library">https://github.com/egret-labs/egret-game-library</a><br>
<img src="/content/images/2018/04/Snip20180413_7.png" alt="Snip20180413_7"></p>
</blockquote>
<h3 id="2">2. 然后，有代码以后就可以自己修改了。</h3>
<p>怎么修改，具体要看每个项目遇到的不同情况来处理。</p>
<p>原则是：</p>
<blockquote>
<p><strong>尽量不要改动已有的接口，多采用增加新接口的方式来修改引擎。</strong></p>
</blockquote>
<h3 id="3">3. 最后，修改完代码，你还需要进行打包编译，并引回自己的项目。</h3>
<p>针对引擎的不同部分代码，我们来一个个分解。</p>
<h4 id="31">3.1. 编译引擎核心代码</h4>
<p>修改引擎的核心代码后，在任意地方使用egret make命令就可以编译egret的核心代码了。</p>
<pre><code>egret make --egretversion 5.1.9
您正在使用白鹭编译器 5.1.9 版本
</code></pre>
<p>编译完后，需要使用以下命令，把修改后的引擎代码引回自己的项目。</p>
<pre><code>egret clean
</code></pre>
<h4 id="32">3.2. 编译引擎内置扩展库</h4>
<p>需要特别注意的是，</p>
<blockquote>
<p>虽然引擎的内部扩展库和引擎的核心代码在同一个项目里，但是，如果你需要改动引擎的内部扩展库，比如想把res的某个私有变量暴露出来，或者增加一个新的方法，只修改代码，然后执行egret make是不会自动编译的。</p>
<p>原因没什么好追究的，反正是白鹭引擎的一些设定。</p>
</blockquote>
<p><strong>那么，要怎么做呢？</strong></p>
<p>简单说，你需要像打包第三方库一样去做</p>
<blockquote>
<p>参考：官方的第三方库文档：<a href="http://edn.egret.com/cn/article/index/id/172">http://edn.egret.com/cn/article/index/id/172</a>)</p>
</blockquote>
<p>除了源码外，你还需要三件东西：<br>
1). *.d.ts 库描述文件<br>
2). tsconfig.json 编译配置文件<br>
3). package.json （拿5.1.9测试时，并没有发现这个文件的必要性）</p>
<p>值得一提的是：</p>
<blockquote>
<p>如果你以为这是<strong>官方</strong>的内部扩展库，我们不需要关心配置文件，只需要改代码，重新编译就完成了，那你就太天真了。</p>
<p>我本来以为官方的代码库应该是完整的，拿来就能用的，然而，实际上并不是。</p>
</blockquote>
<p>以最常用的Res库为例：</p>
<blockquote>
<p><a href="https://github.com/egret-labs/egret-core/tree/master/src/extension/resource">https://github.com/egret-labs/egret-core/tree/master/src/extension/resource</a></p>
</blockquote>
<p>你会发现，既没有*.d.ts，也没有tsconfig.json，更没有package.json<br>
<img src="/content/images/2018/04/Snip20180413_8.png" alt="Snip20180413_8"></p>
<p>好吧，那我们一个个来处理。</p>
<p><strong>1). tsconfig.json</strong></p>
<p>首先，还好别的地方有tsconfig.json可以参考，比如eui，或者assetsmanager，拿过来改巴改巴：</p>
<pre><code class="language-tsconfig.json">{
    &quot;compilerOptions&quot;: {
        &quot;target&quot;: &quot;es5&quot;,
        &quot;outFile&quot;: &quot;../../../build/res2/res2.js&quot;,
        &quot;declaration&quot;: true,
        &quot;noImplicitAny&quot;: false,
        &quot;stripInternal&quot;: true,
        &quot;allowUnreachableCode&quot;: true,
        &quot;experimentalDecorators&quot;: true,
        &quot;strictNullChecks&quot;: true,
        &quot;sourceMap&quot;: false,
        &quot;lib&quot;: [
            &quot;es5&quot;,
            &quot;dom&quot;,
            &quot;es2015.promise&quot;
        ]
    },
    &quot;include&quot;: [
        &quot;**/**.ts&quot;,
        &quot;*.ts&quot;,
        &quot;../../../build/egret/egret.d.ts&quot;,
        &quot;../../../build/game/game.d.ts&quot;
    ]
}
</code></pre>
<p>这个配置文件，将打包一个我们自己的res库，名字叫res2</p>
<p>*<em>2). <em>.d.ts</em></em></p>
<p>至于*.d.ts，可以用egret自带的那个res.d.ts，改成 res2.d.ts</p>
<blockquote>
<p>这个文件必须跟库名相同，否则无法自动引用回项目目录，不要问什么</p>
</blockquote>
<p>保存到<egret>/build/res2/res2.d.ts</p>
<p><strong>3). package.json</strong><br>
这个文件似乎用不到。</p>
<h4 id="">万事俱备，就等编译。</h4>
<p>1). 然后到res库的目录， <egret>/src/extension/resource，执行命令</p>
<pre><code>egret build
</code></pre>
<p>你会看到很多错误，不过没关系。<br>
<img src="/content/images/2018/04/Snip20180413_11.png" alt="Snip20180413_11"></p>
<p>眨眼之间，我们需要的js文件已经编译好了：<br>
<egret>/build/res2</p>
<p>2). 现在，到项目目录下，修改 egretProperties.json，把res改为res2<br>
<img src="/content/images/2018/04/Snip20180413_9.png" alt="Snip20180413_9"></p>
<p>3). 编译游戏工程<br>
执行</p>
<pre><code>egret -e build
</code></pre>
<p>即可引入新的res库并编译<br>
<img src="/content/images/2018/04/Snip20180413_10.png" alt="Snip20180413_10"></p>
<h4 id="3">3. 编译引擎外部扩展库</h4>
<p>参考官方的第三方库文档：<a href="http://edn.egret.com/cn/article/index/id/172">http://edn.egret.com/cn/article/index/id/172</a><br>
github上引擎的外部扩展库都是完整的，直接参考官方文档照做就好了。</p>
<blockquote>
<p>最后<br>
白鹭团队做了很多事情，但是中国的环境下，生存压力巨大，他们毕竟不是神，没法面面俱到，有些事情我们能做的就自己做吧。</p>
</blockquote>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->