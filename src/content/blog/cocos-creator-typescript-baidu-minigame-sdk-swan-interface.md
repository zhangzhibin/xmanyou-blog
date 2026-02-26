---
title: "Cocos Creator/TypeScript中怎么申明Baidu小游戏接口才不会报错？"
description: "如题"
pubDate: 2019-09-25T09:23:51.000Z
author: "阿斌"
tags: ["开发笔记", "baidu", "h5 小游戏开发"]
tagSlugs: ["dev", "baidu", "h5"]
draft: false
type: post
slug: "cocos-creator-typescript-baidu-minigame-sdk-swan-interface"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">背景</h2>
<p>由于TypeScript加强了对类型和变量的检查，所以，如果像JavaScript那样，直接使用Baidu小游戏的接口swan，则会在代码编辑器中看到很多错误。</p>
<p>不过，值得一提的是，这些错误是可以忽略的，并不影响最终的运行。</p>
<p>但是，怎么样才能去掉这些错误呢？</p>
<p>答案就是，提前申明。</p>
<h2 id="">解决方法</h2>
<h3 id="swan">第一步，获取swan接口</h3>
<p>可以通过 window[&quot;swan&quot;] 得到。</p>
<pre><code>// Baidu.ts

let sdk = window[&quot;swan&quot;];
console.info(&quot;[Baidu] sdk: &quot;, sdk);

let Baidu = {
    isValid(){
        return !!sdk;
    },
    sdk: sdk
}

export default Baidu;
</code></pre>
<h3 id="">引用</h3>
<p>在需要使用百度接口的地方，通过import以后，可以通过Baidu.sdk来调用对应的接口。</p>
<p>如果想要保持与JavaScript代码一致，可以将其赋值到一个本地变量上swan。</p>
<pre><code>import Baidu from &quot;./Baidu&quot;;

let swan = Baidu.sdk;
</code></pre>
<p>搞定。</p>
<!--kg-card-end: markdown-->