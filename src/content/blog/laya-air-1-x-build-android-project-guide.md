---
title: "Laya Air 1.x版本打包输出Android工程简明流程"
description: "简明流程"
pubDate: 2020-10-16T02:01:22.000Z
author: "阿斌"
tags: ["laya", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["laya", "h5", "dev"]
draft: false
type: post
slug: "laya-air-1-x-build-android-project-guide"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="1">1. 官方文档</h2>
<blockquote>
<p><a href="https://ldc.layabox.com/doc/?nav=zh-as-7-1-0">https://ldc.layabox.com/doc/?nav=zh-as-7-1-0</a></p>
</blockquote>
<h2 id="2layanative">2. LayaNative命令行工具</h2>
<blockquote>
<p><a href="https://ldc.layabox.com/doc/?nav=zh-ts-7-3-0">https://ldc.layabox.com/doc/?nav=zh-ts-7-3-0</a></p>
</blockquote>
<ul>
<li>安装</li>
</ul>
<pre><code>npm install -g layanative
</code></pre>
<ul>
<li>layanative的使用文档：</li>
</ul>
<pre><code>layanative

用法：
   layanative createapp [OPTIONS]
   layanative refreshres [OPTIONS]
   layanative removeres [OPTIONS]
   layanative listversions
描述：
   createapp
       创建一个runtime项目。
       具体帮助信息用 layanative createapp --help 查看。
   refreshres
       刷新当前目录对应的项目的资源。
       具体帮助信息用 layanative refreshres --help 查看。
   removeres
       删除当前目录对应的项目的资源。
       具体帮助信息用 layanative removeres --help 查看。
   listversions
       列出所有可用SDK版本。
       具体帮助信息用 layanative listversions --help 查看。
</code></pre>
<h2 id="3androidstudio">3. 导出Android Studio工程</h2>
<h2 id="31layaairide">3.1. 从Laya Air IDE导出</h2>
<blockquote>
<p><a href="https://ldc.layabox.com/doc/?nav=zh-ts-7-3-1">https://ldc.layabox.com/doc/?nav=zh-ts-7-3-1</a></p>
</blockquote>
<ul>
<li>1). 从Laya Air IDE打开“app 构建”对话框<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-from-ide.png" alt="laya-air-export-android-studio-project-from-ide"></li>
<li>2). 下载要用的Native版本模板，建议用能选的最新版本。<br>
截图为演示<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-download-layanative-template.png" alt="laya-air-export-android-studio-project-download-layanative-template"></li>
<li>3). 配置好项目内容
<ul>
<li>项目类型：建议选Android studio</li>
<li>单机版：如果是单机游戏，即所有代码和资源都从本地加载，则需要勾上“单机版”</li>
<li>项目名称、应用名、包名，导出后可以在Android Studio中修改</li>
<li>输出路径：导出的根目录</li>
<li>资源路径：选择Laya项目的bin目录，例如 <LayaDemo>/bin</li>
</ul>
</li>
</ul>
<p><img src="/content/images/2020/10/laya-air-export-android-studio-project-build-native-app-localgame.png" alt="laya-air-export-android-studio-project-build-native-app-localgame"></p>
<h2 id="32">3.2. 使用命令行工具导出</h2>
<p>使用layanative createapp，也可以导出native项目，具体可以查看帮助</p>
<pre><code>layanative createapp --help
</code></pre>
<blockquote>
<p>文档：<a href="https://ldc.layabox.com/doc/?nav=zh-ts-7-3-0">https://ldc.layabox.com/doc/?nav=zh-ts-7-3-0</a></p>
</blockquote>
<h2 id="33js">3.3. 更新js代码及资源</h2>
<p>当Laya项目的js代码或者资源有更新时，<strong>不需要再次导出项目</strong><br>
只需在Android Studio项目目录下执行：</p>
<pre><code>layanative refreshres -p android_studio
</code></pre>
<h2 id="4">4. 代码要点</h2>
<h2 id="41">4.1. 横竖屏设置</h2>
<p>需要保持两个地方一致</p>
<ul>
<li>1). index.html</li>
</ul>
<pre><code>&lt;meta name=&quot;laya&quot; screenorientation=&quot;portrait&quot; /&gt;
</code></pre>
<p><img src="/content/images/2020/10/laya-air-export-android-studio-project-screen-orientation.png" alt="laya-air-export-android-studio-project-screen-orientation"></p>
<ul>
<li>2). menifest</li>
</ul>
<pre><code>android:screenOrientation=&quot;portrait&quot;
</code></pre>
<h2 id="42">4.2. 声音</h2>
<p>只支持ogg或者wave格式，建议用ogg，尺寸小一些。</p>
<h2 id="43webgl">4.3. 开启WebGL</h2>
<p>如果你要运行3D功能，必须要开启WebGL，不然会报错：</p>
<pre><code>Laya3D init error, must support webGL    
</code></pre>
<p><img src="/content/images/2020/10/laya-air-export-android-studio-project-webgl-not-support-1.png" alt="laya-air-export-android-studio-project-webgl-not-support-1"></p>
<p>修改 app/assets/scripts/config.js文件，添加</p>
<pre><code>window.ConchRenderType = 6;
</code></pre>
<p><img src="/content/images/2020/10/laya-air-export-android-studio-project-enable-webgl-3d.png" alt="laya-air-export-android-studio-project-enable-webgl-3d"></p>
<h2 id="5java">5. 与Java交互</h2>
<h3 id="51jsjava">5.1. JS 调用 Java</h3>
<blockquote>
<p>详细文档：<a href="https://ldc.layabox.com/doc/?nav=zh-ts-7-2-2">https://ldc.layabox.com/doc/?nav=zh-ts-7-2-2</a></p>
</blockquote>
<p><strong>要点</strong></p>
<ul>
<li>1). 支持类的静态方法和对象方法调用<br>
平台类 <strong>PlatformClass</strong></li>
</ul>
<pre><code>class PlatformClass
{
  /**
   创建Java/OC的类, 脚本和平台对应
   className  包 + 类名
  */
  static createClass(className:string):PlatformClass;
  /**
     创建该类的对象
     args 构造函数的参数
  */
  newObject(...args):PlatformObj;
  /**
     调用该类的静态方法, 返回返回值
     (注: Java层可以直接返回返回值, OC不能, 返回值为空的, OC可以调用改方法)
     methodName 方法名
     args  参数
  */
  call(methodName:string,...args);   
  /**
     调用该类的静态方法, 通过异步返回给脚本, 此时需要平台(Java/OC)调用相应的接口
     Java : ExportJavaFunction.CallBackToJS(class|className,methodeName, result);
     返回给脚本:
     Callback  回调函数, 参数为返回值
     methodName 方法名
     args  参数
  */
  callWithBack(callback,methodName:string,...args);
}
</code></pre>
<p>平台对象 <strong>PlatformObj</strong></p>
<pre><code>class PlatformObj
{
  /**
     调用该对象的成员方法, 返回返回值
     (注: Java层可以直接返回返回值, OC不能, 返回值为空的, OC可以调用改方法)
     methodName 方法名
     args  参数
  */
  call(methodName:string,...args);
  /**
     调用该对象的成员方法, 通过异步返回给脚本, 此时需要平台(Java/OC)调用相应的接口
     Java : ExportJavaFunction.CallBackToJS(obj(this),methodeName, result ); // obj即该Java对象
     返回给脚本:
     Callback  回调函数, 参数为返回值
     methodName 方法名
     args  参数
  */
  callWithBack(callback,methodName:string,...args);
}
</code></pre>
<ul>
<li>2). 使用支持传入参数类型为：数字, 字符串, 布尔值</li>
<li>3). 返回值需要用回调方法获取</li>
</ul>
<pre><code>PlatformClass.callWithBack
PlatformObject.callWithBack
</code></pre>
<p><strong>注意</strong>，只return是不无法把返回值传递给JS代码的，还需要在Java方法中显式调用ExportJavaFunction.CallBackToJS来传递返回值。</p>
<pre><code>ExportJavaFunction.CallBackToJS
</code></pre>
<p>举个例子<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-callWithBack-CallBackToJS.png" alt="laya-air-export-android-studio-project-callWithBack-CallBackToJS"></p>
<h3 id="52javajs">5.2. Java调用JS</h3>
<p>使用ConchJNI.RunJS可以直接执行一段js代码</p>
<pre><code>ConchJNI.RunJS(&quot;alert('hello world')&quot;);
</code></pre>
<h2 id="6">6. 打包前的其他工作</h2>
<h3 id="61x86jnilibs">6.1. 打包前移除x86 jniLibs库</h3>
<ul>
<li>路径：studio中路径 app/jniLibs/x86<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-remove-x86-jnilib.png" alt="laya-air-export-android-studio-project-remove-x86-jnilib"></li>
</ul>
<p>注意：实际在文件系统中的路径是 app/libs/x86<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-x86-lib-fs-path.png" alt="laya-air-export-android-studio-project-x86-lib-fs-path"><br>
<strong>注意:</strong> 不删除的话，提交到Google Play时报错：<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-gp-error.png" alt="laya-air-export-android-studio-project-gp-error"></p>
<h3 id="62">6.2. 修改启动画面</h3>
<blockquote>
<p>文档：<a href="https://ldc.layabox.com/doc/?nav=zh-as-7-1-5">https://ldc.layabox.com/doc/?nav=zh-as-7-1-5</a></p>
</blockquote>
<ul>
<li>默认的启动画面是Laya的Logo<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-splash.png" alt="laya-air-export-android-studio-project-splash"></li>
<li>对话框的配置：app/res/layout/splash_dialog.xml</li>
<li>默认的splash素材：app/res/drawable/layabox.png<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-splash02.png.png" alt="laya-air-export-android-studio-project-splash02.png"><br>
可以替换成自己的启动图，并适当修改显示尺寸和背景颜色。</li>
</ul>
<h3 id="63">6.3. 修改加载提示</h3>
<ul>
<li>1). 加载提示文字<br>
默认的加载提示是很中二的中文提示，修改app/assets/scripts/config.js中以下代码，来替换成自己的文字。<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-loading.png" alt="laya-air-export-android-studio-project-loading"></li>
<li>2). 加载显示方式<br>
如果不想显示加载的百分比，或者显示方式，可以进一步修改 app/java/SplashDialog类<br>
<img src="/content/images/2020/10/laya-air-export-android-studio-project-loading02.png" alt="laya-air-export-android-studio-project-loading02"></li>
<li>3). 其他<br>
如果想进一步修改，比如添加加载进度条，可以参考文档</li>
</ul>
<blockquote>
<p><a href="https://ldc.layabox.com/doc/?nav=zh-as-7-1-5">https://ldc.layabox.com/doc/?nav=zh-as-7-1-5</a></p>
</blockquote>
<h3 id="64apk">6.4. 移除自动更新APK</h3>
<p>修改 app/java/MainActivity onCreate方法</p>
<pre><code>        /*
         * 如果不想使用更新流程，可以屏蔽checkApkUpdate函数，直接打开initEngine函数
         */
        checkApkUpdate(this);
        //initEngine();
</code></pre>
<p>示例</p>
<p><img src="/content/images/2020/10/laya-air-export-android-studio-project-init-engine.png" alt="laya-air-export-android-studio-project-init-engine"></p>
<h3 id="65">6.5. 其他工作</h3>
<ul>
<li>1). 替换icon</li>
<li>2). 修改包名</li>
<li>3). 修改游戏名</li>
</ul>
<h2 id="7">7. 打包</h2>
<p>完成！</p>
<h2 id="8">8. 其他问题请关注公众号在后台提问</h2>
<!--kg-card-end: markdown--><h2></h2>