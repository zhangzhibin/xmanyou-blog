---
title: "WASM 初体验: Hello, World"
description: "用WASM开发H5游戏可行么？先看看wasm是什么吧。"
pubDate: 2019-12-17T15:57:51.000Z
author: "阿斌"
tags: ["开发笔记", "wasm"]
draft: false
type: post
slug: "wasm-emsdk-mac-start-up"
image: "/images/2019/12/wasm_hello_wasm-1.png"
---

<!--kg-card-begin: markdown--><p>JavaScript 又迎来了新的对手：WASM。<br>
这一次，JavaScript会被取代吗？<br>
从JavaScript的历史来看，恐怕不会……</p>
<p>不过，了解一下WASM倒是未尝不可。</p>
<blockquote>
<p>官方网站：<a href="https://webassembly.org/">https://webassembly.org/</a></p>
</blockquote>
<p>最近，在MacOS上尝试了一下WASM。</p>
<blockquote>
<p>官方上手教程：<a href="https://webassembly.org/getting-started/developers-guide/">https://webassembly.org/getting-started/developers-guide/</a></p>
</blockquote>
<h2 id="1emsdk">1. 安装emsdk</h2>
<p>emsdk = Emscripten SDK，是一个工具库，用来编译输出wasm。</p>
<p>mac上安装非常简单：</p>
<pre><code class="language-shell">$ git clone https://github.com/emscripten-core/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
</code></pre>
<h2 id="2">2. 设置环境变量</h2>
<p>完成后，设置一下环境变量。</p>
<pre><code>$ source ./emsdk_env.sh --build=Release
</code></pre>
<h2 id="3helloworld">3. Hello,World</h2>
<ol>
<li>用c语言写一个Hello World，然后编译成wasm</li>
</ol>
<pre><code>$ mkdir hello
$ cd hello
$ cat &lt;&lt; EOF &gt; hello.c
#include &lt;stdio.h&gt;
int main(int argc, char ** argv) {
  printf(&quot;Hello, world!\n&quot;);
}
EOF
</code></pre>
<ol start="2">
<li>用emcc编译输出为 hello.html</li>
</ol>
<pre><code>$ emcc hello.c -o hello.html
</code></pre>
<p>这会在当前目录下生成3个文件</p>
<ul>
<li>hello.html</li>
<li>hello.js</li>
<li>hello.wasm</li>
</ul>
<p><img src="/images/2019/12/wasm_compile_result.png" alt="wasm_compile_result"></p>
<ol start="3">
<li>运行</li>
</ol>
<p><strong>注意</strong>：如果直接用浏览器打开hello.html的话，会无法正常运行。</p>
<blockquote>
<p>官方说法<br>
Finally, to actually run the program, we cannot simply open the HTML file in a web browser because cross-origin requests are not supported for the file protocol scheme. We have to actually serve the output files over HTTP.</p>
</blockquote>
<p><img src="/images/2019/12/wasm_html_downloading.png" alt="wasm_html_downloading"></p>
<p><img src="/images/2019/12/wasm_html_downloading.png_error.png" alt="wasm_html_downloading.png_error"></p>
<p>正确的姿势是启动一个web server。<br>
如果你没有自己的webserver，emsdk已经集成了这个服务，方便测试。</p>
<p>命令</p>
<pre><code>$ emrun --no_browser --port 8080 .
</code></pre>
<p>看到这个输出，就表示一切正常了。</p>
<p><img src="/images/2019/12/wasm_emrun_web_service.png" alt="wasm_emrun_web_service"></p>
<p>然后用浏览器打开：<br>
<img src="/images/2019/12/wasm_html_view_correct.png" alt="wasm_html_view_correct"></p>
<h2 id="4">4. 如果你想看看编译结果的话...</h2>
<h3 id="hellohtml">hello.html</h3>
<p><img src="/images/2019/12/wasm_hello_html.png" alt="wasm_hello_html"></p>
<h3 id="hellojs">hello.js</h3>
<p><img src="/images/2019/12/wasm_hello_js.png" alt="wasm_hello_js"></p>
<h3 id="hellowasm">hello.wasm</h3>
<p><img src="/images/2019/12/wasm_hello_wasm.png" alt="wasm_hello_wasm"></p>
<!--kg-card-end: markdown-->