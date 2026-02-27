---
title: "阿里云Ubuntu云服务器上安装docker和docker-compose的详细步骤"
description: "如题"
pubDate: 2021-02-07T07:50:55.000Z
author: "阿斌"
tags: ["docker", "阿里云", "开发笔记"]
tagSlugs: ["docker", "aliyun", "dev"]
draft: false
type: post
slug: "a-li-yun-ubuntu-ecs-install-dockerhe-docker-compose-manually"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>在阿里云的Ubuntu云服务器上安装docker/docker-compose的详细步骤如下：</p>
<h2 id="docker">安装docker</h2>
<ol>
<li>更新apt源</li>
</ol>
<pre><code>
apt-get update

</code></pre>
<ol start="2">
<li>添加https传输的软件包以及CA证书</li>
</ol>
<pre><code>
apt-get install \
   apt-transport-https \
   ca-certificates \
   curl \
   gnupg-agent \
   software-properties-common

</code></pre>
<ol start="3">
<li>检查软件包的合法性</li>
</ol>
```bash
$ curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# 官方源

# $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
<ol start="4">
<li>添加docker软件源</li>
</ol>
```bash
$ sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# 官方源

# $ sudo add-apt-repository \
#    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
#    $(lsb_release -cs) \
#    stable"
```
<ol start="5">
<li>安装docker</li>
</ol>
<pre><code>
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

</code></pre>
<ol start="6">
<li>管理docker服务</li>
</ol>
<pre><code>
sudo systemctl status docker

sudo systemctl enable docker

sudo systemctl start docker

sudo systemctl stop docker

</code></pre>
<ol start="7">
<li>管理docker用户组</li>
</ol>
<p>只有root和docker用户组才能正常使用docker。所以，如果当前用户不是root的话，需要将当前用户加入docker组。</p>
<pre><code>
sudo groupadd docker

sudo usermod -aG docker $USER

</code></pre>
<ol start="8">
<li>测试docker</li>
</ol>
<p>用hello-world测试一下docker服务是否正常</p>
<pre><code>
docker run hello-world

</code></pre>
<ol start="9">
<li>配置docker hub镜像</li>
</ol>
<p>阿里云提供镜像加速服务<br>
<img src="/content/images/2021/02/aliyun-docker-hub-mirrior.png" alt="aliyun-docker-hub-mirrior"></p>
<p>检查当前镜像设置</p>
<pre><code>
systemctl cat docker | grep '\-\-registry\-mirror'

</code></pre>
<p>如果该命令有输出，那么请执行 $ systemctl cat docker 查看 ExecStart= 出现的位置，修改对应的文件内容去掉 --registry-mirror 参数及其值，并按接下来的步骤进行配置。</p>
<p>如果以上命令没有任何输出，那么就可以在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）：</p>
<pre><code>{
 &quot;registry-mirrors&quot;: [
   &quot;&lt;你的阿里云容器镜像地址&gt;&quot;
   &quot;https://hub-mirror.c.163.com&quot;,
   &quot;https://mirror.baidubce.com&quot;
 ]
}
</code></pre>
<h2 id="dockercompose">安装docker-compose</h2>
<ol>
<li>下载最新版本</li>
</ol>
<p>github查看最新release <a href="https://github.com/docker/compose/releases">https://github.com/docker/compose/releases</a></p>
<p>例如 linux的最新版本是1.28.2</p>
<p><a href="https://github.com/docker/compose/releases/download/1.28.2/docker-compose-Linux-x86_64">https://github.com/docker/compose/releases/download/1.28.2/docker-compose-Linux-x86_64</a></p>
<p><strong>注意</strong></p>
<p>如果的云服务器是国内，github上有些资源是没法下载的，需要曲线救国，比如先下载到本地，然后再上传到服务器，等等。</p>
<ol start="2">
<li>
<p>上传到/usr/local/bin</p>
</li>
<li>
<p>添加可执行权限</p>
</li>
</ol>
<pre><code>
chmod +x

</code></pre>
<ol start="4">
<li>安装docker-compose 命令补全</li>
</ol>
<p>下载</p>
<pre><code>
curl -L https://raw.githubusercontent.com/docker/compose/1.28.2/contrib/completion/bash/docker-compose -o docker-compose.1.28.2

</code></pre>
<p>保存到/etc/bash_completion.d</p>
<p>sudo mv ./docker-compose.1.28.2 /etc/bash_completion.d/docker-compose</p>
<ol start="5">
<li>
<p>重新登录</p>
</li>
<li>
<p>设置默认日志限制，避免磁盘被占满</p>
</li>
</ol>
<blockquote>
<p><a href="https://xmanyou.com/docker-logging-file-limitation/">https://xmanyou.com/docker-logging-file-limitation/</a></p>
</blockquote>
<h2 id="">参考文献</h2>
<ul>
<li>
<p><a href="https://docs.docker.com/engine/install/ubuntu/">https://docs.docker.com/engine/install/ubuntu/</a></p>
</li>
<li>
<p><a href="https://yeasy.gitbook.io/docker_practice/install/ubuntu">https://yeasy.gitbook.io/docker_practice/install/ubuntu</a></p>
</li>
<li>
<p><a href="https://yeasy.gitbook.io/docker_practice/compose/install">https://yeasy.gitbook.io/docker_practice/compose/install</a></p>
</li>
</ul>
<!--kg-card-end: markdown-->