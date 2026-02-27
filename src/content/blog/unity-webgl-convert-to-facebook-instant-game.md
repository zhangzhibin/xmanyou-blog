---
title: "#Unity 游戏一键打包 #Facebook小游戏 解决方案"
description: "自己动手打造一键打包工具"
pubDate: 2021-02-28T16:39:13.000Z
author: "阿斌"
tags: ["Unity", "facebook instant game", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["unity", "facebook-instant-game", "h5", "dev"]
draft: false
type: post
slug: "unity-webgl-convert-to-facebook-instant-game"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Unity官方H5小游戏方案Project Tiny迟迟不发，而且即使发布了，老游戏也没法直接迁移。</p>
<p>对于很多Unity项目，想要有更多的变现途径，比如接入Facebook小游戏平台，就需要自己动手了。</p>
<p>罢了罢了，我也是闲的和穷(不想用付费方案)，不死心地研究了一下Unity游戏转Facebook小游戏的可行性。</p>
<p>首先，很多人可能不知道，Untiy打包成WebGL代码时，可以选择一个模板，通过这个模板，可以自定义启动页面和最终的游戏包。</p>
<p>所以，我们可以为Facebook小游戏定制一个模板，实现一键将Unity游戏打包到Facebook小游戏平台。</p>
<p>具体参考文档：</p>
<p><a href="https://docs.unity3d.com/2020.2/Documentation/Manual/webgl-templates.html">https://docs.unity3d.com/2020.2/Documentation/Manual/webgl-templates.html</a></p>
<p>友提，本文介绍的方法，基于Unity 2020，但是别的版本也差不多。</p>
<h2 id="1facebook">1. 添加Facebook小游戏发布模板</h2>
<p>Unity提供了2个默认模板（Default和Minimal），都在Unity的安装目录下</p>
<blockquote>
<p><Unity Installation>/PlaybackEngines/WebGLSupport/BuildTools/WebGLTemplates/</p>
</blockquote>
<p><img src="/content/images/2021/03/1e06d487-d3e7-472a-957b-e7b3b5d0e21a.png" alt="1e06d487-d3e7-472a-957b-e7b3b5d0e21a"></p>
<p>我使用的是Default模板，因为这个模板的功能更完整。</p>
<p>把Default目录复制到项目的Assets/WebGLTemplates/&lt;自己的模板&gt;</p>
<p>假设模板目录为FacebookDefault，那么工程的Assets目录大概是这样子：</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-02.png" alt="unity-webgl-to-facebook-instant-game-02"></p>
<h2 id="2facebook">2. 适配Facebook小游戏平台</h2>
<p>默认模板，需要修改以下几个地方才能适配Facebook小游戏平台：</p>
<h3 id="21">2.1. 移除在移动设备上运行的警告</h3>
<p>在启动脚本index.html中，把以下这段注释掉，不然Unity在手机上运行时会弹出一个警告。</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-03.png" alt="unity-webgl-to-facebook-instant-game-03"></p>
<p>改成这样子</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-04.png" alt="unity-webgl-to-facebook-instant-game-04"></p>
<h3 id="22">2.2. 全屏显示</h3>
<p>把unity-container的class改成unity-mobile，这样Unity游戏会自动全屏，而且不显示额外的按钮和标题栏。</p>
<p>可以用代码修改，示例是用代码修改的。</p>
<pre><code>      // 改成unity-mobile，使之全屏显示，否则默认是横屏

      container.className = &quot;unity-mobile&quot;;
      config.devicePixelRatio = 1;
</code></pre>
<p>也可以直接去修改unity-container的class：</p>
<pre><code>&lt;div id=&quot;unity-container&quot; class=&quot;unity-mobile&quot;&gt;
...
&lt;/div&gt;
</code></pre>
<h3 id="23facebooksdk">2.3. 添加Facebook小游戏SDK的引用</h3>
<p>如果没有引用sdk，直接上传的话，会提示：Must Reference SDK via CDN</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-05.png" alt="unity-webgl-to-facebook-instant-game-05"></p>
<p>在index.html的前边，加入：</p>
<pre><code>&lt;script src=&quot;https://connect.facebook.net/en_US/fbinstant.6.3.js&quot;&gt;&lt;/script&gt;
</code></pre>
<p>像这样子：<br>
<img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-06.png" alt="unity-webgl-to-facebook-instant-game-06"></p>
<h3 id="24facebook">2.4. 添加Facebook启动代码</h3>
<h4 id="241unityfunction">2.4.1. 先将Unity的启动代码封装为一个function</h4>
<p>这是Unity的原始启动代码<br>
<img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-07.png" alt="unity-webgl-to-facebook-instant-game-07"></p>
<p>封装起来，留着后续调用<br>
<img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-08.png" alt="unity-webgl-to-facebook-instant-game-08"></p>
<pre><code>      // 把加载Unity游戏代码和素材的代码段提取到一个function中，便于后续调用
      function startUnity(){
        var script = document.createElement(&quot;script&quot;);
        script.src = loaderUrl;
        script.onload = () =&gt; {
          createUnityInstance(canvas, config, (progress) =&gt; {
            progressBarFull.style.width = 100 * progress + &quot;%&quot;;
          }).then((unityInstance) =&gt; {
            loadingBar.style.display = &quot;none&quot;;
            fullscreenButton.onclick = () =&gt; {
              unityInstance.SetFullscreen(1);
            };
          }).catch((message) =&gt; {
            // alert(message); // facebook 不允许alert
            console.error(&quot;Creating Unity Instance Failed: &quot;, message);
          });
        };
        document.body.appendChild(script);
      }
</code></pre>
<h4 id="242facebook">2.4.2. 添加Facebook启动代码</h4>
<p>Facebook小游戏启动时，必须先调用FBInstant.initializeAsync()，任何在这个方法之前的渲染操作，都会失败。</p>
<p>然后调用FBInstant.startGameAsync()，这个方法是通知Facebook，游戏已经开始了。</p>
<p>但是，实际上，游戏并没有真正开始，还需加载Unity游戏代码和相关的资源。</p>
<p>当然，完全也可以等Unity游戏完全加载完后，再调用FBInstant.startGameAsync()。</p>
<p>参考代码：<br>
<img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-09.png" alt="unity-webgl-to-facebook-instant-game-09"></p>
<pre><code>      // 启动 facebook初始化
      console.log(&quot;=====&gt; FBInstant.initializeAsync&quot;);
      FBInstant.initializeAsync()
        .then(function () {
          console.info(&quot;=====&gt; FBInstant.startGameAsync&quot;);
          // 告诉Facebook加载完毕，可以进入游戏了
          // 也可以在这里加载Unity游戏代码和资源，然后再加载完后再进入游戏         
          FBInstant.startGameAsync().then(function() {
            console.info(&quot;=====&gt; screen size: &quot; + `${screen.width} x ${screen.height}`);
            console.info(&quot;=====&gt; window size: &quot; + `${window.innerWidth} x ${window.innerHeight}`)

            // 开始加载Unity游戏代码和资源
            startUnity();
          });
        });

</code></pre>
<p>代码修改完毕，但是还没有完。</p>
<h3 id="25facebookfbappconfigjson">2.5. 添加Facebook的配置文件 fbapp-config.json</h3>
<p>这个文件是Facebook小游戏的配置文件，缺少的话，也是无法上传的。</p>
<p>在模板目录下添加一个文件，命名为 fbapp-config.json，定制内容的话，可以参考Facebook的文档。</p>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/bundle-config">https://developers.facebook.com/docs/games/instant-games/bundle-config</a></p>
</blockquote>
<p>以下是一个参考</p>
<pre><code>
{
  &quot;instant_games&quot;: {
    &quot;platform_version&quot;: &quot;RICH_GAMEPLAY&quot;,
    &quot;custom_update_templates&quot;: {
      &quot;play_turn&quot;: {
        &quot;example&quot;: &quot;Devon just finished his game and scored 999m&quot;
      },
      &quot;new_match&quot;: {
        &quot;example&quot;: &quot;Devon want to play with you&quot;
      }
    },
    &quot;navigation_menu_version&quot;:&quot;NAV_FLOATING&quot;
  }
}

</code></pre>
<p>然后就可以进行打包了</p>
<h2 id="3">3.打包</h2>
<h3 id="31webgl">3.1. 选择WebGL平台</h3>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-10.png" alt="unity-webgl-to-facebook-instant-game-10"></p>
<h3 id="32">3.2. 选择打包模板</h3>
<p>打开Player Settings，在WebGL Template中，选择刚刚配置好的FacebookDefault模板：</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-11.png" alt="unity-webgl-to-facebook-instant-game-11"></p>
<h3 id="33">3.3. 关闭压缩格式</h3>
<p>由于Unity的一个bug，浏览器无法正确解压Unity的WebGL包，所以需要关闭。</p>
<p>参考: <a href="https://xmanyou.com/unity2020-webgl-unity-framework-not-defined/">https://xmanyou.com/unity2020-webgl-unity-framework-not-defined/</a></p>
<p><img src="/content/images/2021/02/Unity2020-WebGL-unityFramework-is-not-defined-1.png" alt="Unity2020-WebGL-unityFramework-is-not-defined-1"></p>
<p>位置：Player Settings -&gt; Publishing Setings -&gt; Compress Format</p>
<p><img src="/content/images/2021/02/Unity2020-WebGL-unityFramework-is-not-defined-02-1.png" alt="Unity2020-WebGL-unityFramework-is-not-defined-02-1"></p>
<h2 id="4">4. 打包</h2>
<p>第一次打包比较慢，我电脑花了大概3分钟……</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-13.png" alt="unity-webgl-to-facebook-instant-game-13"></p>
<p>Unity 2020之后，如果项目没有什么大的修改的话，再次打包就快很多了。</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-14.png" alt="unity-webgl-to-facebook-instant-game-14"></p>
<p>看一下打包输出的目录，如果包含了fbapp-config.json，说明模板配置和选择是正确的。</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-15.png" alt="unity-webgl-to-facebook-instant-game-15"></p>
<p>然后可以准备上传测试了。</p>
<h2 id="5">5. 上传测试</h2>
<p>在Facebook小游戏后台，将打包出来的WebGL目录压缩成zip包上传。</p>
<p>上传成功后，推入Testing测试环境。</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-16.png" alt="unity-webgl-to-facebook-instant-game-16"></p>
<h2 id="6">6. 测试</h2>
<p>先在浏览器测试，看到这个熟悉的界面，就成功了50%。</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-17.png" alt="unity-webgl-to-facebook-instant-game-17"></p>
<p>看到游戏界面，成功了90%。</p>
<p>打开控制台，如果没有什么错误，并且日志正常，恭喜你成功了99%。</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-18.png" alt="unity-webgl-to-facebook-instant-game-18"></p>
<p>最后的1%，需要通过手机上的最终测试。<br>
<img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-19.jpg" alt="unity-webgl-to-facebook-instant-game-19"></p>
<h2 id="7">7. 后续工作</h2>
<h3 id="71">7.1. 优化游戏包</h3>
<p>如果没有进行裁剪，Unity的WebGL代码还是比较大</p>
<p><img src="/content/images/2021/02/unity-webgl-to-facebook-instant-game-20.png" alt="unity-webgl-to-facebook-instant-game-20"></p>
<h3 id="72">7.2. 美化游戏加载界面</h3>
<p>比如改掉Unity的启动logo和启动进度条。</p>
<h3 id="73facebook">7.3. 接入更多Facebook功能</h3>
<p>Facebook小游戏提供了很多功能，即使不接，也不影响游戏的正常运行。</p>
<p>但是，至少有一个是要接的，那就是：变现。</p>
<p>Facebook小游戏最主要的变现方式是：广告。</p>
<p>具体Unity如何调用Facebook小游戏的广告接口，可以参考文档：</p>
<p><a href="https://docs.unity3d.com/2020.2/Documentation/Manual/webgl-interactingwithbrowserscripting.html">https://docs.unity3d.com/2020.2/Documentation/Manual/webgl-interactingwithbrowserscripting.html</a></p>
<h2 id="8">8. 是否支持微信小游戏或者其他小游戏平台？</h2>
<p>通过自定义模板的方法（再加上强大的Unity插件功能），打包到微信小游戏或者抖音小游戏等平台，不是不可能，只是会很麻烦，甚至非常麻烦。</p>
<p>这是因为：</p>
<p>Facebook小游戏平台比较简单，可以运行几乎任何可以在浏览器运行的H5游戏。</p>
<p>微信小游戏和国内很多其他小游戏，基本上都是自己重新封装了一套js接口，导致很多接口没法使用，所以需要添加适配代码才可以。</p>
<p>Unity的代码是闭源的，导致想要写这么个适配器，难度大大增加。</p>
<p>当然了，除了写适配器之外，还有不少别的方法可以绕开这个限制，这个就不是本文想要讨论的方法了。</p>
<h2 id="9">9. 参考文献</h2>
<p>Unity WebGL开发指南</p>
<p><a href="https://docs.unity3d.com/2020.2/Documentation/Manual/webgl-gettingstarted.html">https://docs.unity3d.com/2020.2/Documentation/Manual/webgl-gettingstarted.html</a></p>
<p>Facebook小游戏开发指南</p>
<p><a href="https://developers.facebook.com/docs/games/instant-games/getting-started">https://developers.facebook.com/docs/games/instant-games/getting-started</a></p>
<h2 id="10">10. 广告时间</h2>
<p>手上有游戏的同学，想要上Facebook小游戏平台赚点美元的，可以联系我们：</p>
<p>微游互娱 <a href="https://www.minigame.vip">https://www.minigame.vip</a><br>
<img src="/content/images/2021/02/minigame.vip.png" alt="minigame.vip"></p>
<h2 id="11">11. 关注公众号获取源码</h2>
<p>关注公众号 <strong>耿直的IT男阿斌</strong>，后台回复 <strong>unity2fb</strong> 获取源码地址。</p>
<!--kg-card-end: markdown-->