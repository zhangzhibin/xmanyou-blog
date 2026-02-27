---
title: "Egret白鹭引擎快速打包Facebook小游戏"
description: "白鹭引擎+Facebook 小游戏"
pubDate: 2021-06-29T10:26:32.000Z
author: "阿斌"
tags: ["facebook instant game", "egret", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["facebook-instant-game", "egret", "h5", "dev"]
draft: false
type: post
slug: "egret-template-for-fb-instant-games"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>白鹭引擎虽然提供了Facebook小游戏的打包选项，但是比较奇怪的是，居然是直接使用口令上传到后台。<br>
<img src="/content/images/2021/06/Egret-for-Facebook-instant-game-01.png" alt="Egret-for-Facebook-instant-game-01"></p>
<p>更重要的是，你即使提供了口令，也没法上传成功：<br>
<img src="/content/images/2021/06/Egret-for-Facebook-instant-game-02.png" alt="Egret-for-Facebook-instant-game-02"></p>
<p>而且！Egret不提供打包好的临时文件……</p>
<h2 id="">解决方法</h2>
<p>其实Facebook小游戏的接入很简单，这里提供一个egret白鹭引擎项目的模板，供快速打包Facebook小游戏：</p>
<blockquote>
<p><a href="https://github.com/zhangzhibin/egret-for-fbinstant">https://github.com/zhangzhibin/egret-for-fbinstant</a></p>
</blockquote>
<h3 id="">模板文件</h3>
<p>fbinstant-template目录包含了所有需要的文件:</p>
<ul>
<li>1). FB小游戏入口文件： index.html</li>
<li>2). FB小游戏配置文件：fbapp-config.json</li>
</ul>
<h3 id="">接入步骤</h3>
<ul>
<li>0). 下载模板工程</li>
</ul>
<blockquote>
<p><a href="https://github.com/zhangzhibin/egret-for-fbinstant">https://github.com/zhangzhibin/egret-for-fbinstant</a></p>
</blockquote>
<ul>
<li>1). 修改模板文件fbinstant-template/index.html中egret相关的启动参数，如窗口尺寸等。可以参考游戏项目根目录下的index.html</li>
<li>2). 正常打包发布</li>
<li>3). 复制fbinstant-template目录下的所有文件到打包目录</li>
<li>4). 压缩成zip，并上传到fb后台。</li>
</ul>
<!--kg-card-end: markdown-->