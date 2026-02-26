---
title: "Go 语言在同一台机器上打包多平台程序"
description: "go语言的 go build 命令是支持在同一台机器上，打包别的平台的程序的。\n\n命令如下\n> env GOOS=target-OS GOARCH=target-architecture go build package-import-path\n\n\n解释一下\nGOOS： 设定目标操作系统\nGOARCH：设定目标系统架构"
pubDate: 2018-03-22T08:28:32.000Z
author: "阿斌"
tags: ["开发笔记", "go"]
tagSlugs: ["dev", "go"]
draft: false
type: post
slug: "go-yu-yan-zai-tong-yi-tai-ji-qi-shang-da-bao-duo-ping-tai-cheng-xu"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>go语言的 go build 命令是支持在同一台机器上，打包别的平台的程序的。</p>
<h3 id="">命令如下</h3>
<blockquote>
<p>env GOOS=target-OS GOARCH=target-architecture go build package-import-path</p>
</blockquote>
<h3 id="">解释一下</h3>
<p>GOOS： 设定目标操作系统<br>
GOARCH：设定目标系统架构</p>
<h3 id="">举个例子</h3>
<blockquote>
<p>env GOOS=windows GOARCH=amd64 go build xmanyou.com/demoapp</p>
</blockquote>
<p>这个命令，用来打包64位windows的程序。</p>
<h3 id="">参数索引</h3>
<p>具体的GOOS和GOARCH参数列表如下：</p>
<table>
<thead>
<tr>
<th>GOOS - Target Operating</th>
<th style="text-align:center">System	GOARCH - Target Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td>android</td>
<td style="text-align:center">arm</td>
</tr>
<tr>
<td>darwin</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>darwin</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>darwin</td>
<td style="text-align:center">arm</td>
</tr>
<tr>
<td>darwin</td>
<td style="text-align:center">arm64</td>
</tr>
<tr>
<td>dragonfly</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>freebsd</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>freebsd</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>freebsd</td>
<td style="text-align:center">arm</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">arm</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">arm64</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">ppc64</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">ppc64le</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">mips</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">mipsle</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">mips64</td>
</tr>
<tr>
<td>linux</td>
<td style="text-align:center">mips64le</td>
</tr>
<tr>
<td>netbsd</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>netbsd</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>netbsd</td>
<td style="text-align:center">arm</td>
</tr>
<tr>
<td>openbsd</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>openbsd</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>openbsd</td>
<td style="text-align:center">arm</td>
</tr>
<tr>
<td>plan9</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>plan9</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>solaris</td>
<td style="text-align:center">amd64</td>
</tr>
<tr>
<td>windows</td>
<td style="text-align:center">386</td>
</tr>
<tr>
<td>windows</td>
<td style="text-align:center">amd64</td>
</tr>
</tbody>
</table>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->