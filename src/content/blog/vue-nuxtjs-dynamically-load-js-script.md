---
title: "#Vue或Nuxt.js页面中动态加载js文件"
description: "这个在html中看似很简单的动态加载js的功能，在Vue怎么实现呢？"
pubDate: 2021-11-05T10:12:24.000Z
author: "阿斌"
tags: ["Nuxt.js", "Vue", "JavaScript", "开发笔记"]
tagSlugs: ["nuxt-js", "vue", "javascript", "dev"]
draft: false
type: post
slug: "vue-nuxtjs-dynamically-load-js-script"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>如果把项目中的一些功能打包成js文件，以sdk的方式提供给前端页面使用，这样，在sdk更新时不需要重新打包部署项目，大大降低了耦合度，提高了灵活性。</p>
<p>在直接使用html编写web项目时，通过在html文件中添加<code>&lt;script&gt;</code>标签来引入js文件，可以非常简单实现这个功能。</p>
<p>但是，在Nuxt.js项目中，要如何实现呢？</p>
<p>Nuxt.js的页面，其实就是一个Vue页面，所以这个问题就变成了：如何在Vue页面中引入一个远程js文件？</p>
<p>一个Vue页面包含3个部分：</p>
<ul>
<li>template</li>
<li>script</li>
<li>style</li>
</ul>
<p>template虽然看起来是html代码，但是实际上，Vue并不允许在template中使用script标签。</p>
<blockquote>
<p>参考：《Vue加载器细则》 <a href="https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html">https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html</a></p>
</blockquote>
<p>那么有什么办法呢？</p>
<h1 id="">解决方法</h1>
<p>这个问题的解决方法很多，例如：</p>
<ul>
<li>1). 使用vue应用的模板文件<code>app.html</code>，如果你的sdk需要在所有的页面里使用，可以用这种方式。这种方法是个全局方案，灵活度很差。</li>
<li>2). 动态创建script元素实现动态加载。这种方法的灵活度就好很多。</li>
<li>3). 还有其他方法就不一一介绍了。</li>
</ul>
<p>本文注意介绍第2种方案。其中，动态加载js文件的代码可以参考：</p>
<blockquote>
<p>《#JavaScript 根据需要动态加载脚本并设置自定义参数》<br>
<a href="https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/">https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/</a></p>
</blockquote>
<p>代码有了，那么要添加在Vue页面的什么地方呢？这就需要了解一下Vue应用的生命周期：</p>
<blockquote>
<p>参考：</p>
<ul>
<li><a href="https://cn.vuejs.org/v2/guide/instance.html">https://cn.vuejs.org/v2/guide/instance.html</a></li>
<li><a href="https://nuxtjs.org/docs/concepts/nuxt-lifecycle/">https://nuxtjs.org/docs/concepts/nuxt-lifecycle/</a></li>
</ul>
</blockquote>
<p><img src="/images/2021/11/nuxtjs-lifecycle.png" alt="nuxtjs-lifecycle"></p>
<p>可以看到，<strong>mounted</strong>方法是最早最适合添加动态js代码的地方。</p>
<h2 id="">注意事项</h2>
<ul>
<li>1). created方法时，document还没有被创建，所以无法用来动态加载代码。</li>
<li>2). 与普通html页面不同，由于vue的特性，mounted中动态加载js脚本，即使没有设置async异步加载，也不会在下一行代码之前加载完成，所以，<strong>需要添加onload方法来判定js脚本是否加载完毕</strong>，之后才能进行相关操作。</li>
</ul>
<h2 id="">参考代码</h2>
<p>所以，vue页面的参考代码如下：</p>
<pre><code>&lt;template&gt;

&lt;/template&gt;

&lt;script&gt;
  mounted():{
    const sdkUrl = &quot;&lt;sdk 地址&gt;&quot;;
    this.loadJsAsync(sdkUrl)
    .then(()=&gt;{
        console.info(&quot;加载成功&quot;);
    })
    .catch(e=&gt;{
        console.error(&quot;加载失败&quot;, e);
    });
  },

  methods:{
    // 动态加载js库文件
    loadJsAsync(src, async, options){
      return new Promise((resolve, reject) =&gt; {
        const script = document.createElement(&quot;script&quot;);
        script.src = src;
        script.async = async;
        if (options) {
          for (const key in options) {
            script.setAttribute(key, options[key]);
          }
        }

        const onload = () =&gt; {
          console.info(&quot;js loaded: &quot;, src);
          script.removeEventListener(&quot;load&quot;, onload);
          
          resolve();
        };

        script.addEventListener(&quot;load&quot;, onload);
        script.addEventListener(&quot;error&quot;, (err) =&gt; {
          script.removeEventListener(&quot;load&quot;, onload);
          console.error(&quot;loading js error: &quot;, src, err);
          reject(new Error(`Failed to load ${src}`));
        });

        (
          document.getElementsByTagName(&quot;head&quot;)[0] || document.documentElement
        ).appendChild(script);

      });
    },
  }

&lt;/script&gt;
</code></pre>
<h1 id="">参考</h1>
<ul>
<li><a href="https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html">https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html</a></li>
<li><a href="https://cn.vuejs.org/v2/guide/instance.html">https://cn.vuejs.org/v2/guide/instance.html</a></li>
<li><a href="https://nuxtjs.org/docs/concepts/nuxt-lifecycle/">https://nuxtjs.org/docs/concepts/nuxt-lifecycle/</a></li>
<li><a href="https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/">https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/</a></li>
</ul>
<!--kg-card-end: markdown-->