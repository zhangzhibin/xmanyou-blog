---
title: "工作中哪些代码不能写？"
description: "工作中，乱写代码是有风险的。"
pubDate: 2017-11-13T12:17:27.000Z
author: "阿斌"
tags: ["开发笔记"]
draft: false
type: post
slug: "gong-zuo-zhong-na-xie-dai-ma-bu-neng-xie"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>最近，有同学偶尔会问我一些学习过程中遇到的<em>简单</em>问题，比如：<br>
为什么以下这个表达式输出结果是10？</p>
<blockquote>
<p>b=1;<br>
(++b)+(++b)+(++b) = ?</p>
</blockquote>
<p>这是他用vc6的测试结果：<br>
<img src="/images/2017/11/70A8A882160CC6D17B80C01E76E261FC.png" alt="70A8A882160CC6D17B80C01E76E261FC"></p>
<p>看到这个问题，我的第一反应是：<br>
<strong>k！要是谁在项目代码里这么写，直接开掉！</strong></p>
<p>这种代码，理论上应该是9，但是在不同的环境，不同的编译器，甚至不同的编程语言下，结果的多样性简直可怕。</p>
<p>比如，我用node.js随手做的测试：<br>
<img src="/images/2017/11/DC4DD07368A05D55619E09F715460A37.png" alt="DC4DD07368A05D55619E09F715460A37"></p>
<p>这里，(++a)+(++a)+(++a) = 9，跟理论相符，然而，细心的同学可能发现了：</p>
<blockquote>
<p>(a++)+(a++)+(a++) 却等于6！</p>
</blockquote>
<p>为什么呢？<br>
有兴趣的同学可以深究一下。</p>
<p>不过，我个人是觉得没有什么意义的。</p>
<p>就像这位同学说的：<br>
<img src="/images/2017/11/E101B4D31DCE9874619304817485D3E1.png" alt="E101B4D31DCE9874619304817485D3E1"></p>
<p>类似的代码，我们在工作中还能遇到不少。<br>
这些课本背后的习题，往往挂着“考察对语言的理解程度”的羊头卖着“太简单的代码显不出我的水平”来的狗肉，其实误人不浅。</p>
<p>工作中，我们往往要跟多个同学一起合作，而且写过的代码，过一段时间往往还需要回头再阅读，不管是为了查bug还是添加新功能。</p>
<p>一份好的代码，不仅仅要求结果正确，还要求具备较好的可读性和易维护性。</p>
<p>那么，你是否遇到过，或者自己也写过什么样被人或者被自己咒骂的代码呢？</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->