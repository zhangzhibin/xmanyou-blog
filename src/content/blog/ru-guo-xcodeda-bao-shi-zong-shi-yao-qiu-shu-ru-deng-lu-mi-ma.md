---
title: "如果XCode打包到手机上时总是要求输入登录密码"
description: "有什么解决办法呢？"
pubDate: 2017-12-13T14:58:16.000Z
author: "阿斌"
tags: ["杂七杂八", "mac"]
tagSlugs: ["za-qi-za-ba", "mac"]
draft: false
type: post
slug: "ru-guo-xcodeda-bao-shi-zong-shi-yao-qiu-shu-ru-deng-lu-mi-ma"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>像这样子：<br>
<img src="/content/images/2017/12/xcode_keychain_password.png" alt="xcode_keychain_password"></p>
<p>这是由于，你的开发者证书，默认是安装在KeyChain的系统组里，所以XCode需要你输入密码来访问这个证书，如下所示：</p>
<p><img src="/content/images/2017/12/Snip20171213_1.png" alt="Snip20171213_1"></p>
<p>想要不输入密码直接访问，你需要把证书从“<strong>系统</strong>”组复制到“<strong>登录</strong>”组。</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->