---
title: "Unity Project Tiny示例Tiny Racing初体验"
description: "Unity的H5方案Project Tiny的赛车游戏初体验。"
pubDate: 2019-12-25T05:25:51.000Z
author: "阿斌"
tags: ["开发笔记", "Unity", "Project Tiny", "h5 小游戏开发"]
tagSlugs: ["dev", "unity", "project-tiny", "h5"]
draft: false
type: post
slug: "unity-project-tiny-start-up"
image: "/images/2019/12/Unity_Project_Tiny_Racing_play-1.png"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">前情</h2>
<p>《用Unity发布H5小游戏还有多远？》<br>
<a href="https://mp.weixin.qq.com/s/s591Ndjgzh8iN6ap2xKeNg">https://mp.weixin.qq.com/s/s591Ndjgzh8iN6ap2xKeNg</a></p>
<p>近日，Unity官方发布了Project Tiny的最新进展，并公布了一个可玩的3D项目：Tiny Racing</p>
<p><img src="/images/2019/12/Unity_Tiny_Racing.jpg" alt="Unity_Tiny_Racing"></p>
<p>Unity官方微信公众号也发布了相应的文章</p>
<blockquote>
<p><a href="https://mp.weixin.qq.com/s/7jXmGcxdC2URa_5zuLzcCw">https://mp.weixin.qq.com/s/7jXmGcxdC2URa_5zuLzcCw</a></p>
</blockquote>
<p><img src="/images/2019/12/Unity_Project_Tiny_01.png" alt="Unity_Project_Tiny_01"></p>
<p>Unity官方论坛也发布相应的帖子</p>
<blockquote>
<p><a href="https://forum.unity.com/threads/project-tiny-fall-update-tiny-racing-preview-3-020-0-is-available.792999/">https://forum.unity.com/threads/project-tiny-fall-update-tiny-racing-preview-3-020-0-is-available.792999/</a></p>
</blockquote>
<p><img src="/images/2019/12/Unity_Project_Tiny_02.png" alt="Unity_Project_Tiny_02"></p>
<h2 id="tinyracing">Tiny Racing 初体验</h2>
<p>Tiny Racing是一个3D的赛车游戏，可以从Unity的网站上直接玩到。但是，作为开发者，我们更感兴趣的是，自己下载然后打包体验。</p>
<p>这里介绍一下打包的过程。</p>
<h3 id="1">1. 下载项目</h3>
<p>从github上下载：</p>
<blockquote>
<p><a href="https://github.com/Unity-Technologies/ProjectTinySamples">https://github.com/Unity-Technologies/ProjectTinySamples</a></p>
</blockquote>
<p>这个项目其实包含了2个Project Tiny的示例</p>
<ul>
<li>Tiny 3D 一个非常简单的3D场景演示</li>
<li>Tiny Racing 一个完整的赛车游戏项目</li>
</ul>
<h3 id="2unity20193">2. 下载Unity2019.3</h3>
<p>然后，需要下载Unity 2019.3才能打开。</p>
<p>现在Unity的下载都需要通过Unity Hub了，<strong>非常非常慢</strong>，非常不爽，但是也没有什么选择。</p>
<p><img src="/images/2019/12/Unity_Hub_2019.3.png" alt="Unity_Hub_2019.3"></p>
<h3 id="3">3. 打开工程</h3>
<p>该项目是用2019.3.1f写的，如果你下载的是最新的2019.3f，则提示需要先进行项目升级。然后就可以打开了。</p>
<p>哒哒~~~</p>
<p>咦，好像有什么不对？？？？</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_01.png" alt="Unity_Project_Tiny_Racing_01"></p>
<p>莫急，选中“DOTS Subscene”</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_02.png" alt="Unity_Project_Tiny_Racing_02"></p>
<p>选择“Edit”<br>
<img src="/images/2019/12/Unity_Project_Tiny_Racing_dots_subscene.png" alt="Unity_Project_Tiny_Racing_dots_subscene"></p>
<p>一切就正常啦</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_ready.png" alt="Unity_Project_Tiny_Racing_ready"></p>
<h3 id="4build">4. 打包Build</h3>
<p>DOTS工程的打包方式跟普通工程不一样，不能直接从“Files -&gt; Build Settings...”的打包菜单进行打包。</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Wrong_Build.png" alt="Unity_Project_Tiny_Wrong_Build"></p>
<p>而是需要从项目目录下的Build文件夹中，找到你要用的Build Settings文件</p>
<p>从Assets-&gt;Build选中高大上的Wasm，右边Inspector窗口会显示该打包选项：</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_build_settings.png" alt="Unity_Project_Tiny_Racing_build_settings"></p>
<ul>
<li>将右上角的Build And Run改成Build</li>
<li>然后把Dots Runtime Build Profile的Configuration设置为Release</li>
</ul>
<p>然后，点击 <strong>Build</strong> 按钮，开始漫长的<br>
打...<br>
包...<br>
过...<br>
程...</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_build_hang.png" alt="Unity_Project_Tiny_Racing_build_hang"></p>
<p>如果你的网络跟我一样不太好，那么，则可能出现仿佛好像永远都看不到结果的情况……</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Build_time.png" alt="Unity_Project_Tiny_Build_time"></p>
<p>最后，只好杀进程重来一遍。</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_build_hang_02.png" alt="Unity_Project_Tiny_Racing_build_hang_02"></p>
<p>如果你开启了稳定的科学上网方式，再加上一点点运气，你会可喜地看到进度条终于涨了！！！</p>
<p><img src="/images/2019/12/Unity_Project_Tiny_Racing_build_hang_03.png" alt="Unity_Project_Tiny_Racing_build_hang_03"></p>
<p>最后，控制台里出现一条日志：</p>
<pre><code>Build Wasm succeeded after 2.46m.
</code></pre>
<p><img src="/images/2019/12/Unity_Project_Tiny_Build_Done.png" alt="Unity_Project_Tiny_Build_Done"></p>
<p>恭喜你，完成了打包Project Tiny的成就！</p>
<h3 id="5">5. 打包结果</h3>
<p>看一眼打包输出的Wasm目录<br>
<img src="/images/2019/12/Unity_Project_Tiny_Racing_build_done.png" alt="Unity_Project_Tiny_Racing_build_done"></p>
<p>主要的文件有这些：</p>
<ul>
<li>TinyRacing.html</li>
<li>TinyRacing.js</li>
<li>TinyRacing.wasm</li>
<li>Data目录</li>
<li>TinyRacing.symbols</li>
</ul>
<p>整个目录大小是5.7M<br>
<img src="/images/2019/12/Unity_Project_Tiny_Racing_size.png" alt="Unity_Project_Tiny_Racing_size"></p>
<p>关键文件大小合计5M左右，压缩为Zip将近4M<br>
<img src="/images/2019/12/Unity_Project_Tiny_Racing_size2.png" alt="Unity_Project_Tiny_Racing_size2"></p>
<h3 id="6">6. 试玩</h3>
<p>Wasm项目必须在Web服务下才能正常预览，所以需要启动一个Web Server。</p>
<blockquote>
<p>参考《WASM 初体验: Hello, World》<br>
<a href="https://xmanyou.com/wasm-emsdk-mac-start-up/">https://xmanyou.com/wasm-emsdk-mac-start-up/</a></p>
</blockquote>
<p>电脑浏览器的截图：<br>
<img src="/images/2019/12/Unity_Project_Tiny_Racing_play.png" alt="Unity_Project_Tiny_Racing_play"></p>
<p>需要用手机来玩，如果用鼠标玩的话，由于一次只能操作一个按钮，所以基本没法玩……</p>
<p>试玩地址（如果遇到纹理没有加载，需要一点点耐心）<br>
<a href="http://xmanyou.com/games/TinyRacing/TinyRacing.html">http://xmanyou.com/games/TinyRacing/TinyRacing.html</a></p>
<h3 id="7tiny3d">7. Tiny3D项目</h3>
<p>这是一个非常简单的3D场景演示，如图：</p>
<p><img src="/images/2019/12/Unity_Project_Tiny3D_preview.png" alt="Unity_Project_Tiny3D_preview"></p>
<h3 id="8">8. 其他</h3>
<p>一些低端手机可能无法运行wasm的代码，需要改用Asmjs方式打包。</p>
<h2 id="">完</h2>
<!--kg-card-end: markdown-->