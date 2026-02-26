---
title: "#Cocos Creator# 快速实现JavaScript/TypeScript与Java代码相互调用"
description: "利用CocosCreator的JSB接口快速接入Java SDK"
pubDate: 2019-11-04T08:29:11.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
tagSlugs: ["dev", "cocos-creator", "h5"]
draft: false
type: post
slug: "cocos-creator-javascript-typescript-call-java-interface"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>我们经常需要从JavaScript或者TypeScript代码中调用第三方库的接口，这些接口，可能是一些第三方插件，比如广告，统计，或者GooglePlay，或者其他渠道的SDK。</p>
<p>在安卓平台上，要调用第三方库，就需要通过JS/TS与Java代码进行交互。</p>
<h2 id="">解决方案</h2>
<p>1). 使用 JavaScript Binding</p>
<p>最复杂也最灵活的方案是，是自己写jsb代码，但是这样会非常麻烦，不信可以自己Google一下 <strong>JavaScript Binding</strong>.</p>
<p>2). 使用 Cocos Creator的jsb宏<br>
Cocos Creator 提供了一套自己的jsb架构，并提供了一些宏来抹平不同底层的区别，具体参考：<br>
<a href="https://docs.cocos.com/creator/manual/zh/advanced-topics/jsb/JSB2.0-learning.html">https://docs.cocos.com/creator/manual/zh/advanced-topics/jsb/JSB2.0-learning.html</a></p>
<p>这套接口很多也相对完备，不过挺复杂的，细节很多。</p>
<p>3). 使用 Cocos Creator的jsb接口</p>
<p>另外，Cocos Creator已经基于自己的jsb实现，提供了一些快速的接口供我们是用。</p>
<blockquote>
<p>官方文档 《如何在 Android 平台上使用 JavaScript 直接调用 Java 方法》<br>
<a href="https://docs.cocos.com/creator/manual/zh/advanced-topics/java-reflection.html">https://docs.cocos.com/creator/manual/zh/advanced-topics/java-reflection.html</a></p>
</blockquote>
<h2 id="cocoscreatorjsbjava">使用Cocos Creator的jsb与Java交互的步骤</h2>
<h3 id="1javascriptjava">1. JavaScript 调用 Java接口</h3>
<p>使用 jsb.reflection.callStaticMethod 可以访问指定Java类中的静态方法</p>
<pre><code>var o = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)
</code></pre>
<h4 id="1">1) 参数</h4>
<ul>
<li>
<p><strong>className</strong><br>
Java的完整类名，与Java中引用不一样的地方是，需要.替换成/，例如：<br>
org/cocos2dx/javascript/tpcl/admobHelper</p>
</li>
<li>
<p><strong>methodName</strong><br>
Java类中的<strong>静态</strong>方法名</p>
</li>
<li>
<p><strong>methodSignature</strong><br>
要调用的方法的参数和返回值描述<br>
签名的格式：(参数1参数2参数3)返回值<br>
参数列表放在()之间，并且参数之间不要有空格和任何符号<br>
返回值跟在()后边。</p>
</li>
</ul>
<p><strong>签名举例</strong><br>
<em>()V</em> 表示没有参数，没有返回值的方法，即 void foo()<br>
<em>(I)V</em> 表示参数为一个int，没有返回值的方法 void foo(int a)<br>
<em>(I)I</em> 表示参数为一个int，返回值为int的方法 int foo(int a)<br>
<em>(IF)Z</em> 表示参数为一个int和一个float，返回值为boolean的方法 boolean foo(int a, float b)</p>
<ul>
<li><strong>parameters</strong><br>
传入的参数值</li>
</ul>
<h4 id="2">2) 返回值</h4>
<p>只要是支持的类型，可以直接使用。</p>
<h4 id="3">3) 注意事项</h4>
<p><strong>支持类型</strong><br>
目前 Cocos Creator 中支持的 Java 类型签名有下面 4 种：<br>
<img src="/images/2019/11/CocosCreator_JSB_Java_Parameters_Signatures.png" alt="CocosCreator_JSB_Java_Parameters_Signatures"></p>
<p>也就是说，要使用Cocos Creator的jsb方法，只能用最基础的int/float/bool/string类型，不支持其他复杂类型，比如自定义对象，回调方法等。</p>
<p><strong>UI线程和GL线程</strong></p>
<p>Android的App中是区分UI线程和GL线程的，不同的接口需要在不同的线程中调用。<br>
其中，cocos 引擎的渲染和 JS 的逻辑是在 GL 线程中进行的，而 Android 本身的 UI 更新是在 App 的 UI 线程进行的，所以如果我们在 JS 中调用的 Java 方法有任何刷新 UI 的操作，都需要在 UI 线程进行。</p>
<p>从JavaScript中直接调用Java方法时，默认是在GL线程。</p>
<p>如果不知道哪些方法不适合在GL线程中调用，可以使用默认调用方式，在调试的时候，Android Studio会提示你，这时候可以切换到UI线程中调用：</p>
<p>通过调用 <em>Cocos2dxActivity.runOnUiThread</em> 方法可以在切换到UI线程。</p>
<p>以Admob为例，Admob中大部分方法都需要在UI线程中调用。</p>
<pre><code>public static void showBanner(){
    System.out.println(&quot;[admob.Banner.show]&quot;);
    _app.runOnUiThread(new Runnable() {
        @Override
        public void run() {
            _banner.setVisibility(View.VISIBLE);
            updateBannerPosition();
            _banner.resume();
        }
    });
}
</code></pre>
<p>其中 _app是在初始化时传入的Cocos2dxActivity对象</p>
<pre><code>public static void setContext(Cocos2dxActivity app, RelativeLayout layout){
    _app = app;
    _rootLayout = layout;
}
</code></pre>
<h4 id="4">4) 示例</h4>
<p>Java类</p>
<pre><code>public class admobHelper {
    public static void init(){
        Log.d(&quot;admob&quot;, &quot;init&quot;);
        System.out.println(&quot;[admob.init]&quot;);
        MobileAds.initialize(_app, APP_ID);
    }
}

