---
title: "Go语言圣经 学习笔记（六）(第一部分)"
description: "本章主要介绍了GO的面向对像方法定义"
pubDate: 2019-11-10T04:53:49.000Z
author: "remote_pluto"
tags: ["读书笔记"]
tagSlugs: ["books"]
draft: false
type: post
slug: "go-language-tutorial6-1"
authorSlug: "remote_pluto"
---

<h2 id="-">第六章 方法</h2><h3 id="6-">6. 方法声明</h3><ul><li>在函数声明时，在其名字之前放上一个变量，即是一个方法。这个附加的参数会将该函数附加到这种类型上，即相当于为这种类型定义了一个成员函数。例如:</li></ul><!--kg-card-begin: code--><pre><code>package geometry
import "math"
type Point struct{ X, Y float64 }
// traditional function
func Distance(p, q Point) float64 {
    return math.Hypot(q.X-p.X, q.Y-p.Y)
} 
// same thing, but as a method of the Point type
func (p Point) Distance(q Point) float64 {
    return math.Hypot(q.X-p.X, q.Y-p.Y)
}
</code></pre><!--kg-card-end: code--><p>上面的代码里那个附加的参数p，叫做方法的接收器(receiver)</p><ul><li>go语言可以给任意类型定义方法，(只要其基础类型不是指针或接口)例如:</li></ul><!--kg-card-begin: code--><pre><code>// A Path is a journey connecting the points with straight lines.
type Path []Point
// Distance returns the distance traveled along the path.
func (path Path) Distance() float64 {
    sum := 0.0
    for i := range path {
        if i &gt; 0 {
            sum += path[i-1].Distance(path[i])
        }
    } 
    return sum
}
</code></pre><!--kg-card-end: code--><h3 id="6-2-">6.2 基于指针对象的方法</h3><ul><li>用来更新接收器的对象的方法，当这个接受者变量本身比较<br>大时，我们就可以用其指针而不是对象来声明方法，如下：</li></ul><!--kg-card-begin: code--><pre><code>func (p *Point) ScaleBy(factor float64) {
    p.X *= factor
    p.Y *= factor
}
</code></pre><!--kg-card-end: code--><ul><li>在现实的程序里，一般会约定如果Point这个类有一个指针作为接收器的方法，那么所有Point的方法都必须有一个指针接收器，即使是那些并不需要这个指针接收器的函数。</li><li>只有类型(Point)和指向他们的指针(*Point)，才是可能会出现在接收器声明里的两种接收器。此外，为了避免歧义，在声明方法时，如果一个类型名本身是一个指针的话，是不允许其出<br>现在接收器中的</li></ul><!--kg-card-begin: code--><pre><code>type P *int
func (P) f() { /* ... */ } // compile error: invalid receiver type
</code></pre><!--kg-card-end: code--><ul><li>接收器实参是类型T，但接收器形参是类型*T，这种情况下编译器会隐式地为我们取变量的地址：</li></ul><!--kg-card-begin: code--><pre><code>p.ScaleBy(2) // implicit (&amp;p)
</code></pre><!--kg-card-end: code--><p>或者接收器实参是类型*T，形参是类型T。编译器会隐式地为我们解引用，取到指针指向的实际变量：</p><!--kg-card-begin: code--><pre><code>pptr.Distance(q) // implicit (*pptr)
</code></pre><!--kg-card-end: code--><h4 id="6-2-1-nil-">6.2.1 Nil也是一个合法的接收器类型</h4><ul><li>就像一些函数允许nil指针作为参数一样，方法理论上也可以用nil指针作为其接收器，尤其当nil对于对象来说是合法的零值时，比如map或者slice。在下面的简单int链表的例子里，nil代<br>表的是空链表</li></ul><!--kg-card-begin: code--><pre><code>// An IntList is a linked list of integers.
// A nil *IntList represents the empty list.
type IntList struct {
    Value int
    Tail *IntList
} 
// Sum returns the sum of the list elements.
func (list *IntList) Sum() int {
    if list == nil {
        return 0
    } 
    return list.Value + list.Tail.Sum()
}
</code></pre><!--kg-card-end: code--><h3 id="6-3-">6.3 通过嵌入结构体来扩展类型</h3><ul><li>对于类型ColoredPoint</li></ul><!--kg-card-begin: code--><pre><code>import "image/color"
type Point struct{ X, Y float64 }
type ColoredPoint struct {
    Point
    Color color.RGBA
}
</code></pre><!--kg-card-end: code--><p>我们可以把ColoredPoint类型当作接收器来调用Point里的方法，即使ColoredPoint里没有声明这些方法</p><!--kg-card-begin: code--><pre><code>red := color.RGBA{255, 0, 0, 255}
blue := color.RGBA{0, 0, 255, 255}
var p = ColoredPoint{Point{1, 1}, red}
var q = ColoredPoint{Point{5, 4}, blue}
fmt.Println(p.Distance(q.Point)) // "5"
p.ScaleBy(2)
q.ScaleBy(2)
fmt.Println(p.Distance(q.Point)) // "10"
</code></pre><!--kg-card-end: code--><p>请注意上面例子中对Distance方法的调用。Distance有一个参数是Point类型，但q并不是一个Point类，所以尽管q<br>有着Point这个内嵌类型，我们也必须要显式地选择它。尝试直接传q的话你会看到下面这样的错误:</p><!--kg-card-begin: code--><pre><code>p.Distance(q) // compile error: cannot use q (ColoredPoint) as Point
</code></pre><!--kg-card-end: code-->