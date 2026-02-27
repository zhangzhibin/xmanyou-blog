---
title: "ApiSix + Minio灵活管理ads.txt/app-ads.txt等静态文件的解析"
description: "使用apisix和minio灵活管理静态文件路由。"
pubDate: 2021-12-12T12:47:08.000Z
author: "阿斌"
tags: ["Apisix", "minio", "开发笔记"]
tagSlugs: ["apisix", "minio", "dev"]
draft: false
type: post
slug: "apisix-setup-router-for-minio-bucket-for-static-files"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>时不时的，我们需要向一些第三方服务来证明自己的身份，或者域名的所有权。其中一种比较常见的做法就是提供txt域名解析，或者提供该域名下某些特殊文件的访问。</p>
<p>例如，一些广告平台，谷歌Admob、谷歌AdSense、Facebook等，需要使用者在相应的域名下提供ads.txt或者app-ads.txt等静态文件来验证你的身份，防止有人冒充你向广告主出售流量。</p>
<p><img src="/content/images/2021/12/ads-txt-guide.png" alt="ads-txt-guide"></p>
<p>一些ssl证书服务也需要你证明你对该域名的所有权。</p>
<h1 id="">解决方法</h1>
<p>常用的解决方法是，如果你已经在该域名下建立了web网站，那么，可以根据所使用的web应用，创建对应的文件解析。<br>
例如，常见的wordpress就有不少ads.txt和app-ads.txt的管理插件。</p>
<p>如果是Nuxt应用，可以将这些文件放在项目的static目录下。</p>
<p>还有一种做法是，如果使用了网关，例如Nginx等，则可以在网关中添加相应的路由。例如，可以在Nginx中添加一条location解析，将这些文件指向另一个文件夹。</p>
<p>如果你跟我一样，使用ApiSix作为统一网关，然后使用Minio搭建了静态Web站，那么，可以很方便管理这些需求。</p>
<p>简单步骤：</p>
<ul>
<li>在minio中创建一个允许公共访问的public bucket</li>
<li>在ApiSix中创建一个路由，需配置
<ul>
<li>路由规则：域名，需要管理的相应域名<br>
<img src="/content/images/2021/12/apisix-setup-router-for-minio-bucket-01.png" alt="apisix-setup-router-for-minio-bucket-01"></li>
<li>路由规则：路径，需要指向的静态文件或者文件夹<br>
<img src="/content/images/2021/12/apisix-setup-router-for-minio-bucket-02.png" alt="apisix-setup-router-for-minio-bucket-02"></li>
<li>重写path，指向minio的public bucket，匹配正则表达式 <code>^/(.*)$</code>，替换为 <code>/&lt;publick bucket&gt;/${1}</code><br>
<img src="/content/images/2021/12/apisix-setup-router-for-minio-bucket-03.png" alt="apisix-setup-router-for-minio-bucket-03"></li>
</ul>
</li>
<li>上传相应文件到minio，文件比较少的话，可以直接通过minio的dashboard来上传，否则就用对应的命令。</li>
</ul>
<p>完成。</p>
<!--kg-card-end: markdown-->