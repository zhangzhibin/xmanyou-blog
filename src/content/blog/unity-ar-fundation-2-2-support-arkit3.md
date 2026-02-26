---
title: "#Unity# #ARKit3# Unity宣布支持ARKit3"
description: "Unity在官方博客宣布支持WWDC2019上发布的ARKit3."
pubDate: 2019-06-13T08:52:18.000Z
author: "阿斌"
tags: ["开发笔记", "Unity", "arkit", "AR 增强现实"]
draft: false
type: post
slug: "unity-ar-fundation-2-2-support-arkit3"
image: "/images/2019/06/Snip20190609_38-1.png"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p><strong>“ARKit3发布的第三天，Unity在官方博客宣布支持ARKit3。”</strong></p>
<p>6月3日，苹果在WWDC2019上发布了ARKit3，并展示了2个很炫酷的功能：</p>
<ol>
<li>动作捕捉</li>
</ol>
<p><img src="/images/2019/06/Snip20190609_39.png" alt="Snip20190609_39"></p>
<ol start="2">
<li>人物遮挡</li>
</ol>
<p><img src="/images/2019/06/Snip20190609_40.png" alt="Snip20190609_40"></p>
<p>没过几天，6月6日，著名游戏引擎Unity就在官方博客上高调宣布，<strong>AR Fundation</strong> 2.2 支持了ARKit3。</p>
<blockquote>
<p>原文地址：<a href="https://blogs.unity3d.com/2019/06/06/ar-foundation-support-for-arkit-3/">https://blogs.unity3d.com/2019/06/06/ar-foundation-support-for-arkit-3/</a></p>
</blockquote>
<p><img src="/images/2019/06/Snip20190609_42.png" alt="Snip20190609_42"></p>
<p>我们来一起围观一下，到底是怎么回事。</p>
<h1 id="1arf">1.首先，ARF 都支持了哪些功能。</h1>
<blockquote>
<p>（注：下文中用ARF作为Unity AR Fundation的简写。）</p>
</blockquote>
<h2 id="1">1).动作识别</h2>
<p>通过ARKit3，ARF可以在摄像机镜头中识别出2D或者3D人物形象。其中，</p>
<ul>
<li>2D人物检测，表现为包含了17个使用屏幕坐标的关节的对象。</li>
<li>3D人物检测，表现为包含了93个使用世界坐标的关节的对象。</li>
</ul>
<p>ARF为了这个新功能，加入了人体子系统（Human Body Subsystem）。</p>
<h2 id="2">2).人物遮挡</h2>
<p>ARF的人物子系统还提供了人物遮罩和深度分区图的信息。其中，遮罩分区图用来表示一个像素是否属于被识别出来的人物，而深度分区图则包含了每个像素与被识别出来的人物的距离信息。</p>
<p>通过这些信息，我们就可以渲染出被真实人物遮挡的3D内容。</p>
<h2 id="3">3).增强的人脸识别</h2>
<p>首先，有深度检测功能（TrueDepth）的前置摄像头，现在可以同时识别3个人脸。</p>
<p>另外一个增强是，现在可以同时打开前后摄像头了。也就是说，你可以一边通过前置摄像头来识别人脸，一边通过后置摄像头进行环境识别，然后通过脸部的表情，来控制后置摄像头显示的环境中的虚拟角色的表情。</p>
<h2 id="4">4).多人协作</h2>
<p>ARF 允许多个设备实时交换各自的AR特征点信息，从而实现多人AR协作。</p>
<h2 id="5">5).其他</h2>
<p>大幅提高了图片识别和物体识别的准确率和性能，并且支持同时识别100张图片。</p>
<p>物体识别功能，现在更稳定了，并且可以在更加复杂的环境中进行。</p>
<p>最后，环境探测功能现在可以提供HDR信息了。</p>
<h1 id="2">2.开发文档</h1>
<ul>
<li><a href="https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@latest?preview=1">AR Foundation</a></li>
</ul>
<p><a href="https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@latest?preview=1">https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@latest?preview=1</a></p>
<ul>
<li><a href="https://docs.unity3d.com/Packages/com.unity.xr.arkit@latest?preview=1">ARKit XR Plugin</a></li>
</ul>
<p><a href="https://docs.unity3d.com/Packages/com.unity.xr.arkit@latest?preview=1">https://docs.unity3d.com/Packages/com.unity.xr.arkit@latest?preview=1</a></p>
<ul>
<li><a href="https://docs.unity3d.com/Packages/com.unity.xr.arkit-face-tracking@latest?preview=1">ARKit Face Tracking</a></li>
</ul>
<p><a href="https://docs.unity3d.com/Packages/com.unity.xr.arkit-face-tracking@latest?preview=1">https://docs.unity3d.com/Packages/com.unity.xr.arkit-face-tracking@latest?preview=1</a></p>
<h1 id="3">3.示例</h1>
<p><a href="https://github.com/Unity-Technologies/arfoundation-samples">Github ARF 示例 </a></p>
<p><a href="https://github.com/Unity-Technologies/arfoundation-samples">https://github.com/Unity-Technologies/arfoundation-samples</a></p>
<h1 id="4">4.支持哪些设备</h1>
<p>以上功能，需要A12芯片和苹果什么神经网络支持的设备才能使用。</p>
<p><img src="/images/2019/06/Snip20190610_46.png" alt="Snip20190610_46"></p>
<p>也就是说，必须要<strong>XR以上的设备</strong>才行，X都不行！</p>
<p><em>精不精彩？</em></p>
<p><em>惊不惊喜？</em></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->