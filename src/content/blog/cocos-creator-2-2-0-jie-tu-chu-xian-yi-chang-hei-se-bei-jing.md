---
title: "#Cocos Creator 2.2.0 截图出现异常黑色背景"
description: "又一个升级后产生的问题，以后别说“完全兼容”了好么？"
pubDate: 2019-11-28T06:23:50.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
draft: false
type: post
slug: "cocos-creator-2-2-0-jie-tu-chu-xian-yi-chang-hei-se-bei-jing"
---

<!--kg-card-begin: markdown--><h2 id="2020116">2020.1.16 更新</h2>
<p>经过一番测试，Cocos Creator 2.2.x改变了相机的渲染方式。</p>
<p><strong>正确截图</strong>并不需要不开启3D功能</p>
<p>1). 如果是全屏的截图，则继续沿用的旧的代码，直接将RenderTexture的size设置为屏幕大小即可。<br>
2). 如果是截取特定范围内的内容，<br>
首先，RenderTexture使用屏幕尺寸<br>
其次，只读取RenderTexture指定范围的像素点<br>
最后，将像素信息转换为Image</p>
<h3 id="">参考代码</h3>
<pre><code>// 1. 设定RenderTexture的大小为全屏
let winSize = cc.winSize;
renderTexture.initWithSize(winSize.width, winSize.height, cc.game[&quot;_renderContext&quot;].STENCIL_INDEX8);

// 2. 获取指定区域的像素点信息
let size = this.offscreenNode.getContentSize();
let pixels = new Uint8Array(size.width * size.height * 4);
let x = renderTexture.width/2 - this.offscreenNode.width/2;
let y = renderTexture.height/2 - this.offscreenNode.height/2;
let w = this.offscreenNode.width;
let h = this.offscreenNode.height;
renderTexture.readPixels(pixels, x, y, w, h);

// 3. 将pixels信息转换为image

</code></pre>
<h2 id="">问题背景</h2>
<p>Cocos Creator 2.0.x 原本工作正常的截图功能</p>
<blockquote>
<p>代码参考 《#Cocos Creator# 截图功能代码》 <a href="https://xmanyou.com/cocos-creator-jie-tu-gong-neng-dai-ma/">https://xmanyou.com/cocos-creator-jie-tu-gong-neng-dai-ma/</a></p>
</blockquote>
<p>升级到2.2.0以后发现截图出现了问题。</p>
<p>截图的分辨率还是正常的，但是，实际的图像尺寸被缩小了很多，外围还增加了很多黑色块（背景色）</p>
<p>旧的截图是这样子：</p>
<p><img src="/images/2019/11/kitty-petting-1.jpg" alt="kitty-petting-1"></p>
<p>新的截图变成了这样子：<br>
<img src="/images/2019/11/kitty-petting-3.jpg" alt="kitty-petting-3"></p>
<h2 id="">解决方法</h2>
<h3 id="">猜想</h3>
<p>为什么会这样子呢？</p>
<p>这个截图非常像是在Unity中调整摄像机参数时看到的情况。</p>
<p>联想到 Cocos Creator在2.1.x版本后添加了3D功能，是否是因为摄像机的3D功能造成的影响呢？</p>
<h3 id="">测试</h3>
<p>于是打开截图用的Camera的3D属性，进行测试。</p>
<p><img src="/images/2019/11/Kitty-Petting-Cocos-Camera-3D.png" alt="Kitty-Petting-Cocos-Camera-3D"></p>
<p><strong>结果我直接被整蒙了……</strong></p>
<p>因为，打开3D选项，什么都不改的情况下，截图直接就黑屏了……</p>
<p><img src="/images/2019/11/kitty-petting-2.jpg" alt="kitty-petting-2"></p>
<h3 id="">检查</h3>
<p>深呼吸，淡定，再淡定~</p>
<p>先检查了一下，相机的类型和参数：</p>
<p><strong>Ortho=true</strong><br>
表示是正交投影相机，对于2D游戏来说，没问题。</p>
<p><strong>Near Plane=1</strong><br>
摄像机的近剪裁面是1？<br>
2D场景的节点应该都是在0吧……是不是这个导致元素都没有被渲染呢？</p>
<p><strong>Ortho Size=10</strong><br>
这个是摄像机在正交投影模式下的视窗大小</p>
<h3 id="">调试</h3>
<p>把Near Plane改成0以后，终于能截图成功了：</p>
<p><img src="/images/2019/11/kitty-petting-5.jpg" alt="kitty-petting-5"></p>
<p>不过还是有点问题，还需要调整Ortho Size参数。</p>
<h2 id="">结论</h2>
<p>经过一番测试，调整成以下参数后，截图基本正常了。</p>
<p><strong>Near Plane=0</strong><br>
<strong>Ortho Size=150</strong></p>
<p><img src="/images/2019/11/Kitty-Petting-Cocos-Camera-3D-param.png" alt="Kitty-Petting-Cocos-Camera-3D-param"></p>
<p>最新的截图基本跟旧版截图一致了。<br>
<img src="/images/2019/11/kitty-petting-4.jpg" alt="kitty-petting-4"></p>
<!--kg-card-end: markdown-->