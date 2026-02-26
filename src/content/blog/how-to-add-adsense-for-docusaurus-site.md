---
title: "如何为Docusaurus站点接入AdSense广告SDK"
description: "Docusaurus是一个基于React的快速建站工具，与基于Vue的快速建站工具VuePress有很多相似之处。该项目由Facebook团队开发，并开源。本文介绍如何自己编写一个简单的AdSense插件plugin来引入AdSense SDK。"
pubDate: 2023-09-10T11:44:17.000Z
author: "影子工作室"
tags: ["Docusaurus", "开发笔记"]
draft: false
type: post
slug: "how-to-add-adsense-for-docusaurus-site"
---

<!--kg-card-begin: markdown--><p>Docusaurus是一个基于React的快速建站工具，与基于Vue的快速建站工具VuePress有很多相似之处。该项目由Facebook团队开发，并开源。</p>
<p><img src="/images/2023/09/docusaurus.png" alt="docusaurus"></p>
<p>与VuePress一样，Docusaurus支持通过Markdown格式编写网页，并可以基于文件系统的目录结构生产对应的路由，而且也支持通过插件的方式来扩展功能。</p>
<h2 id="">问题背景</h2>
<p>Docusaurus官方提供了一些常见的插件，包括谷歌统计ga4，或者google tag manager，但是却没有提供AdSense变现SDK的插件。</p>
<p>网站建设好后，想要通过AdSense进行变现，该如何添加呢？</p>
<p>如果不想花大力气去修改主题，最便捷的方法莫过于自己编写一个简单的AdSense插件plugin了。</p>
<h2 id="">解决方法</h2>
<h3 id="myadsenseplugin">第一步，编写My AdSense Plugin</h3>
<p><strong>官方文档</strong></p>
<blockquote>
<p><a href="https://docusaurus.io/docs/advanced/plugins">https://docusaurus.io/docs/advanced/plugins</a></p>
</blockquote>
<p>Docusaurus支持多种创建插件的方法：</p>
<ul>
<li>直接使用匿名函数</li>
<li>使用独立模块</li>
</ul>
<p>为了方便维护，本例使用第二种。</p>
<ul>
<li>
<p>首先，在项目的根目录下创建插件目录，并添加插件的入口文件index.js：<code>my-plugin/index.js</code></p>
</li>
<li>
<p>编写plugin对应的生命周期接口方法<br>
plugin支持的接口，参考文档：</p>
</li>
</ul>
<blockquote>
<p><a href="https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis">https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis</a></p>
</blockquote>
<p>为了引入AdSense SDK需要使用<code>injectHtmlTags</code><br>
示例代码：</p>
<pre><code>module.exports = async function myAdSensePlugin(context, options) {
  // ...
  return {
    name: 'adsense-plugin', // 插件的名称
    injectHtmlTags({content}) {
      // console.info(&quot;===&gt; adsesne-plugin injectHtmlTags&quot;)
      clientID = options.clientID; // 读取配置的AdSense id
      return {
        headTags: [  // 插入到header部分的代码
          {
            tagName: 'script',
            attributes: {
              async: true,
              crossorigin: 'anonymous',
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientID}`,
            },
          },
        ],
      };
    },    
  };
};
</code></pre>
<h3 id="adsense">第二步，引入插件并设置AdSense变现账号</h3>
<p>为了灵活使用，一般把可变参数作为插件的配置项。上边的代码中，我们用clientID作为AdSense的id，并在代码中引入。</p>
<p>插件代码编写好后，需要在docuraurus.config.js中的plugins项中引入插件:</p>
<pre><code>  plugins: [
    ['./adsense-plugin', // 要引入的插件的目录
    { 
      clientID: '&lt;这里填AdSense id&gt;', // 设置参数
    }],
  ],
</code></pre>
<p>如何引入和配置插件，参考文档：</p>
<h3 id="">第三步，重新编译并发布站点</h3>
<p>一切就绪，重新编译并发布，在网络请求中就可以看到对应的请求了。</p>
<!--kg-card-end: markdown-->