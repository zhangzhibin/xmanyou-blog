---
title: "#阿里云# ECS服务器快速迁移"
description: "1小时搞定服务器迁移"
pubDate: 2019-07-23T15:09:34.000Z
author: "阿斌"
tags: ["阿里云", "开发笔记"]
tagSlugs: ["aliyun", "dev"]
draft: false
type: post
slug: "aliyun-ecs-copy-server-migration"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>最近服务器访问有点卡，不知道是不是因为配置太低，而跑的服务太多的缘故，于是决定整体迁移到另一台配置高一点的ESC服务器上。</p>
<p>由于两台ECS都是在阿里云上，所以整个迁移过程还是比较顺利的，耗时1个小时左右。</p>
<h2 id="">迁移步骤</h2>
<blockquote>
<p><strong>注意1</strong>：我的两台ECS，分别是ECS1，ESC2，是在同一个账号的两个区里。</p>
</blockquote>
<blockquote>
<p><strong>注意2</strong>：创建、复制和导入镜像的操作比较耗时，在等待的时候，可以同步进行后续不需要等待的操作，比如修改DNS。</p>
</blockquote>
<p>具体迁移步骤如下：</p>
<ol>
<li><strong>停机</strong></li>
</ol>
<p>先从阿里云ECS控制台，将要迁移的两台ECS都停止。</p>
<blockquote>
<p><strong>注意</strong>，目标服务器ECS2的内容先<strong>做好备份</strong>。</p>
</blockquote>
<ol start="2">
<li><strong>创建镜像</strong></li>
</ol>
<p>对ECS1创建镜像</p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_01.png" alt="aliyun_ecs_copy_01"></p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_02.png" alt="aliyun_ecs_copy_02"></p>
<ol start="3">
<li><strong>复制镜像</strong></li>
</ol>
<p>如果两台ECS服务器不在同一个区，则需要先把镜像复制到目标ECS所在的区域。</p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_03.png" alt="aliyun_ecs_copy_03"></p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_04.png" alt="aliyun_ecs_copy_04"></p>
<ol start="4">
<li><strong>导入镜像</strong></li>
</ol>
<p>由于是直接使用阿里云ECS生成的镜像，所以可以直接导入。</p>
<p>在目标ECS的控制面上，选择<strong>更换系统盘</strong></p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_05.png" alt="aliyun_ecs_copy_05"></p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_06.png" alt="aliyun_ecs_copy_06"></p>
<blockquote>
<p><strong>费用</strong>：因为镜像大小跟ECS2的系统盘大小一样，所以不需要扩容，费用为0。</p>
</blockquote>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_07.png" alt="aliyun_ecs_copy_07"></p>
<p>导入的时候，秘钥可以选择保留镜像的秘钥，这样就客户端不需要重新上传ssh key。</p>
<ol start="5">
<li><strong>修改DNS</strong></li>
</ol>
<p>在等待创建、复制和导入的过程中，可以进行一些配置上的操作。</p>
<p>比如修改DNS，把DNS指向新的服务器的ip。DNS的刷新也是需要时间的。提前改好，这样等迁移完毕，DNS也差不多准备好了。</p>
<ol start="6">
<li><strong>复制安全组策略</strong></li>
</ol>
<p>用导入导出工具，将ECS1的安全组策略复制到ECS2上。</p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_08.png" alt="aliyun_ecs_copy_08"></p>
<ol start="7">
<li>客户端<strong>清除相关known hosts</strong></li>
</ol>
<p>服务器启动以后，就可以从客户端尝试连接了。如果遇到known hosts的错误：</p>
<p><img src="/content/images/2019/07/aliyun_ecs_copy_10.png" alt="aliyun_ecs_copy_10"></p>
<p>可以打开~/.ssh/known_hosts文件，把里边ECS2的相关字段都删除。</p>
<p>重新连接，提示是否要把添加到list of known hosts里，选择yes。</p>
<p>连接成功。</p>
<ol start="8">
<li><strong>手动启动服务</strong></li>
</ol>
<p>如果你有什么服务是需要手动启动的，现在可以启动了。</p>
<ol start="9">
<li><strong>测试</strong></li>
</ol>
<p>测试一下这个服务器上的所有服务。</p>
<h2 id="">其他</h2>
<p>阿里云现在对镜像的保存是<strong>收费</strong>的（虽然不是很贵的样子），所以，如果后续测试没什么问题，也不需要备份的情况，可以考虑删掉。</p>
<!--kg-card-end: markdown-->