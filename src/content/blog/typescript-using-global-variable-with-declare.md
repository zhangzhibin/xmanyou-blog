---
title: "TypeScript如何在模块中优雅地使用全局变量"
description: "利用declare关键字可以声明全局变量，而不引入依赖关系，保持了低耦合。"
pubDate: 2021-11-04T03:25:00.000Z
author: "阿斌"
tags: ["typescript", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["typescript", "h5", "dev"]
draft: false
type: post
slug: "typescript-using-global-variable-with-declare"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>用TypeScript编写js模块module时，经常遇到一种场景：需要使用在外部声明的全局变量。</p>
<p>这个全局变量可能是：</p>
<ul>
<li>其他模块</li>
<li>全局变量</li>
<li>全局函数</li>
</ul>
<p>如果这个全局变量是在同一个工程里其他文件中声明的，我们可以直接通过import引入，但是这就增加了强依赖关系。</p>
<p>有时候我们不想增加这个依赖关系，或者，甚至无法提前得知这个全局变量是在哪里由谁声明的，是要怎么做呢？</p>
<h1 id="">解决方法</h1>
<p>使用<em>declare</em>关键字</p>
<pre><code>declare var &lt;全局变量&gt;:&lt;类型&gt;;
</code></pre>
<p>或者</p>
<pre><code>declare const &lt;全局变量&gt;:&lt;类型&gt;;
</code></pre>
<p>如果不知道类型，可以使用any，或者省略。</p>
<p>这样就减少了依赖，降低了耦合度。</p>
<p><strong>注意</strong><br>
这种情况下，在调用的时候，需要保证要使用的全局变量已经被声明并赋值，否则会报undefined。</p>
<!--kg-card-end: markdown-->