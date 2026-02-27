---
title: "使用Json-server搭建mock服务器"
description: "Json-server项目是一个开源的REST API服务器。使用者通过json定义好数据，就可以自动生成相关的API接口。"
pubDate: 2021-11-17T07:12:10.000Z
author: "阿斌"
tags: ["json-server", "开发笔记"]
tagSlugs: ["json-server", "dev"]
draft: false
type: post
slug: "json-server-as-mock-server"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Json-server项目是一个开源的REST API服务器。使用者通过json定义好数据，就可以自动生成相关的API接口，并提供了很多自定义选项。</p>
<blockquote>
<p><a href="https://github.com/typicode/json-server">https://github.com/typicode/json-server</a></p>
</blockquote>
<h2 id="1">1.安装</h2>
<pre><code>yarn global add json-server
</code></pre>
<h2 id="2">2. 使用示例</h2>
<h3 id="1dbjson">1). 创建一个db.json文件</h3>
<p>例如</p>
<pre><code>{
  &quot;posts&quot;: [
    { &quot;id&quot;: 1, &quot;title&quot;: &quot;json-server&quot;, &quot;author&quot;: &quot;typicode&quot; },
    { &quot;id&quot;: 2, &quot;title&quot;: &quot;json-server 2&quot;, &quot;author&quot;: &quot;typicode 2&quot; },
    { &quot;id&quot;: 3, &quot;title&quot;: &quot;json-server 3&quot;, &quot;author&quot;: &quot;typicode 3&quot; }
  ],
  &quot;comments&quot;: [
    { &quot;id&quot;: 1, &quot;body&quot;: &quot;some comment&quot;, &quot;postId&quot;: 1 }
  ],
  &quot;profile&quot;: { &quot;name&quot;: &quot;typicode&quot; }
}
</code></pre>
<h3 id="2jsonserver">2). 运行 json-server</h3>
<pre><code>json-server -p 3088 --watch db.json
</code></pre>
<h3 id="3">3). 默认首页</h3>
<p>通过浏览器访问: <code>http://localhost:3088</code>，可以查看默认首页。</p>
<p><img src="/content/images/2021/11/json-server-as-mock-server-default-home-page.png" alt="json-server-as-mock-server-default-home-page"></p>
<h3 id="4">4). 测试接口</h3>
<p>json-server根据db.json自动生成以下接口：</p>
<pre><code>  http://localhost:3088/posts
  http://localhost:3088/comments
  http://localhost:3088/profile
</code></pre>
<p><strong>测试</strong></p>
<ul>
<li>查看所有posts</li>
</ul>
<pre><code>curl http://localhost:3088/posts
[
  {
    &quot;id&quot;: 1,
    &quot;title&quot;: &quot;json-server&quot;,
    &quot;author&quot;: &quot;typicode&quot;
  }
]
</code></pre>
<ul>
<li>查询id=3的post</li>
</ul>
<pre><code> curl http://localhost:3088/posts/3
{
  &quot;id&quot;: 3,
  &quot;title&quot;: &quot;json-server 3&quot;,
  &quot;author&quot;: &quot;typicode 3&quot;
}
</code></pre>
<h2 id="3">3. 更多用途</h2>
<h3 id="1">1). 命令行参数</h3>
<pre><code>json-server help
json-server [options] &lt;source&gt;

选项：
  -c, --config                   Path to config file[默认值: &quot;json-server.json&quot;]
  -p, --port                     Set port                         [默认值: 3000]
  -H, --host                     Set host                  [默认值: &quot;localhost&quot;]
  -w, --watch                    Watch file(s)                            [布尔]
  -r, --routes                   Path to routes file
  -m, --middlewares              Paths to middleware files                [数组]
  -s, --static                   Set static files directory
      --read-only, --ro          Allow only GET requests                  [布尔]
      --no-cors, --nc            Disable Cross-Origin Resource Sharing    [布尔]
      --no-gzip, --ng            Disable GZIP Content-Encoding            [布尔]
  -S, --snapshots                Set snapshots directory           [默认值: &quot;.&quot;]
  -d, --delay                    Add delay to responses (ms)
  -i, --id                       Set database id property (e.g. _id)
                                                                  [默认值: &quot;id&quot;]
      --foreignKeySuffix, --fks  Set foreign key suffix (e.g. _id as in post_id)
                                                                  [默认值: &quot;Id&quot;]
  -q, --quiet                    Suppress log messages from output        [布尔]
  -h, --help                     显示帮助信息                             [布尔]
  -v, --version                  显示版本号                               [布尔]

示例：
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json
</code></pre>
<h3 id="2web">2). 充当web服务器</h3>
<p>如果json-server命令执行的目录下有public文件夹，则该文件夹自动成为json-server的html root文件夹。</p>
<p>也可以通过<code>--static</code>指定其他的html文件夹。</p>
<p><strong>注意</strong><br>
如果存在public文件夹，或者指定了static目录，不论是不是有index.html，都会替换json-server自动生成的首页。</p>
<h3 id="3">3). 指定端口</h3>
<p><code>--port &lt;端口&gt;</code></p>
<h3 id="4">4). 开启跨域访问</h3>
<p><code>--no-cors</code> 关闭CORS</p>
<h3 id="5">5). 程序生成数据</h3>
<p>输入的数据不仅可以是json文件，还可以是js文件，并实现通过编程生成数据。</p>
<p>例如，以下示范如何通过代码生成1000条用户数据</p>
<pre><code>module.exports = () =&gt; {
  const data = { users: [] }
  // Create 1000 users
  for (let i = 0; i &lt; 1000; i++) {
    data.users.push({ id: i, name: `user${i}` })
  }
  return data
}
</code></pre>
<p><strong>注意</strong><br>
js数据文件只在启动的时候被加载，所以数据在json-server启动后，是固定不变的。<br>
与json文件不同，即使添加了<code>--watch</code>也不会重新被加载。</p>
<h3 id="6">6). 自定义路由</h3>
<p>添加routes.json文件，可以自定义路由。<br>
例如</p>
<pre><code>{
  &quot;/api/*&quot;: &quot;/$1&quot;,
  &quot;/:resource/:id/show&quot;: &quot;/:resource/:id&quot;,
  &quot;/posts/:category&quot;: &quot;/posts?category=:category&quot;,
  &quot;/articles\\?id=:id&quot;: &quot;/posts/:id&quot;
}
</code></pre>
<h2 id="4https">4. https?</h2>
<p>json-server默认无法配置ssl，但是可以使用typicode的另一个项目hotel来实现。</p>
<blockquote>
<p><a href="https://github.com/typicode/hotel">https://github.com/typicode/hotel</a></p>
</blockquote>
<!--kg-card-end: markdown-->