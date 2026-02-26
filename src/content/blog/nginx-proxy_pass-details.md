---
title: "#Nginx proxy_pass反向代理笔记"
description: "研读文档后的一点笔记"
pubDate: 2021-09-16T08:01:01.000Z
author: "阿斌"
tags: ["Nginx", "反向代理", "开发笔记", "DevOps"]
draft: false
type: post
slug: "nginx-proxy_pass-details"
---

<!--kg-card-begin: markdown--><h1 id="proxy_pass">关于proxy_pass模块</h1>
<p><a href="http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass">http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass</a></p>
<p>proxy_pass模块通常用来做反向代理，既将客户端发送的请求转发到目标服务器。</p>
<h1 id="">语法</h1>
<pre><code>Syntax:    proxy_pass URL;
Default:    —
Context:    location, if in location, limit_except
</code></pre>
<blockquote>
<p>Sets the protocol and address of a proxied server and an optional URI to which a location should be mapped. As a protocol, “http” or “https” can be specified. The address can be specified as a domain name or IP address, and an optional port:</p>
</blockquote>
<pre><code>proxy_pass http://localhost:8000/uri/;
</code></pre>
<blockquote>
<p>or as a UNIX-domain socket path specified after the word “unix” and enclosed in colons:</p>
</blockquote>
<pre><code>proxy_pass http://unix:/tmp/backend.socket:/uri/;
</code></pre>
<h2 id="">关于域名</h2>
<blockquote>
<p>If a domain name resolves to several addresses, all of them will be used in a round-robin fashion. In addition, an address can be specified as a server group.<br>
Parameter value can contain variables. In this case, if an address is specified as a domain name, the name is searched among the described server groups, and, if not found, is determined using a resolver.</p>
</blockquote>
<p>proxy_pass中的域名会被解析，如果解析为一组服务器，则会轮流访问。</p>
<h2 id="uri">关于请求URI如何传递给服务器</h2>
<p>A request URI is passed to the server as follows:</p>
<h3 id="1proxy_passuri">1). 如果proxy_pass指令中包含URI</h3>
<blockquote>
<p>If the proxy_pass directive is specified with a URI, then when a request is passed to the server, the part of a normalized request URI matching the location is replaced by a URI specified in the directive:</p>
</blockquote>
<pre><code>location /name/ {
    proxy_pass http://127.0.0.1/remote/;
}
</code></pre>
<p>那么，进行以下处理：</p>
<ul>
<li>i). 标准化请求的URI</li>
<li>ii). 将标准化后的URI中与location相同的部分移除</li>
<li>iii). 剩下的URI片段，拼接到proxy_pass指令中的URI</li>
</ul>
<h3 id="2proxy_passuri">2). 如果proxy_pass指令中不包含URI</h3>
<blockquote>
<p>If proxy_pass is specified without a URI, the request URI is passed to the server in the same form as sent by a client when the original request is processed, or the full normalized request URI is passed when processing the changed URI:</p>
</blockquote>
<pre><code>location /some/path/ {
    proxy_pass http://127.0.0.1;
}
</code></pre>
<p>那么，按照以下两种情况处理：</p>
<ul>
<li>i). 如果原始请求被处理过（所谓的处理，应该是指对URI进行标准化处理），则<strong>原始请求URI</strong>被发送给服务器</li>
<li>ii). 在处理改变后的URI时，完整的<strong>标准化</strong>后的请求URI被发送给服务器。</li>
</ul>
<p><strong>问题</strong><br>
什么叫 processing the changed URI: 处理改变后的URI时？<br>
可能是指在proxy_pass之前有其他指令在处理URI，或者进行标准化？<br>
所以，也就是说，如果proxy_pass中不包含任何URI，则传递标准化后的URI给服务器。</p>
<p><strong>旧版本1.1.12以前</strong></p>
<blockquote>
<p>Before version 1.1.12, if proxy_pass is specified without a URI, the original request URI might be passed instead of the changed URI in some cases.</p>
</blockquote>
<h3 id="3">3). 一些特例</h3>
<p>在一些特殊情况下，无法判断要如何替换请求URI</p>
<blockquote>
<p>In some cases, the part of a request URI to be replaced cannot be determined:</p>
</blockquote>
<h4 id="31locationlocation">3.1). location中使用了正则表达式，且同时在命名location中</h4>
<p>那么，这时候，proxy_pass不应该设置URI。</p>
<blockquote>
<p>When location is specified using a regular expression, and also inside named locations.<br>
In these cases, proxy_pass should be specified without a URI.</p>
</blockquote>
<p><strong>问题</strong><br>
如果设置了怎么办？</p>
<h4 id="32urirewrite">3.2). 如果URI被rewrite指令修改了</h4>
<p>那么，在proxy_pass中指定的URI被忽略，改变后的请求URI整个传给服务器。</p>
<blockquote>
<p>When the URI is changed inside a proxied location using the rewrite directive, and this same configuration will be used to process a request (break):</p>
</blockquote>
<pre><code>location /name/ {
    rewrite    /name/([^/]+) /users?name=$1 break;
    proxy_pass http://127.0.0.1;
}
</code></pre>
<blockquote>
<p>In this case, the URI specified in the directive is ignored and the full changed request URI is passed to the server.</p>
</blockquote>
<p><strong>注意</strong><br>
也就是说，使用了rewrite以后，再设置任何URI是没有意义的，除非是设置变量（参考下一节）。</p>
<h4 id="33proxy_pass">3.3). 如果proxy_pass中使用了变量</h4>
<p>那么，原始请求的URI被忽略，proxy_pass中的URI被传给服务器。</p>
<blockquote>
<p>When variables are used in proxy_pass:</p>
</blockquote>
<pre><code>location /name/ {
    proxy_pass http://127.0.0.1$request_uri;
}
</code></pre>
<blockquote>
<p>In this case, if URI is specified in the directive, it is passed to the server as is, replacing the original request URI.</p>
</blockquote>
<p><strong>注意</strong><br>
也就是说，如果proxy_pass中使用了变量，则原始请求URI就不再直接传给服务器，通常是对原始请求URI进行修改，并保存到proxy_pass的变量里。</p>
<h2 id="">原始请求与标准化请求</h2>
<ul>
<li><strong>原始请求</strong>，为客户端发送的请求，未经过任何处理</li>
<li><strong>标准化请求</strong>，按照一定规则进行解码和替换得到的标准URI</li>
</ul>
<blockquote>
<p><a href="https://en.wikipedia.org/wiki/URI_normalization">https://en.wikipedia.org/wiki/URI_normalization</a></p>
</blockquote>
<!--kg-card-end: markdown-->