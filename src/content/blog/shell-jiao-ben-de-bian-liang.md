---
title: "#Shell 脚本的特殊变量"
description: "Shell脚本使用一些特殊变量来处理内部参数。"
pubDate: 2021-11-19T07:23:57.000Z
author: "阿斌"
tags: ["Shell Script", "linux", "开发笔记"]
tagSlugs: ["shell-script", "linux", "dev"]
draft: false
type: post
slug: "shell-jiao-ben-de-bian-liang"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Shell脚本中有一些特殊的变量:</p>
<pre><code>$0	当前脚本的文件名
$n	传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2。
$#	传递给脚本或函数的参数个数。
$*	传递给脚本或函数的所有参数。
$@	传递给脚本或函数的所有参数。被双引号(&quot; &quot;)包含时，与 $* 稍有不同，下面将会讲到。
$?	上个命令的退出状态，或函数的返回值。
$$	当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。
</code></pre>
<h3 id=""><code>&quot;$@&quot;</code>与<code>&quot;$*&quot;</code>的区别</h3>
<p>$* 和 $@ 都表示传递给函数或脚本的所有参数，不被双引号(&quot; &quot;)包含时，都以&quot;$1&quot; &quot;$2&quot; … &quot;$n&quot; 的形式输出所有参数。</p>
<p>但是当它们被双引号(&quot; &quot;)包含时，</p>
<ul>
<li>&quot;$*&quot; 会将所有的参数作为一个整体，以&quot;$1 $2 … $n&quot;的形式输出所有参数；</li>
<li>&quot;$@&quot; 会将各个参数分开，以&quot;$1&quot; &quot;$2&quot; … &quot;$n&quot; 的形式输出所有参数。</li>
</ul>
<h2 id="">参考</h2>
<ul>
<li><a href="http://c.biancheng.net/cpp/view/2739.html">http://c.biancheng.net/cpp/view/2739.html</a></li>
<li><a href="http://cn.linux.vbird.org/linux_basic/0340bashshell-scripts.php">http://cn.linux.vbird.org/linux_basic/0340bashshell-scripts.php</a></li>
</ul>
<!--kg-card-end: markdown-->