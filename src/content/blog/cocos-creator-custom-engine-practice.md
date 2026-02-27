---
title: "#Cocos Creator# 一次自定义引擎的实践"
description: "一次简单折腾的记录"
pubDate: 2020-01-22T04:39:26.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-custom-engine-practice"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">写在前边</h2>
<p>首先，其实我不是很赞成自定义引擎的，如果能通过官方方法来解决问题，最好就不要自己修改引擎，主要原因有2：<br>
1). 你没有引擎组更熟悉这些代码<br>
2). 维护上比较麻烦</p>
<p>不过，偶尔遇到个别奇葩问题，或者想甩锅给引擎，你还是会需要查看甚至修改引擎代码来验证你的想法。</p>
<p>本文记录一下非常基础的自定义引擎过程。</p>
<blockquote>
<p>全程参考Cocos Creator官方文档，网络正常的话，没有什么坑。<br>
<a href="https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html?h=%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BC%95%E6%93%8E">https://docs.cocos.com/creator/manual/zh/advanced-topics/engine-customization.html?h=自定义引擎</a></p>
</blockquote>
<p><strong>详细步骤</strong></p>
<h2 id="1">1. 下载代码</h2>
<p>有两个地方可以下载到引擎代码<br>
1). 引擎的安装文件夹<br>
mac系统下，地址是</p>
<blockquote>
<p>CocosCreator.app/Contents/Resources/engine</p>
</blockquote>
<p>CocosCreator工具提供了一个快速打开这个文件夹的按钮：<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_02.png" alt="CocosCreator_custom_engine_02"></p>
<p>把engine目录拷贝到你的工作目录下。<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_03.png" alt="CocosCreator_custom_engine_03"></p>
<p>2). git，这里有最新最全的源码</p>
<blockquote>
<p><a href="https://github.com/cocos-creator/engine">https://github.com/cocos-creator/engine</a></p>
</blockquote>
<p>直接下载或者fork/clone到本地。</p>
<p><img src="/content/images/2020/01/CocosCreator_custom_engine_01.png" alt="CocosCreator_custom_engine_01"></p>
<h2 id="2">2. 安装打包工具</h2>
<p><strong>注意</strong> 没有装node.js环境的话，需要先装node。</p>
<p>打开命令行，进入到刚刚拷贝的engine目录<br>
1). 安装gulp</p>
<pre><code>npm install -g gulp
</code></pre>
<p><img src="/content/images/2020/01/CocosCreator_custom_engine_04.png" alt="CocosCreator_custom_engine_04"></p>
<p>2). 安装其他依赖</p>
<pre><code>npm install
</code></pre>
<h2 id="3">3. 试编译</h2>
<pre><code>gulp build
</code></pre>
<p><img src="/content/images/2020/01/CocosCreator_custom_engine_05.png" alt="CocosCreator_custom_engine_05"></p>
<p><strong>注意：</strong> 如果遇到内存问题(JavaScript heap out of memory)，则加上参数<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_06.png" alt="CocosCreator_custom_engine_06"></p>
<pre><code>gulp build --max-old-space-size=8192
</code></pre>
<p>现在应该可以编译成功了<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_07.png" alt="CocosCreator_custom_engine_07"></p>
<p>编译成功后，可以在engine目录下找到bin目录<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_08.png" alt="CocosCreator_custom_engine_08"></p>
<h2 id="4">4. 修改引擎</h2>
<p>验证是否修改成功，最快的方法是修改版本信息<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_09.png" alt="CocosCreator_custom_engine_09"></p>
<ul>
<li>
<p>找到要修改的文件<br>
在engine目录下对整个目录进行全文搜索，搜索字符串： &quot;Cocos Creator v&quot;，发现这个字段是定义在文件 engine/predefine.js中。</p>
</li>
<li>
<p>修改成 &quot;2.2.2 remake&quot;</p>
</li>
</ul>
<p><img src="/content/images/2020/01/CocosCreator_custom_engine_10.png" alt="CocosCreator_custom_engine_10"></p>
<ul>
<li>保存，重新执行打包命令。</li>
</ul>
<h2 id="5">5. 应用自定义引擎</h2>
<p>回到Cocos Creator中，打开菜单 &quot;项目&quot; -&gt; &quot;项目设置...&quot; -&gt; &quot;自定义引擎&quot;</p>
<ul>
<li>勾掉全局设置</li>
<li>勾掉使用内置的JavaScript引擎</li>
<li>选择修改过的engine目录（不是bin目录）</li>
</ul>
<p><img src="/content/images/2020/01/CocosCreator_custom_engine_11.png" alt="CocosCreator_custom_engine_11"></p>
<p>修改过程中，提示“需要重启编辑器”。</p>
<ul>
<li>关闭工程，重启Coccos Creator</li>
</ul>
<p><img src="/content/images/2020/01/CocosCreator_custom_engine_12.png" alt="CocosCreator_custom_engine_12"></p>
<h2 id="6">6. 测试</h2>
<p>启动后，预览，并开启开发者工具：<br>
<img src="/content/images/2020/01/CocosCreator_custom_engine_13.png" alt="CocosCreator_custom_engine_13"></p>
<p><strong>搞定！</strong></p>
<!--kg-card-end: markdown-->