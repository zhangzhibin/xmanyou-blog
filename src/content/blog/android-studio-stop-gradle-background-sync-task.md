---
title: "如何中断Android Studio的Gradle后台同步任务"
description: "gradlew --stop 终止Gradle的后台任务"
pubDate: 2020-02-24T08:36:11.000Z
author: "阿斌"
tags: ["开发笔记", "android", "gradle"]
tagSlugs: ["dev", "android", "gradle"]
draft: false
type: post
slug: "android-studio-stop-gradle-background-sync-task"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Android Studio打开工程有时候会自动运行gradle的同步任务（sync）。当网络不好的时候，这个任务会花很长很长时间才能结束，而且往往是失败的。</p>
<p><img src="/content/images/2020/02/AndroidStudio_gradle_background_task.png" alt="AndroidStudio_gradle_background_task"></p>
<p>当同步任务在进行时，还没法进行别的操作:<br>
<img src="/content/images/2020/02/AndroidStudio_gradle_background_task_featrue_unavailable.png" alt="AndroidStudio_gradle_background_task_featrue_unavailable"></p>
<p>那么，有什么办法能够让gradle任务快点结束呢？</p>
<h2 id="">解决方法</h2>
<p>办法是在命令行里执行</p>
<pre><code>gradlew --stop
</code></pre>
<p><img src="/content/images/2020/02/AndroidStudio_gradle_stop_sync_task.png" alt="AndroidStudio_gradle_stop_sync_task"></p>
<!--kg-card-end: markdown-->