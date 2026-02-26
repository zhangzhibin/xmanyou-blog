---
title: "使用minio和nginx搭建静态网站"
description: "利用minio和nginx快速搭建静态网站"
pubDate: 2021-08-26T10:25:54.000Z
author: "阿斌"
tags: ["minio", "Nginx", "开发笔记"]
tagSlugs: ["minio", "nginx", "dev"]
draft: false
type: post
slug: "setup-static-website-with-minio-and-nginx"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="1dockercomposeyml">1. docker-compose.yml</h1>
<p>编写docker-compose配置文件，添加minio和nginx服务。</p>
<pre><code>version: '3.9'

services:
  web-server:
    image: nginx
    restart: always
    ports:
      - &quot;8888:80&quot;
    volumes:     
      - ./nginx.conf:/etc/nginx/nginx.conf:ro

  minio-server:
    image: minio/minio:latest
    restart: always
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    command: server /data --console-address &quot;:9001&quot;
    ports:
      - &quot;9000:9000&quot;
      - &quot;9001:9001&quot;
    volumes:
      - ./data:/data
</code></pre>
<h1 id="2nginx">2. nginx设置反向代理</h1>
<p>为nginx.conf添加反向代理</p>
<pre><code>    server {
        listen 80;
        server_name localhost;

        rewrite  ^/$  /index.html  last;
        
        location / {
            proxy_pass http://minio-server:9000/mysite/;
        }
    }
</code></pre>
<p>完整nginx.conf(基于nginx docker镜像中的nginx.conf文件修改)</p>
<pre><code>
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] &quot;$request&quot; '
                      '$status $body_bytes_sent &quot;$http_referer&quot; '
                      '&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;

    server {
        listen 80;
        server_name localhost;

        rewrite  ^/$  /index.html  last;
        
        location / {
            proxy_pass http://minio-server:9000/mysite/;
        }
    }
}

</code></pre>
<h1 id="3minio">3. minio设置公开访问</h1>
<p><img src="/images/2021/08/minio-change-public-access-policy.png" alt="minio-change-public-access-policy"></p>
<p>完成。</p>
<!--kg-card-end: markdown-->