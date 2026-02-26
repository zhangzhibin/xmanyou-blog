---
title: "#TypeScript 异步等待方法的实现"
description: "一个超时等待的js/ts实现"
pubDate: 2021-09-24T01:30:58.000Z
author: "阿斌"
tags: ["JavaScript", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["javascript", "h5", "dev"]
draft: false
type: post
slug: "javascript-wait-until-condition-meet-or-timeout"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>简单说，在进行B操作前，需要等待A操作结束，或者某个条件满足，比如ready标志位变成true，这时候需要一个异步等待的方法。</p>
<h1 id="">解决方法</h1>
<p>需要两个步骤：</p>
<ul>
<li>1). 定时轮询，检查条件是否满足</li>
<li>2). 超时判定，在条件一直无法满足时，可以抛出超时异常</li>
</ul>
<h2 id="">代码示例</h2>
<blockquote></blockquote>
<pre><code>function waitUntil(condition:()=&gt;boolean, timeout?:number, interval?:number) {
    if (timeout === void 0) { timeout = 0; } // 如果不设置超时参数，表示永不超时，一直等待
    if (interval === void 0) { interval = 50; } // 默认查询间隔50ms
    let waitHandler;
    let timeoutHandler;
    return new Promise&lt;void&gt;(function (resolve, reject) {
        var waitFn = function () {
            if (condition()) {
              if(timeoutHandler){
                clearTimeout(timeoutHandler);
              }
              resolve();
            }
            else {
              waitHandler = setTimeout(waitFn, interval);
            }
        };
        // 定时检查
        waitHandler = setTimeout(waitFn, interval);

        // 超时判定
        if(timeout&gt;0){
          timeoutHandler = setTimeout(()=&gt;{
            if(waitHandler){
              clearTimeout(waitHandler);
            }
  
            reject({
              code:&quot;TIMEOUT&quot;,
              message: &quot;timeout&quot;
            });
          }, timeout);
        }
    });
}
export { waitUntil };
</code></pre>
<h3 id="">使用方法</h3>
<ul>
<li>1). 对于必须满足条件才能进行的操作，不用提供超时参数</li>
</ul>
<pre><code>    // 必须在sdk初始完毕后才能进行
    await waitUntil(() =&gt; {
      return sdk.isReady();
    });
</code></pre>
<ul>
<li>2). 对于允许超时的操作，即最多等待多久的操作</li>
</ul>
<pre><code>    // 等待1000毫秒（1秒）
    await waitUntil(() =&gt; {
      return sdk.isReady();
    }, 1000);
</code></pre>
<h3 id="gist">gist</h3>
<blockquote>
<p><a href="https://gist.github.com/zhangzhibin/dfd192da8c2db6964ee901a642bacaa1">https://gist.github.com/zhangzhibin/dfd192da8c2db6964ee901a642bacaa1</a></p>
</blockquote>
<!--kg-card-end: markdown--><!--kg-card-begin: html--><script src="https://gist.github.com/zhangzhibin/dfd192da8c2db6964ee901a642bacaa1.js"></script><!--kg-card-end: html-->