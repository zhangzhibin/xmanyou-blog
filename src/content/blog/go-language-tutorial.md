---
title: "Go语言圣经 学习笔记 第一章"
description: "go语言圣经 读书笔记"
pubDate: 2019-09-15T09:19:18.000Z
author: "remote_pluto"
tags: ["读书笔记"]
tagSlugs: ["books"]
draft: false
type: post
slug: "go-language-tutorial"
authorSlug: "remote_pluto"
---

<!--kg-card-begin: markdown--><h2 id="">前言</h2>
<h3 id="1go">1、Go的起源</h3>
<ul>
<li>C语言</li>
<li>Pascal语言 Modula-2激发了包的概念</li>
<li>CSP Communicating Sequential processes</li>
</ul>
<h3 id="2">2、语言特性</h3>
<ul>
<li>Go语言面向对象机制与一般语言不同，没有类层次机构，仅仅通过组合(而不是继承)简单的对象来构建复杂的对象。</li>
</ul>
<h2 id="">第一章 入门</h2>
<h3 id="1helloworld">1.Hello World</h3>
<ul>
<li>Go语言的代码通过包（package）组织，包类似于其它语言里的库（ libraries）或者模块（modules）。一个包由位于单个目录下的一个或多个.go源代码文件组成,目录定义包的作用。每个源文件都以一条 package声明语句开始，表示该文件属于哪个包，紧跟着一系列导入（ import）的包，之后是存储这个文件里的程序语句.</li>
<li>main 包比较特殊。它定义了一个独立可执行的程序，而不是一个库。在 main 里的main函数也很特殊，它是整个程序执行时的入口.</li>
<li><mark>缺少必要的包或++导入不需要的包++</mark>，程序都无法编译通过</li>
</ul>
<h3 id="2">2.命令行参数</h3>
<ul>
<li>程序的命令行参数可从os包的Args变量获取；os包外部使用os.Args访问该变量</li>
<li>os.Args变量是一个字符串（string）的切片（slice），Go言里也采用<mark>左闭右开</mark>形式,即，区间包括第一个索引元素，不包括最后一个, 因为这样可以简化逻辑。（ 译注：比如a = [1, 2, 3, 4, 5], a[0:3] = [1, 2, 3]，不包含最后一个元素）</li>
<li>os.Args[0], 是命令本身的名字；其它的元素则是程序启动时传给它的参数</li>
<li>Go语言只有for循环这一种循环语句。for循环三个部分不需括号包围。大括号强制要求,左大括号必须和post语句在同一行.for循环有多种形式: <br><br>
其中的一种为:<pre><code>for initialization; condition; post {
// zero or more statements
}
</code></pre>
可以变化为:while<pre><code>// a traditional &quot;while&quot; loop
for condition {
// ...
}
</code></pre>
无限循环:<pre><code>// a traditional infinite loop
for {
// ...
}
</code></pre>
for 循环的另一种形式, 在某种数据类型的区间（ range） 上遍历,如:<pre><code>for _, arg := range os.Args[1:] {
    s += sep + arg
    sep = &quot; &quot;
}
</code></pre>
此处使用了空标识符(blank identifier),即_(下划线)，原因是go语言<mark>不允许使用无用的局部变量</mark><br></li>
<li>声明一个变量有好几种方式，下面这些都等价：<pre><code>s := &quot;&quot;
var s string
var s = &quot;&quot;
var s string = &quot;&quot;
</code></pre>
一种形式，是一条短变量声明，最简洁，但只能用在函数内<br>
部，而不能用于包变量。第二种形式依赖于字符串的默认初始化零值机制，被初始化为&quot;&quot;。第三种形式用得很少，除非同时声明多个变量。第四种形式显式地标明变量的类型，当变量类型与初值类型相同时，类型冗余，但如果两者类型不同，变量类型就必须了.</li>
</ul>
<h3 id="3">3.查找重复的行</h3>
<ul>
<li>map存储了键/值（ key/value） 的集合，对集合元素，提供常数时间的存、取或测试操作。键<br>
可以是任意类型，只要其值能用==运算符比较，最常见的例子是字符串；值则可以是任意类型,内置函数 make 创建空 map,例如:<pre><code>counts := make(map[string]int)
</code></pre>
</li>
<li>os.Open 函数返回两个值。第一个值是被打开的文件( *os.File ） os.Open 返回的第二个值是内置 error 类型的值。如果 err 等于内置值 nil （ 译注：相当于<br>
其它语言里的NULL）</li>
<li>map 是一个由 make 函数创建的数据结构的引用。 map 作为为参数传递给某函数时，该函数接收这个引用的一份拷贝（ copy，或译为副本） ，被调用函数对map底层数据结构的任何修<br>
改，调用者函数都可以通过持有的map引用看到。在我们的例子中， countLines 函数向 counts 插入的值，也会被 main 函数看到。（ 译注：类似于C++里的引用传递，实际上指<br>
针是另一个指针了，但内部存的值指向同一块内存）</li>
</ul>
<h3 id="4gif">4.GIF动画</h3>
<ul>
<li>gif.GIF是一个struct类型（类似于C语言中的结构体） 。struct是一组值或者叫字段的集合，不同的类型集合在一个struct可以让我们以一个统一的单元进行处理。anim是一个gif.GIF类型的struct变量。这种写法会生成一个struct变量，并且其内部变量LoopCount字段会被设置为nframes；而其它的字段会被设置为各自类型默认的零值。struct内部的变量可以以一个点(.)来进行访问，就像在最后两个赋值语句中显式地更新了anim这个struct的Delay和Image字段</li>
</ul>
<h3 id="5url">5.获取URL</h3>
<ul>
<li>引入net/http和io/ioutil包，http.Get函数是创建HTTP请求<br>
的函数，如果获取过程没有出错，那么会在resp这个结构体中得到访问的请求结果。resp.Body.Close关闭resp的Body流，防止资源泄露<pre><code>resp, err := http.Get(url)
...
b, err := ioutil.ReadAll(resp.Body)
resp.Body.Close()
</code></pre>
</li>
</ul>
<h3 id="6url">6.并发获取多个URL</h3>
<ul>
<li>make函数创建了一个传递string类型参数的channel,用于goroutine之间进行参数传递:<pre><code>ch := make(chan string)
</code></pre>
当一个goroutine尝试在一个channel上做send或者receive操作时，这个goroutine会阻塞在调用处，直到另一个goroutine往这个channel里写入、或者接收值，这样两个goroutine才会继续执行channel操作之后的逻辑,往channel里发送一个值(ch&lt;-experession),接收值(&lt;-ch)<pre><code>ch &lt;- fmt.Sprintf(&quot;while reading %s: %v&quot;, url, err)
....
fmt.Println(&lt;-ch) 
</code></pre>
</li>
</ul>
<h3 id="7web">7.Web服务</h3>
<ul>
<li>例子中有：<pre><code>func handler(w http.ResponseWriter, r *http.Request) {
</code></pre>
其中 *http.Request等同于c语言的指针，文章中并未进行说明，特此记录。</li>
<li>服务器每一次接收请求处理时都会另起一个goroutine，这样服务器就可以同一时间处理多个请求，针对共享变量需要使用sync.Mutex进行锁定后更新<pre><code>var mu sync.Mutex
var count int
...
func handler(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    count++
    mu.Unlock()
    fmt.Fprintf(w, &quot;URL.Path = %q\n&quot;, r.URL.Path)
}
</code></pre>
</li>
</ul>
<h3 id="8">8.本章要点</h3>
<ul>
<li>switch多路选择说明:<pre><code>switch coinflip() {
    case &quot;heads&quot;:
        heads++
    case &quot;tails&quot;:
        tails++
    default:
    fmt.Println(&quot;landed on edge!&quot;)
}
</code></pre>
<mark>Go语言并不需要显式地在每一个case后写break，语言默认执行完case后的逻辑语句会自动退出</mark>。如果你想要相邻的case都执行同一逻辑的话，需要自己显式地写上一个fallthrough语句来覆盖这种默认行为.<br><br>
<mark>Go语言里的switch还可以不带操作对象</mark>（译注：switch不带操作对象时默认用true值代替，然后将每个case的表达s式和true值进行比较）；可以直接罗列多种条件，像其它语言里面的多个if else一样,这种形式叫做无tag switch(tagless switch)；<mark>这和switch true是等价的</mark><pre><code>func Signum(x int) int {
    switch {
        case x &gt; 0:
            return +1
        default:
            return 0
        case x &lt; 0:
            return -1
    }
}
</code></pre>
</li>
<li>命名类型:类型声明使得我们可以很方便地给一个特殊类型一个名字.例如:<pre><code>type Point struct {
    X, Y int
} 
var p Point
</code></pre>
</li>
<li>指针：Go语言提供了指针,指针是可见的内存地址，&amp;操作符可以返回一个变量的内存地址，并且*操作符可以获取指针指向的变量内容，但是在Go语言里没有指针运算，<mark>也就是不能像c语言里可以对指针进行加或减操作</mark></li>
<li>文档:你可以在 <a href="https://golang.org/pkg">https://golang.org/pkg</a> 和 <a href="https://godoc.xn--orgpackage-xt2pq24ayqal0cbxhrwg2w5c0zojzyuh0ez7l">https://godoc.org中找到标准库和社区写的package</a>。<mark>godoc</mark>这个工具可以让你直接在本地命令行阅读标准库的文档</li>
<li>注释: 参考10.7.4</li>
</ul>
<!--kg-card-end: markdown-->