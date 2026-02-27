---
title: "#屠龙之技 Cocos Creator 项目中如何使用系统的文件选择对话框？"
description: "脑洞大开，一切皆有可能。"
pubDate: 2020-07-28T04:59:07.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator"]
tagSlugs: ["dev", "h5", "cocos-creator"]
draft: false
type: post
slug: "cocos-creator-open-file-box"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>文件选择对话框，在App开发中是很常用的一个组件，但是，在游戏开发中并不常见，所以Cocos Creator也没有提供这个组件。</p>
<p><img src="/content/images/2020/07/CocosCreator_Open_File_Dialog_01.png" alt="CocosCreator_Open_File_Dialog_01"></p>
<p>但是，有没有办法在Cocos Creator的项目中使用这个组件呢？</p>
<p><img src="/content/images/2020/07/CocosCreator_Open_File_Dialog_02.png" alt="CocosCreator_Open_File_Dialog_02"></p>
<p>答案当然是：<strong>有!</strong></p>
<h2 id="">解决方法</h2>
<h3 id="1">方法1，直接调用操作系统的文件对话框组件。</h3>
<p>不管是windows还是mac os，甚至android和ios，文件选择对话框，都是系统自带的组件。</p>
<p>所以，如果我们把这个组件的调用代码封装好，提供js接口，那么，就可以直接在Cocos Creator中使用了。</p>
<p>但是，这个方法就比较麻烦，需要针对不同的系统进行封装，费时费力。</p>
<h3 id="2html">方法2，使用HTML的文件对话框组件。</h3>
<p>在Web编程时，我们可以使用<strong>file</strong> 类型的input组件，来作为文件选择对话框的入口。</p>
<pre><code>&lt;input type=&quot;file&quot;&gt;
</code></pre>
<blockquote>
<p>参考：<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file">https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file</a></p>
</blockquote>
<p>在线示例：<a href="https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_file">https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_file</a></p>
<p><img src="/content/images/2020/07/CocosCreator_Open_File_Dialog_03.png" alt="CocosCreator_Open_File_Dialog_03"></p>
<p>Cocos Creator项目使用的是JavaScript语言，如果能直接调用HTML的接口，那么就可以省去了很多封装的工作。</p>
<p>有几个选择</p>
<h4 id="1">选项 1). 静态添加</h4>
<p>在index.html里添加file input组件，然后在Creator项目的JavaScript代码中调用。</p>
<h4 id="2">选项 2). 动态添加</h4>
<p>直接在Creator项目的JavaScript代码中创建file input组件，并使用。<br>
选项2) 看起来更简洁一点，不需要修改index.html，而且这意味着不需要打包也可以进行测试。</p>
<p>步骤:</p>
<ol>
<li>创建file input</li>
</ol>
<pre><code>// typescript 代码
function getInputBox(inputBoxId:string, containerId:string){
    let inputBox = document.getElementById(inputBoxId) as HTMLInputElement;
    if(!inputBox){
        let container = document.getElementById(containerId);
        if(!container){
            container = document.createElement('div');
            document.body.appendChild(container);
            container.id = containerId;
        }

        inputBox = document.createElement(&quot;input&quot;) as HTMLInputElement;
        inputBox.id = inputBoxId;

        inputBox.type = &quot;file&quot;;

        container.appendChild(inputBox);
    }
    return inputBox;
}
</code></pre>
<ol start="2">
<li>添加监听<br>
每当用户选择了一个新文件，input会触发onchange事件，所以可以在这个事件里对选择的文件进行处理。<br>
有两种方式可以处理，
<ul>
<li>1). 读取event的参数: event.target.files</li>
<li>2). 直接访问input的value: inputBox.value</li>
</ul>
</li>
</ol>
<pre><code>let inputBox = this.getInputBox(this.inputBoxId, this.containerId);
if(inputBox){
    inputBox.onchange = (evt)=&gt;{
        console.info(&quot;===&gt; input value change: &quot;, evt);
        const fileList = evt.target.files;
        console.info(&quot;===&gt; file list: &quot;, fileList);
        console.info(&quot;===&gt; value: &quot;, inputBox.value);

        let fileUrl = fileList[0];
        if(!fileUrl){
            console.info(&quot;===&gt; No file selected&quot;);
            return;
        }
        this.readFile(fileUrl);
    };
}else{
    console.warn(&quot;Can't get or create input box&quot;);
}
</code></pre>
<ol start="3">
<li>读取文件<br>
获取文件的路径后，可以用fileReader读取文件信息</li>
</ol>
<pre><code>readFile(fileUrl){
    let reader = new FileReader();
    reader.onload = function(e) {
        let content = e.target.result;
        // Display file content
        console.info(&quot;===&gt; file content: &quot;, content);
    };
    // 这里用文本方式读，也可以用别的方式
    reader.readAsText(fileUrl);
}
</code></pre>
<ol start="4">
<li>触发点击<br>
现在，一切准备就绪，只需要触发file input的click方法，就可以打开文件选择对话框了。<br>
<strong>注意</strong> 需要把click方法的调用，绑定到Cocos Creator按钮组件的点击事件中。否则，浏览器会提示以下这个错误警告，并拒绝打开对话框：</li>
</ol>
<blockquote>
<p>File choose dialog can only be shown with a user activation<br>
<img src="/content/images/2020/07/CocosCreator_Open_File_Dialog_04.png" alt="CocosCreator_Open_File_Dialog_04"></p>
</blockquote>
<pre><code>let inputBox = this.getInputBox(this.inputBoxId, this.containerId);
if(inputBox){
    // 模拟点击按钮，打开对话框。
    inputBox.click();
}
</code></pre>
<h4 id="">注意事项</h4>
<p>使用HTML的组件，会有一些限制，比如</p>
<ul>
<li>1). 只能在浏览器中使用。对于原生App，由于Creator打包的原生应用，运行底层不是浏览器组件，第二种方法应该是不可行的（未验证）。</li>
<li>2). 必须绑定到玩家的点击操作，不能在没有任何操作时，直接用代码弹窗。</li>
</ul>
<p>完成</p>
<h4 id="2">方法2的完整代码</h4>
<blockquote>
<p><a href="https://gist.github.com/zhangzhibin/a21ec65b434f45efec2103f03b29ba57.js">https://gist.github.com/zhangzhibin/a21ec65b434f45efec2103f03b29ba57.js</a></p>
</blockquote>
<pre><code>const {ccclass, property} = cc._decorator;

