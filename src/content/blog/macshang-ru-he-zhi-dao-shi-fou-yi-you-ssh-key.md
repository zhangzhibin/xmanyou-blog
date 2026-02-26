---
title: "Mac上如何知道是否已有ssh key?"
description: "打开命令行，执行以下命令查找当前用户目录下的密钥\n\n> ls -al ~/.ssh\n\n\n如果有密钥，该命令会列出~/.ssh目录下所有的密钥文件，比如\n\n> id_dsa.pub\nid_ecdsa.pub\nid_ed25519.pub\nid_rsa.pub\n\n\n则说明密钥已经存在"
pubDate: 2018-03-21T08:38:19.000Z
author: "阿斌"
tags: ["开发笔记", "mac"]
draft: false
type: post
slug: "macshang-ru-he-zhi-dao-shi-fou-yi-you-ssh-key"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>打开命令行，执行以下命令查找当前用户目录下的密钥</p>
<blockquote>
<p>ls -al ~/.ssh</p>
</blockquote>
<p>如果有密钥，该命令会列出~/.ssh目录下所有的密钥文件，比如</p>
<blockquote>
<p>id_dsa.pub<br>
id_ecdsa.pub<br>
id_ed25519.pub<br>
id_rsa.pub</p>
</blockquote>
<p>则说明密钥已经存在</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->