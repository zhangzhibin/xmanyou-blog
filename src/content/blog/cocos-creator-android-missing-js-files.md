---
title: "#Cocos Creator# 安卓包运行时找不到settings.js文件？"
description: "一个新鲜出炉的Cocos Creator工程，一个完全按照文档和提示操作的打包流程，\n却导致一次意向不到的崩溃和莫名的错误，到底是怎么回事？"
pubDate: 2019-07-20T07:17:25.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
draft: false
type: post
slug: "cocos-creator-android-missing-js-files"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>CocosCreator工程，输出Android Studio工程，用Android Studio打开，根据提示升级相关的Gradle:<br>
<img src="/images/2019/07/CocosCreator_Android_Cannot_Find_Settings_js_01_upgrade_gradle.png" alt="CocosCreator_Android_Cannot_Find_Settings_js_01_upgrade_gradle"></p>
<p>然后打包，安装到安卓手机上，运行测试，咦，怎么闪退了？</p>
<p>如果查看logcat日志，可以看到错误：</p>
<p><img src="/images/2019/07/CocosCreator_Android_Cannot_Find_Settings_js_02_error.png" alt="CocosCreator_Android_Cannot_Find_Settings_js_02_error"></p>
<p>完整的错误信息：</p>
<pre><code>E/jswrapper: ScriptEngine::onGetStringFromFile jsb-adapter/jsb-builtin.js not found, possible missing file.
    ScriptEngine::runScript script jsb-adapter/jsb-builtin.js, buffer is empty!
E/jswrapper: ScriptEngine::onGetStringFromFile src/settings.js not found, possible missing file.
    ScriptEngine::runScript script src/settings.js, buffer is empty!
    [ERROR] Failed to invoke require, location: /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/manual/jsb_global.cpp:292
    ScriptEngine::onGetStringFromFile src/cocos2d-jsb.js not found, possible missing file.
    ScriptEngine::runScript script src/cocos2d-jsb.js, buffer is empty!
    [ERROR] Failed to invoke require, location: /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/manual/jsb_global.cpp:292
D/vndksupport: Loading /vendor/lib64/hw/android.hardware.graphics.mapper@2.0-impl.so from current namespace instead of sphal namespace.
E/jswrapper: ScriptEngine::onGetStringFromFile jsb-adapter/jsb-engine.js not found, possible missing file.
    ScriptEngine::runScript script jsb-adapter/jsb-engine.js, buffer is empty!
    [ERROR] Failed to invoke require, location: /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/manual/jsb_global.cpp:292
D/vndksupport: Loading /vendor/lib64/hw/gralloc.sdm845.so from current namespace instead of sphal namespace.
E/jswrapper: ERROR: Uncaught TypeError: Cannot read property 'debug' of undefined, location: main.js:0:0
    STACK:
    [0]window.boot@main.js:10
    [1]anonymous@main.js:212
    ScriptEngine::evalString script main.js, failed!
A/libc: /Applications/CocosCreator.app/Contents/Resources/cocos2d-x/cocos/scripting/js-bindings/jswrapper/Value.cpp:539: se::Object *se::Value::toObject() const: assertion &quot;isObject()&quot; failed
    Fatal signal 6 (SIGABRT), code -6 in tid 32669 (GLThread 109567), pid 32595 (dowgame.balance)
Application terminated.

</code></pre>
<p>这是怎么回事？</p>
<h2 id="">原因</h2>
<p>首先，检查一下导出的apk包是不是正常的。</p>
<p>直接在Android Studio里，双击打开对应的apk，可以查看包里的内容</p>
<p><strong>果然没有js文件！</strong></p>
<p><img src="/images/2019/07/CocosCreator_Android_Cannot_Find_Settings_js_03_checking_apk.png" alt="CocosCreator_Android_Cannot_Find_Settings_js_03_checking_apk"></p>
<p>有什么办法呢？</p>
<h2 id="">解决方法</h2>
<ol>
<li>重新打一个包，然后<strong>不升级Gradle</strong>，直接打包。</li>
</ol>
<p>看看这时候的apk包是否正常：<br>
<img src="/images/2019/07/CocosCreator_Android_Cannot_Find_Settings_js_04_correct_apk.png" alt="CocosCreator_Android_Cannot_Find_Settings_js_04_correct_apk"></p>
<p>居然是正常的，看来是升级Gradle以后的产生的问题。</p>
<ol start="2">
<li>如果升级Gradle，<strong>需要修改一下build.gradle</strong></li>
</ol>
<pre><code>
android.applicationVariants.all { variant -&gt;
    // delete previous files first
    delete &quot;${buildDir}/intermediates/merged_assets/${variant.dirName}&quot;

    variant.mergeAssets.doLast {
        def sourceDir = &quot;${buildDir}/../../../../..&quot;
        
// 以下几行是旧的代码，在新版Gradle下有问题
//        copy {
//            from &quot;${sourceDir}/res&quot;
//            into &quot;${outputDir}/res&quot;
//        }
//
//        copy {
//            from &quot;${sourceDir}/src&quot;
//            into &quot;${outputDir}/src&quot;
//        }
//
//        copy {
//            from &quot;${sourceDir}/jsb-adapter&quot;
//            into &quot;${outputDir}/jsb-adapter&quot;
//        }

// 新的拷贝文件的方法，在新版Gradle可用
        copy{
            from &quot;${sourceDir}&quot;
            include &quot;res/**&quot;
            include &quot;src/**&quot;
            include &quot;jsb-adapter/**&quot;

            into outputDir
        }

        copy {
            from &quot;${sourceDir}/main.js&quot;
            from &quot;${sourceDir}/project.json&quot;
            into outputDir
        }
    }
}
</code></pre>
<p><img src="/images/2019/07/CocosCreator_Android_Cannot_Find_Settings_js_05_correction.png" alt="CocosCreator_Android_Cannot_Find_Settings_js_05_correction"></p>
<p>打包测试，这次从打包的临时目录查看一下，文件都在</p>
<blockquote>
<p>临时文件目录：xx/app/build/intermediates/merged_assets/debug/out</p>
</blockquote>
<p><img src="/images/2019/07/CocosCreator_Android_Cannot_Find_Settings_js_06_merged_assets.png" alt="CocosCreator_Android_Cannot_Find_Settings_js_06_merged_assets"></p>
<h2 id="">参考</h2>
<ol>
<li><a href="https://docs.gradle.org/current/userguide/working_with_files.html#sec:copying_directories_example">https://docs.gradle.org/current/userguide/working_with_files.html#sec:copying_directories_example</a></li>
</ol>
<!--kg-card-end: markdown-->