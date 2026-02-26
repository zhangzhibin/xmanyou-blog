---
title: "Node.js/Vue/Nuxt.js项目中的环境变量process.env用法详解"
description: "一次搞定环境变量的问题。"
pubDate: 2021-11-19T10:40:57.000Z
author: "阿斌"
tags: ["Nuxt.js", "Node.js", "Vue", "开发笔记"]
tagSlugs: ["nuxt-js", "node-js", "vue", "dev"]
draft: false
type: post
slug: "node-vue-nuxt-process-env-details"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="1nodejsprocessenv">1. Node.js的环境变量对象 process.env</h1>
<blockquote>
<p><a href="https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env">https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env</a></p>
</blockquote>
<p>process.env是一个包含了操作系统当前用户的环境变量的对象。</p>
<p>所以</p>
<ul>
<li>遵从操作系统环境变量的规则。<br>
参考Linux的环境变量: <a href="https://man7.org/linux/man-pages/man7/environ.7.html">https://man7.org/linux/man-pages/man7/environ.7.html</a></li>
<li>在系统全局修改、或者当前运行环境中修改环境变量，都会反应到新启动的Node.js应用中。</li>
</ul>
<p>几个要点：</p>
<ul>
<li>环境变量只在启动时被加载</li>
<li>进程隔离<br>
process.env的值可以被在Node.js进程中被修改，但是，并不会真正修改用户的环境变量，也就是说，脱离这个进程之后，这些修改将不生效。<br>
例如:</li>
</ul>
<pre><code>$ node -e 'process.env.foo = &quot;bar&quot;' &amp;&amp; echo &quot;foo=$foo&quot;
</code></pre>
<p>将输出：</p>
<pre><code>foo=
</code></pre>
<p><img src="/images/2021/11/node-nuxt-vue-rocess-env-details-01.png" alt="node-nuxt-vue-process-env-details-01"></p>
<p>这是因为，实际上，process.envs是环境变量的值拷贝，而不直接操作环境变量。</p>
<ul>
<li>process.env中的值都是字符串<br>
对process.env中的属性进行赋值，将直接被转换为字符串类型，例如：</li>
</ul>
<pre><code>process.env.test = null;
console.log(process.env.test);
// =&gt; 'null'
process.env.test = undefined;
console.log(process.env.test);
// =&gt; 'undefined'
</code></pre>
<ul>
<li>Windows系统中，process.env的属性是大小写无关的。</li>
<li>使用delete可以移除process.env中的配置</li>
</ul>
<pre><code>process.env.TEST = 1;
console.log(process.env.TEST);
// =&gt; '1'
delete process.env.TEST;
console.log(process.env.TEST);
// =&gt; undefined
</code></pre>
<h1 id="2vue">2. Vue项目的环境变量</h1>
<blockquote>
<p><a href="https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F">https://cli.vuejs.org/zh/guide/mode-and-env.html#环境变量</a></p>
</blockquote>
<p>Vue，准确的说是vue-cli-service在处理环境变量。</p>
<h2 id="21">2.1. 运行模式</h2>
<p>vue-cli-service 支持3种模式：</p>
<ul>
<li>development 开发环境</li>
<li>test 单元测试环境</li>
<li>production 生产环境</li>
</ul>
<p>NODE_ENV 可用于指定vue-cli-service运行的模式。</p>
<h2 id="22">2.2. 环境变量文件</h2>
<p>vue-cli-service使用dotenv来管理环境变量，定义在环境变量文件中的参数，会被注入到process.env中。</p>
<blockquote>
<p>关于dotenv: <a href="https://github.com/motdotla/dotenv">https://github.com/motdotla/dotenv</a></p>
</blockquote>
<p><strong>自动环境变量文件</strong><br>
Vue项目根目录下，如果包含以下环境变量文件，将按照一定规则被自动加载：</p>
<pre><code>.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
</code></pre>
<p><strong>注意</strong><br>
未测试Nuxt.js项目是否遵从这个规则。</p>
<h2 id="23">2.3. 运行时的环境变量</h2>
<p>所有变量可以在vue-cli-service的命令、插件或者依赖中被使用。</p>
<p>但是，只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量，会被编译到客户端代码中。</p>
<p><strong>特别注意</strong><br>
<em>编译</em>的方式是直接替换成实际的值。<br>
也就是说，在编译后的客户端代码，是无法直接访问process.env的。<br>
这也符合Node.js对process.env的规定：process.env是Node.js进程中的一个对象，而Vue的客户端并不是一个Node.js进程。<br>
大胆猜测一下，进一步的，在一个编译后的Vue应用中，process.env也许甚至不能被访问(undefined)，或者是一个空对象。（注意：实际结果未经测试）</p>
<p><strong>特殊参数</strong></p>
<ul>
<li>NODE_ENV 用于定义当前的运行模式，始终是development, production, test中的一个。</li>
<li>BASE_URL 与vue.config.js中的publicPath一致，是应用会被部署到的基础路径。</li>
</ul>
<h1 id="3nuxtjs">3. Nuxt.js项目的环境变量</h1>
<p>首先，Nuxt.js是一个Node.js项目，所以也遵守Node.js的环境变量规则，使用process.env来访问环境变量。<br>
其次，Nuxt.js也是一个Vue项目，也遵守Vue的一些规则。至于到底遵守多少，得看Nuxt.js的具体实现。<br>
最后，Nuxt.js又不是一个单纯的Vue项目或者Node.js项目，它既包含了服务端的代码，也包含了客户端的代码，所以也有自己的环境变量规则。</p>
<p>官方文档:</p>
<blockquote>
<p><a href="https://nuxtjs.org/docs/directory-structure/nuxt-config#env">https://nuxtjs.org/docs/directory-structure/nuxt-config#env</a></p>
</blockquote>
<p>从官方文档可以看到，nuxt.config.js 提供了多个配置环境变量的字段和方法，看起来很乱。</p>
<p>实际上，nuxt.js中有两种环境变量：</p>
<ul>
<li>编译阶段的环境变量</li>
<li>运行阶段的环境变量</li>
</ul>
<h2 id="31">3.1. 编译阶段的环境变量</h2>
<p>通过在nuxt.config.js文件中配置env字段，可以设置在编译阶段使用的环境变量，这些变量无法在运行时被访问（无论服务端还是客户端）。</p>
<p><strong>示例</strong></p>
<pre><code>{
export default {
  env: {
    NODE_ENV=&quot;staging&quot;,
    VERSION=&quot;1.2.3&quot;
  }
}
}
</code></pre>
<h2 id="32">3.2. 运行阶段的环境变量</h2>
<p>与Vue项目一样，Nuxt.js也使用dotenv库来实现运行阶段的环境变量设置。</p>
<p>如果项目的根目录下存在<code>.env</code>文件，则会被自动加载进process.env。<br>
如果配置文件是别的名字，也可以在启动的时候，显示指定并加载：</p>
<pre><code>--dotenv &lt;配置文件&gt;
</code></pre>
<p>通过这种方式，可以为不同环境指定不同的配置文件。</p>
<p>.env文件的变量是被加载进process.env的，那么如何在代码中使用呢？</p>
<p>首先，我们知道，nuxt.js提供了多种渲染方式，服务端渲染、客户端渲染、静态渲染。为了安全，Nuxt.js又提出了两种运行时配置：</p>
<ul>
<li>运行阶段的公有配置 publicRuntimeConfig</li>
<li>运行阶段的私有配置 privateRuntimeConfig</li>
</ul>
<h3 id="1publicruntimeconfig">1). 公有配置 publicRuntimeConfig 字段</h3>
<p>nuxt.config.js中的publicRuntimeConfig用于设置在服务端和客户端都可以使用的参数:</p>
<pre><code>export default {
  publicRuntimeConfig: {
   GUEST_USER: process.env.GUEST_USER || &quot;guest&quot;,
   GUEST_SECRET: process.env.GUEST_SECRET || &quot;guest&quot;
  }
}
</code></pre>
<p>在运行时，可以直接使用<code>$config.&lt;参数&gt;</code>来访问。</p>
<p><strong>注意:</strong> 不是什么代码中都可以直接使用<code>$config</code></p>
<h3 id="2privateruntimeconfig">2). 私有配置 privateRuntimeConfig 字段</h3>
<p>nuxt.config.js中privateRuntimeConfig用于设置仅在服务端使用的参数，通常用于保存敏感信息:</p>
<pre><code>export default {
  publicRuntimeConfig: {
   ADMIN_USER: process.env.ADMIN_USER || &quot;admin&quot;,
   ADMIN_SECRET: process.env.ADMIN_SECRET || &quot;password&quot;
  }
}
</code></pre>
<p>同样的，在运行时，可以直接使用<code>$config.&lt;参数&gt;</code>来访问。</p>
<p><strong>注意</strong><br>
如果privateRuntimeConfig与publicRuntimeConfig有同名参数，则私有参数覆盖公有参数，也就是privateRuntimeConfig优先级更高。</p>
<h3 id="3">3). 使用运行阶段的配置参数</h3>
<p>运行阶段的配置参数会被注入到nuxt.config中。</p>
<p>在script中，可以通过context.$config，或者this.$config来访问:</p>
<pre><code>&lt;script&gt;
  asyncData ({ $config: { baseURL } }) {
    const posts = await fetch(`${baseURL}/posts`)
      .then(res =&gt; res.json())
  }
