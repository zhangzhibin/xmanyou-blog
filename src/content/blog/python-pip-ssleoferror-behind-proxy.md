---
title: "python开了代理后执行pip报错 (SSLEOFError(8, 'EOF occurred in violation of protocol (_ssl.c:1129)'))"
description: "新版的Urllib3在windows无法正常与某些vpn软件工作，除了关闭vpn，还有什么一劳永逸的方法呢？"
pubDate: 2022-04-24T14:21:26.000Z
author: "阿斌"
tags: ["python", "开发笔记"]
tagSlugs: ["python", "dev"]
draft: false
type: post
slug: "python-pip-ssleoferror-behind-proxy"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>windows环境下，开了代理以后，执行python的pip命令，或者其他任何与网络有关的命令，都报错：</p>
<pre><code>WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLEOFError(8, 'EOF occurred in violation of protocol (_ssl.c:1129)'))': /simple/urllib3/
WARNING: Retrying (Retry(total=3, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLEOFError(8, 'EOF occurred in violation of protocol (_ssl.c:1129)'))': /simple/urllib3/
WARNING: Retrying (Retry(total=2, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLEOFError(8, 'EOF occurred in violation of protocol (_ssl.c:1129)'))': /simple/urllib3/
WARNING: Retrying (Retry(total=1, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLEOFError(8, 'EOF occurred in violation of protocol (_ssl.c:1129)'))': /simple/urllib3/
</code></pre>
<p><img src="/images/2022/04/python-pip-ssleoferror-with-vpn.png" alt="python-pip-ssleoferror-with-vpn"></p>
<h2 id="">解决方法</h2>
<h3 id="">最简单的解决方法</h3>
<p>关掉vpn</p>
<h3 id="">一劳永逸的方法</h3>
<ul>
<li>1). 关掉vpn</li>
<li>2). 安装就版本的urllib3</li>
</ul>
<pre><code>pip install urllib3==1.25.11
</code></pre>
<ul>
<li>3). 打开vpn</li>
</ul>
<p>搞定。</p>
<!--kg-card-end: markdown-->