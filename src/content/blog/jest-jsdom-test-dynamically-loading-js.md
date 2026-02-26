---
title: "使用jest + jsdom测试动态加载js文件的临时解决方法"
description: "由于学艺不精，这里使用了一个临时方法来测试动态加载js"
pubDate: 2022-04-07T07:09:52.000Z
author: "阿斌"
tags: ["jest", "jsdom", "h5 小游戏开发", "JavaScript", "开发笔记"]
tagSlugs: ["jest", "jsdom", "h5", "javascript", "dev"]
draft: false
type: post
slug: "jest-jsdom-test-dynamically-loading-js"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>动态加载js文件是一个很常见的做法，但是使用jest内置的jsdom环境加载js文件，却无法捕获script的load事件，导致超时。</p>
<p>有什么办法呢？</p>
<h2 id="">解决方法</h2>
<p>首先，根据jsdom的官方文档，jsdom是支持动态加载js的。</p>
<blockquote>
<p><a href="https://github.com/jsdom/jsdom#asynchronous-script-loading">https://github.com/jsdom/jsdom#asynchronous-script-loading</a></p>
</blockquote>
<p>另外，根据stackoverflow上咨询的问题来看，jsdom也能够正常抛出load事件的。</p>
<p>但是，我的环境下始终无法测试成功。</p>
<p>最后，使用了一个临时解决方法：</p>
<ul>
<li>1). 重新创建一个jsdom环境。</li>
<li>2). 将新环境的document传给动态加载方法</li>
<li>3). 动态加载js</li>
<li>4). 新加载的js的全局变量会被赋值到新环境的window中</li>
</ul>
<pre><code>  const url = &quot;samplejs.js&quot;;
  const index = &quot;src/utils/sample-index.html&quot;;

  // 1. 创建一个新的jsdom环境
  const dom = await JSDOM.fromFile(index, { runScripts: &quot;dangerously&quot;, resources: &quot;usable&quot; });
  const doc = dom.window.document;

  // 2. 将新环境的document传给动态加载方法
  setDocumentWrapper(doc);
  
  // 3. 动态加载js
  await loadJsAsync(url);
  
  // 4. 检查新环境的window中是否包含新变量
  expect(dom.window.sample_js).toBe(true);
</code></pre>
<p>其中loadJsAsync的代码参考：</p>
<blockquote>
<p>《#JavaScript 根据需要动态加载脚本并设置自定义参数》<br>
<a href="https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/">https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/</a></p>
</blockquote>
<!--kg-card-end: markdown-->