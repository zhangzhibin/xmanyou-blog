---
title: "Python虚拟环境简明教程"
description: "环境冲突是开发人员最头痛的问题之一，venv为python提供了一个解决方案。"
pubDate: 2020-04-21T04:34:43.000Z
author: "阿斌"
tags: ["开发笔记", "python", "venv"]
tagSlugs: ["dev", "python", "venv"]
draft: false
type: post
slug: "python-venv-virtual-enrionment"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p><img src="/content/images/2020/04/python.png" alt="python"></p>
<h2 id="0">0. 什么是虚拟环境</h2>
<p>依赖库冲突，或者说运行环境冲突，是开发人员经常遇到的很头疼的问题。虚拟环境，就是为了解决Python运行环境中的这个问题提供的一个方案。</p>
<blockquote>
<p>virtual environment, a self-contained directory tree that contains a Python installation for a particular version of Python, plus a number of additional packages.</p>
</blockquote>
<p>Python的虚拟环境(virtual environment)模块(venv)，可以用来在一台机器上配置多个Python运行环境，不同的虚拟环境之间有自己的</p>
<ul>
<li>python可执行文件</li>
<li>依赖库</li>
</ul>
<p>不同虚拟环境之间互不影响。</p>
<p>通过设立不同的虚拟环境，解决了把依赖库安装在系统全局环境下产生的依赖库冲突的问题。</p>
<p>参考：<a href="https://docs.python.org/3/tutorial/venv.html#tut-venv">https://docs.python.org/3/tutorial/venv.html#tut-venv</a></p>
<h2 id="1">1. 创建虚拟环境</h2>
<pre><code>python3 -m venv tutorial-env
</code></pre>
<h2 id="2">2. 激活虚拟环境</h2>
<pre><code>source tutorial-env/bin/activate
</code></pre>
<p>激活以后就可以以该虚拟环境的配置来使用python了，包括独立的python运行包，独立的依赖库。</p>
<h2 id="3pip">3. 使用pip管理虚拟环境</h2>
<blockquote>
<p>参考：<a href="https://docs.python.org/3/installing/index.html#installing-index">https://docs.python.org/3/installing/index.html#installing-index</a></p>
</blockquote>
<ul>
<li>常用命令</li>
</ul>
<pre><code>查找
pip search

查看已安装
pip list

查看某个库
pip show

安装
pip install

更新
pip install --upgrade

卸载
pip uninstall
</code></pre>
<ul>
<li>输出依赖库列表</li>
</ul>
<pre><code>pip freeze &gt; requirements.txt
</code></pre>
<ul>
<li>安装依赖库列表</li>
</ul>
<pre><code>pip install -r requirements.txt
</code></pre>
<!--kg-card-end: markdown-->