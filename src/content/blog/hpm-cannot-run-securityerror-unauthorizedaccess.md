---
title: "Windows 鸿蒙环境搭建 hpm 报错：无法加载文件 hpm.ps1，因为在此系统上禁止运行脚本"
description: "如何开启权限呢？"
pubDate: 2021-02-16T05:14:11.000Z
author: "阿斌"
tags: ["鸿蒙", "开发笔记"]
draft: false
type: post
slug: "hpm-cannot-run-securityerror-unauthorizedaccess"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>按照官方文档，成功安装了hpm。</p>
<p>执行以下命令来检查hpm是否安装成功</p>
<pre><code>hpm -V
</code></pre>
<p>结果报错:</p>
<pre><code>hpm : 无法加载文件 C:\Users\abin\AppData\Roaming\npm\hpm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/g
o.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ hpm -V
+ ~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
</code></pre>
<p><img src="/images/2021/02/hpm-cannot-run-SecurityError-UnauthorizedAccess-01.png" alt="hpm-cannot-run-SecurityError-UnauthorizedAccess-01"></p>
<h1 id="">解决方法</h1>
<ul>
<li>1). 以管理员权限运行powershell</li>
<li>2). 执行命令 set-executionpolicy remotesigned</li>
</ul>
<pre><code>set-executionpolicy remotesigned

执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): Y
</code></pre>
<p><img src="/images/2021/02/hpm-cannot-run-SecurityError-UnauthorizedAccess-02.png" alt="hpm-cannot-run-SecurityError-UnauthorizedAccess-02"></p>
<ul>
<li>3). 重新执行hpm -V命令，此时应该没有报错，并打印出hpm的版本信息。</li>
</ul>
<p><img src="/images/2021/02/hpm-cannot-run-SecurityError-UnauthorizedAccess-03.png" alt="hpm-cannot-run-SecurityError-UnauthorizedAccess-03"></p>
<!--kg-card-end: markdown-->