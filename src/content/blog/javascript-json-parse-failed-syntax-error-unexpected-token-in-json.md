---
title: "Javascript解析JSON字符串报错：parse failed:  SyntaxError: Unexpected token n in JSON"
description: "一个嵌套json串引发的事故"
pubDate: 2021-06-08T02:03:02.000Z
author: "阿斌"
tags: ["开发笔记", "JavaScript"]
draft: false
type: post
slug: "javascript-json-parse-failed-syntax-error-unexpected-token-in-json"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>有个JavaScript对象obj，其中一个属性值为另一个对象child的JSON stringify后得到的JSON字符串。</p>
<p>大概是这样子</p>
<pre><code>	var child = {
		number: 123,
		string: &quot;abc&quot;
	};
	var childValue = JSON.stringify(child);
	var obj = {
		data: [
			{
				key: &quot;mykey&quot;,
				value: childValue
			}
		]
	}
</code></pre>
<p>obj对象的数据被JSON化后存储在服务器上，读取时，服务器也用JSON格式发送obj对象数据。</p>
<p>但是，奇怪的是，在对服务端获取的obj JSON数据进行解析时，报错了</p>
<pre><code>parse failed:  SyntaxError: Unexpected token n in JSON at position 54
</code></pre>
<p>这是为什么呢？</p>
<h1 id="">解决方法</h1>
<p>为了解决这个问题，写了一个简单的js测试用例，如下。</p>
<pre><code>try{
	var child = {
		number: 123,
		string: &quot;abc&quot;
	};
	var childValue = JSON.stringify(child);
	var obj = {
		data: [
			{
				key: &quot;mykey&quot;,
				value: childValue
			}
		]
	}

	var objJson = JSON.stringify(obj);

	console.info(&quot;child json ===&gt; &quot;, childValue);
	console.info(&quot;=============================\n&quot;);

	console.info(&quot;obj json ===&gt; &quot;, objJson);
	console.info(&quot;=============================\n&quot;);
	
	var b = JSON.parse(objJson);
	console.info(&quot;obj parse from json =&gt; &quot;, b);
	console.info(&quot;=============================\n&quot;);


	var objJson3 = `
	{
		&quot;data&quot;:[
			{
				&quot;key&quot;:&quot;mykey&quot;,
				&quot;value&quot;:&quot;{\\\&quot;number\\\&quot;:123,\\\&quot;string\\\&quot;:\\\&quot;abc\\\&quot;}&quot;
			}]
		}
	`;

	var objJson2 = `
	{
		&quot;data&quot;:[
			{
				&quot;key&quot;:&quot;mykey&quot;,
				&quot;value&quot;:&quot;{\&quot;number\&quot;:123,\&quot;string\&quot;:\&quot;abc\&quot;}&quot;
			}]
		}
	`;

	var c = JSON.parse(objJson3);
	console.info(&quot;obj3 parse from json =&gt; &quot;, c);
	console.info(&quot;=============================\n&quot;);

	c = JSON.parse(objJson2);
	console.info(&quot;obj2 parse from json =&gt; &quot;, c);
	console.info(&quot;=============================\n&quot;);

	// var v = b.data[0].value;
	// console.info(&quot;value: &quot;, v);
	// var vo = JSON.parse(v);
	// console.info(&quot;value to object: &quot;, vo);
}catch(e){
	console.info(&quot;parse failed: &quot;,e);
}
</code></pre>
<p>运行结果</p>
<pre><code>node test.js
child json ===&gt;  {&quot;number&quot;:123,&quot;string&quot;:&quot;abc&quot;}
=============================

obj json ===&gt;  {&quot;data&quot;:[{&quot;key&quot;:&quot;mykey&quot;,&quot;value&quot;:&quot;{\&quot;number\&quot;:123,\&quot;string\&quot;:\&quot;abc\&quot;}&quot;}]}
=============================

obj parse from json =&gt;  { data: [ { key: 'mykey', value: '{&quot;number&quot;:123,&quot;string&quot;:&quot;abc&quot;}' } ] }
=============================

obj3 parse from json =&gt;  { data: [ { key: 'mykey', value: '{&quot;number&quot;:123,&quot;string&quot;:&quot;abc&quot;}' } ] }
=============================

parse failed:  SyntaxError: Unexpected token n in JSON at position 54
    at JSON.parse (&lt;anonymous&gt;)
    at Object.&lt;anonymous&gt; (/Users/zhangzhibin/Documents/mygit/temp/test.js:54:11)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47
</code></pre>
<p>发现，从服务端读取的obj数据是objJson2，该数据中，child的json串中增加了一些转义字符（由斜杆\开头）。<br>
这是正常的，JSON字符串需要对特殊字符进行转义才能保存。</p>
<p>而报错的位置，正是第一个转移字符：<br>
<img src="/images/2021/06/json-parse-failed-syntax-error-unexpected-token-01.png" alt="json-parse-failed-syntax-error-unexpected-token-01"></p>
<p>仔细分析一下，JavaScript的JSON.parse在解析时，可能先对字符串中的转义字符进行转义，其中</p>
<pre><code>\&quot; =&gt; &quot;
</code></pre>
<p>所以，objJson2等同于</p>
<pre><code>	var objJson2 = `
	{
		&quot;data&quot;:[
			{
				&quot;key&quot;:&quot;mykey&quot;,
				&quot;value&quot;:&quot;{&quot;number&quot;:123,&quot;string&quot;:&quot;abc&quot;}&quot;
			}]
		}
	`;
</code></pre>
<p>而这，显然不是一个合法的JSON串了。</p>
<p>同理，对于objJson3，对转义字符进行一次处理：</p>
<pre><code>\\ =&gt; \
\&quot; =&gt; &quot;
</code></pre>
<p>得到：</p>
<pre><code>	var objJson3 = `
	{
		&quot;data&quot;:[
			{
				&quot;key&quot;:&quot;mykey&quot;,
				&quot;value&quot;:&quot;{\&quot;number\&quot;:123,\&quot;string\&quot;:\&quot;abc\&quot;}&quot;
			}]
		}
	`;
</code></pre>
<p>这是一个合法的嵌套了JSON串的JSON串。</p>
<h2 id="">如何处理这种情况</h2>
<p>有几个方案：</p>
<ul>
<li>
<ol>
<li>对特殊字符串进行编码<br>
例如，在保存的时候，将内嵌的json串进行base64编码，在读取后，进行base64解析。</li>
</ol>
</li>
<li>
<ol start="2">
<li>在读取时对转义字符进行二次转义<br>
例如，将服务端读取的字符串中</li>
</ol>
</li>
</ul>
<pre><code>\ 替换成 \\
</code></pre>
<p>注意，如果在java中使用这种方案，需要</p>
<pre><code>strBsf.replaceAll(&quot;\\\\&quot;, &quot;\\\\\\\\&quot;)
</code></pre>
<blockquote>
<p>参考: <a href="https://www.cnblogs.com/yanduanduan/p/7157877.html">https://www.cnblogs.com/yanduanduan/p/7157877.html</a></p>
</blockquote>
<!--kg-card-end: markdown-->