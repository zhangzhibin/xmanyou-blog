---
title: "#Unity# 在编辑器扩展中用PostProcessBuildAttribute来修改XCode工程的Product Name"
description: "利用Unity编辑器脚本来自动修改XCode工程"
pubDate: 2019-07-26T09:06:15.000Z
author: "阿斌"
tags: ["开发笔记", "Unity"]
tagSlugs: ["dev", "unity"]
draft: false
type: post
slug: "unity-using-script-modify-xcode-project"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题环境</h2>
<p>之前用Unity打包上传时遇到过一个问题：<br>
《 <a href="https://xmanyou.com/ios-da-bao-shang-chuan-shi-bao-cuo-the-bundle-uses-a-bundle-name-or-display-name-that-is-already-taken/">#Unity# iOS打包上传时报错 The bundle uses a bundle name or display name that is already taken</a> 》</p>
<p>在解决这个bundle name冲突的时候，提到需要手动修改Product Name，以避免与系统名字冲突。</p>
<p>但是，Unity输出工程时，每次都会覆盖这些设置，如果每次手动修改还是挺麻烦的。</p>
<p>那么，有没有办法可以自动化呢？</p>
<h2 id="">解决方法</h2>
<p>自动化的方法，就是利用Unity的编辑器扩展脚本，参考另一篇文章：</p>
<p>《<a href="https://xmanyou.com/unity-quick-export-ios-project-without-promote-project-folder/">#Unity# 通过扩展编辑器实现快速输出iOS工程</a>》</p>
<p>再加上Unity提供的打包工作流脚本插件<br>
<a href="https://docs.unity3d.com/ScriptReference/Callbacks.PostProcessBuildAttribute.html">PostProcessBuildAttribute:  Add this attribute to a method to get a notification just after building the player.</a></p>
<p>利用这个脚本，就可以在打包的时候对XCode工程进行修改了。</p>
<h3 id="">要点讲解</h3>
<ol>
<li>格式<br>
声明打包后需要执行的方法：</li>
</ol>
<pre><code>[PostProcessBuildAttribute]
public static void OnPostProcessBuild(BuildTarget target, string pathToBuildProject)
{

}
</code></pre>
<ol start="2">
<li>修改xcode 工程文件</li>
</ol>
<p>1). 打开xcode工程</p>
<pre><code>string pbxProjectPath = PBXProject.GetPBXProjectPath( pathToBuildProject );
	// 修改工程设置
	PBXProject pbxProject = new PBXProject();
	pbxProject.ReadFromFile( pbxProjectPath );
</code></pre>
<p>2). 读取设置，这里读取 PRODUCT_BUNDLE_IDENTIFIER 和 PRODUCT_NAME</p>
<pre><code>PBXProject pbxProject = new PBXProject();
pbxProject.ReadFromFile( pbxProjectPath );

// 读取 build target
string targetGUID = pbxProject.TargetGuidByName(PBXProject.GetUnityTargetName() );

// 读取具体属性设置
var bundleId = pbxProject.GetBuildPropertyForAnyConfig(targetGUID, &quot;PRODUCT_BUNDLE_IDENTIFIER&quot;);

var productName = pbxProject.GetBuildPropertyForAnyConfig(targetGUID, &quot;PRODUCT_NAME&quot;);
</code></pre>
<p>3). 修改设置</p>
<pre><code>string newProductName = &quot;doufxcamera&quot;; // 注意product name必须都小写

if(productName != newProductName){
	pbxProject.SetBuildProperty(targetGUID, &quot;PRODUCT_NAME&quot;, newProductName);
}
</code></pre>
<p>4). 保存</p>
<pre><code>File.WriteAllText( pbxProjectPath, pbxProject.WriteToString() );
</code></pre>
<ol start="3">
<li>修改Info.plist文件</li>
</ol>
<blockquote>
<p>注意：如果只修改PRODUCT_NAME，会发现我们设置的BundleId也被修改了，因为Unity的XCode工程中，Info.plist中BundleId是与PRODUCT_NAME相关的。</p>
</blockquote>
<p><img src="/content/images/2019/07/Unity_Edit_XCode_Project_Using_Script.png" alt="Unity_Edit_XCode_Project_Using_Script"></p>
<p>步骤与修改工程文件类似<br>
1). 打开文件</p>
<pre><code>string plistPath = Path.Combine( pathToBuildProject, &quot;Info.plist&quot; );
PlistDocument plist = new PlistDocument();
plist.ReadFromString( File.ReadAllText( plistPath ) );

PlistElementDict rootDict = plist.root;
</code></pre>
<p>2). 读取或者修改字段</p>
<pre><code>rootDict.SetString(&quot;CFBundleIdentifier&quot;, bundleId);
</code></pre>
<p>3). 保存</p>
<pre><code>File.WriteAllText( plistPath, plist.WriteToString() );
</code></pre>
<ol start="4">
<li>完整代码参考</li>
</ol>
<pre><code>[PostProcessBuildAttribute]
public static void OnPostProcessBuild(BuildTarget target, string pathToBuildProject)
{
	if (target == BuildTarget.iOS)
	{
		Debug.Log( &quot;[PostBuild] pathToBuildProject: &quot; + pathToBuildProject );

		string pbxProjectPath = PBXProject.GetPBXProjectPath( pathToBuildProject );

        // 修改工程设置
		PBXProject pbxProject = new PBXProject();
		pbxProject.ReadFromFile( pbxProjectPath );

		string targetGUID = pbxProject.TargetGuidByName( PBXProject.GetUnityTargetName() );
		var bundleId = pbxProject.GetBuildPropertyForAnyConfig(targetGUID, &quot;PRODUCT_BUNDLE_IDENTIFIER&quot;);
		var productName = pbxProject.GetBuildPropertyForAnyConfig(targetGUID, &quot;PRODUCT_NAME&quot;);
		
        string newProductName = &quot;doufxcamera&quot;;

		Debug.LogFormat(&quot;[PostBuild] bundleid = {0}, product name={1}, change product name to: {2}&quot;, bundleId, productName, newProductName);
		
        if(productName != newProductName){
			pbxProject.SetBuildProperty(targetGUID, &quot;PRODUCT_NAME&quot;, newProductName);
		}
		
        File.WriteAllText( pbxProjectPath, pbxProject.WriteToString() );

		// 修改plist
		string plistPath = Path.Combine( pathToBuildProject, &quot;Info.plist&quot; );
		PlistDocument plist = new PlistDocument();
		plist.ReadFromString( File.ReadAllText( plistPath ) );

		PlistElementDict rootDict = plist.root;
		rootDict.SetString(&quot;CFBundleIdentifier&quot;, bundleId);
                    
        File.WriteAllText( plistPath, plist.WriteToString() );
	}
}
</code></pre>
<h2 id="">参考</h2>
<ol>
<li><a href="https://docs.unity3d.com/ScriptReference/iOS.Xcode.PBXProject.UpdateBuildProperty.html">https://docs.unity3d.com/ScriptReference/iOS.Xcode.PBXProject.UpdateBuildProperty.html</a></li>
<li><a href="https://docs.unity3d.com/ScriptReference/iOS.Xcode.PBXProject.html">https://docs.unity3d.com/ScriptReference/iOS.Xcode.PBXProject.html</a></li>
</ol>
<!--kg-card-end: markdown-->