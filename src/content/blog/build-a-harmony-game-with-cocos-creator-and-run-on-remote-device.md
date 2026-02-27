---
title: "用DevEco 2.2远程真机调试+Cocos Creator 3.2开发一个鸿蒙游戏"
description: "终于等来了带真机调试的DevEco和可以打包鸿蒙的Cocos Creator"
pubDate: 2021-06-25T17:40:35.000Z
author: "阿斌"
tags: ["鸿蒙", "cocos creator", "h5 小游戏开发", "开发笔记", "华为"]
tagSlugs: ["hong-meng", "cocos-creator", "h5", "dev", "hua-wei"]
draft: false
type: post
slug: "build-a-harmony-game-with-cocos-creator-and-run-on-remote-device"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>6.25新鲜出炉的DevEco 2.2 beta 提供了远程真机调试，而上周6.18发布的Cocos Creator 3.2 支持一键打包鸿蒙项目。</p>
<p>作为一个没有鸿蒙手机的游戏开发者，突发奇想，能否双剑合璧，用远程真机设备来开发鸿蒙游戏呢？</p>
<p>总个过程比预想的顺畅多了，没有遇到太多坑，推荐游戏开发者去体验一下鸿蒙的开发过程。</p>
<p>先放一张测试截图：</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-01.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-01"></p>
<h1 id="cocoscreator">利用真机调试+Cocos Creator开发鸿蒙游戏详细步骤</h1>
<h2 id="1">1. 账号准备</h2>
<ul>
<li>1). 华为开发者账号<br>
<a href="https://developer.harmonyos.com/">https://developer.harmonyos.com/</a></li>
<li>2). 华为商店账号<br>
<a href="https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/">https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/</a></li>
<li>3). Cocos账号（登录Cocos Creator用）<br>
<a href="https://www.cocos.com/creator">https://www.cocos.com/creator</a></li>
</ul>
<h2 id="2cocoscreator32">2. 下载Cocos Creator 3.2</h2>
<blockquote>
<p><a href="https://www.cocos.com/creator">https://www.cocos.com/creator</a></p>
</blockquote>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-02.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-02"></p>
<h2 id="3deveco22">3. 下载鸿蒙开发工具DevEco 2.2</h2>
<p><a href="https://developer.harmonyos.com/cn/develop/deveco-studio">https://developer.harmonyos.com/cn/develop/deveco-studio</a></p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-03.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-03"></p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-04.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-04"></p>
<h2 id="4devecosdkndk">4. 启动DevEco并下载鸿蒙SDK和NDK（必须）</h2>
<p>要用Cocos Creator打包鸿蒙项目，需要安装鸿蒙Java SDK和Native SDK （也叫NDK）</p>
<p>启动后，打开设置界面，选择HarmonyOS SDK，或者通过SDK Manager，下载Harmony OS SDK。</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-05.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-05"></p>
<h2 id="5cocoscreator">5. 用Cocos Creator创建一个游戏</h2>
<p>Cocos Creator 3.2提供了一个相对完整的游戏示例项目(Example Taxi Game)，虽然有一些bug，但是不影响测试。<br>
直接使用这个示例项目来创建游戏。</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-06.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-06"></p>
<h2 id="6cocoscreatorsdk">6. 在Cocos Creator中配置鸿蒙SDK并打包鸿蒙项目</h2>
<p>回到Cocos Creator，打开Project-&gt;Build菜单</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-07.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-07"></p>
<p>修改几个地方：</p>
<ul>
<li>1). Platform平台，选择 Harmony OS</li>
</ul>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-08.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-08"></p>
<ul>
<li>2). Game Package Name 游戏包名，这个很重要。</li>
</ul>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-09.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-09"></p>
<ul>
<li>3). 如果是首次打包，还需要设置鸿蒙SDK<br>
点击 Set Harmony OS SDK</li>
</ul>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-10.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-10"></p>
<p>配置 Harmony OS NDK和Harmony OS SDK</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-11.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-11"></p>
<ul>
<li>4). 点Build进行打包<br>
首次打包会慢一些，因为需要编译Cocos引擎的代码。</li>
</ul>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-12.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-12"></p>
<h2 id="7">7. 在华为商店创建一个项目，并添加鸿蒙应用</h2>
<blockquote>
<p><a href="https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject">https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject</a></p>
</blockquote>
<p>添加项目</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-13.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-13"></p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-14.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-14"></p>
<p>添加应用</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-15.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-15"></p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-16.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-16"></p>
<p>注意，应用包名需要与Cocos项目中的Game Package Name一致。</p>
<p>如果不一致，也可以稍后在鸿蒙项目中修改bundle name（见下一步）。</p>
<h2 id="8deveco22">8. 用DevEco 2.2打开鸿蒙游戏项目</h2>
<p>Creator打包好的鸿蒙项目，目录跟其他平台的不一样，默认是 &lt;cocos 项目&gt;/native/engine/ohos<br>
用DevEco的Open Project菜单打开这个目录。</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-17.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-17"></p>
<p>检查ohos/entry/src/main/config.json中 app-&gt;bundleName是否与应用商店的应用包名一致。<br>
如果不一致，修改成一致。</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-18.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-18"></p>
<h2 id="9">9. 连接远程真机设备</h2>
<p>打开DevEco-&gt;Tools-&gt;Device Manager<br>
根据提示登录华为开发者账号，并授权。</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-19.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-19"></p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-20.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-20"></p>
<p>授权完毕后，返回DevEco，切换到Remote Device -&gt; Phone 可以看到一台<br>
Mate 40 Pro+ ！！！</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-21.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-21"></p>
<p>启动！</p>
<p>哒哒~~~~</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-22.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-22"></p>
<p>对比一下p40模拟器</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-23.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-23"></p>
<h2 id="10deveco">10. 利用DevEco自动生成打包证书</h2>
<p>点这个按钮，打开Project Structure界面</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-24.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-24"></p>
<p>勾选自动生成证书(Automatically generate signing）</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-25.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-25"></p>
<p>如果商店后台设置正确，过一会以后，就会自动生成证书。</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-26.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-26"></p>
<h3 id="">注意事项</h3>
<ul>
<li>
<p>1). 每次连接新的远程真机，都需要重新生成证书。<br>
所以，自动生成证书真是太方便了！！！</p>
</li>
<li>
<p>2). 如果出现无法保存的错误提示</p>
</li>
</ul>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-27.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-27"></p>
<p>则回到项目中，将项目中所有build.gradle中的signingConfigs字段都删掉，这些是Cocos Creator生成的项目中填写的Cocos的证书。</p>
<p>然后重新生成证书，就可以了。</p>
<h2 id="11">11. 打包并运行</h2>
<p>点击右上角的Run entry，打包并运行</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-30.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-30"></p>
<p>过一会……<br>
再过一会……<br>
再过一会会……<br>
然后……<br>
就能看到Cocos的启动画面……<br>
然后……<br>
哒哒，老司机们，来开车吧~</p>
<p><img src="/content/images/2021/06/build-and-run-harmony-game-with-cocos-creator-on-remote-device-31.png" alt="build-and-run-harmony-game-with-cocos-creator-on-remote-device-31"></p>
<h1 id="">几个问题</h1>
<p>调试过程发现一些问题，但是都与鸿蒙无关：</p>
<ul>
<li>1). Cocos Creator提供的游戏示例，有非常多bug，这个真不是鸿蒙的问题。</li>
<li>2). 远程真机调试有延迟，对于操作敏感的游戏，体验稍差。</li>
<li>3). 远程真机调试的画面稍微有点渣。</li>
<li>4). 断开真机重连的话，需要更新证书，因为可能连的不是上一个。</li>
</ul>
<h1 id="">参考文档</h1>
<ul>
<li>1).《使用真机进行调试》<a href="https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ide_debug_device-0000001053822404">https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ide_debug_device-0000001053822404</a></li>
<li>2). 《发布 Huawei HarmonyOS 应用》<a href="https://docs.cocos.com/creator/3.2/manual/zh/editor/publish/publish-huawei-ohos.html">https://docs.cocos.com/creator/3.2/manual/zh/editor/publish/publish-huawei-ohos.html</a></li>
</ul>
<!--kg-card-end: markdown-->