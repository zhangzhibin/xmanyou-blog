---
title: "Golang 截获Ctrl+C以及Kill指令并执行清除工作"
description: "有什么办法可以知道用户按下了Ctrl+C来终止程序呢？"
pubDate: 2019-11-21T07:32:38.000Z
author: "阿斌"
tags: ["开发笔记", "go"]
tagSlugs: ["dev", "go"]
draft: false
type: post
slug: "golang-capture-ctrl-c-kill-signal"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>有时候我们需要在程序退出前执行清理工作，比如把内存Cache里的数据写入数据库等。这时候，就需要能够截获Ctrl+C指令或者kill指令。</p>
<h2 id="">解决方法</h2>
<pre><code class="language-go">// 执行清理工作
func cleanUp() {
	logs.Info(&quot;do cleaning up ...&quot;)
	storage.Flush()
	logs.Info(&quot;===== clean up done =====&quot;)
}

// 监听退出指令
func watch() {
	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM, syscall.SIGINT, syscall.SIGKILL) // 其中 SIGKILL = kill -9 &lt;pid&gt; 可能无法截获
	go func() {
		log.Info(&quot;watching stop signals&quot;)
		&lt;-c
		logs.Info(&quot;got SIGTERM signal, try clean up ...&quot;)
		cleanUp()
		logs.Info(&quot;===== ready to exit on SIGTERM =====&quot;)

		os.Exit(1)
	}()
}

func main() {
	watch()
    
    // 启动 APP
    beego.Run()
}

</code></pre>
<h2 id="">注意事项</h2>
<p>使用*kill -9 <pid>*指令时，进程将直接退出，这时候通常是截获不到的。</p>
<h2 id="">参考</h2>
<ul>
<li><a href="https://stackoverflow.com/questions/11268943/is-it-possible-to-capture-a-ctrlc-signal-and-run-a-cleanup-function-in-a-defe">https://stackoverflow.com/questions/11268943/is-it-possible-to-capture-a-ctrlc-signal-and-run-a-cleanup-function-in-a-defe</a></li>
<li><a href="https://stackoverflow.com/questions/8403862/do-actions-on-end-of-execution">https://stackoverflow.com/questions/8403862/do-actions-on-end-of-execution</a></li>
</ul>
<!--kg-card-end: markdown-->