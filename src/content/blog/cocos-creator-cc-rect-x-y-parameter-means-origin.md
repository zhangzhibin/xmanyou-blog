---
title: "#Cocos Creator# 用cc.rect创建Rect矩形"
description: "cc.rect中的xy参数是指哪个位置？"
pubDate: 2019-08-29T14:46:45.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-cc-rect-x-y-parameter-means-origin"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Cocos的文档有时候写的有点太简单了，比如cc.rect</p>
<p>对参数的描述完全没有用，作为有点健忘的中年程序员来说，真是有点为难。</p>
<pre><code>	/**
	!#en
	The convenience method to create a new Rect.
	see {{#crossLink &quot;Rect/Rect:method&quot;}}cc.Rect{{/crossLink}}
	!#zh
	该方法用来快速创建一个新的矩形。{{#crossLink &quot;Rect/Rect:method&quot;}}cc.Rect{{/crossLink}}
	@param x x
	@param y y
	@param w w
	@param h h
	
	@example 
	```js
	var a = new cc.Rect(0 , 0, 10, 0);
	``` 
	*/
	export function rect(x?: number, y?: number, w?: number, h?: number): Rect;	
</code></pre>
<p><img src="/content/images/2019/08/CocosCreator_cc_rect_x_y_parameter_means_origin.png" alt="CocosCreator_cc_rect_x_y_parameter_means_origin"></p>
<h2 id="">做个笔记</h2>
<p><strong>这里的x和y指的是矩形的左下角，也就是origin，或者(minX, minY)。</strong></p>
<!--kg-card-end: markdown-->