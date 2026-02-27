---
title: "Android 震动代码参考"
description: "代码参考"
pubDate: 2020-12-21T08:38:11.000Z
author: "阿斌"
tags: ["android", "开发笔记"]
tagSlugs: ["android", "dev"]
draft: false
type: post
slug: "android-vibration-code"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">代码解析</h2>
<ul>
<li>第一步，先保存一个Context, Application或者Activity都可以</li>
<li>第二步，通过getSystemService方法获取Vibrator对象</li>
<li>第三步，对不同的系统版本调用不同的API</li>
</ul>
<p><strong>注意</strong> 手机上需要打开震动开关，否则会觉得没有效果。</p>
<h2 id="">代码参考</h2>
<pre><code>public static void vibrate(int miniseconds){
    if(_app == null){
        return;
    }

    Vibrator v = (Vibrator) _app.getSystemService(Context.VIBRATOR_SERVICE);
    if(v == null){
        return;
    }

    if (Build.VERSION.SDK_INT &gt;= Build.VERSION_CODES.O) {
        v.vibrate(VibrationEffect.createOneShot(miniseconds, VibrationEffect.DEFAULT_AMPLITUDE));
    } else {
        //deprecated in API 26
        v.vibrate(miniseconds);
    }
}

</code></pre>
<!--kg-card-end: markdown-->