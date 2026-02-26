---
title: "#SuperSet 解决除数为0报错 Error: division by zero"
description: "使用NULLIF函数可以解决除数为0的情况。"
pubDate: 2023-06-09T10:47:40.000Z
author: "阿斌"
tags: ["SuperSet", "数据分析", "mysql"]
draft: false
type: post
slug: "superset-resolve-error-division-by-zero"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>用SuperSet进行数据分析时，有时候需要将2列的值相除，此时，如果除数为0，则会报错：</p>
<pre><code>Error: division by zero
</code></pre>
<p>比如想用earnings和page_views计算网页价值:</p>
<pre><code>page_rpm = earnings / page_views
</code></pre>
<p>如果page_views为0，就会报上边提到的错误。</p>
<p>这可怎么办呢？</p>
<h2 id="">解决方法</h2>
<p>这其实不是superset的问题，而是SQL语句的问题。</p>
<p>针对这种情况，可以使用<code>NULLIF</code>这个SQL函数。</p>
<h3 id="nullif">NULLIF 用法</h3>
<p>NULLIF需要传入两个参数，然后比较这两个参数的值，如果相同，则返回NULL。</p>
<p>而除数为NULL是可以正常处理返回NULL。</p>
<p>所以，解决方法：</p>
<pre><code>page_rpm = earnings / NULLIF(page_views, 0)
</code></pre>
<p>以上</p>
<h2 id="">参考</h2>
<ul>
<li><a href="https://stackoverflow.com/questions/10964627/division-by-zero-error-when-trying-to-divide-data">https://stackoverflow.com/questions/10964627/division-by-zero-error-when-trying-to-divide-data</a></li>
<li><a href="https://learnsql.com/cookbook/how-to-handle-divide-by-zero-in-sql/#:~:text=If%20you'd%20like%20to,it%20returns%20the%20first%20argument">https://learnsql.com/cookbook/how-to-handle-divide-by-zero-in-sql/#:~:text=If you'd like to,it returns the first argument</a>.</li>
</ul>
<!--kg-card-end: markdown-->