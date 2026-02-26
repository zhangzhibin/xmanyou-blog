---
title: "Go语言圣经 学习笔记 第五章(第二部分)"
description: "本章主要介绍GO语言的函数特性及用法"
pubDate: 2019-11-03T13:19:24.000Z
author: "remote_pluto"
tags: ["读书笔记"]
draft: false
type: post
slug: "go-language-tutorial5-2"
---

<h2 id="-">第五章 函数</h2><ul><li>本章主要讨论了GO语言的函数特性</li></ul><h3 id="5-7-">5.7 可变参数</h3><ul><li>在声明可变参数函数时，需要在参数列表的最后一个参数类型之前加上省略符号“...”，这表示该函数会接收任意数量的该类型参数</li></ul><!--kg-card-begin: code--><pre><code>func sum(vals...int) int {
    total := 0
    for _, val := range vals {
        total += val
    } 
    return total
}
</code></pre><!--kg-card-end: code--><ul><li>如果原始参数已经是切片类型，我们该如何传递给sum？只需<br>在最后一个参数后加上省略符,如</li></ul><!--kg-card-begin: code--><pre><code>values := []int{1, 2, 3, 4}
fmt.Println(sum(values...)) // "10"
</code></pre><!--kg-card-end: code--><h3 id="5-8-deferred-">5.8 Deferred函数</h3><ul><li>当defer语句被执行时，跟在defer后面的函数会被延迟执行。直到包含该defer语句的函数执行完毕时，defer后的函数才会被执行，不论包含defer语句的函数是通过return正常结束，还是由于panic导致的异常结束。你可以在一个函数中执行多条defer语句，它们的执行顺序与声明顺序相反。</li><li>defer语句经常被用于处理成对的操作，如打开、关闭、连接、断开连接、加锁、释放锁。通过defer机制，不论函数逻辑多复杂，都能保证在任何执行路径下，资源被释放</li><li>defer机制也常被用于记录何时进入和退出函数。下例中的<br>bigSlowOperation函数</li></ul><!--kg-card-begin: code--><pre><code>func bigSlowOperation() {
    defer trace("bigSlowOperation")() // don't forget the extra parentheses
    // ...lots of work…
    time.Sleep(10 * time.Second) // simulate slow
    operation by sleeping
} 
func trace(msg string) func() {
    start := time.Now()
    log.Printf("enter %s", msg)
    return func() {
        log.Printf("exit%s(%s)",msg,time.Since(start))
    }
}
</code></pre><!--kg-card-end: code--><p>需要注意一点：不要忘记defer语句后的圆括号，否则本该在进入时执行的操作会在退出时执行，而本该在退出时执行的，永远不会被执行.当执行到defer定义时，首先会对参数进行求值，然后参数被压入函数调用栈，此时不会进入defer函数体，而是直到函数返回时才调用defer函数体。参数被压入函数调用栈时，如果参数是值类型，那么将复制值，如果参数是指针，那么将复制指针而不是复制指针指向的值。<br>ps:上面的例子中，加了小括号之后，运行了函数体trace的</p><!--kg-card-begin: code--><pre><code>    start := time.Now()
    log.Printf("enter %s", msg)
    ...
</code></pre><!--kg-card-end: code--><p>部分是因为它要求得defer后面要执行的函数</p><h3 id="5-9-panic-">5.9 Panic异常</h3><ul><li>虽然Go的panic机制类似于其他语言的异常，但panic的适用场景有一些不同。由于panic会引起程序的崩溃，因此panic一般用于严重错误，如程序内部的逻辑不一致。勤奋的程序员认为<br>任何崩溃都表明代码中存在漏洞，所以对于大部分漏洞，我们应该使用Go提供的错误机制，而不是panic，尽量避免程序的崩溃。</li><li>获取堆栈信息</li></ul><!--kg-card-begin: code--><pre><code>func printStack() {
    var buf [4096]byte
    n := runtime.Stack(buf[:], false)
    os.Stdout.Write(buf[:n])
}
</code></pre><!--kg-card-end: code--><h3 id="5-9-recover-">5.9 Recover捕获异常</h3><ul><li>如果在deferred函数中调用了内置函数recover，并且定义该defer语句的函数发生了panic异常，recover会使程序从panic中恢复，并返回panic value。导致panic异常的函数不会继续运<br>行，但能正常返回。在未发生panic时调用recover，recover会返回nil。</li></ul><!--kg-card-begin: code--><pre><code>func Parse(input string) (s *Syntax, err error) {
    defer func() {
        if p := recover(); p != nil {
            err = fmt.Errorf("internal error: %v", p)
        }
    }()
    // ...parser...
}
</code></pre><!--kg-card-end: code-->