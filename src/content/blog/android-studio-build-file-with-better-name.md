---
title: "#Android 如何让打包出来的apk或者aab文件名更有规律?"
description: "修改gradle设置可以让输出的文件更有规律可追踪。"
pubDate: 2021-07-16T06:35:54.000Z
author: "阿斌"
tags: ["android", "开发笔记"]
tagSlugs: ["android", "dev"]
draft: false
type: post
slug: "android-studio-build-file-with-better-name"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Android Studio中，打包项目时，不论是debug还是release，不管是apk还是未来的aab，文件名一般都是很没有辨识度的，例如</p>
<ul>
<li>app-debug.apk</li>
<li>app-release.apk</li>
<li>app.aab</li>
</ul>
<p>有什么办法让文件名更有规律一点呢？比如带上版本号之类的。</p>
<h2 id="">解决方法</h2>
<p>一般使用gradle工具进行打包，通过修改build.gradle可以修改输出包的名字。<br>
有两种做法：</p>
<h3 id="1outputfilename">方法1. 设置outputFileName</h3>
<p><strong>示例</strong></p>
<pre><code>applicationVariants.all {
        outputs.forEach { output -&gt;
            if (output is com.android.build.gradle.internal.api.BaseVariantOutputImpl) {
                output.outputFileName =
                    &quot;${applicationId}-v${versionName}(${this.versionCode})-${name}.${output.outputFile.extension}&quot;
            }
        }
    }
</code></pre>
<p><strong>输出结果</strong></p>
<pre><code>com.example.sampleproject-v1.0.0(101)_release.apk
</code></pre>
<p><strong>需要注意的是</strong><br>
这个设置只对apk有效，对于app bundle，也就是谷歌马上要强制推行的aab文件是无效的。</p>
<p>需要使用下一个方案。</p>
<h3 id="2archivesbasename">方法2. 设置archivesBaseName</h3>
<p>archivesBaseName的话，只是最终输出文件的基本名，不含文件后缀，所以，可以对任何输出结果都有效。</p>
<p><strong>示例</strong></p>
<pre><code>android {
  ...
  defaultConfig {
    ...
    setProperty(&quot;archivesBaseName&quot;, &quot;${applicationId}-v${versionName}(${versionCode})&quot;)
  }
}
</code></pre>
<p><strong>输出结果</strong></p>
<pre><code>com.example.sampleproject-v1.0.0(101)-release.apk
或者
com.example.sampleproject-v1.0.0(101).aab
</code></pre>
<p>如果想要把git提交的commit号也添加到输出文件里，可以用以下设置</p>
<pre><code>def gitCommit = &quot;git rev-parse --short HEAD&quot;.execute().text.trim()

archivesBaseName = &quot;${defaultConfig.applicationId}-${defaultConfig.versionName}v${defaultConfig.versionCode}-${gitCommit}&quot;

println 'outputFileName: after = ' + archivesBaseName
</code></pre>
<p>完美。</p>
<h2 id="">参考</h2>
<ul>
<li><a href="https://medium.com/@giorgos.neokleous93/name-your-apk-aab-files-3cf3d123a48c">https://medium.com/@giorgos.neokleous93/name-your-apk-aab-files-3cf3d123a48c</a></li>
<li><a href="https://stackoverflow.com/questions/52508720/how-to-change-the-generated-filename-for-app-bundles-with-gradle">https://stackoverflow.com/questions/52508720/how-to-change-the-generated-filename-for-app-bundles-with-gradle</a></li>
</ul>
<h2 id="">示例</h2>
<script src="https://gist.github.com/zhangzhibin/26cbcc017c6ac599074617937f5a3834.js"></script><!--kg-card-end: markdown-->