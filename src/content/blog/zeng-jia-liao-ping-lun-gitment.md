---
title: "感谢Gitment，可以评论了"
description: "使用gitment做为ghost的评论系统"
pubDate: 2018-04-11T15:39:19.000Z
author: "影子工作室"
tags: ["ghost", "gitment"]
tagSlugs: ["ghost-tag", "gitment"]
draft: false
type: post
slug: "zeng-jia-liao-ping-lun-gitment"
authorSlug: "team"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p><img src="/images/2018/04/Snip20180411_38.png" alt="Snip20180411_38"><br>
虽然可能大概也没有什么人会评论，但是，没有这个入口，一直让我觉得缺了点什么。就像《大腕》里说的：<strong>只许你说不看，不许你说收不着</strong>。</p>
<p>ghost一直没有官方的评论系统，只好上网找现成的，本来想用duoshuo的，结果居然被和谐了……<br>
然后，居然搜到一个gitment，利用github的issue系统来做评论，真是绝妙的主意。<br>
而且，这个居然是国人做的。</p>
<blockquote>
<p>作者网站：<a href="https://imsun.net/posts/gitment-introduction/">https://imsun.net/posts/gitment-introduction/</a></p>
</blockquote>
<p>使用方法也挺简单的。步骤如下：</p>
<ol>
<li>到github注册一个<strong>OAuth Application</strong>：</li>
</ol>
<blockquote>
<p><a href="https://github.com/settings/applications/new">https://github.com/settings/applications/new</a><br>
注意授权回调地址要写我们的网站地址<br>
记下 <strong>client_id</strong> 和 <strong>client_secret</strong>，等下要用到。</p>
</blockquote>
<ol start="2">
<li>到github上创建一个用来保存评论的repo，等下要用到。</li>
<li>ghost模板里引用gitment。<br>
为了方便在多个地方引用，首先添加一个gitment.hbs</li>
</ol>
<pre><code>&lt;div id=&quot;gitment&quot; class=&quot;gitment&quot;&gt;&lt;/div&gt;
&lt;!-- 加载gitment --&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://imsun.github.io/gitment/style/default.css&quot;&gt;
&lt;script src=&quot;https://imsun.github.io/gitment/dist/gitment.browser.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
var gitment = new Gitment({
  id: '{{date format=&quot;YYYYMMDDHHmmss&quot;}}',
  owner: '你的github账号',
  repo: '你用来保存评论的github repo',
  oauth: {
    client_id: '第一步里的client_id',
    client_secret: '第一步里的client_secret',
  },
})
gitment.render('gitment')
&lt;/script&gt;
</code></pre>
<p>然后在想要添加的模板里添加引用，我是添加到post.hbs和page.hbs里了：</p>
<pre><code>{{&gt; gitment}}
</code></pre>
<ol start="4">
<li>上传更新theme</li>
<li>刷新博客文章页面，就能看到文章底部增加了一个等待初始化评论框，这时候还不能评论<br>
<img src="/images/2018/04/Snip20180411_39.png" alt="Snip20180411_39"></li>
<li>初始化评论功能<br>
点击Initialize Comments按钮，没出现什么错误的话，就可以评论了。</li>
</ol>
<p><strong>注意</strong><br>
如果遇到Validation Failed<br>
<img src="/images/2018/04/Snip20180411_37.png" alt="Snip20180411_37"></p>
<p>这是因为默认评论是使用地址作为评论的id，一般会超过50个字符。所以，我改了一下，使用日期来做id：</p>
<pre><code>var gitment = new Gitment({
  id: '{{date format=&quot;YYYYMMDDHHmmss&quot;}}', &lt;===== 改成用日期做为id
  owner: 'zhangzhibin',
  repo: 'gitment.xmanyou.com',
  oauth: {
    client_id: 'b1c1684c123ac08d73b6',
    client_secret: 'a15164293704fc42cecddfa0e5dbd134f975ea4b',
  },
})
</code></pre>
<p><strong>注意2</strong><br>
评论者显然必须登录github账号。这样也好，比较容易就屏蔽垃圾留言。</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->