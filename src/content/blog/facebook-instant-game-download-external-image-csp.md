---
title: "Facebook 小游戏加载远程图片"
description: "三步解决远程图片下载问题"
pubDate: 2020-04-11T16:43:25.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "facebook instant game"]
tagSlugs: ["dev", "h5", "facebook-instant-game"]
draft: false
type: post
slug: "facebook-instant-game-download-external-image-csp"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Facebook Instant Game中，大部分的资源是直接打到游戏包里的，但是，在某些情况下，我们想要加载远程图片来更新游戏内容，比如更新关卡，或者远程更新交叉推广的游戏图标等。</p>
<h3 id="">示例</h3>
<p>像这个游戏中，交叉推广的游戏就从服务器远程加载的。</p>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_04.png" alt="facebook_instant_game_csp_image_04"></p>
<p>游戏测试地址：<a href="https://fb.gg/play/twistglidecolor">https://fb.gg/play/twistglidecolor</a></p>
<h3 id="">问题</h3>
<p>如果直接使用Cocos Creator的cc.loader.load来加载远程服务器上的图片，则会出现2种错误：</p>
<ol>
<li>跨域资源访问的问题 (CORS = Cross-Origin Resource Sharing)</li>
</ol>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_05.png" alt="facebook_instant_game_csp_image_05"></p>
<blockquote>
<p>关于 CORS: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS</a></p>
</blockquote>
<ol start="2">
<li>内容安全策略 (CSP = Content Security Policy)</li>
</ol>
<p>如果在服务器端开放了跨域访问，还可能遇到这个问题，因为facebook只允许从特定域名下加载图片。</p>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_01.png" alt="facebook_instant_game_csp_image_01"></p>
<blockquote>
<p>关于CSP: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy">https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy</a></p>
</blockquote>
<h2 id="">解决方法</h2>
<p>进过一番调查，发现facebook instant game支持用blob读取图片。</p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/49122173/instant-games-content-security-policy?rq=1">https://stackoverflow.com/questions/49122173/instant-games-content-security-policy?rq=1</a></p>
</blockquote>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_02.png" alt="facebook_instant_game_csp_image_02"></p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/52592577/facebook-instant-games-loading-remote-images-during-the-game-doesnt-work">https://stackoverflow.com/questions/52592577/facebook-instant-games-loading-remote-images-during-the-game-doesnt-work</a></p>
</blockquote>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_03.png" alt="facebook_instant_game_csp_image_03"></p>
<p>那么，方法也就明确了。</p>
<h3 id="">第一步，服务端开放跨域访问</h3>
<p>以Nginx举例，可以在配置文件中添加以下设置：</p>
```nginx
# https://enable-cors.org/server_nginx.html
#
# Wide-open CORS config for nginx
#
location / {
     if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
     }
     if ($request_method = 'POST') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     }
     if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     }
}
```
<h3 id="blob">第二步，使用blob协议来读取图片数据</h3>
<p>有两种方式可以读取blob数据</p>
<ol>
<li>使用XMLHttpRequest接口</li>
</ol>
<pre><code>// 该段代码来自 stackoverflow，未测试
function loadXHR(url) {
    return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open(&quot;GET&quot;, url);
            xhr.responseType = &quot;blob&quot;;
            xhr.onerror = function() {reject(&quot;Network error.&quot;)};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject(&quot;Loading error:&quot; + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
    });
}
</code></pre>
<ol start="2">
<li>使用fetch 接口</li>
</ol>
<blockquote>
<p>关于fetch: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch</a></p>
</blockquote>
<pre><code>// 自用代码
async loadIcon(iconUrl:string, gameId:string){
    console.info(&quot;===&gt; loading icon: &quot;, iconUrl);
    try{
        let resp = await fetch(iconUrl, {
            method: 'GET',
            mode: 'cors',
            // cache: 'default',
        });

        let blobObj = await resp.blob();
        if(blobObj){
            console.info(&quot;===&gt; image blob: &quot;, blobObj);
            // TODO：显示blob格式的图片
        }else{
            console.warn(&quot;===&gt; loading blob failed&quot;);
        }
    }catch(e){
        console.warn(&quot;===&gt; something wrong: &quot;, e);
    }
}
</code></pre>
<h3 id="blob">第三步，显示blob格式的图片</h3>
<p>Cocos Creator的参考代码</p>
<pre><code>function showBlobImage(blobObj){
    let img = new Image();
    img.src = URL.createObjectURL(blobObj);
    img.onload = function(){
        var texture = new cc.Texture2D();
        texture.initWithElement(img);
        texture.handleLoadedTexture();
        var newframe = new cc.SpriteFrame(texture);
        if(newframe){
            if(self.sprite){
                self.sprite.spriteFrame = newframe;
                self.node.width = 100;
                self.node.height = 100;    
                console.info(&quot;===&gt; update icon success!&quot;);    
            }
        }else{
            console.warn(&quot;===&gt; create sp failed&quot;);
        }
    }
}
</code></pre>
<h2 id="">其他解决方法</h2>
<ol>
<li>将图片保存在facebook允许的域名下</li>
</ol>
<p>这个理论上可行的，网上也有人是这么做的，但是我没有去测试。</p>
<ol start="2">
<li>使用base64或者其他自定义编码来传图片数据，然后显示。</li>
</ol>
<p>这也是个可行的方法，但是有几个明显的问题：<br>
1). 数据大，传输效率低<br>
2). base64解码的效率低<br>
3). 需要服务端将图片转换为base64编码</p>
<h2 id="facebook">是否会违反facebook规定？</h2>
<p>不会。</p>
<p>1). fetch是facebook支持的api</p>
<blockquote>
<p><a href="https://developers.facebook.com/docs/games/instant-games/faq/">https://developers.facebook.com/docs/games/instant-games/faq/</a></p>
</blockquote>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_06.png" alt="facebook_instant_game_csp_image_06"></p>
<p>2). 从stackoverflow上的回复来看，facebook允许blob协议来传输图片。</p>
<blockquote>
<p><a href="https://stackoverflow.com/questions/49122173/instant-games-content-security-policy?rq=1">https://stackoverflow.com/questions/49122173/instant-games-content-security-policy?rq=1</a></p>
</blockquote>
<p><img src="/content/images/2020/04/facebook_instant_game_csp_image_02.png" alt="facebook_instant_game_csp_image_02"></p>
<!--kg-card-end: markdown--><p></p><p></p>