---
title: "使用jest对TypeScript进行单元测试"
description: "如何使用jest对typescript项目进行单元测试呢？"
pubDate: 2022-04-05T12:28:01.000Z
author: "阿斌"
tags: ["jest", "typescript", "开发笔记", "h5 小游戏开发"]
draft: false
type: post
slug: "using-jest-for-typescript-unit-testing"
---

<!--kg-card-begin: markdown--><p><img src="/images/2022/04/jest.png" alt="jest"></p>
<h1 id="jest">关于jest</h1>
<p>jest是Facebook开源的一个js测试框架。<br>
对于纯js项目，特别是node.js项目，几乎是开箱即用，非常简单。</p>
<h2 id="1">1. 安装</h2>
<p>可以使用npm或者yarn来安装:</p>
<pre><code>npm install --save-dev jest
</code></pre>
<h2 id="2jest">2. 初始化jest环境</h2>
<p>对于新工程，可以执行以下命令来创建一个配置文件来初始化jest的环境：</p>
<pre><code>jest --init
</code></pre>
<p>该命令执行完毕后，会询问一些问题来帮忙创建配置文件，并测试命令到package.json中。</p>
<h2 id="3">3. 创建测试用例</h2>
<p>默认情况下，jest会把项目中所有的*.test.js文件当做测试用例。</p>
<h3 id="31">3.1 官方示例</h3>
<p>比如，有一个求和的模块sum.js，代码如下：</p>
<pre><code>function sum(a, b) {
  return a + b;
}
module.exports = sum;
</code></pre>
<p>创建一个sum.test.js作为sum模块的测试用例：</p>
<pre><code>const sum = require('./sum');

test('adds 1 + 2 to equal 3', () =&gt; {
  expect(sum(1, 2)).toBe(3);
});
</code></pre>
<p>然后执行</p>
<pre><code>jest
</code></pre>
<p>或者如果你已经设置jest为默认测试工具的话：</p>
<pre><code>npm run test 
</code></pre>
<h3 id="32">3.2. 示例解析</h3>
<p>在这个示例中，</p>
<ul>
<li>sum.test.js 是测试模块，一个测试模块可以包含多个测试用例</li>
<li>test 表示一个单元测试用例</li>
<li>test的第一个参数，是这个测试用例的描述</li>
<li>test的第二个参数，是具体的测试方法</li>
<li>expect 方法用于判断传入的值是否满足预期结果，这里的toBe(3)表示预期结果为3，如果传入的值与预期一致，则该用例测试通过，否则则测试失败。</li>
</ul>
<h3 id="33jest">3.3. jest的基本模块</h3>
<p>除了test方法以外，还有一些其他模块：</p>
<ul>
<li>全局设置 beforeAll/afterAll</li>
<li>结果判断 matcher，除了示例中的toBe，还有很多其他的快捷判断方法</li>
<li>模拟接口和模拟数据 mock，通过模拟接口可以编写所需的测试数据而不需要直接从实际运行环境中获取数据进行测试</li>
</ul>
<p>更多命令和用法可以参考jest的官方文档，需要特别注意的是异步方法的测试用例的编写。</p>
<h2 id="4typescript">4. 搭建typescript测试环境</h2>
<p>对于TypeScript项目，还需要做一些配置才可以使用jest。</p>
<p>jest并不直接支持TypeScript，但是jest允许通过代码转换器(Code Transformer)将源码解析为js代码然后交给jest进行测试。</p>
<blockquote>
<p><a href="https://jestjs.io/docs/code-transformation">https://jestjs.io/docs/code-transformation</a></p>
</blockquote>
<p>对于TypeScript，jest官方提供了两个方案：</p>
<ul>
<li>Babel</li>
<li>ts-jest</li>
</ul>
<p>这里介绍一下ts-jest，由于不依赖Babel等，适用性更广泛一些，github地址如下：</p>
<blockquote>
<p><a href="https://jestjs.io/docs/getting-started#using-typescript-via-ts-jest">https://jestjs.io/docs/getting-started#using-typescript-via-ts-jest</a></p>
</blockquote>
<h3 id="41tsjesttypejest">4.1. 安装 ts-jest和@type/jest</h3>
<pre><code>npm i -D ts-jest @types/jest    
</code></pre>
<h3 id="42">4.2. 配置</h3>
<ul>
<li>1). jest.config.ts</li>
</ul>
<pre><code>preset: &quot;ts-jest&quot;,
transform: { &quot;^.+\\.ts?$&quot;: &quot;ts-jest&quot; },
moduleFileExtensions: [&quot;ts&quot;, &quot;tsx&quot;, &quot;js&quot;, &quot;jsx&quot;, &quot;json&quot;, &quot;node&quot;],
</code></pre>
<ul>
<li>2). ts-config.json</li>
</ul>
<pre><code>    &quot;types&quot;: [
      &quot;jest&quot;
    ],
</code></pre>
<h3 id="43testts">4.3. 编写*.test.ts测试模块</h3>
<p>设置完毕，就可以使用ts来编写测试用例，测试ts代码了。</p>
<p><img src="/images/2022/04/jest-typescript-unit-testing.png" alt="jest-typescript-unit-testing"></p>
<!--kg-card-end: markdown-->