---
title: "Android平台代号、版本、API 级别和 NDK 版本的对照表"
description: "速查，搬运自官方。"
pubDate: 2020-08-18T08:06:32.000Z
author: "阿斌"
tags: ["开发笔记", "android"]
tagSlugs: ["dev", "android"]
draft: false
type: post
slug: "android-build-api-level-ndk-table"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">官方文档</h1>
<p><a href="https://source.android.com/setup/start/build-numbers">https://source.android.com/setup/start/build-numbers</a></p>
<h1 id="">对照表</h1>
<p><img src="/content/images/2020/08/Android_version_build_ndk_table_01.png" alt="Android_version_build_ndk_table_01"></p>
<p><img src="/content/images/2020/08/Android_version_build_ndk_table_02.png" alt="Android_version_build_ndk_table_02"></p>
<h1 id="">版本号格式</h1>
<h2 id="android800oreo">Android 8.0.0(Oreo以后）</h2>
<p>在 Android 8.0.0 (Oreo) 及更高版本中，每个 build 均采用 build ID 格式 PVBB.YYMMDD.bbb[.Cn] 进行标识，其中：</p>
<ul>
<li>P 表示平台版本代号的第一个字母，例如 O 表示 Oreo。</li>
<li>V 表示支持的行业。按照惯例，P 表示主要平台分支。</li>
<li>BB 是由字母和数字组成的代码，Google 可通过该代码识别 build 所属的确切代码分支。</li>
<li>YYMMDD 表示相应版本从开发分支细分出来或与开发分支同步的日期。它并不一定是 build 的确切构建日期，因为 Google 常常会在现有 build 中增加细微的更改，并在新 build 中重复使用与现有 build 相同的日期代码。</li>
<li>bbb 表示具有相同日期代码的不同版本，从 001 开始。</li>
<li>Cn 是可选的字母数字，表示在现有 PVBB.YYMMDD.bbb build 之上构建的修补程序，从 A1 开始。</li>
</ul>
<h2 id="android">早期Android</h2>
<p>早期 Android 版本采用另一种较短的 build ID 代码（例如 FRF85B），其中：</p>
<ul>
<li>第一个字母代表版本系列的代号，例如 F 表示 Froyo。</li>
<li>第二个字母是分支代码，Google 用它来表示 build 所属的确切代码分支。按照惯例，R 表示主要版本分支。</li>
<li>第三个字母和后面的两个数字是日期代码。字母表示季度（A 表示 2009 年第 1 季度，F 表示 2010 年第 2 季度，以此类推）。两个数字表示相应季度内的第几天（F85 表示 2010 年 6 月 24 日）。日期代码并不一定是 build 的确切构建日期，因为 Google 常常会在现有 build 中增加细微的更改，并在新 build 中重复使用与现有 build 相同的日期代码。</li>
<li>末尾字母表示具有相同日期代码的不同版本，从 A 开始（A 并不会显示，通常会为了简洁而省略）。</li>
</ul>
<!--kg-card-end: markdown-->