&lt;/script&gt;
</code></pre>
<p><strong>注意</strong> 也就说，script的环境中需要有Nuxt.js的context才能访问。</p>
<p>或者template中，直接使用$config</p>
<pre><code>&lt;template&gt;
  &lt;p&gt;Our Url is: {{ $config.baseURL}}&lt;/p&gt;
&lt;/template&gt;
</code></pre>
<p><strong>官方提示</strong><br>
如果在服务端之外的环境中使用$config，则可能会暴露私有配置。也就说，不要在客户端代码中使用私有参数。</p>
<p><img src="/images/2021/11/node-nuxt-vue-rocess-env-details-02.png" alt="node-nuxt-vue-process-env-details-02"></p>
<p>那么，问题来了：<br>
这是因为这些参数会被静态嵌入到客户端代码里，还是注入到客户端的$config，从而被暴露？</p>
<h2 id="33modules">3.3. 模块Modules的参数配置</h2>
<p>nuxt.config.js中还可以直接为模块设置参数，具体参数的由每个模块自己来实现。</p>
<p>例如，常用的axios网络模块，会读取nuxt.config.js中的 axios 字段作为自己的默认参数：</p>
<pre><code>  axios: {
    // baseURL: process.env.API_URL + '/api',
    // proxy: true,
    baseURL: process.env.BASE_URL
  }
