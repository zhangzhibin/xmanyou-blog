---
title: "如何在MySQL中保存emoji表情图标？"
description: "在各种社交账号中的昵称中添加表情的人越来越多了。如果你以为用utf8编码保存文本就万事大吉了，那就等着看各种奇奇怪怪的问题吧。\n"
pubDate: 2018-04-08T12:33:55.000Z
author: "阿斌"
tags: ["开发笔记", "mysql", "go", "emoji"]
tagSlugs: ["dev", "mysql", "go", "emoji"]
draft: false
type: post
slug: "ru-he-zai-mysqlzheng-que-bao-cun"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>在各种社交账号中的昵称中添加表情的人越来越多了。最近我们就遇到过一些奇怪的问题：</p>
<ul>
<li>比如，游戏排行榜中，有的玩家的名称无法完整显示。</li>
<li>比如，有些玩家报告游戏数据丢失。</li>
<li>等等。<br>
为什么呢？</li>
</ul>
<p>在修复了各种逻辑bug以后，仍然有玩家报告诡异的问题，于是，我在日志中添加更加详细的输出信息，然后我就看到了各种表情图标……然后，我发现，这些表情并没有被正确保存到数据库MySql里……</p>
<blockquote>
<p>这一刻，我的内心是很无奈的。<br>
然而，<br>
强迫玩家改名是不可能的，<br>
强制删除表情图标是不可取的，<br>
宣布不支持表情图标是不能接受的。</p>
</blockquote>
<p>于是我决定研究一下表情图标。我的猜想是：<br>
早期的表情，不管是QQ的，还是一些论坛上的，大多是通过转满实现的，比如 :) 在某些App或者网站上就可能被转义成😊<br>
后来，由于表情图标的使用越来越广泛，于是一个标准的表情库，就因此诞生，这就是emoji。</p>
<p>猜想完毕，我又顺便搜了一下emoji的历史。原来，这些图标，跟我们在QQ或者微信聊天中用到的一些表情最大的不一样是，一个是文本，一个是图片。它们已经是标准的unicode。换句话说，它们已经跟汉语英语一样，是一种语言。</p>
<blockquote>
<p>参考：<a href="https://emojipedia.org/">https://emojipedia.org/</a></p>
</blockquote>
<p>现在，大部分的操作系统，包括电脑和移动端，都已经支持显示emoji图标，虽然在不同的平台上稍有不同。这是因为，emoji的编码虽然是标准的，每个表情也是确定的，但是具体的外观，则是又不同的平台来自己实现的，并拥有独立的版权。所以，同样是笑脸，在iOS和Android上是不一样的，在微信和微博上也是不一样的。</p>
<blockquote>
<p><a href="https://emojipedia.org/grinning-face/">https://emojipedia.org/grinning-face/</a></p>
</blockquote>
<p><img src="/images/2018/04/Snip20180408_1.png" alt="Snip20180408_1"></p>
<p>值得一提的是，<br>
最初的emoji是由日本人Kurita在1999年发明的。<br>
2010年起，emoji被收录到Unicode 6.0标准。<br>
2015年，牛津词典将这个emoji定位年度词汇 =&gt; 😂</p>
<blockquote>
<p><a href="https://en.wikipedia.org/wiki/Emoji">https://en.wikipedia.org/wiki/Emoji</a></p>
</blockquote>
<p>回到程序上来，既然emoji已经是Unicode文本，那就意味着，我们只需要将它当做正常的文本来处理即可，而怎么显示，则是由更底层的操作系统来实现的。</p>
<p>utf8是最常见的unicode编码。</p>
<p>那么，问题来了，既然，go语言的文本已经是utf8，MySQL的默认编码也已经设置成utf8，那么<br>
为什么我的MySQL里没法存emoji表情呢？</p>
<p>我先用go单独写了一个测试例子，没发现问题。</p>
<p>再搜索一下 MySQL emoji，第一个提示就是 <strong>mysql emoji incorrect string value</strong><br>
<img src="/images/2018/04/Snip20180408_3.png" alt="Snip20180408_3"></p>
<p>而搜索结果中stackoverflow第一条就是我遇到的类似问题</p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/35125933/mysql-utf8mb4-errors-when-saving-emojis">https://stackoverflow.com/questions/35125933/mysql-utf8mb4-errors-when-saving-emojis</a></p>
</blockquote>
<p><img src="/images/2018/04/Snip20180408_4.png" alt="Snip20180408_4"></p>
<p>utf8mb4，进入我的眼帘。这是什么鬼？我之前有幸遇到过一系列的文本编码问题，知道关于Unicode有utf8,utf16,utf32等不同编码，但是这还是第一次遇到utf8mb4编码。</p>
<p>于是乎，我又搜了一下，原来utf8mb4是MySQL自己给自己挖的坑找的一个填补（我脑补的）。</p>
<p><img src="/images/2018/04/Snip20180408_5.png" alt="Snip20180408_5"></p>
<p>不同于一般的utf8，使用1-4个字节来表示一个unicode字符，MySQL的utf8只使用最多3个字节。于是乎，unicode中4字节和一些特殊字符就没法保存在MySQL里了。</p>
<p>所以，解决方法就是将MySQL数据库的编码改成utf8mb4。<br>
注意，对于已经存在的表，只改变数据库的默认编码是不够的，还需要将这个表的默认编码也改成utf8mb4。<br>
最后，如果这样还不行，将数据库连接串的客户端编码也改成utf8mb4。<br>
这样应该就ok了。</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->