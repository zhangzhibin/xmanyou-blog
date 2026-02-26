---
title: "Node应用打包到Docker, 报错找不到模块 Cannot find module"
description: "原来是文件名大小写惹的错"
pubDate: 2021-12-03T10:35:48.000Z
author: "阿斌"
tags: ["Node.js", "docker", "开发笔记"]
draft: false
type: post
slug: "node-app-docker-image-cannot-find-module"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>一个在Mac环境下运行正常的Node.js应用，打包成docker镜像，运行时报错：</p>
<pre><code>Error: Cannot find module './pokerMgr'
</code></pre>
<p><img src="/images/2021/12/node-app-docker-image-cannot-find-module.png" alt="node-app-docker-image-cannot-find-module"></p>
<p>这是为什么呢？</p>
<h1 id="">解决方法</h1>
<p>仔细对比后发现，导出pokerMgr模块的文件名为：<code>pokermgr.js</code></p>
<p>修改require代码为</p>
<pre><code>var pokerMgr          = require('./pokermgr');
</code></pre>
<p>解决。</p>
<h2 id="">总结</h2>
<p>如果是外部模块，需要检查是否正确安装。如果是本地模块，需要检查路径(含文件名)是否正确。</p>
<h2 id="dockerfile">Dockerfile参考</h2>
<pre><code>FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./


RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8003
CMD [ &quot;node&quot;, &quot;server.js&quot; ]
</code></pre>
<!--kg-card-end: markdown-->