</code></pre>
<p>JavaScript/TypeScript</p>
<pre><code>export default class AdmobHelper{
  public static init(){
    if(cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD){
      jsb.reflection.callStaticMethod(&quot;TpclHelper&quot;, &quot;initAdmob&quot;);
    }else if(cc.sys.platform == cc.sys.ANDROID){       jsb.reflection.callStaticMethod(&quot;org/cocos2dx/javascript/tpcl/admobHelper&quot;, &quot;init&quot;, &quot;()V&quot;);
    }        
 }  
</code></pre>
<h3 id="2javajavascript">2. Java 调用 JavaScript 接口</h3>
<p>在少数情况下，我们还需要从Java中调用JavaScript接口。</p>
<p>使用 <em>Cocos2dxJavascriptJavaBridge.evalString</em> 可以执行一段JavaScript代码。</p>
<pre><code>var o = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters...)
</code></pre>
<p>值得注意的是，这个方法只有一个参数，就是要执行的JavaScript代码。它的实现，类似于在Chrome开发者工具中的Console中直接执行代码。</p>
<p>如果要调用Cocos引擎的方法，由于这些方法都在cc对象中，而cc已经提前由引擎暴露到了全局环境里，所以，可以直接用cc.xxx来调用。</p>
<pre><code>Cocos2dxJavascriptJavaBridge.evalString(&quot;cc.log(\&quot;Javascript Java bridge!\&quot;)&quot;);
</code></pre>
<p>而如果是自己的变量呢？同样的，你需要提前把你的对象暴露到全局环境里，可以使用window变量</p>
<p>假设，JavaScript接口</p>
<pre><code>let foo = {
	sayHello : function(){
	    console.info(&quot;hello&quot;);
	}
}
window[&quot;foo&quot;]=foo;
</code></pre>
<p>Java代码</p>
<pre><code>app.runOnGLThread(new Runnable() {
    @Override
    public void run() {
Cocos2dxJavascriptJavaBridge.evalString(&quot;foo.sayHello()&quot;);
    }
});
</code></pre>
<h4 id="1">1). 参数与返回值</h4>
<ol>
<li>
<p>怎么传参数<br>
可以直接拼到evalString的参数里即可。</p>
</li>
<li>
<p>怎么返回值<br>
貌似不支持返回值。</p>
</li>
</ol>
<h4 id="2">2). 注意事项</h4>
<p>有些方法需要在GL线程中才能使用，所以需要用到<em>Cocos2dxActivity.runOnGLThread</em></p>
<h2 id="ios">iOS平台怎么办？</h2>
<p>iOS平台上，我们也可以利用Cocos Creator的jsb接口，来实现JavaScript与Object C的交互。</p>
<p>方法也是非常类似的，参考官方文档《如何在 iOS 平台上使用 Javascript 直接调用 Objective-C 方法》<br>
<a href="https://docs.cocos.com/creator/manual/zh/advanced-topics/oc-reflection.html">https://docs.cocos.com/creator/manual/zh/advanced-topics/oc-reflection.html</a></p>
<p>这个很详细了，没有什么坑。</p>
<h3 id="">方法</h3>
<p>使用 jsb.reflection.callStaticMethod 就可以调用指定类的静态方法了。</p>
<p><strong>参数</strong><br>
分别是 className, methodName, paramter1, paramter2, ...</p>
<p><strong>签名</strong><br>
OC的jsb不需要提供签名，但是需要在方法名中包含完整的定义。</p>
<p><strong>举例</strong></p>
<p>Object C定义</p>
<pre><code>@interface NativeOcClass : NSObject
+(BOOL)callNativeUIWithTitle:(NSString *) title andContent:(NSString *)content;
@end
</code></pre>
<p>JavaScript</p>
<pre><code>var ret = jsb.reflection.callStaticMethod(
  &quot;NativeOcClass&quot;, // 类名
  &quot;callNativeUIWithTitle:andContent:&quot;, // 方法名
  &quot;cocos2d-js&quot;, // 参数1 title
  &quot;Yes! you call a Native UI from Reflection&quot; // 参数2 Content
);
</code></pre>
<h3 id="">注意事项</h3>
<p>值得注意的是：<br>
可能是由于苹果不支持动态执行脚本的缘故，Cocos Creator的jsb接口并不支持使用evalString方法，无法直接从Object C执行JavaScript脚本。</p>
<!--kg-card-end: markdown-->