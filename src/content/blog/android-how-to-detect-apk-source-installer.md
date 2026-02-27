---
title: "#安卓 查询应用的安装来源"
description: "想要看看应用是否被抓包，可以试试这个方法。"
pubDate: 2021-07-06T04:26:01.000Z
author: "阿斌"
tags: ["安卓", "开发笔记"]
tagSlugs: ["an-zhuo", "dev"]
draft: false
type: post
slug: "android-how-to-detect-apk-source-installer"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>最近游戏中接入了统计工具，但是发现安装量远比谷歌商店后台统计的要多。更重要的是，这些安装中，有相当一部分是旧版本的。于是，怀疑是不是有被抓包的情况。</p>
<p>这就需要统计应用的安装来源。</p>
<h1 id="">解决方法</h1>
<p>通过packageManager可以获取相关信息：</p>
<ul>
<li>PackageManager.getInstallerPackageName(String)</li>
<li>PackageManager.getInstallSourceInfo(String)</li>
</ul>
<p>代码如下：</p>
<pre><code>    // 查询安装来源
    public static String checkInstaller(Context context){
        final String packageName = context.getPackageName();
        final String installer = context.getPackageManager().getInstallerPackageName(context.getPackageName());

        Log.d(TAG, &quot;checkInstaller: package = &quot; + packageName + &quot;, installer = &quot; + installer);

        if(installer == null){
            return &quot;null&quot;;
        }

        return installer;
    }
</code></pre>
<h2 id="">测试</h2>
<ul>
<li>1). 如果是从Android Studio中直接安装，则installer为 null</li>
<li>2). 如果将apk复制到手机上，然后再安装，则installer为 com.android.packageinstaller</li>
<li>3). 如果是从google play商店安装，则installer 可能为 com.android.vending（待上线确认）</li>
</ul>
<p><img src="/content/images/2021/07/android-how-to-detect-apk-source-installer.png" alt="android-how-to-detect-apk-source-installer"></p>
<!--kg-card-end: markdown-->