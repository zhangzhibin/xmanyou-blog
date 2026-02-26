---
title: "#Cocos Creator# 序列化自定义类报错：Can not serialize 'xxx' because the specified type is anonymous, please provide a class name"
description: "想在Cocos Creator的场景编辑器的使用自定义的ccclass子类，却遇到这个奇葩的错误：\n\nCan not serialize 'BalancePlayground.testRulers' \nbecause the specified type is anonymous, \nplease provide a "
pubDate: 2019-02-26T10:54:49.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator", "typescript", "ccclass"]
tagSlugs: ["dev", "h5", "cocos-creator", "typescript", "ccclass"]
draft: false
type: post
slug: "cocos-creator-ccclass-name"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>想在Cocos Creator的场景编辑器的使用自定义的ccclass子类，却遇到这个奇葩的错误：</p>
<pre><code>Can not serialize 'BalancePlayground.testRulers' 
because the specified type is anonymous, 
please provide a class name 
or 
set the 'serializable' attribute of 'BalancePlayground.testRulers' to 'false'.
</code></pre>
<p>同时，在编辑器的属性检查器里，无法正常显示该类的属性值：<br>
<img src="/images/2019/02/Snip20190226_8.png" alt="Snip20190226_8"></p>
<p>这是为什么呢？</p>
<p>这个错误描述是相当的容易误会。</p>
<p>上代码，原始出错的代码(TypeScript)：</p>
<pre><code>// 定义
@ccclass
export default class RulerConfig {
    @property(&quot;number&quot;)
    height:number = 0;
    @property(cc.SpriteFrame)
    photo:cc.SpriteFrame = undefined;
    @property(&quot;string&quot;)
    desc:string = &quot;&quot;;
}

// 引用
...
    @property(RulerConfig)
    testRulers:Array&lt;RulerConfig&gt; = [];
...
</code></pre>
<p>修改方法<br>
在定义的地方，为ccclass提供一个name参数，比如：</p>
<pre><code>@ccclass(&quot;RulerConfig&quot;)
export default class RulerConfig {
    @property(&quot;number&quot;)
    height:number = 0;
    @property(cc.SpriteFrame)
    photo:cc.SpriteFrame = undefined;
    @property(&quot;string&quot;)
    desc:string = &quot;&quot;;
}

// 引用地方不需要改动
</code></pre>
<p>然后就OK了，属性检测器显示正常：<br>
<img src="/images/2019/02/Snip20190226_9.png" alt="Snip20190226_9"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->