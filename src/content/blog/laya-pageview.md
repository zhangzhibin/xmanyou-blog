---
title: "Laya PageView组件简单实现"
description: "自己动手为Laya添加一个PageView组件"
pubDate: 2020-12-18T09:21:16.000Z
author: "阿斌"
tags: ["laya", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["laya", "h5", "dev"]
draft: false
type: post
slug: "laya-pageview"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Laya 1.x中没有PageView组件，就是一次滑动一整页的组件。</p>
<h2 id="">解决方法</h2>
<p>替代方案是用List组件来实现一个。</p>
<h3 id="">方案要点</h3>
<ol>
<li>在触摸事件中处理翻页</li>
<li>利用List组件的成员scrollBar得到当前滑动的位置，然后计算出需要自动翻到第几页</li>
<li>利用List组件tweenTo方法来做翻页动画</li>
<li>翻页后发送翻页事件</li>
</ol>
<h3 id="">代码</h3>
<pre><code>export class PageView extends Laya.List{
    constructor(){
        super();

        this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);

        this.renderHandler = Laya.Handler.create(this, this.renderItem);    
        
    }

    destroy(){
        this.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.off(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
    }

    onMouseUp(event){
        this._updatePage();
    }

    // onMouseMove(event){
    //     console.info(&quot;PageView: mouse move =&gt; &quot;, event);
    // }

    onMouseOut(event){
        // console.info(&quot;PageView: mouse out =&gt; &quot;, event);
        this._updatePage();
    }

    private _currentPage:number = 0;
    private _updatePage(){
        // 参考：https://gitee.com/hopher/layaair/blob/master/src/ui/src/laya/ui/List.as
        // this.tweenTo(0);
        // this.onScrollBarChange
        
        // 停止滚动
        this.scrollBar.stopScroll();
        // 滑行到下一页的位置
        // let length:number = this._array.length;
		// let totalPage = Math.ceil(length / (this.repeatX * this.repeatY));
        // let numX:number = this._isVertical ? this.repeatX : this.repeatY;
        // let numY:number = this._isVertical ? this.repeatY : this.repeatX; // 
        // let lineCount:number = Math.ceil(length / numX); // 总的行数
        let total = this._cellOffset &gt; 0 ? this.totalPage + 1 : this.totalPage;

        let pageId = 0;
        if (total &gt; 1) {
            pageId = Math.ceil((this.scrollBar.value - this._cellOffset - this._cellSize/2)/this._cellSize);
        } else {
            // this._scrollBar.setScroll(0, 0, 0);
            // this._scrollBar.target = this._content;
        }

        // console.info(&quot;Slider pos =&gt; &quot;, this.scrollBar.slider.value);
        // console.info(`Neareast item id: ${pageId}`);
        this.tweenTo(pageId);
        this._currentPage = pageId;
        if(this._onPageChange){
            this._onPageChange(pageId);
        }
    }

    public get pageId(){
        return this._currentPage;
    }

    public set pageId(n:number){
        this._currentPage = n;
        this.tweenTo(n);
    }

    // onScrollBarChange(event){
    //     super.onScrollBarChange(event);
        
    //     console.info(&quot;ScrollBar Change =&gt; &quot;, this.scrollBar.slider.value);
    // }

    private _onPageChange:(pageId:number)=&gt;void = null;
    public set onPageChangeHandler(handler:(pageId:number)=&gt;void){
        this._onPageChange = handler;
    }
    public get onPageChangeHandler(){
        return this._onPageChange;
    }
}
</code></pre>
<!--kg-card-end: markdown-->