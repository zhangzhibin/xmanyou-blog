---
title: "Go语言圣经 学习笔记 第五章(第一部分)"
description: "本章主要介绍了Go语言函数相关的知识点"
pubDate: 2019-10-20T09:40:22.000Z
author: "remote_pluto"
tags: ["读书笔记"]
draft: false
type: post
slug: "go-language-tutorial5-1"
---

<h2 id="-">第五章 函数</h2><ul><li>本章主要讨论了GO语言的函数特性</li></ul><h3 id="5-1-">5.1 函数声明</h3><ul><li>函数声明包括函数名、形式参数列表、返回值列表（ 可省略） 以及函数体</li></ul><!--kg-card-begin: code--><pre><code>func name(parameter-list) (result-list) {
    body
}
</code></pre><!--kg-card-end: code--><ul><li>函数的类型被称为函数的标识符。如果两个函数形式参数列表和返回值列表中的变量类型一一对应，那么这两个函数被认为有相同的类型和标识符</li><li>Go语言没有默认参数值，也没有任何方法可以通过参数名指定形参</li><li>遇到没有函数体的函数声明，这表示该函数不是以Go实现的</li></ul><h3 id="5-2-">5.2 递归</h3><ul><li>大部分编程语言使用固定大小的函数调用栈，常见的大小从64KB到2MB不等。固定大小栈会限制递归的深度，当你用递归处理大量数据时，需要避免栈溢出；除此之外，还会导致安全性问题。与相反,Go语言使用可变栈，栈的大小按需增加(初始时很小)。这使得我们使用递归时不必考虑溢出和安全问题</li></ul><h3 id="5-3-">5.3 多返回值</h3><ul><li>Go的垃圾回收机制会回收不被使用的内存，但是这不包括操作系统层面的资源，比如打开的文件、网络连接。因此我们必须显式的释放这些资源。</li><li>调用多返回值函数时，返回给调用者的是一组值，调用者必须显式的将这些值分配给变量:</li></ul><!--kg-card-begin: code--><pre><code>links, err := findLinks(url)
</code></pre><!--kg-card-end: code--><p>如果某个值不被使用，可以将其分配给blank identifier:</p><!--kg-card-begin: code--><pre><code>links, _ := findLinks(url) // errors ignored
</code></pre><!--kg-card-end: code--><ul><li>如果一个函数将所有的返回值都显示的变量名，那么该函数的return语句可以省略操作数。这称之为bare return</li></ul><!--kg-card-begin: code--><pre><code>// CountWordsAndImages does an HTTP GET request for the HTML
// document url and returns the number of words and images in it.
func CountWordsAndImages(url string) (words, images int, err error) {
    ...
    words, images = countWordsAndImages(doc)
    return
} 
func countWordsAndImages(n *html.Node) (words, images int) { /* ... */ }
</code></pre><!--kg-card-end: code--><h3 id="5-4-">5.4 错误</h3><h4 id="5-4-1-">5.4.1 错误处理策略</h4><ul><li>传播错误：直接将错误返回给调用者：</li></ul><!--kg-card-begin: code--><pre><code>resp, err := http.Get(url)
if err != nil{
    return nill, err
}
</code></pre><!--kg-card-end: code--><ul><li>如果错误的发生是偶然性的，或由不可预知的问题导致的。一个明智的选择是重新尝试失败的操作。在重试时，我们需要限制重试的时间间隔或重试的次数，防止无限制的重试</li><li>输出错误信息并结束程序</li><li>只需要输出错误信息</li><li>直接忽略掉错误</li></ul><h3 id="5-5-">5.5 函数值</h3><ul><li>函数像其他值一样，拥有类型，可以被赋值给其他变量，传递给函数，从函数返回。对函数值（function value）的调用类似函数调用。(C语言中函数指针)</li></ul><!--kg-card-begin: code--><pre><code>func square(n int) int { return n * n }
func negative(n int) int { return -n }
func product(m, n int) int { return m * n }
f := square
fmt.Println(f(3)) // "9"
f = negative
fmt.Println(f(3)) // "-3"
fmt.Printf("%T\n", f) // "func(int) int"
f = product // compile error: can't assign func(int, int) int to func(int) int
</code></pre><!--kg-card-end: code--><ul><li>函数类型的零值是nil</li></ul><!--kg-card-begin: code--><pre><code>var f func(int) int
f(3) // 此处f的值为nil, 会引起panic错误
</code></pre><!--kg-card-end: code--><h3 id="5-6-">5.6 匿名函数</h3><ul><li>function literal 可以表示一个 function value(个人感觉就是函数指针)，function literal的语法和函数声明相似，区别在于func关键字后没有函数名。function literal是一种表达式，它的值被称作匿名函数。根伟重要的是，通过这种方式定义的函数可以访问完整的词法环境(lexical environment),这也意味着函数中定义的内部函数可以引用该函数的变量.</li></ul><!--kg-card-begin: code--><pre><code>// squares返回一个匿名函数。
// 该匿名函数每次被调用时都会返回下一个数的平方。
func squares() func() int {
    var x int
    return func() int {
        x++
        return x * x
    }
} 
func main() {
    f := squares()
    fmt.Println(f()) // "1"
    fmt.Println(f()) // "4"
    fmt.Println(f()) // "9"
    fmt.Println(f()) // "16"
}
</code></pre><!--kg-card-end: code--><p>function values不仅仅是一串代码，还记录了状态.在squares中定义的匿名内部函数可以访问和更新squares中的局部变量，这意味着匿名函数和squares中，存在变量引用.</p><ul><li>匿名函数5.6.1示例注意下(后续章节下一篇继续)</li></ul>