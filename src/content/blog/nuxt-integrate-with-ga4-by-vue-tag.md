---
title: "#Nuxt.js 利用plugin功能添加谷歌分析GA4"
description: "利用vue-tag以及Nuxt.js的自定义插件plugin来接入新版谷歌分析GA4"
pubDate: 2021-09-30T03:32:45.000Z
author: "阿斌"
tags: ["Nuxt.js", "google", "开发笔记"]
tagSlugs: ["nuxt-js", "google", "dev"]
draft: false
type: post
slug: "nuxt-integrate-with-ga4-by-vue-tag"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>Nuxt.js是基于Vue.js开发的web服务器，提供了多种的渲染方式，包括SSR服务端渲染，静态渲染，支持多页面和单页面应用。</p>
<p>另外，Nuxt.js官方和社区也提供了大量的组件来扩展Nuxt.js的功能：</p>
<blockquote>
<p><a href="https://modules.nuxtjs.org/">https://modules.nuxtjs.org/</a></p>
</blockquote>
<p>网站上线以后，收集访问数据进行数据分析是必不可少的运营环节。谷歌分析Google Analystics就是一个常用的免费网站分析工具，经过多次迭代，从之前的UA(Universal Analystics), 发展到最新的版本是GA4(Google Analystics 4)，以及GTM(Google Tag Manager)。</p>
<p>但是呢，Nuxt.js的官方谷歌分析组件<code>nuxt/google-analytics</code>似乎还停留在UA阶段，无法支持GA4：</p>
<blockquote>
<p><a href="https://google-analytics.nuxtjs.org/">https://google-analytics.nuxtjs.org/</a></p>
</blockquote>
<p>社区提供的一款的gtag，则似乎只支持GA3：</p>
<blockquote>
<p><a href="https://github.com/nuxt-community/google-gtag-module">https://github.com/nuxt-community/google-gtag-module</a></p>
</blockquote>
<p>有什么办法集成谷歌分析GA4呢？</p>
<h1 id="">解决方法</h1>
<p>解决方法就是利用vue-tag以及Nuxt.js的自定义插件plugin来实现。</p>
<blockquote>
<p><a href="https://nuxtjs.org/docs/directory-structure/plugins#vue-plugins">https://nuxtjs.org/docs/directory-structure/plugins#vue-plugins</a></p>
</blockquote>
<h2 id="nuxtjsga4plugin">为nuxt.js添加ga4 plugin的详细步骤</h2>
<h3 id="1vuetag">1). 引入vue-tag</h3>
<p><strong>注意</strong><br>
新版本的vue-tag需要vue3支持，而nuxt还是vue2，所以需要使用以下这个库：</p>
<blockquote>
<p><a href="https://github.com/MatteoGabriele/vue-gtag/tree/1.0">https://github.com/MatteoGabriele/vue-gtag/tree/1.0</a></p>
</blockquote>
<pre><code>yarn add vue-gtag
</code></pre>
<p><strong>btw</strong><br>
如果是vue3，可以使用</p>
<blockquote>
<p><a href="https://github.com/MatteoGabriele/vue-gtag-next">https://github.com/MatteoGabriele/vue-gtag-next</a></p>
</blockquote>
<h3 id="2gtag">2).编写gtag插件</h3>
<pre><code>import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-XXXXXXXXXX' }  // 这里修改为你的gtag id，应该是G开头的。
});
</code></pre>
<h3 id="3">3). 测试</h3>
<p>开启谷歌分析插件，打开网页，在开发者工具的console里看到以下内容就表示成功了：<br>
<img src="/content/images/2021/09/nuxt-plus-gtag.png" alt="nuxt-plus-gtag"></p>
<!--kg-card-end: markdown-->