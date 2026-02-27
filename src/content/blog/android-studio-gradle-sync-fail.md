---
title: "Android Studio通过gradle同步工程失败"
description: "解决方法居然是不用proxy？？？"
pubDate: 2020-02-25T02:32:54.000Z
author: "阿斌"
tags: ["开发笔记", "android", "gradle"]
tagSlugs: ["dev", "android", "gradle"]
draft: false
type: post
slug: "android-studio-gradle-sync-fail"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>最近遇到一个奇怪的问题，不确定是怎么出现的，但是记录一下解决的过程。</p>
<p>Android Studio 版本：3.4.1</p>
<p><img src="/content/images/2020/02/AndroidStudio_version.png" alt="AndroidStudio_version"></p>
<p>正常情况下，要想能够使用Android Studio来更新Android的各种插件，我们需要在Android Studio里配置proxy：</p>
<p><img src="/content/images/2020/02/AndroidStudio_http_proxy.png" alt="AndroidStudio_http_proxy"></p>
<p>这个配置很久以来一直都工作很正常，昨天突然就报错了<br>
<img src="/content/images/2020/02/AndroidStudio_sync_fail.png" alt="AndroidStudio_sync_fail"></p>
<p>奇怪了，明明给gradle配置了proxy，为什么会失败了呢？</p>
<p><img src="/content/images/2020/02/AndroidStudio_gradle_global_proxy.png" alt="AndroidStudio_gradle_global_proxy"></p>
<h2 id="">解决方法</h2>
<ol>
<li>禁用gradle代理<br>
<img src="/content/images/2020/02/AndroidStudio_gradle_global_proxy_disable.png" alt="AndroidStudio_gradle_global_proxy_disable"></li>
</ol>
<p>然后sync时，不要把Android Studio的proxy设置同步到gradle里，弹窗选择Cancel<br>
<img src="/content/images/2020/02/AndroidStudio_auto_proxy.png" alt="AndroidStudio_auto_proxy"></p>
<p>然后，就sync就成功了……<br>
<img src="/content/images/2020/02/AndroidStudio_sync_success.png" alt="AndroidStudio_sync_success"></p>
<p>禁用了代理，反而成功了？？？<br>
对。<br>
为什么？<br>
我不知道……</p>
<ol start="2">
<li>使用国内镜像<br>
这是一个比较安全的做法。</li>
</ol>
<pre><code>//        google()
//        jcenter()

   maven{ url 'https://maven.aliyun.com/repository/google'}
   maven{ url 'https://maven.aliyun.com/repository/gradle-plugin'}
   maven{ url 'https://maven.aliyun.com/repository/public'}
   maven{ url 'https://maven.aliyun.com/repository/jcenter'}
</code></pre>
<h2 id="">其他</h2>
<p>我又测试了一下，关闭Androi Studio自己代理，打开Sdk Manager，好像也一切正常……</p>
<p><img src="/content/images/2020/02/AndroidStudio_no_proxy.png" alt="AndroidStudio_no_proxy"></p>
<p><img src="/content/images/2020/02/AndroidStudio_sdk_site.png" alt="AndroidStudio_sdk_site"></p>
<p>先记录下来，后边又新发现再更新。</p>
<!--kg-card-end: markdown-->