---
title: "#鸿蒙 在鸿蒙设备上开发Unity游戏的方法"
description: "对于很多没有提供原生支持的游戏引擎，WebView提供了曲线救国的方案。"
pubDate: 2021-07-05T15:20:14.000Z
author: "阿斌"
tags: ["鸿蒙", "Unity"]
tagSlugs: ["hong-meng", "unity"]
draft: false
type: post
slug: "run-unity-game-on-harmony-device-by-webview"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>上一次测试了Cocos直接打包鸿蒙应用，体验极度舒适。</p>
<blockquote>
<p>《用DevEco 2.2远程真机调试+Cocos Creator 3.2开发一个鸿蒙游戏》<br>
<a href="https://xmanyou.com/build-a-harmony-game-with-cocos-creator-and-run-on-remote-device/">https://xmanyou.com/build-a-harmony-game-with-cocos-creator-and-run-on-remote-device/</a></p>
</blockquote>
<p>但是，对于Cocos之外的其他游戏引擎使用者，例如Laya，例如Egret，特别是Unity，有什么办法可以在鸿蒙上开发游戏呢？</p>
<p>由于这些引擎的底层与Cocos不同，不能直接用Cocos的代码，所以在这些引擎为鸿蒙提供原生支持之前，我们需要一个曲线救国的方法。</p>
<p>于是乎，我想到了：Webview。</p>
<blockquote>
<p>官方文档<br>
<a href="https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ui-java-component-webview-0000001092715158">https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ui-java-component-webview-0000001092715158</a></p>
</blockquote>
<p>实际效果：<br>
<img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-01.png" alt="run-unity-game-on-harmony-device-by-webview-01"></p>
<h2 id="webviewunity">使用Webview在鸿蒙设备上运行Unity游戏需要几个步骤？</h2>
<h3 id="1">1. 创建鸿蒙全屏工程</h3>
<p>在DevEco中创建一个新工程，模板选择Full Screen Ability。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-02.png" alt="run-unity-game-on-harmony-device-by-webview-02"></p>
<h3 id="2webview">2. 添加Webview</h3>
<p>这个工程的布局很简单，就是一个全屏的image组件，把image组件替换成webview即可。</p>
<h4 id="21layoutimagewebview">2.1. 将模板layout中的image组件替换成webview</h4>
<pre><code>    &lt;ohos.agp.components.webengine.WebView
        ohos:id=&quot;$+id:webview&quot;
        ohos:height=&quot;match_parent&quot;
        ohos:width=&quot;match_parent&quot;&gt;
    &lt;/ohos.agp.components.webengine.WebView&gt;
</code></pre>
<p><strong>注意</strong><br>
该模板提供了2个layout，land_main是横屏，port_main是竖屏，根据需要或者直接都替换掉。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-03.png" alt="run-unity-game-on-harmony-device-by-webview-03"></p>
<h4 id="22webviewurl">2.2. 初始化webview，并加载url</h4>
<p>在MainAbilitySlice中，添加方法initWebview</p>
<pre><code>    // 初始化webview，并加载url
    private void initWebview(){
        WebView webView = (WebView) findComponentById(ResourceTable.Id_webview);
        webView.getWebConfig().setJavaScriptPermit(true);  // 如果网页需要使用JavaScript，增加此行；如何使用JavaScript下文有详细介绍
        final String url = EXAMPLE_URL; // EXAMPLE_URL由开发者自定义
        webView.load(url);
    }
</code></pre>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-04.png" alt="run-unity-game-on-harmony-device-by-webview-04"></p>
<p>并在onStart方法中调用。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-05.png" alt="run-unity-game-on-harmony-device-by-webview-05"></p>
<h3 id="3">3. 隐藏标题栏</h3>
<p>添加完Webview组件，就可以用它来查看网页了。</p>
<p>下图中，展示了我的博客</p>
<blockquote>
<p><a href="https://xmanyou.com/">https://xmanyou.com/</a></p>
</blockquote>
<p>可以看到，标题栏还在。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-06.png" alt="run-unity-game-on-harmony-device-by-webview-06"></p>
<p>为了提供更好的体验，我们想办法把它隐藏。以下方法来自钟发发老师。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-07.png" alt="run-unity-game-on-harmony-device-by-webview-07"></p>
<p>两个步骤：</p>
<h4 id="31configjsonnotitlebar">3.1. 在config.json中设置NoTitleBar</h4>
<pre><code>    &quot;abilities&quot;: [
      {
...
        &quot;metaData&quot;:{
          &quot;customizeData&quot;:[
            {
              &quot;name&quot;: &quot;hwc-theme&quot;,
              &quot;value&quot;: &quot;androidhwext:style/Theme.Emui.NoTitleBar&quot;,
              &quot;extra&quot;:&quot;&quot;
            }
          ]
        }
...
    }
</code></pre>
<h4 id="32onstartmark_translucent_status">3.2. 在onStart中设置MARK_TRANSLUCENT_STATUS</h4>
<p>注意，以下代码需要在setUIContent之前调用。</p>
<pre><code>        // 沉浸式显示（by 钟发发老师)
        this.getWindow().addFlags(WindowManager.LayoutConfig.MARK_TRANSLUCENT_STATUS);
      // setUIContent 之前
</code></pre>
<p>再次测试Webview，这次标题栏就隐藏了。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-08.png" alt="run-unity-game-on-harmony-device-by-webview-08"></p>
<h3 id="4webviewunitywebgl">4. 设置Webview加载Unity Webgl游戏</h3>
<p>首先，用Unity打包Webgl游戏，并上传到服务器上。<br>
然后，用Webview加载Unity游戏的链接。</p>
<h3 id="5">5. 打开远程真机，进行调试</h3>
<p>与cocos项目一样，模拟器无法正常演示游戏，需要使用远程真机来调试。<br>
参考上一篇：</p>
<blockquote>
<p>《用DevEco 2.2远程真机调试+Cocos Creator 3.2开发一个鸿蒙游戏》<br>
<a href="https://xmanyou.com/build-a-harmony-game-with-cocos-creator-and-run-on-remote-device/">https://xmanyou.com/build-a-harmony-game-with-cocos-creator-and-run-on-remote-device/</a></p>
</blockquote>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-09.png" alt="run-unity-game-on-harmony-device-by-webview-09"></p>
<p>完成~</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-10.png" alt="run-unity-game-on-harmony-device-by-webview-10"></p>
<h2 id="">如何加载本地资源？</h2>
<p>你可能已经注意到了，本文介绍的方法，游戏代码是放在服务器上的，如果你没有服务器，或者想把资源放在游戏包中，可以参考官方WebView文档，里边有详细介绍如何加载本地资源。<br>
如果有空尝试的话，我会再出一篇相关文章。</p>
<blockquote>
<p>《WebView》<br>
<a href="https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ui-java-component-webview-0000001092715158">https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ui-java-component-webview-0000001092715158</a></p>
</blockquote>
<h2 id="">特别鸣谢</h2>
<p>非常感谢钟发发老师在我遇到困难时，第一时间伸出援手，非常感谢。</p>
<p><img src="/content/images/2021/07/run-unity-game-on-harmony-device-by-webview-11.png" alt="run-unity-game-on-harmony-device-by-webview-11"></p>
<!--kg-card-end: markdown-->