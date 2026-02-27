---
title: "#ARKit# ARKit图片检测新手教程"
description: "本教程包含：如何用ARKit进行图片识别，如何添加自定义识别图，以及持续显示识别图的功能。"
pubDate: 2019-06-05T04:28:19.000Z
author: "阿斌"
tags: ["开发笔记", "arkit", "AR 增强现实"]
tagSlugs: ["dev", "arkit", "ar"]
draft: false
type: post
slug: "arkit-image-detection-tutorial"
image: "/content/images/2019/06/Snip20190604_20-2.png"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>WWDC2019发布了ARKit3.0， 如果你对ARKit不是很了解，想尝试一下，本文将引导你实现ARKit的图片识别功能。</p>
<h3 id="">测试例子</h3>
<p>下载Apple官方的例子：</p>
<p><a href="https://developer.apple.com/documentation/arkit/detecting_images_in_an_ar_experience">官方示例下载地址</a></p>
<p>下载完，用XCode打开，就可以正常测试了。详细细节，可以参考上边的链接，或者例子中的README.md</p>
<p>测试用的图片在工程的Resouces/Assets.xcassets目录下。</p>
<p><img src="/content/images/2019/06/Snip20190605_30.png" alt="ARKit3教程"></p>
<h3 id="">添加自定义识别图</h3>
<h4 id="">步骤</h4>
<p>文档里有详细步骤，简单来说就是：</p>
<ol>
<li>在Assets.xcassets添加一个新的资源，类型为AR Reference Image</li>
</ol>
<p><img src="/content/images/2019/06/Snip20190605_33.png" alt="ARKit3教程"></p>
<ol start="2">
<li>
<p>把新的识别图拖到这个新资源里</p>
</li>
<li>
<p>选中新添加的资源，为它设置资源名字和物理尺寸</p>
</li>
</ol>
<p><img src="/content/images/2019/06/Snip20190605_34.png" alt="ARKit3教程"></p>
<p>注意，这里的尺寸设置的越精确越好。ARKit需要利用这个尺寸来计算物理距离。</p>
<p>完成！</p>
<h4 id="">警告</h4>
<p>慢，如果只是这样子，你会发现在新图片上有个警告图标：</p>
<p><img src="/content/images/2019/06/Snip20190605_23.png" alt="ARKit3教程"></p>
<p>错误信息：<br>
<strong>Assets.xcassets: warning: Ambiguous Content: The AR reference image &quot;&quot; has an unassigned child.</strong></p>
<p>如果忽略这个警告，直接测试，则会发现无法识别这个图。</p>
<h4 id="">修复错误</h4>
<p>那么这个错误该怎么修复呢？</p>
<p>到这个图片所在的目录下，找到Contents.json文件</p>
<p><img src="/content/images/2019/06/Snip20190605_28.png" alt="ARKit3教程"></p>
<p>注意，XCode默认是不显示这个文件的。</p>
<p>用文本编辑器打开</p>
<p><img src="/content/images/2019/06/Snip20190605_24.png" alt="ARKit3教程"></p>
<pre><code>{
  &quot;images&quot; : [
    
  ],
  &quot;info&quot; : {
    &quot;version&quot; : 1,
    &quot;author&quot; : &quot;xcode&quot;
  },
  &quot;properties&quot; : {
    &quot;width&quot; : 10,
    &quot;unit&quot; : &quot;centimeters&quot;
  }
}
</code></pre>
<p>如果对比例子中自带图片的Contents.json文件，你会发现有一个很大的区别：</p>
<p><img src="/content/images/2019/06/Snip20190605_36.png" alt="ARKit3教程"></p>
<pre><code>{
  &quot;images&quot;:[
      {&quot;idiom&quot;:&quot;universal&quot;,&quot;filename&quot;:&quot;imac-27.jpg&quot;}
  ],
  &quot;info&quot;:{
      &quot;version&quot;:1,
      &quot;author&quot;:&quot;xcode&quot;
  },
  &quot;properties&quot;:{
      &quot;width&quot;:23.439,
      &quot;unit&quot;:&quot;inches&quot;
  }
}
</code></pre>
<p>对比发现，自动生成的Contents.json文件中，images数组是空的。</p>
<p>需要<strong>手动添加图片的信息</strong>，像这样：</p>
<p><img src="/content/images/2019/06/Snip20190605_25.png" alt="ARKit3教程"></p>
<pre><code>{
  &quot;images&quot; : [
    {&quot;idiom&quot;:&quot;universal&quot;,&quot;filename&quot;:&quot;unitylogo.jpg&quot;}
  ],
  &quot;info&quot; : {
    &quot;version&quot; : 1,
    &quot;author&quot; : &quot;xcode&quot;
  },
  &quot;properties&quot; : {
    &quot;width&quot; : 10,
    &quot;unit&quot; : &quot;centimeters&quot;
  }
}
</code></pre>
<p>这时候，XCode里的警告就消失了。</p>
<p><img src="/content/images/2019/06/Snip20190605_30-1.png" alt="ARKit3教程"></p>
<p>打包测试，也能正常识别图片了。</p>
<h3 id="">持续显示识别图</h3>
<p>官方例子中，识别图被识别出来以后，高亮显示了一下，然后就消失了。怎么样才能持续显示呢？</p>
<p>需要修改一下显示的动画。</p>
<p>找到ViewController.swift文件，修改imageHighlightAction方法：</p>
<p><img src="/content/images/2019/06/Snip20190605_37.png" alt="ARKit3教程"></p>
<pre><code>// 文件：ViewController.swift
    var imageHighlightAction: SCNAction {
//        return .sequence([
//            .wait(duration: 0.25),
//            .fadeOpacity(to: 0.85, duration: 0.25),
//            .fadeOpacity(to: 0.15, duration: 0.25),
//            .fadeOpacity(to: 0.85, duration: 0.25),
//            .fadeOut(duration: 0.5),
//            .removeFromParentNode()
//        ])
        return .sequence([
            .wait(duration: 0.25),
            .fadeOpacity(to: 0.85, duration: 0.25),
            .fadeOpacity(to: 0.15, duration: 0.25),
            .fadeOpacity(to: 0.85, duration: 0.25)
            ])
    }
</code></pre>
<p>测试，完成！</p>
<p><img src="/content/images/2019/06/WechatIMG15.jpeg" alt="ARKit3教程"></p>
<h4 id="">代码工程</h4>
<p><a href="https://github.com/zhangzhibin/ARKitImageDetection">https://github.com/zhangzhibin/ARKitImageDetection</a></p>
<h3 id="">后续</h3>
<p>更多内容，欢迎关注我的公众号：耿直的IT男阿斌<br>
<img src="/content/images/2019/06/qrcode_for_unitymvp.jpg" alt="qrcode_for_unitymvp"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->