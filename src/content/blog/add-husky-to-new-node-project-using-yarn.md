---
title: "使用yarn为新node.js工程添加husky"
description: "Husky官方文档的示例都是使用npm来添加husky，但是，如果使用yarn，要如何添加husky模块呢？"
pubDate: 2021-11-17T04:02:42.000Z
author: "阿斌"
tags: ["husky", "开发笔记"]
draft: false
type: post
slug: "add-husky-to-new-node-project-using-yarn"
---

<!--kg-card-begin: markdown--><p>Husky官方文档的示例都是使用npm来添加husky，但是，如果使用yarn，要如何添加husky模块呢？</p>
<h1 id="1husky">1. 添加husky到项目里</h1>
<pre><code>yarn add husky -D
或者
yarn add husky --dev
</code></pre>
<h1 id="2husky">2. 初始化husky</h1>
<p>添加以下代码到package.json的scripts中</p>
<pre><code>  &quot;scripts&quot;: {
    &quot;postinstall&quot;: &quot;husky install&quot;,
    ...
}
</code></pre>
<p>然后运行</p>
<pre><code>yarn run postinstall
</code></pre>
<h1 id="3git">3. 添加git钩子</h1>
<pre><code>npx husky add .husky/pre-commit &quot;echo precommit hook works!&quot;
</code></pre>
<p>看到以下输出结果表示添加成功</p>
<pre><code>husky - created .husky/pre-commit
</code></pre>
<p>检查一下husky的hook文件是否正确创建：</p>
<pre><code>&lt;项目&gt;/.husky/pre-commit
</code></pre>
<h1 id="4">4. 测试钩子</h1>
<p>提交一个commit，检查是否有输出</p>
<p><img src="/images/2021/11/add-husky-to-new-node-project.png" alt="add-husky-to-new-node-project"></p>
<p>完成。</p>
<h1 id="">其他</h1>
<p>关于Husky: <a href="https://typicode.github.io/husky/#/">https://typicode.github.io/husky/#/</a></p>
<!--kg-card-end: markdown-->