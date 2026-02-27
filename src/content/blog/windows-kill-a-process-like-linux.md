---
title: "#Windows 像Linux一样从命令行关闭特定程序"
description: "使用taskkill命令可以在windows下实现一些类似Linux的kill功能。"
pubDate: 2021-04-12T16:58:01.000Z
author: "阿斌"
tags: ["windows", "杂七杂八"]
tagSlugs: ["windows", "za-qi-za-ba"]
draft: false
type: post
slug: "windows-kill-a-process-like-linux"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>有时候想要从命令行直接结束一个程序进程，类似linux的kill命令。</p>
<p>那么，windows是否支持这种操作呢？</p>
<h2 id="">解决方法</h2>
<p>使用<strong>taskkill</strong>可以实现这个目的。</p>
<h3 id="taskkill">taskkill的使用方法：</h3>
<pre><code>taskkill /?

TASKKILL [/S system [/U username [/P [password]]]]
         { [/FI filter] [/PID processid | /IM imagename] } [/T] [/F]

描述:
    使用该工具按照进程 ID (PID) 或映像名称终止任务。

参数列表:
    /S    system           指定要连接的远程系统。

    /U    [domain\]user    指定应该在哪个用户上下文执行这个命令。

    /P    [password]       为提供的用户上下文指定密码。如果忽略，提示
                           输入。

    /FI   filter           应用筛选器以选择一组任务。
                           允许使用 &quot;*&quot;。例如，映像名称 eq acme*

    /PID  processid        指定要终止的进程的 PID。
                           使用 TaskList 取得 PID。

    /IM   imagename        指定要终止的进程的映像名称。通配符 '*'可用来
                           指定所有任务或映像名称。

    /T                     终止指定的进程和由它启用的子进程。

    /F                     指定强制终止进程。

    /?                     显示帮助消息。

筛选器:
    筛选器名      有效运算符                有效值
    -----------   ---------------           -------------------------
    STATUS        eq, ne                    RUNNING |
                                            NOT RESPONDING | UNKNOWN
    IMAGENAME     eq, ne                    映像名称
    PID           eq, ne, gt, lt, ge, le    PID 值
    SESSION       eq, ne, gt, lt, ge, le    会话编号。
    CPUTIME       eq, ne, gt, lt, ge, le    CPU 时间，格式为
                                            hh:mm:ss。
                                            hh - 时，
                                            mm - 分，ss - 秒
    MEMUSAGE      eq, ne, gt, lt, ge, le    内存使用量，单位为 KB
    USERNAME      eq, ne                    用户名，格式为 [domain\]user
    MODULES       eq, ne                    DLL 名称
    SERVICES      eq, ne                    服务名称
    WINDOWTITLE   eq, ne                    窗口标题

    说明
    ----
    1) 只有在应用筛选器的情况下，/IM 切换才能使用通配符 '*'。
    2) 远程进程总是要强行 (/F) 终止。
    3) 当指定远程机器时，不支持 &quot;WINDOWTITLE&quot; 和 &quot;STATUS&quot; 筛选器。

例如:
    TASKKILL /IM notepad.exe
    TASKKILL /PID 1230 /PID 1241 /PID 1253 /T
    TASKKILL /F /IM cmd.exe /T
    TASKKILL /F /FI &quot;PID ge 1000&quot; /FI &quot;WINDOWTITLE ne untitle*&quot;
    TASKKILL /F /FI &quot;USERNAME eq NT AUTHORITY\SYSTEM&quot; /IM notepad.exe
    TASKKILL /S system /U 域\用户名 /FI &quot;用户名 ne NT*&quot; /IM *
    TASKKILL /S system /U username /P password /FI &quot;IMAGENAME eq note*&quot;
</code></pre>
<p>其中 <strong>/f</strong> 参数用于强制终止一个进程。</p>
<h3 id="">示例</h3>
<ul>
<li>通过名字终止小飞机进程</li>
</ul>
<pre><code>TASKKILL /F /IM MSIAfterburner.exe
</code></pre>
<ul>
<li>通过进程id终止进程</li>
</ul>
<pre><code>TASKKILL /F /PID 1230
</code></pre>
<h2 id="">参考</h2>
<ul>
<li><a href="https://www.windows-commandline.com/taskkill-kill-process/">https://www.windows-commandline.com/taskkill-kill-process/</a></li>
<li><a href="https://stackoverflow.com/questions/33822/any-way-to-write-a-windows-bat-file-to-kill-processes">https://stackoverflow.com/questions/33822/any-way-to-write-a-windows-bat-file-to-kill-processes</a></li>
</ul>
<!--kg-card-end: markdown-->