---
title: "#gitlab 如何快速删除发布的版本release"
description: "办法是删除对应的标签"
pubDate: 2021-04-22T03:24:27.000Z
author: "阿斌"
tags: ["gitlab", "开发笔记"]
tagSlugs: ["gitlab", "dev"]
draft: false
type: post
slug: "gitlab-how-to-delete-releases"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>在测试gitlab 工作流时，产生了很多测试发布，占用了很多空间。</p>
<p>那么，有什么办法删掉呢？</p>
<h1 id="">解决方法</h1>
<p>步骤：</p>
<ol>
<li>
<p>打开项目的标签列表，项目-&gt;仓库-&gt;标签<br>
<img src="/content/images/2021/04/gitlab-remove-release-01-list-labels.png" alt="gitlab-remove-release-01-list-labels"></p>
</li>
<li>
<p>删除对应的标签，就能删除关联的发布了。</p>
</li>
</ol>
<p><img src="/content/images/2021/04/gitlab-remove-release-02-delete-label.png" alt="gitlab-remove-release-02-delete-label"></p>
<p><img src="/content/images/2021/04/gitlab-remove-release-03-confirm-delete-label.png" alt="gitlab-remove-release-03-confirm-delete-label"></p>
<h1 id="">其他</h1>
<p>这个方法同时也删掉了tag，如果想要保留tag，则需要用更复杂的方法了。</p>
<!--kg-card-end: markdown-->