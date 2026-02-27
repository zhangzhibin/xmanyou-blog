---
title: "Cocos Creator 报错：The sandbox is not in sync with the Podfile.lock. Run 'pod install' or update your CocoaPods installation."
description: "用CocoaPods接入Firebase、Admob等SDK时，遇到的奇怪错误。"
pubDate: 2019-11-05T15:27:00.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发", "xcode", "CocoaPods"]
tagSlugs: ["dev", "cocos-creator", "h5", "xcode", "cocoapods"]
draft: false
type: post
slug: "the-sandbox-is-not-in-sync-with-the-podfile-lock-run-pod-install-or-update-your-cocoapods-installation"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Cocos Creator项目，在iOS平台上接入Firebase、Admob等SDK时，使用Cocoapod来添加相关的库，安装一切顺利，但是编译时却报错：</p>
<p>The sandbox is not in sync with the Podfile.lock. Run 'pod install' or update your CocoaPods installation.</p>
<p><img src="/content/images/2019/11/CocosCreator_cocoapod_build_error.png" alt="CocosCreator_cocoapod_build_error"></p>
<h2 id="">解决方法</h2>
<ol>
<li>按照提示，运行 “pod install”，或者 “pod update”</li>
</ol>
<p>发现还是不行。</p>
<ol start="2">
<li>仔细观察错误信息，发现有奇怪的路径</li>
</ol>
<pre><code>diff: /Podfile.lock: No such file or directory
diff: /Manifest.lock: No such file or directory
</code></pre>
<p>去根目录找文件？似乎不太对劲。</p>
<ol start="3">
<li>查看编译出错的步骤，发现有2个环境变量好像没有设置</li>
</ol>
<p><img src="/content/images/2019/11/CocosCreator_cocoapod_build_error02.png" alt="CocosCreator_cocoapod_build_error02"></p>
<ol start="4">
<li>回想起pod install时，有一些没仔细看的警告</li>
</ol>
<pre><code>[!] CocoaPods did not set the base configuration of your project because your project already has a custom config set. In order for CocoaPods integration to work at all, please either set the base configurations of the target `ColorUp-mobile` to `Target Support Files/Pods-ColorUp-mobile/Pods-ColorUp-mobile.debug.xcconfig` or include the `Target Support Files/Pods-ColorUp-mobile/Pods-ColorUp-mobile.debug.xcconfig` in your build configuration (`ios/UserConfigIOS.debug.xcconfig`).

[!] CocoaPods did not set the base configuration of your project because your project already has a custom config set. In order for CocoaPods integration to work at all, please either set the base configurations of the target `ColorUp-mobile` to `Target Support Files/Pods-ColorUp-mobile/Pods-ColorUp-mobile.release.xcconfig` or include the `Target Support Files/Pods-ColorUp-mobile/Pods-ColorUp-mobile.release.xcconfig` in your build configuration (`ios/UserConfigIOS.release.xcconfig`).
</code></pre>
<p><img src="/content/images/2019/11/CocoasPods_warning.png" alt="CocoasPods_warning"></p>
<p>如果打开这些.xcconfig文件的话，可以看到 PODS_PODFILE_DIR_PATH 和 PODS_ROOT 的定义。</p>
<pre><code>PODS_PODFILE_DIR_PATH = ${SRCROOT}/.
PODS_ROOT = ${SRCROOT}/Pods
</code></pre>
<p><img src="/content/images/2019/11/CocosCreator_cocoapod_build_error04.png" alt="CocosCreator_cocoapod_build_error04"></p>
<ol start="5">
<li>把pod对应的.xcconfig添加到Cocos Creator的.xcconfig里</li>
</ol>
<p><img src="/content/images/2019/11/CocosCreator_cocoapod_build_error03.png" alt="CocosCreator_cocoapod_build_error03"></p>
<pre><code>// Configuration settings file format documentation can be found at:
// https://help.apple.com/xcode/#/dev745c5c974

#include &quot;/Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/platform/ios/CCModuleConfigIOS.debug.xcconfig&quot;

// 添加这一行
#include &quot;../Pods/Target Support Files/Pods-ColorUp-mobile/Pods-ColorUp-mobile.debug.xcconfig&quot;

</code></pre>
<ol start="6">
<li>编译，搞定。</li>
</ol>
<!--kg-card-end: markdown-->