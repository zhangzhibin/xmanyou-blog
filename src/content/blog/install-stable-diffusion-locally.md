---
title: "本地安装Stable Diffusion简明步骤"
description: "本地安装Stable Diffusion的简明步骤和可能遇到的问题。"
pubDate: 2023-05-10T08:06:49.000Z
author: "阿斌"
tags: ["AI", "Stable Diffusion"]
tagSlugs: ["ai", "stable-diffusion"]
draft: false
type: post
slug: "install-stable-diffusion-locally"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>首先，请仔细阅读git项目</p>
<blockquote>
<p><a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">https://github.com/AUTOMATIC1111/stable-diffusion-webui</a></p>
</blockquote>
<h2 id="">按照步骤进行：</h2>
<ol>
<li>安装git环境</li>
<li>安装python 3.10.6 (我是3.10.4也没问题)</li>
<li>clone stable-diffusion-webui项目<br>
<code>git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui</code></li>
<li>执行 webui-user.bat 命令</li>
</ol>
<h2 id="">可能出现的问题</h2>
<ol>
<li>
<p>pip无法从pip源安装相关插件<br>
解决方法：关闭网络代理。注意，要完全关闭，而不是修改规则。<br>
参考: <a href="https://xmanyou.com/python-pip-ssleoferror-behind-proxy/">https://xmanyou.com/python-pip-ssleoferror-behind-proxy/</a></p>
</li>
<li>
<p>pip无法从github安装相关库，比如gfpgan<br>
解决方法：使用https://ghproxy.com/</p>
</li>
</ol>
<pre><code>https://github.com 的链接前添加：https://ghproxy.com/
</code></pre>
<p>参考：<a href="https://savokiss.com/tech/sdw-install-error.html">https://savokiss.com/tech/sdw-install-error.html</a><br>
<img src="/images/2023/05/install-stable-dififfusion-webui-01.png" alt="install-stable-dififfusion-webui-01"></p>
<p>顺利的话，最后一步是从huggingface下载模型：<br>
<img src="/images/2023/05/install-stable-dififfusion-webui-02.png" alt="install-stable-dififfusion-webui-02"></p>
<p>经过漫长的等待，终于所有都100%了<br>
<img src="/images/2023/05/install-stable-dififfusion-webui-03.png" alt="install-stable-dififfusion-webui-03"></p>
<h2 id="">操作页面</h2>
<p>用浏览器打开页面：<code>http://127.0.0.1:7860/</code></p>
<p>随便输入几个关键词测试一下，比如 cartoon, football, beach</p>
<p>emmmmm...不是太理想...<br>
<img src="/images/2023/05/install-stable-dififfusion-webui-04.png" alt="install-stable-dififfusion-webui-04"></p>
<p>下一步，也许是如何用gpt来生成提示词……</p>
<p>再见。</p>
<!--kg-card-end: markdown-->