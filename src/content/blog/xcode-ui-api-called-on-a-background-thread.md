---
title: "XCode使用Reachability库提示“ui api called on a background thread”"
description: "有些操作必须在UI线程或者主线程进行，要怎么做呢？"
pubDate: 2019-11-22T06:31:58.000Z
author: "阿斌"
tags: ["开发笔记", "xcode", "object c", "ios"]
draft: false
type: post
slug: "xcode-ui-api-called-on-a-background-thread"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>使用了一个检查网络状态的库（Reachability），希望在收到网络状态正常的消息时，再进行admob的初始化。结果调试时，发现XCode提示了这个错误：</p>
<blockquote>
<p>ui api called on a background thread</p>
</blockquote>
<p>值得一提是，功能上似乎没有什么影响。不过，为了防止意外，还是想办法处理一下。</p>
<h2 id="">解决方法</h2>
<p>在收到网络状态变化时，发送消息到主线程进行处理。根据Reachability的文档，有两种方法:</p>
<ol>
<li>NSOperationQueue.mainQueue.addOperationWithBlock</li>
</ol>
<pre><code>// to update UI components from a block callback
// you need to dipatch this to the main thread
// this uses NSOperationQueue mainQueue
[[NSOperationQueue mainQueue] addOperationWithBlock:^{
// 这里调用只能在UI线程里进行的操作
}];
</code></pre>
<ol start="2">
<li>dispatch_async(dispatch_get_main_queue(), ...)</li>
</ol>
<pre><code>// to update UI components from a block callback
// you need to dipatch this to the main thread
// this one uses dispatch_async they do the same thing (as above)
dispatch_async(dispatch_get_main_queue(), ^{
// 这里调用只能在UI线程里进行的操作
});
</code></pre>
<h2 id="">参考</h2>
<ol>
<li>苹果官方文档 <a href="https://developer.apple.com/documentation/code_diagnostics/main_thread_checker">https://developer.apple.com/documentation/code_diagnostics/main_thread_checker</a></li>
<li>网络状态监测库 <a href="https://github.com/tonymillion/Reachability">https://github.com/tonymillion/Reachability</a></li>
</ol>
<!--kg-card-end: markdown-->