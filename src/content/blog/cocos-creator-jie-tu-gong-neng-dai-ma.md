---
title: "#Cocos Creator# 截图功能代码"
description: "Cocos Creator 2.0.5 测试过的截图组件"
pubDate: 2018-12-18T01:11:09.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator", "facebook instant game"]
draft: false
type: post
slug: "cocos-creator-jie-tu-gong-neng-dai-ma"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>Cocos官方提供的截图功能代码有明显的错误，没法直接用。</p>
<p>网上都到的其他方案，基本上都是1.x版本的做法。</p>
<p>这里贴一个2.0.5版本测试过的截图功能代码。<br>
<a href="https://gist.github.com/zhangzhibin/c515021931cfc9adb6e9bab53b51a3c1">https://gist.github.com/zhangzhibin/c515021931cfc9adb6e9bab53b51a3c1</a></p>
<pre><code>// 截图组件 (如果没有提前添加Camera组件，则会自动添加一个默认参数的Camera)
// 语言：Typescript 
// Cocos 版本： 2.0.5

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScreenShotNode extends cc.Component {
    static _inst:ScreenShotNode

    // LIFE-CYCLE CALLBACKS:
    _camera:cc.Camera;
    _texture:cc.RenderTexture;
    _sprite:cc.Sprite;

    // 初始化
    onLoad () {
        ScreenShotNode._inst = this;
        
        // 设置相机参数
        let camera = this.getComponent&lt;cc.Camera&gt;(cc.Camera);
        if(!camera){
            camera = this.addComponent&lt;cc.Camera&gt;(cc.Camera);
        }
        camera.enabled = false; // 避免自动渲染
        
        // 截图的缩放比例       
        let zoom = 0.5;
        
        // 截图的尺寸，本例是640x640的正方形截图
        // 如果是全屏，则为 cc.winSize.width, cc.winSize.height
        let width = 640;  // cc.winSize.width
        let height = 640; // cc.winSize.height
        let size = cc.size(width*zoom, height*zoom);
        
        // 截图的中心点就是摄像机节点的位置
        let origin = cc.v2(0, 0);
        
        camera.zoomRatio = zoom; // 设置缩放
        
        // 设置目标渲染纹理
        let texture = new cc.RenderTexture();
        texture.initWithSize(size.width, size.height);  // 截图矩形的尺寸
        this.node.setPosition(origin);                  // 截图矩形的中心点

        camera.targetTexture = texture;
        
        // 缓存，备用
        this._camera = camera;
        this._texture = texture;
        
        // 用于显示的sprite组件，如果要测试这个，需要添加sprite组件
        this._sprite = this.getComponent&lt;cc.Sprite&gt;(cc.Sprite);

        // var newframe = new cc.SpriteFrame(this._texture);
        // this._sprite.spriteFrame = newframe;
    }

    shot(){
        // 执行一次 render，将所渲染的内容渲染到纹理上
        this._camera.render(undefined);
        // 到这里，截图就已经完成了
        

        // 接下去，可以从 RenderTexture 中获取数据，进行深加工
        let texture = this._texture;
        let data = texture.readPixels();

        let width = texture.width;
        let height = texture.height;

        // 接下来就可以对这些数据进行操作了       
        // let canvas:HTMLCanvasElement;
        let canvas = document.createElement('canvas'); 
        // document.body.appendChild(btn); // 没有添加到body上，不用担心内存泄漏

        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // 1维数组转2维
        // 同时做个上下翻转
        let rowBytes = width * 4;
        for (let row = 0; row &lt; height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow*width*4;
            for (let i = 0; i &lt; rowBytes; i++) {
                imageData.data[i] = data[start+i];
            }

            ctx.putImageData(imageData, 0, row);
        }

        let dataUrl = canvas.toDataURL(&quot;image/jpeg&quot;);
        // 显示
        this.showTexture(dataUrl);
        // 下载
        this.downloadImg(dataUrl);
        // 分享到Facebook
        // this.shareOnFacebook(dataUrl);
    }

    // 显示当前截图
    // 其实也可以直接用rendertexture来作为SpriteFrame的纹理
    showTexture(dataUrl){
        if(!this._sprite){
            console.warn(&quot;Need to add a sprite component&quot;);
            return;
        }
        
        var img = new Image();
        img.src = dataUrl;
        let self = this;
        img.onload = function(){
            var texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            var newframe = new cc.SpriteFrame(texture);
            self._sprite.spriteFrame = newframe;
        }
    }

    // 下载到本地（在H5游戏里不是很实用）
    downloadImg(base64:string){
        //把图片生成后download到本地
        
        var href = base64.replace(/^data:image[^;]*/, &quot;data:image/octet-stream&quot;);
        document.location.href = href;
    }

    shareOnFacebook(base64Url:string){
        // Facebook instant game的分享
        FBInstant.shareAsync({
            intent: 'SHARE', // * &quot;INVITE&quot; | &quot;REQUEST&quot; | &quot;CHALLENGE&quot; | &quot;SHARE&quot;
            image: base64Url,
            text: 'X is asking for your help!',
            data: { myReplayData: '...' },
          }).then(function() {
              console.info(&quot;share image done&quot;);
          }).catch(e=&gt;{
              console.warn(&quot;share failed: &quot;, e);
          });
    }

    static take(){
        ScreenShotNode._inst.shot();
    }
}


</code></pre>
<p><img src="/images/2018/12/Snipaste_2018-12-18_09-07-19.png" alt="Snipaste_2018-12-18_09-07-19"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->