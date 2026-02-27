---
title: "Cocos Creator控制龙骨DragonBones动画"
description: "龙骨动作的常见操作笔记"
pubDate: 2020-02-06T08:07:33.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发", "DragonBones"]
tagSlugs: ["dev", "cocos-creator", "h5", "dragonbones"]
draft: false
type: post
slug: "cocos-creator-control-dragonbones-animation"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">前言</h2>
<p>Cocos Creator要是用龙骨DragonBones动画，可以使用自带的组件：DragonBones组件: dragonBones.ArmatureDisplay</p>
<p><img src="https://docs.cocos.com/creator/manual/zh/components/dragonbones/properties.png" alt="DragonBones"></p>
<p>官方文档：<a href="https://docs.cocos.com/creator/manual/zh/components/dragonbones.html">https://docs.cocos.com/creator/manual/zh/components/dragonbones.html</a><br>
接口文档：<a href="https://docs.cocos.com/creator/api/zh/modules/dragonBones.html">https://docs.cocos.com/creator/api/zh/modules/dragonBones.html</a></p>
<p>仔细看的话，会发现，这个组件只暴露了一些非常简单也很有限的接口，文档也写的过于简单。</p>
<p>如果要对龙骨动画进行精细化控制，则需要调用DragonBones库的接口，而这个库的接口是没有文档的。</p>
<p>DragonBones库的代码，在Cocos Creator的引擎代码中可以找到，然后可以从dragonBonse.d.ts文件里查看相应的接口。<br>
<img src="/content/images/2020/02/CocosCreator_DragonBones_01.png" alt="CocosCreator_DragonBones_01"></p>
<p>这里整理一下相关的操作。</p>
<h2 id="">操作列表</h2>
<h3 id="1">1. 播放动画</h3>
<h4 id="">术语</h4>
<p>骨架 = Armatrue<br>
动画 = Animation</p>
<p>通常一个龙骨项目包含多个Armature，而每个Armature可以包含多个Animation。</p>
<p>所以，一般来说，我们实际的需求是切换动画，而不是切换骨架。</p>
<h4 id="">接口</h4>
<p>这个功能可以通过修改dragonBones.ArmatureDisplay组件的属性来实现：<br>
<img src="/content/images/2020/02/CocosCreator_DragonBones_02.png" alt="CocosCreator_DragonBones_02"></p>
<ul>
<li>
<p>指定骨架<br>
dragonBones.ArmatureDisplay.armatureName = 骨架名称</p>
</li>
<li>
<p>播放该骨架下的动画<br>
dragonBones.ArmatureDisplay.playAnimation(&quot;动作名&quot;, 循环次数);</p>
</li>
</ul>
<p>参数</p>
<pre><code>-1 表示使用配置文件中的默认值；
0 表示无限循环；
&gt;0 表示循环次数
</code></pre>
<h4 id="">示例</h4>
<pre><code>@property(dragonBones.ArmatureDisplay)
display:dragonBones.ArmatureDisplay = null;

