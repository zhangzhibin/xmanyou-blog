---
title: "#JavaScript 根据需要动态加载脚本并设置自定义参数"
description: "web开发可以使用document的接口来实现动态加载。"
pubDate: 2021-09-24T04:45:43.000Z
author: "阿斌"
tags: ["JavaScript", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["javascript", "h5", "dev"]
draft: false
type: post
slug: "javascript-dynamically-load-script-and-set-parameters"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>在html文件里，加载javascript脚本，可以通过添加<code>&lt;script src=&quot;js脚本&quot;&gt;&lt;/script&gt;</code>的方法来加载。</p>
<p>但是，有时候想要根据需要动态加载不同的脚本，或者设置不同的参数，需要怎么做呢？</p>
<h2 id="">解决方法</h2>
<p>可以利用DOM document的接口来实现。具体步骤：</p>
<ul>
<li>1). 创建script元素<br>
<code>let scriptElement = document.createElement('script')</code></li>
<li>2). 设置script的脚本<br>
<code>scriptElement.src = &quot;js脚本路径&quot;</code></li>
<li>3). 设置脚本的参数<br>
<code>scriptElement.setAttribute(key, value)</code></li>
<li>4). 添加到document树上<br>
<code>( document.getElementsByTagName(&quot;head&quot;)[0] || document.documentElement ).appendChild( scriptElement );</code></li>
</ul>
<p><strong>注意</strong></p>
<ul>
<li>1). 设置Script的<strong>自定义参数</strong>使用的是setAttribute方法，而不是直接<code>scriptElement[key] = value</code>。</li>
<li>2). 如果要异步加载，需要设置<code>scriptElement.async = true</code></li>
</ul>
<p><strong>HTMLScriptElement 参考</strong></p>
<blockquote>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement">https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement</a></p>
</blockquote>
<h3 id="typescript">完整示例(TypeScript)</h3>
<pre><code class="language-TypeScript">async function loadJsAsync(src:string, async:boolean=false, options?:any) {
  return new Promise&lt;void&gt;((resolve, reject) =&gt; {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    if(options) {
      for(const key in options) {
        script.setAttribute(key, options[key]);
      }
    }

    let onload = () =&gt; {
      script.removeEventListener('load', onload);
      // 非异步加载的话，需要等待onload返回
      if(!async) {
        resolve();
      }
    };

    script.addEventListener('load', onload);
    script.addEventListener('error', (err) =&gt; {
      console.error(err);
      reject(new Error(`Failed to load ${src}`));
    });

    ( document.getElementsByTagName(&quot;head&quot;)[0] || document.documentElement ).appendChild.appendChild(script);
    // 异步加载直接返回
    if(async){
      resolve();
    }
  });
}
</code></pre>
<h4 id="">使用示例</h4>
<pre><code>    loadJsAsync(url, true, attributes);
</code></pre>
<h4 id="gist">gist地址</h4>
<blockquote>
<p><a href="https://gist.github.com/zhangzhibin/9bfc7debf08a5300c0101e1c1f19a904">https://gist.github.com/zhangzhibin/9bfc7debf08a5300c0101e1c1f19a904</a></p>
</blockquote>
<!--kg-card-end: markdown--><!--kg-card-begin: html--><script src="https://gist.github.com/zhangzhibin/9bfc7debf08a5300c0101e1c1f19a904.js"></script><!--kg-card-end: html-->