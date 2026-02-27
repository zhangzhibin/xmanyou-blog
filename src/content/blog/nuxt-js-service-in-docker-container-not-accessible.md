---
title: "#nuxt.js docker镜像启动后无法访问"
description: "测试环境中运行的好好的，但是打包后就不行了，这是为啥呢？"
pubDate: 2021-09-07T09:01:39.000Z
author: "阿斌"
tags: ["Nuxt.js", "开发笔记"]
tagSlugs: ["nuxt-js", "dev"]
draft: false
type: post
slug: "nuxt-js-service-in-docker-container-not-accessible"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>nuxt.js项目打包后，制作成docker镜像，映射默认端口3000到3000，启动以后，访问</p>
<pre><code>http://localhost:3000
</code></pre>
<p>结果无法访问，这是为什么呢？</p>
<h2 id="">解决方法</h2>
<p>原来，根据nuxt文档，nuxt服务默认是运行在localhost:3000上，直接在本机运行，是可以正常访问的。</p>
<blockquote>
<p><a href="https://nuxtjs.org/docs/2.x/features/configuration#edit-host-and-port">https://nuxtjs.org/docs/2.x/features/configuration#edit-host-and-port</a><br>
By default, the Nuxt.js development server host is localhost  which is only accessible from within the host machine.</p>
</blockquote>
<p>但是，制作成docker镜像以后，就只能在容器内部访问了。</p>
<p>修改方法有两种</p>
<h3 id="1nuxtconfigjsserverhost">方法1.修改nuxt.config.js的server.host</h3>
<p>在nuxt.config.js文件中，增加以下:</p>
<pre><code>  server: {
    host: '0' // default: localhost
  }
</code></pre>
<p>重新制作nuxt镜像，或者映射修改后的nuxt.config文件到容器，重新运行即可。</p>
<h3 id="2dockerfilehost">方法2.在Dockerfile中设置HOST环境变量</h3>
<p>添加以下命令</p>
<pre><code>ENV HOST 0.0.0.0
</code></pre>
<p>或者在运行容器时，添加环境变量</p>
<pre><code>--env HOST=0
</code></pre>
<h3 id="">其他</h3>
<p>注意，如果不设置host，nuxt也仅限本机访问，在同一个网络里的其他机器也是无法访问的，这与docker容器的情况是一样的。</p>
<p>开发环境想要其他机器可以访问，在不改配置的情况下，可以使用以下命令：</p>
<pre><code>HOST=0 PORT=3000 yarn dev
</code></pre>
<h2 id="">参考</h2>
<ul>
<li><a href="https://nuxtjs.org/docs/2.x/features/configuration#edit-host-and-port">https://nuxtjs.org/docs/2.x/features/configuration#edit-host-and-port</a></li>
<li><a href="https://www.nuxtjs.cn/faq/host-port">https://www.nuxtjs.cn/faq/host-port</a></li>
<li><a href="https://segmentfault.com/a/1190000010396645">https://segmentfault.com/a/1190000010396645</a></li>
<li><a href="https://github.com/wsdo/docker-nuxt/blob/master/Dockerfile">https://github.com/wsdo/docker-nuxt/blob/master/Dockerfile</a></li>
</ul>
<h2 id="nuxtjsdockerfile">贡献一个nuxt.js的Dockerfile</h2>
<p><strong>注意</strong></p>
<ul>
<li>设置srcDir</li>
</ul>
<pre><code>  srcDir: 'src/'
</code></pre>
<ul>
<li>本例中，没有复制src到容器里编译，所以在制作镜像前，需要更新.nuxt文件夹，确保最新。</li>
</ul>
<pre><code>yarn build
</code></pre>
<h3 id="dockerfile">完整Dockerfile</h3>
```dockerfile
FROM node:14-alpine

ENV NUXT_VERSION=2.15.7

WORKDIR /app

ADD package.json yarn.lock nuxt.config.js ./

RUN : \
  && yarn install \
  && yarn cache clean \
  && :

# 复制nuxt build文件夹
ADD .nuxt ./.nuxt
# 如果使用了content模块，还需要复制content文件夹
# ADD ./src/content ./src/content

ENTRYPOINT ["npx", "nuxt-start"]
EXPOSE 3000
```
<h3 id="nuxtconfigjs">完整nuxt.config.js</h3>
<pre><code>export default {
  srcDir: 'src/',

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  ssr: true, // 是否在服务端渲染，false为在客户端渲染
  server: {
    host: '0',
    port: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'xmanyou.com',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  router: {
    middleware: []
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/content'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [],
  },
  generate: {
    exclude: [/game/]
  }
}

</code></pre>
<!--kg-card-end: markdown-->