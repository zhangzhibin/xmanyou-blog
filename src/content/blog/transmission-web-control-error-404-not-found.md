---
title: "群晖安装transmission-web-control后报错404 Not Found"
description: "需要修复transmission-web-control安装脚本的路径错误"
pubDate: 2021-11-06T14:55:17.000Z
author: "阿斌"
tags: ["群晖", "transmission"]
tagSlugs: ["qun-hui", "transmission"]
draft: false
type: post
slug: "transmission-web-control-error-404-not-found"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>尝试为群晖bt下载工具transmission安装一个高级界面，按照官方文档，安装非常方便，只需要执行一个脚本即可。<br>
官方还很贴心地提供了国内镜像gitee的下载安装脚本。</p>
<blockquote>
<p>官方教程：</p>
<ul>
<li>github： <a href="https://github.com/ronggang/transmission-web-control">https://github.com/ronggang/transmission-web-control</a></li>
<li>gitee： <a href="https://gitee.com/culturist/transmission-web-control">https://gitee.com/culturist/transmission-web-control</a></li>
</ul>
</blockquote>
<p>但是，但是，安装完毕后，打开transmission的管理页面<code>http://&lt;nas-ip&gt;/9091</code>，哎哎哎，怎么就404了？</p>
<p><img src="/content/images/2021/11/transmission-web-control-404-web-index-not-found-01.png" alt="transmission-web-control-404-web-index-not-found-01"></p>
<p>这是怎么回事？</p>
<h1 id="">解决方法</h1>
<p>检查了一下安装日志</p>
<p><img src="/content/images/2021/11/transmission-web-control-404-web-index-not-found-02.png" alt="transmission-web-control-404-web-index-not-found-02"></p>
<p>发现一条错误信息：</p>
<pre><code>正在复制安装包...
cp: cannot stat '/tmp/tr-web-control/transmission-web-control/src/.': No such file or directory
</code></pre>
<p>简单的说，就是找不到要复制的文件夹。</p>
<p>有仔细核查了一下安装脚本，发现对应的一行脚本：</p>
<pre><code>cp -r &quot;$TMP_FOLDER/transmission-web-control/src/.&quot; &quot;$WEB_FOLDER/&quot;
</code></pre>
<p>原来，安装脚本里把解压路径给写死了，而实际的解压路径是：</p>
<pre><code>$TMP_FOLDER/transmission-web-control-v$VERSION
</code></pre>
<p>所以，这行脚本应该改为：</p>
<pre><code>cp -r &quot;$TMP_FOLDER/transmission-web-control-v$VERSION/src/.&quot; &quot;$WEB_FOLDER/&quot;
</code></pre>
<p>手动修改，然后重新运行，然后，就不再报错了，transmission的新web页面也打开了：<br>
<img src="/content/images/2021/11/transmission-web-control-404-web-index-not-found-03.png" alt="transmission-web-control-404-web-index-not-found-03"></p>
<h2 id="">完整脚本</h2>
<p>修改后的完整脚本(gitee版) 已经传到github和gitee</p>
<ul>
<li>github</li>
</ul>
<blockquote>
<p><a href="https://gist.github.com/zhangzhibin/206692ae507dff6b5818f05d6919446c">https://gist.github.com/zhangzhibin/206692ae507dff6b5818f05d6919446c</a></p>
</blockquote>
<ul>
<li>gitee 仓库地址：</li>
</ul>
<blockquote>
<p><a href="https://gitee.com/devonzhang/transmission-web-control-install-script-fixed">https://gitee.com/devonzhang/transmission-web-control-install-script-fixed</a></p>
</blockquote>
<h2 id="transmissionwebcontrol">群晖用户如何设置计划任务来安装transmission-web-control呢？</h2>
<p>只要更新一下计划任务的自定义脚本即可：</p>
<pre><code>curl -s https://gitee.com/devonzhang/transmission-web-control-install-script-fixed/raw/master/install-tr-control-gitee.sh | bash -s auto
</code></pre>
<p><img src="/content/images/2021/11/transmission-web-control-404-web-index-not-found-04.png" alt="transmission-web-control-404-web-index-not-found-04"></p>
<!--kg-card-end: markdown-->