@ccclass
export default class FileBox extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property
    containerId = &quot;_filebox_container_&quot;;
    @property
    inputBoxId = &quot;_filebox_input_&quot;;

    inputBox = null;
    start () {
        this.initInputBox();
    }

    initInputBox(){
        let inputBox = this.getInputBox(this.inputBoxId, this.containerId);
        if(inputBox){
            inputBox.onchange = (evt)=&gt;{
                console.info(&quot;===&gt; input value change: &quot;, evt);
                const fileList = evt.target.files;
                console.info(&quot;===&gt; file list: &quot;, fileList);
                console.info(&quot;===&gt; value: &quot;, inputBox.value);

                let file = fileList[0];
                if(!file){
                    console.info(&quot;===&gt; No file selected&quot;);
                    return;
                }
                this.readFile(file);
            };
        }else{
            console.warn(&quot;Can't get or create input box&quot;);
        }
    }

    getInputBox(inputBoxId:string, containerId:string){
        if(!this.inputBox){
            let inputBox = document.getElementById(inputBoxId) as HTMLInputElement;
            if(!inputBox){
                let container = document.getElementById(containerId);
                if(!container){
                    container = document.createElement('div');
                    document.body.appendChild(container);
                    container.id = containerId;
                }

                inputBox = document.createElement(&quot;input&quot;) as HTMLInputElement;
                inputBox.id = inputBoxId;

                inputBox.type = &quot;file&quot;;

                container.appendChild(inputBox);
            }
            this.inputBox = inputBox;
        }
        return this.inputBox;
    }

    onClick(){
        if(this.inputBox){
            console.info(&quot;click start&quot;);
            this.inputBox.click();
            console.info(&quot;click done&quot;)

        }
    }

    readFile(fileUrl){
        let reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            // Display file content
            console.info(&quot;===&gt; file content: &quot;, content);
        };
        // 这里用文本方式读，也可以用别的方式
        reader.readAsText(fileUrl);
    }
}
</code></pre>
<!--kg-card-end: markdown-->