---
title: "#gitlab 如何更改显示语言"
description: "通过账号设置修改显示语言"
pubDate: 2021-03-08T05:40:03.000Z
author: "阿斌"
tags: ["gitlab", "杂七杂八"]
tagSlugs: ["gitlab", "za-qi-za-ba"]
draft: false
type: post
slug: "gitlab-change-default-language-preference"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>截止2021年，根据gitlab官方的这个issue，gitlab暂时还不支持修改系统全局语言设置。</p>
<blockquote>
<p><a href="https://gitlab.com/gitlab-org/gitlab/-/issues/18924">https://gitlab.com/gitlab-org/gitlab/-/issues/18924</a></p>
</blockquote>
<p>原因是，他们的本地化工作还没有做完。<br>
<img src="/images/2021/03/gitlab-change-language-06.png" alt="gitlab-change-language-06"></p>
<p>但是，gitlab支持用户主动修改显示语言，可以通过账号设置来修改。<br>
具体步骤</p>
<ul>
<li>
<p>1). 右上角Settings菜单<br>
<img src="/images/2021/03/gitlab-change-language-01.png" alt="gitlab-change-language-01"></p>
</li>
<li>
<p>2). Preferences -&gt; Localization<br>
可以看到，默认的是English<br>
<img src="/images/2021/03/gitlab-change-language-02.png" alt="gitlab-change-language-02"></p>
</li>
<li>
<p>3). 打开列表，选择想要的语言，比如简体中文<br>
<img src="/images/2021/03/gitlab-change-language-03.png" alt="gitlab-change-language-03"></p>
</li>
<li>
<p>4). 保存<br>
<img src="/images/2021/03/gitlab-change-language-04.png" alt="gitlab-change-language-04"></p>
</li>
<li>
<p>5). 刷新页面或者重新登录<br>
<img src="/images/2021/03/gitlab-change-language-05.png" alt="gitlab-change-language-05"></p>
</li>
</ul>
<p>完成</p>
<!--kg-card-end: markdown-->