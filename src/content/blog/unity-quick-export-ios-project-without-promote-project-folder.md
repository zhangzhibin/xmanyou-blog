---
title: "#Unity# 通过扩展编辑器实现快速输出iOS工程"
description: "有没有办法快速输出一个工程，而不用每次都重复输入工程目录呢？"
pubDate: 2019-07-19T08:16:00.000Z
author: "阿斌"
tags: ["开发笔记", "Unity"]
tagSlugs: ["dev", "unity"]
draft: false
type: post
slug: "unity-quick-export-ios-project-without-promote-project-folder"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>Unity输出iOS工程，支持两种模式：</p>
<p><img src="/content/images/2019/07/Unity_Build_Settings_01.png" alt="Unity_Build_Settings_01"></p>
<ol>
<li>使用快捷键，直接输出并打包调试 (<strong>Build And Run</strong>)</li>
</ol>
<blockquote>
<p>在Mac的快捷方式是 Mac键+B， Windows下是 Ctrl+B。</p>
</blockquote>
<p><strong>好处</strong><br>
除了第一次，不用每次都输入工程目录。</p>
<p><strong>不好的地方</strong><br>
输出以后会自动进入打包调试。调试功能需要调用XCode的工具，联调的时候，经常会挂，导致必须强制关闭Unity。</p>
<ol start="2">
<li>使用菜单，调出打包设置(<strong>Build Settings...</strong>)页面，从这里选择打包。<br>
<img src="/content/images/2019/07/Unity_Build_Settings_02.png" alt="Unity_Build_Settings_02"></li>
</ol>
<p>从这两个菜单进行输出。如果选择Build，则只输出工程，如果选择BuildAndRun，输出工程后会自动尝试调试。</p>
<p><strong>不好的地方</strong><br>
每次都需要输入要导出的工程目录名。</p>
<p><strong>那么，问题来了，有没有办法可以自动重用设置好的工程目录，不弹窗直接输出呢？</strong></p>
<h2 id="">原因</h2>
<p>没有什么原因，这是Unity很久以来的规定。</p>
<h2 id="">解决方法</h2>
<p>方法就是自己写编辑器脚本。</p>
<p>把以下代码放到一个.cs文件，然后放到Editor目录下。</p>
<p>参考代码：</p>
<pre><code>using UnityEngine;
using UnityEditor;
using System.IO;
using Debug = UnityEngine.Debug;
using System.Collections.Generic;

public static class AutoBuilder {
	static string GetProjectName()
	{
		string[] s = Application.dataPath.Split('/');
		return s[s.Length - 2];
	}

	static string[] GetScenePaths()
	{
		List&lt;string&gt; scenes = new List&lt;string&gt;();
		for(int i = 0; i &lt; EditorBuildSettings.scenes.Length; i++)
		{
			var scene = EditorBuildSettings.scenes[i];
			Debug.LogFormat(&quot;[Builder] Scenes [{0}]: {1}, [{2}]&quot;, i, scene.path, scene.enabled?&quot;x&quot;:&quot; &quot;);

			if(scene.enabled){	
				scenes.Add(scene.path);
			}
		}

		return scenes.ToArray();
	}

    [MenuItem(&quot;Tools/Build For iOS: proj.ios&quot;)]
    static void BuildForiOS()
    {
		System.Console.WriteLine (&quot;[Builder] Starting to build iOS project ...&quot;);
		string projDir = Application.dataPath + &quot;/../proj.ios&quot;;  // 这里是输出的目录， Output Project Path

		BuildOptions option = BuildOptions.None;
		if(Directory.Exists(projDir))
		{
			Debug.LogFormat (&quot;[Builder] project is existing: {0}&quot;, projDir);
			option = BuildOptions.AcceptExternalModificationsToPlayer;
		}
		else
		{
			Debug.LogFormat (&quot;[Builder] project is not existing: {0}&quot;, projDir);
		}

		var args = System.Environment.GetCommandLineArgs();
		Debug.LogFormat(args.ToString());

		if(EditorUserBuildSettings.activeBuildTarget != BuildTarget.iOS){
			Debug.LogFormat(&quot;[Builder] Current target is: {0}, switching to: {1}&quot;, EditorUserBuildSettings.activeBuildTarget, BuildTarget.iOS);
			if(!EditorUserBuildSettings.SwitchActiveBuildTarget(BuildTargetGroup.iOS, BuildTarget.iOS)){
				Debug.LogFormat(&quot;[Builder] Switching to {0}/{1} failed!&quot;, BuildTargetGroup.iOS, BuildTarget.iOS);
				return;
			}
		}

		BuildPipeline.BuildPlayer(GetScenePaths(), projDir, BuildTarget.iOS, option);

		Debug.LogFormat (&quot;[Builder] Done: &quot; + projDir);
    }
}
</code></pre>
<p>然后，你就可以通过点击菜单，直接输出工程了<br>
<img src="/content/images/2019/07/Unity_Build_Settings_03.png" alt="Unity_Build_Settings_03"></p>
<p>你还可以参考文档，为这个菜单项添加一个快捷键<br>
<a href="https://learn.unity.com/tutorial/editor-scripting#5c7f8528edbc2a002053b5f9">https://learn.unity.com/tutorial/editor-scripting#5c7f8528edbc2a002053b5f9</a></p>
<h2 id="">参考</h2>
<ol>
<li><em>Unity Editor Extensions – Menu Items</em> <a href="https://unity3d.com/learn/tutorials/topics/interface-essentials/unity-editor-extensions-menu-items">https://unity3d.com/learn/tutorials/topics/interface-essentials/unity-editor-extensions-menu-items</a></li>
<li><em>Editor Scripting</em> <a href="https://learn.unity.com/tutorial/editor-scripting#5c7f8528edbc2a002053b5f9">https://learn.unity.com/tutorial/editor-scripting#5c7f8528edbc2a002053b5f9</a></li>
</ol>
<!--kg-card-end: markdown-->