</code></pre>
<p>而谷歌分析模块<code>@nuxtjs/google-analytics</code>读取字段 googleAnalytics：</p>
<pre><code>  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
</code></pre>
<p>那么，问题又来了：<br>
这些参数是编译阶段参数、还是运行阶段参数？在私有还是公有？该如何使用呢？</p>
<p>要回答这些问题，需要参考Nuxt.js的module文档：</p>
<blockquote>
<p><a href="https://nuxtjs.org/docs/directory-structure/modules/">https://nuxtjs.org/docs/directory-structure/modules/</a></p>
</blockquote>
<h2 id="34">3.4. 总结</h2>
<p>Nuxt.js项目中，环境变量可以</p>
<ul>
<li>在操作系统中设置</li>
<li>在启动命令中设置(运行时设置，或者配置在package.json中）</li>
<li>在nuxt.config.js中的env中配置</li>
</ul>
<p>使用时，</p>
<ul>
<li>在编译阶段，可以使用process.env来访问环境变量</li>
<li>而在运行阶段，通过将process.env赋值给publicRuntimeConfig或者privateRuntimeConfig，注入到context.$config，供服务端代码或者客户端代码使用。</li>
</ul>
<h1 id="4">4. 其他</h1>
<p>在博文《Node环境变量 process.env 的那些事儿》的评论中，有一个有趣的回复：</p>
<blockquote>
<p><a href="https://segmentfault.com/a/1190000011683741">https://segmentfault.com/a/1190000011683741</a><br>
<img src="/images/2021/11/node-nuxt-vue-rocess-env-details-03.png" alt="node-nuxt-vue-process-env-details-03"></p>
</blockquote>
<!--kg-card-end: markdown-->