display.armatureName = &quot;move&quot;;
display.playAnimation(&quot;跑&quot;, -1);
</code></pre>
<h4 id="">文档</h4>
<p><a href="https://docs.cocos.com/creator/api/zh/classes/ArmatureDisplay.html#armatureName">https://docs.cocos.com/creator/api/zh/classes/ArmatureDisplay.html#armatureName</a></p>
<h3 id="2">2. 中止动画</h3>
<p>dragonBones.ArmatureDisplay组件并没有提供stop方法，只能去dragonBones库去找了。<br>
在dragonBonse.d.ts文件中发现，dragonBones.Animation类有很多方法可以用。</p>
<h4 id="">接口</h4>
<ul>
<li>
<p>获取骨骼<br>
dragonBones.ArmatureDisplay.armature()</p>
</li>
<li>
<p>获取动画<br>
dragonBones.ArmatureDisplay.armature().Animation</p>
</li>
</ul>
<p>注意，这个方法返回的是dragonBones.Animation对象。</p>
<ul>
<li>停止动画<br>
dragonBones.Animation.stop(&quot;动画名&quot;)</li>
</ul>
<p>参数<br>
要停止的指定动画名，如果，不指定，则停止所有动画。</p>
<h4 id="">示例</h4>
<pre><code>// 终止所有的动作
display.armature().animation.stop();
</code></pre>
<h3 id="3">3. 从动画中间开始播放</h3>
<p>有时候，我们需要从动画的中间开始播放，这个功能也只能通过dragonBones.Animation对象来实现。</p>
<h4 id="">接口</h4>
<ul>
<li>
<p>从指定帧播放<br>
gotoAndPlayByFrame(animationName: string, frame?: number, playTimes?: number): AnimationState | null;</p>
</li>
<li>
<p>从指定时间播放<br>
gotoAndPlayByTime(animationName: string, time?: number, playTimes?: number): AnimationState | null;</p>
</li>
<li>
<p>从指定的百分比进度播放<br>
gotoAndPlayByProgress(animationName: string, progress?: number, playTimes?: number): AnimationState | null;</p>
</li>
</ul>
<h4 id="">示例</h4>
<pre><code>display.armature().animation.gotoAndPlayByFrame(animationName, nFrame, loop);
</code></pre>
<h3 id="4">4. 根据事件中止动画</h3>
<p>这个功能需要先监听指定动画事件，然后在事件处理方法中调用2.的中止方法。</p>
<p>dragonBones.ArmatureDisplay组件提供了事件监听方法<br>
<a href="https://docs.cocos.com/creator/api/zh/classes/ArmatureDisplay.html#addeventlistener">https://docs.cocos.com/creator/api/zh/classes/ArmatureDisplay.html#addeventlistener</a></p>
<h4 id="">接口</h4>
<ul>
<li>
<p>监听<br>
dragonBones.ArmatureDisplay.addEventListener(eventType, callback, target)</p>
</li>
<li>
<p>取消监听<br>
dragonBones.ArmatureDisplay.removeEventListener(eventType, callback, target)</p>
</li>
<li>
<p>事件列表<br>
** 帧事件（需在龙骨动画里添加动画事件）<br>
dragonBones.EventObject.FRAME_EVENT<br>
** 动画循环播放完成一次。<br>
dragonBones.EventObject.LOOP_COMPLETE<br>
** 动画播放完成。<br>
dragonBones.EventObject.COMPLETE</p>
</li>
</ul>
<p>事件对象的细节，以及更多事件可以在ArmatureDisplay.js文件中找到。</p>
<pre><code>
/**
 * !#en
 * Animation start play.
 * !#zh
 * 动画开始播放。
 *
 * @event dragonBones.EventObject.START
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation loop play complete once.
 * !#zh
 * 动画循环播放完成一次。
 *
 * @event dragonBones.EventObject.LOOP_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation play complete.
 * !#zh
 * 动画播放完成。
 *
 * @event dragonBones.EventObject.COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade in start.
 * !#zh
 * 动画淡入开始。
 *
 * @event dragonBones.EventObject.FADE_IN
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade in complete.
 * !#zh
 * 动画淡入完成。
 *
 * @event dragonBones.EventObject.FADE_IN_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade out start.
 * !#zh
 * 动画淡出开始。
 *
 * @event dragonBones.EventObject.FADE_OUT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade out complete.
 * !#zh
 * 动画淡出完成。
 *
 * @event dragonBones.EventObject.FADE_OUT_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation frame event.
 * !#zh
 * 动画帧事件。
 *
 * @event dragonBones.EventObject.FRAME_EVENT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {String} [callback.event.name]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 * @param {dragonBones.Bone} [callback.event.bone]
 * @param {dragonBones.Slot} [callback.event.slot]
 */

/**
 * !#en
 * Animation frame sound event.
 * !#zh
 * 动画帧声音事件。
 *
 * @event dragonBones.EventObject.SOUND_EVENT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {String} [callback.event.name]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 * @param {dragonBones.Bone} [callback.event.bone]
 * @param {dragonBones.Slot} [callback.event.slot]
 */
</code></pre>
<h4 id="">示例</h4>
<pre><code>// 监听
display.addEventListener(dragonBones.EventObject.FRAME_EVENT, this.onFrameEvent, this);

// 事件处理
onFrameEvent(evt){
    if(this._stopEvent == evt.name){
        evt.armature.animation.stop(this._currentAnimation);
        this._stopEvent = undefined;
    }
}
</code></pre>
<!--kg-card-end: markdown-->