---
title: "Mac vscode搭建go开发环境"
description: "本篇描述了下mac环境搭建go开发环境的过程"
pubDate: 2019-10-07T01:18:35.000Z
author: "remote_pluto"
tags: ["开发笔记"]
draft: false
type: post
slug: "mac-vscode-go-environment"
---

<h2 id="go-">Go语言环境安装</h2><ul><li>访问 <a href="https://golang.org/dl/">https://golang.org/dl/</a> 下载对应操作系统过的安装包，下载完成后，双击安装即可</li></ul><h2 id="vscode-">VSCode 插件安装</h2><ul><li>安装Go 语言插件（当前版本0.11.7）</li></ul><h2 id="-go-">创建go文件</h2><ul><li>创建go文件，vscode会自动安装所有需要的插件<br>安装过程中如果出现错误，重新打开vscode让其再次尝试，或者手动安装。更多详细信息参考：<a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go">https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go</a></li></ul><p>安装gocode <br><br>打开命令提示符（以管理员身份打开），输入：</p><!--kg-card-begin: code--><pre><code>go get -u -v github.com/nsf/gocode
</code></pre><!--kg-card-end: code--><p>安装godef</p><!--kg-card-begin: code--><pre><code>go get -u -v github.com/rogpeppe/godef
</code></pre><!--kg-card-end: code--><p>安装golint</p><!--kg-card-begin: code--><pre><code># 创建 $GOPATH/src/golang.org/x
cd $GOPATH/src/golang.org/x
git clone https://github.com/golang/tools.git
git clone https://github.com/golang/lint.git

# 完成以上步骤后，执行
go get golang.org/x/lint/golint
</code></pre><!--kg-card-end: code--><p>安装go-find-references</p><!--kg-card-begin: code--><pre><code>go get -u -v github.com/lukehoban/go-find-references
</code></pre><!--kg-card-end: code--><p>安装go-outline</p><!--kg-card-begin: code--><pre><code>go get -u -v github.com/lukehoban/go-outline
</code></pre><!--kg-card-end: code--><p>安装goreturns</p><!--kg-card-begin: code--><pre><code>go get -u -v sourcegraph.com/sqs/goreturns
</code></pre><!--kg-card-end: code--><p>安装gorename</p><!--kg-card-begin: code--><pre><code>go get -u -v golang.org/x/tools/cmd/gorename
</code></pre><!--kg-card-end: code--><p>提示：如果还提示报错，因为前面已经git clone 下来了，可以执行执行"go install golang.org/x/tools/cmd/gorename"；</p><p>安装gopkgs</p><!--kg-card-begin: code--><pre><code>go get -u -v github.com/tpng/gopkgs
</code></pre><!--kg-card-end: code--><p>安装go-symbols</p><!--kg-card-begin: code--><pre><code>go get -u -v github.com/newhook/go-symbols
</code></pre><!--kg-card-end: code-->