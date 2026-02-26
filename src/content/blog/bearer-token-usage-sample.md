---
title: "Bearer Token怎么用？"
description: "使用bearer token需要添加 Header Authorization: Bearer <token>\n "
pubDate: 2021-06-03T02:37:09.000Z
author: "阿斌"
tags: ["开发笔记", "strapi", "http"]
tagSlugs: ["dev", "strapi", "http"]
draft: false
type: post
slug: "bearer-token-usage-sample"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Bearer Token拿到以后，需要在http请求中，添加header:</p>
<pre><code>Authorization: Bearer &lt;token&gt;
</code></pre>
<p>例如：</p>
<pre><code>curl -X 'GET' \
  'http://localhost:1337/games/count' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNjg2MjUzLCJleHAiOjE2MjUyNzgyNTN9.Fs9AhAgpBvSBy'
</code></pre>
<!--kg-card-end: markdown-->