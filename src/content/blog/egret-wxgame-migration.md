---
title: "白鹭H5游戏移植到微信小游戏笔记"
description: "用白鹭引擎5.0.4开发的H5项目迁移到微信小游戏的经验总结"
pubDate: 2018-04-27T14:56:50.000Z
author: "阿斌"
tags: ["开发笔记", "egret", "h5 小游戏开发", "微信小游戏"]
tagSlugs: ["dev", "egret", "h5", "wxgame"]
draft: false
type: post
slug: "egret-wxgame-migration"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>我们有个H5项目之前是用白鹭5.0.4开发的，最近花了一些时间进行了迁移工作。以下是整理的一些笔记。</p>
<p>最有用的资源应该算是白鹭的官方FAQ，不过还是有点太言简意赅了，对一些底层机制介绍的太少。</p>
<blockquote>
<p><a href="http://developer.egret.com/cn/github/egret-docs/Engine2D/minigame/minigameFAQ/index.html">http://developer.egret.com/cn/github/egret-docs/Engine2D/minigame/minigameFAQ/index.html</a></p>
</blockquote>
<p>移植的步骤大概可以分为以下几步<br>
1.前期准备<br>
2.项目迁移<br>
3.真机调试<br>
4.Bug与优化<br>
5.发布<br>
6.接入更多小游戏功能</p>
<h3 id="">前期准备</h3>
<p>1). 下载最新的EgretLauncher，并升级白鹭引擎到最新的5.1.x<br>
2). 安装最新的微信开发者工具<br>
3). 为了减少麻烦，申请一个正式的小游戏AppID（测试id有时候会莫名失败）</p>
<blockquote>
<p><a href="https://mp.weixin.qq.com/">https://mp.weixin.qq.com/</a></p>
</blockquote>
<p>4). 由于5.0.x工程无法直接升级到5.1.x，需要创建一个新项目，假设工程名为wxgame2（我的第二个测试工程）<br>
5). 通过Egret Launcher发布出微信小游戏工程目录，默认位置为与h5工程所在目录，工程目录名&lt;h5_project&gt;_wxgame</p>
<p>这里就是 wxgame2_wxgame了。</p>
<p><img src="/images/2018/04/72831020.png" alt="72831020"></p>
<p>6). 通过微信开发者工具打开这个工程，正常应该可以看到白鹭的helloworld页面</p>
<p><img src="/images/2018/04/73347189.png" alt="73347189"></p>
<p>至此，准备工作完成，下一步进行正式项目迁移。</p>
<h3 id="">项目迁移</h3>
<p>1). 拷贝旧项目代码及资源到新项目中<br>
2). 编译试运行</p>
<pre><code>egret build --target wxgame
</code></pre>
<blockquote>
<p>除非你的项目跟helloworld一样简单，通常来说，都会报一堆的错误，来一个个解决。</p>
</blockquote>
<p>3). 第三方库<br>
3.1).下载项目所需的最新的第三方库，包括白鹭自带的第三方库，比如物理引擎 physics，粒子系统 particle</p>
<blockquote>
<p><a href="https://github.com/egret-labs/egret-game-library">https://github.com/egret-labs/egret-game-library</a></p>
</blockquote>
<p>3.2).将第三方库的模块注册到window变量下，打开 <project>/wxgame/wxgame.ts<br>
找到async onFile(file: plugins.File) 方法，模仿别的库的方法，将particle挂到window下</p>
<p><img src="/images/2018/04/73771533.png" alt="73771533"></p>
<p>3.3). 我测试的时候，发现物理引擎库p2按照3.2)的方式添加有问题，所以，我换了一种方式。直接打开physics.js和physisc.min.js，修改如下：</p>
<p>(physics.js)</p>
<p><img src="/images/2018/04/74137565.png" alt="74137565"></p>
<p>(physics.min.js)</p>
<p><img src="/images/2018/04/74189850.png" alt="74189850"></p>
<p>3.4). 如果你需要解析xml，比如tiledmap文件，则需要引入xmldom库：<br>
下载地址：</p>
<blockquote>
<p><a href="http://developer.egret.com/cn/github/egret-docs/Engine2D/minigame/minigameFAQ/xmldom.zip">http://developer.egret.com/cn/github/egret-docs/Engine2D/minigame/minigameFAQ/xmldom.zip</a></p>
</blockquote>
<p>放到 小游戏项目 (_wxgame) 的根目录下，不要放到js或者libs目录，打包的时候会被清空：</p>
<p><img src="/images/2018/04/74355217.png" alt="74355217"></p>
<p>3.5). 将 xml 库挂到window上，可以修改小游戏项目的&lt;project_wxgame&gt;/game.js文件，egret.runEgret之前添加：</p>
<p><img src="/images/2018/04/74472670.png" alt="74472670"></p>
<p>3.6). 如果你还用到了其他的第三方库，注意两点：<br>
a). 如果是白鹭的，更新到最新<br>
b). 然后，添加到window上。（参考以上3种添加方式）</p>
<p>4). 新项目默认用assetsmanager，如果用不惯，或者跟我一样遇到api调用错误，修改<strong>egretProperties.json</strong>，把assetsmanager改回res</p>
<p><img src="/images/2018/04/74682346.png" alt="74682346"></p>
<p>5). 如果你用白鹭的eui，那么，请注意，</p>
<p><strong>小游戏中不支持从外部加载exml的方式</strong>。</p>
<p>具体原因，大概是因为eui库使用了动态生成代码的技术，而这是小游戏所不允许的。</p>
<p>要发布到小游戏，eui必须用<strong>commonjs</strong>的方式发布，不过，新生成的工程默认已经是这个选项了，并不需要改动什么的。</p>
<p>查看 &lt;h5_project&gt;/scripts/config.wxgame.ts 文件</p>
<p><img src="/images/2018/04/74968628.png" alt="74968628"></p>
<p>所以，每次你修改exml文件，都需要重新编译成小游戏项目。</p>
<pre><code>egret build --target wxgame
</code></pre>
<p>生成的js文件会自动拷贝到 &lt;project_wxgame&gt;/js/下，并在manifest.js中引用</p>
<p><img src="/images/2018/04/75095787.png" alt="75095787"></p>
<blockquote>
<p>由于种种原因，你所用到的.thm.json文件和skins文件，最好都放在resource目录，并在egretProperties.json中正确配置。</p>
</blockquote>
<blockquote>
<p>另外，不要尝试直接或者间接使用exml文件，由于eui的实现机制已经被小游戏禁用了，目前这条路走不通。非要用的话，得自己去解析并构建界面。</p>
</blockquote>
<p>6). 如果用到自定义组件，可能需要手动挂到window下。</p>
<p>比如我自己写了一个WxHelper.ts文件，里边放了一个RegisterGlobalClasses方法，用来注册一些自定义组件和外部</p>
<p><img src="/images/2018/04/76059066.png" alt="76059066"></p>
<p>然后在这个组件被使用之前，调用这个方法。比如，Main.ts里。</p>
<p>7). 手动拷贝resource目录外的资源到小游戏工程。<br>
egret build或者publish只会帮你处理resource目录下的资源，所以，如果你跟我一样，有些资源是自己管理的，则需要手动拷贝到小游戏工程目录下。</p>
<p><img src="/images/2018/04/75591091.png" alt="75591091"></p>
<p>8). 资源配置文件 (默认default.res.json) 暂时可以不改。<br>
9). 现在，应该可以在微信开发者工具里编译调试项目了。</p>
<h3 id="">真机调试</h3>
<p>如果在微信开发者工具调试没问题，可以尝试到真机进行调试。</p>
<p>在开发者工具中，点击“<strong>预览</strong>”，项目会被打包上传到微信后台。如果你的项目比较小，那么顺利的话，应该是这样子：</p>
<p><img src="/images/2018/04/76347541.png" alt="76347541"></p>
<p>不过，实际上，大部分时候，你会看到另一个错误：</p>
<p><img src="/images/2018/04/76459037.png" alt="76459037"></p>
<p>这是因为，开发者工具会把整个工程含资源打包上传。一般来说，除非你的游戏非常小，否则都会超过4M的上限。</p>
<p>所以，要进行真机调试，最重要的步骤是，把资源从项目里分离出来，放到外部服务器，然后在游戏启动后，去动态加载。</p>
<p>步骤如下：<br>
1). 将资源分组，启动组和动态组，其中启动组中包含游戏启动时必须的资源，而动态组，则是后期动态加载的资源。<br>
2). 将动态组的资源从小游戏项目中删除<br>
3). 修改资源配置文件(默认是default.res.json)，添加启动组的配置项<br>
4). 修改代码动态加载动态组的资源<br>
5). 将动态组的资源放到外部服务器上<br>
6). 将外部服务器配置到小游戏后台，配置完毕后，你可以在微信开发者工具的“详情”中看到</p>
<p><img src="/images/2018/04/76992767.png" alt="76992767"></p>
<p>需要注意的是，如果你的服务器没用https并且域名没有备案，则在真机调试时，需要开启“不校验https证书”等选项</p>
<p><img src="/images/2018/04/77099937.png" alt="77099937"></p>
<p>并在游戏里打开调试模式：</p>
<p><img src="/images/2018/04/77289846.png" alt="77289846"></p>
<p>7). 资源分好后，再次尝试“预览”，这个时候，上传的包还有可能超过4M，但是只差个几K就可以了。</p>
<p>这是因为，我们用egret build命令时，所有代码都是没有压缩的，并且包含大量的注释，其中白鹭引擎的代码就已经将近3M了，留给我们的代码空间比较小。</p>
<p>如果差的不是很多，你可以尝试以下方法：</p>
<p>a). 删掉没用的ts文件，比如一些没用到的类<br>
b). 去掉大段的注释，比如一些没用到的方法，旧的实现，等等<br>
如果这时候还超，就需要用publish的方式来重新编译项目，这时候，代码会被压缩，一般就不会超4M了。<br>
如果publish还超，说明你的代码量超过4M，已经不是小游戏范畴了……</p>
<p>8). 外部资源的加载<br>
这时候如果去真机上“预览”，通常都会出现很多资源找不到的错误，为什么呢？</p>
<p>原因是，动态资源被放到外部服务器了，但是资源配置文件(default.res.json)中的路径还是指向本地路径。有两个方法：</p>
<p>a). 可以通过修改配置文件，把外部资源的url都带上服务器地址<br>
这样带来一些问题：<br>
一是要改的地方可能会比较多。<br>
二是每次更换服务器，都要改配置文件。</p>
<p>b). 不修改配置文件，而是在代码里，对外部资源的url自动添加服务器地址。<br>
这样的好处是显而易见，调试和管理上都简单很多。<br>
不过，引擎自带的Resource库默认并没有暴露出足够的接口，让我们可以比较方便的去做。所以需要修改引擎代码将所需的接口暴露出来，然后在代码动态添加服务器地址。</p>
<p>9). 走到这一步，差不多应该可以顺利在手机上预览游戏了。</p>
<p>提示，如果要给其他人预览未发布的游戏，则需要在小游戏后台将他们的微信号加入到测试列表里。</p>
<h3 id="bug">BUG与优化</h3>
<h4 id="1">1). 音频</h4>
<p>1.1). bug：真机丢声音</p>
<p>白鹭自带的音频库，在微信小游戏真机上会出现丢音效和背景音的问题，需要改用微信自带的音频库<br>
参考官方文档：</p>
<blockquote>
<p><a href="https://developers.weixin.qq.com/minigame/dev/tutorial/ability/audio.html">https://developers.weixin.qq.com/minigame/dev/tutorial/ability/audio.html</a></p>
</blockquote>
<p>1.2). bug: 真机切后台后，背景音中断</p>
<p>这个严格来说不是bug，而是小游戏的设定。官方文档中写的很清楚，游戏切后台，或者被系统打断时，音频会自动中断，开发者需要自行处理恢复音频的播放。</p>
<p>简单来说，需要在以下两个方法里判定是否需要恢复声音的播放：</p>
<p><img src="/images/2018/04/77887674.png" alt="77887674"></p>
<p>1.3). 修改微信小游戏相关的问题的代码量本来不多，但是由于在ts里直接调用微信的api，如wx.onShow等，会出现编译错误，因为编译器找不到wx库。</p>
<p>要解决编译时的问题，需要添加一个wx api的描述文件，也就是通常所说的 .d.ts文件。</p>
<p>这个文件可以从网上找，github上挺多的。如果你需要调用的api比较少，也可以自己写一个，只考虑音频的话，wxgame.d.ts只需要以下几行：</p>
<p><img src="/images/2018/04/78146697.png" alt="78146697"></p>
<h4 id="2">2). 像素游戏不像素</h4>
<p>如果你开发的是像素游戏，需要在游戏里设置</p>
<pre><code>egret.Bitmap.defaultSmoothing = false。
</code></pre>
<p>正常效果应该是这样：</p>
<p><img src="/images/2018/04/79478079.png" alt="79478079"></p>
<p>然而，如果你开启了滤镜（比如发光滤镜）或者遮罩，会发现，图像变模糊了。</p>
<p><img src="/images/2018/04/79493771.png" alt="79493771"></p>
<p>这是引擎的一个bug，需要修改引擎的渲染代码，H5是<strong>egret.web.js</strong>或者<strong>WebGLRenderContext.ts</strong></p>
<p><img src="/images/2018/04/79664072.png" alt="79664072"></p>
<p>以及小游戏的渲染代码**&lt;project_wxgame&gt;/egret.wxgame.js** 中的方法：</p>
<pre><code>WebGLRenderContext.prototype.drawTextureElements
</code></pre>
<p><img src="/images/2018/04/79757024.png" alt="79757024"></p>
<h4 id="3">3). 资源缓存</h4>
<p>通过现在的动态加载资源的方法有个很大的弊端，每次游戏重新开启，这些资源都需要重新加载，如果资源比较多，则会导致游戏加载比较慢，所以开启本地缓存是很重要的。这个需要调用小游戏的相关接口来实现。</p>
<h3 id="release">Release模式（发布模式）</h3>
<p>需要注意的，在以上过程中，我们的项目一直都是处于Debug模式，如果要切换到Release模式，则需要用egret publish --target wxgame的命令。</p>
<p>小游戏的发布与H5项目的发布，并没有不同。首先，我们要了解的是Release模式与Debug模式的不同之处：<br>
a). 资源<br>
资源publish以后，需要重新上传到服务器上。<br>
b). 代码<br>
代码在publish过程中会被压缩。</p>
<p>对于小游戏来说，影响最大的，应该是资源的缓存问题。由于缓存空间有限（50M），哪些资源需要缓存，怎样缓存与更新，都是需要小心设计的。</p>
<h3 id="">最后，接入更多小游戏功能。</h3>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->