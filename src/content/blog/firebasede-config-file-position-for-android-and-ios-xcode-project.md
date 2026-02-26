---
title: "Firebase的配置文件要放在哪里？"
description: "Android需要放在App根目录下，而Xcode需要添加文件的引用。"
pubDate: 2019-11-05T02:27:56.000Z
author: "阿斌"
tags: ["开发笔记", "firebase"]
tagSlugs: ["dev", "firebase"]
draft: false
type: post
slug: "firebasede-config-file-position-for-android-and-ios-xcode-project"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>按照Firebase的文档，接入Firebase时，需要在工程里添加一个从Firebase网站下载的配置文件。</p>
<p>Android平台是一个.json文件，而iOS是一个.plist文件。</p>
<p>但是，不管是哪个文档，都没有提具体要把文件放在哪里。只有靠自己去试了。</p>
<h2 id="">答案</h2>
<p>经过测试，得到以下结论。</p>
<h3 id="1android">1.Android工程</h3>
<p>对于Android工程，配置文件要放在工程的App文件夹的根目录下，如图：</p>
<p><img src="/images/2019/11/Firebase_config_file_position_for_android_project.png" alt="Firebase_config_file_position_for_android_project"></p>
<h3 id="2xcode">2.XCode工程</h3>
<p>对于XCode工程，只需要将这个文件添加到工程里即可，不需要在意位置，如图：</p>
<p><img src="/images/2019/11/Firebase_config_file_position_for_ios_xcode_project2.png" alt="Firebase_config_file_position_for_ios_xcode_project"></p>
<h3 id="3">3. 注意事项</h3>
<p>注意不要修改这两个文件的名字，不然会找不到。</p>
<!--kg-card-end: markdown-->