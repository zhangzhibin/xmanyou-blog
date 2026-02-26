---
title: "Cocos Creator 实现安卓按【后退】键退出游戏"
description: "3步实现按【后退】键退出游戏"
pubDate: 2019-10-18T09:09:36.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-shi-xian-an-zhuo-an-fan-hui-jian-tui-chu-you-xi"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Cocos Creator打包出来的安卓游戏，默认是不响应安卓系统的[<strong>后退</strong>]按键的，需要监听相应的系统事件来实现。</p>
<h2 id="">具体步骤</h2>
<p>以下是实现通过[<strong>后退</strong>]按键退出游戏的步骤：</p>
<p>Cocos Creator 版本：2.0.9</p>
<ol>
<li>监听系统按键</li>
</ol>
<p>通过 cc.systemEvent.on 可以监听对应的系统事件。<br>
其中系统按键事件是：<strong>cc.SystemEvent.EventType.KEY_DOWN</strong></p>
<pre><code>if(cc.sys.platform == cc.sys.ANDROID){
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
}
</code></pre>
<ol start="2">
<li>处理按键信息<br>
在onKeyDown方法出处理[<strong>后退</strong>]键</li>
</ol>
<p>Creator 2.x版本以上，[<strong>后退</strong>]键对应的是 <strong>cc.macro.KEY.back</strong></p>
<pre><code>onKeyDown(event){
    switch (event.keyCode) {
        case cc.macro.KEY.back:
            // 参考步骤3
            break;
    }
}
</code></pre>
<ol start="3">
<li>退出游戏<br>
为了防止玩家误点，一般会要求再点一次<em>后退</em>才确认退出游戏。</li>
</ol>
<p>退出游戏的话，用 cc.game.end()</p>
<p>简单流程：<br>
1). 添加标记_toExitGame来记录首次按键。<br>
2). 首次点击<em>后退</em>时，该标记设置为true，发出消息，用于弹出提示“再次点击后退，退出游戏”。<br>
3). 如果3秒内没有再次点击，则重置该标记。</p>
<p>示例</p>
<pre><code>if (!this._toExitGame) {
    // 首次点击，重置该标记
    this._toExitGame = true;
    
    // 发出后退消息，这里监听者来弹出提示：再次点击后退，退出游戏。
    // 这里要替换成自己的消息处理方法
    // AppFacade.getInstance().sendNotification(GAMEEVENTS.APP.TRY_EXIT);
  
    // 3秒后没有再次按【后退】按钮，则重置该标记
    this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(() =&gt; {
        this._toExitGame = false;
        // this.label.string = '';
    })));
}else{
    // 已经点击过一次，则直接退出
    cc.game.end();
    return;
}

</code></pre>
<h2 id="">感谢</h2>
<p>感谢网友Leo501在简书上分享的详细教程<br>
<a href="https://www.jianshu.com/p/9f641ac2b6df">https://www.jianshu.com/p/9f641ac2b6df</a></p>
<!--kg-card-end: markdown-->