---
title: "#git新建仓库后的常用操作"
description: "在gitlab上新建仓库以后，在客户端进行一些的常用操作。"
pubDate: 2021-11-17T03:28:00.000Z
author: "阿斌"
tags: ["gitlab", "开发笔记"]
tagSlugs: ["gitlab", "dev"]
draft: false
type: post
slug: "gitlab-common-operation-for-new-repo"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>在gitlab上新建仓库以后，需要在客户端进行一些的常用操作有：</p>
<h2 id="git">Git 全局设置</h2>
<p>设置你的用户名和邮箱：</p>
<pre><code>git config --global user.name &quot;你的用户名&quot;
git config --global user.email &quot;你的账号邮箱&quot;
</code></pre>
<p>之后，可以根据本地的情况，来选择不同的操作：</p>
<h2 id="1">1. 创建一个新仓库</h2>
<p>如果本地没有新仓库任何文件，可以通过以下命令创建一个：</p>
<pre><code>git clone &lt;git仓库的地址&gt;
cd &lt;新仓库的文件夹名&gt;
touch README.md
git add README.md
git commit -m &quot;add README&quot;
git push -u origin master
</code></pre>
<h2 id="2">2. 推送现有文件夹</h2>
<p>如果你之前已经在本地进行了一些开发工作，但是还没有关联到任何的git仓库，现在想把它加入该仓库，则可以：</p>
<pre><code>cd &lt;本地已有的文件夹&gt;
git init
git remote add origin &lt;git仓库的地址&gt;
git add .
git commit -m &quot;Initial commit&quot;
git push -u origin master
</code></pre>
<h2 id="3git">3. 推送现有的 Git 仓库</h2>
<p>如果你之前已经在本地进行了一些开发工作，而且已经关联到一个旧的git仓库，现在想把它加入新仓库，则可以：</p>
<pre><code>cd &lt;本地已有的文件夹&gt;
git remote rename origin old-origin
git remote add origin &lt;git仓库的地址&gt;
git push -u origin --all
git push -u origin --tags
</code></pre>
<!--kg-card-end: markdown-->