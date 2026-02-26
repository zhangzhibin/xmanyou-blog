---
title: "Go语言圣经 学习笔记 第四章"
description: "本章中主要讨论四种类型-数组、slice、map和结构体"
pubDate: 2019-10-13T07:45:41.000Z
author: "remote_pluto"
tags: ["读书笔记"]
draft: false
type: post
slug: "go-language-tutorial4"
---

<h2 id="-">第四章 复合数据类型</h2><ul><li>本章中主要讨论四种类型-数组、slice、map和结构体</li></ul><h3 id="4-1-">4.1 数组</h3><ul><li>数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。因为数组的长度是固定的，因此在Go语言中很少直接使用数组</li><li>如果在数组的长度位置出现的是“...”省略号，则表示数组的长度是根据初始<br>化值的个数来计算</li></ul><!--kg-card-begin: code--><pre><code>q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"
</code></pre><!--kg-card-end: code--><ul><li>数组的长度是数组类型的一个组成部分，因此[3]int和[4]int是两种不同的数组类型。数组的长度必须是常量表达式，因为数组的长度需要在编译阶段确定。</li><li>可以指定一个索引和对应值列表的方式初始化</li></ul><!--kg-card-begin: code--><pre><code>type Currency int
const (
    USD Currency = iota // 美元
    EUR // 欧元
    GBP // 英镑
    RMB // 人民币
) s
ymbol := [...]string{USD: "$", EUR: "€", GBP: "￡", RMB: "￥"}
fmt.Println(RMB, symbol[RMB]) // "3 ￥"
</code></pre><!--kg-card-end: code--><h3 id="4-2-slice">4.2 Slice</h3><ul><li>Slice（切片） 代表变长的序列，序列中每个元素都有相同的类型。一个slice类型一般写作[]T</li><li>一个slice由三个部分构成：指针、长度和容量。指针指向第一个slice元素对应的底层数组元素的地址，要注意的是slice的第一个元素并不一定就是数组的第一个元素。长度对应slice中元素的数目；长度不能超过容量，容量一般是从slice的开始位置到底层数据的结尾位置。内置的len和cap函数分别返回slice的长度和容量。</li><li>slice之间不能比较，因此我们不能使用==操作符来判断两个slice是否含有<br>全部相等元素,slice唯一合法的比较操作是和nil比较，例如：</li></ul><!--kg-card-begin: code--><pre><code>if summer == nil { /* ... */ }
</code></pre><!--kg-card-end: code--><ul><li>有非nil值的slice的长度和容量也是0的，例如[]int{}或make([]int,3)[3:],因此你需要测试一个slice是否是空的，使用len(s)==0来判断，而不应该用s==nil来判断</li><li>内置的make函数创建一个指定元素类型、长度和容量的slice。容量部分可以省略，在这种情况下，容量将等于长度.在底层，make创建了一个匿名的数组变量，然后返回一个slice</li></ul><!--kg-card-begin: code--><pre><code>make([]T, len)
make([]T, len, cap) // same as make([]T, cap)[:len]
</code></pre><!--kg-card-end: code--><h3 id="4-3-map">4.3 Map</h3><ul><li>在Go语言中，一个map就是一个哈希表的引用，map类型可以写为map[K]V，其中K和V分别对应key和value。map中所有的key都有相同的类型，所有的value也有着相同的类型。其中K对应的key必须是支持==比较运算符的数据类型，所以map可以通过测试key是否相等来判断是否已经存在</li><li>内置的make函数可以创建一个map,例如：</li></ul><!--kg-card-begin: code--><pre><code>ages := make(map[string]int) // mapping from strings to ints
</code></pre><!--kg-card-end: code--><ul><li>另一种创建空的map的表达式是 map[string]int{}</li><li>使用内置的delete函数可以删除元素：</li></ul><!--kg-card-begin: code--><pre><code>delete(ages, "alice") // remove element ages["alice"]
</code></pre><!--kg-card-end: code--><ul><li>map中的元素并不是一个变量，因此我们不能对map的元素进行取址操作</li><li>遍历map中全部的key/value对</li></ul><!--kg-card-begin: code--><pre><code>for name, age := range ages {
    fmt.Printf("%s\t%d\n", name, age)
}
</code></pre><!--kg-card-end: code--><p>遍历的顺序是随机的，每一次遍历的顺序都不相同.如果要按顺序遍历key/value对，我们必须显式地对key进行排序</p><ul><li>map类型的零值是nil，也就是没有引用任何哈希表</li></ul><!--kg-card-begin: code--><pre><code>var ages map[string]int
fmt.Println(ages == nil) // "true"
fmt.Println(len(ages) == 0) // "true"
</code></pre><!--kg-card-end: code--><ul><li>map之间也不能进行相等比较；唯一的例外是和nil进行比较。要判断两个map是<br>否包含相同的key和value，我们必须通过一个循环实现:</li></ul><!--kg-card-begin: code--><pre><code>func equal(x, y map[string]int) bool {
if len(x) != len(y) {
    return false
} 
for k, xv := range x {
        if yv, ok := y[k]; !ok || yv != xv {
            return false
        }
    } 
    return true
}
</code></pre><!--kg-card-end: code--><h3 id="4-4-">4.4结构体</h3><ul><li>结构体是一种聚合的数据类型，是由零个或多个任意类型的值聚合成的实体。</li><li>函数返回的结构体指针可以通过点操作符号更新结构体成员，例如：</li></ul><!--kg-card-begin: code--><pre><code>func EmployeeByID(id int) *Employee { /* ... */ }
fmt.Println(EmployeeByID(dilbert.ManagerID).Position) // "Pointy-haired boss"
id := dilbert.ID
EmployeeByID(id).Salary = 0 // fired for... no real reason
</code></pre><!--kg-card-end: code--><p>EmployeeByID函数的返回值从 *Employee 指针类型改为Employee值类型，那么更新语句将不能编译通过，因为在赋值语句的左边并不确定是一个变量</p><ul><li>结构体成员的输入顺序也有重要的意义,调整成员出现的先后顺序，就是定义了不同的结构体类型</li><li>如果结构体成员名字是以大写字母开头的，那么该成员就是导出的；这是Go语言导出规则决定的。一个结构体可能同时包含导出和未导出的成员</li><li>一个命名为S的结构体类型将不能再包含S类型的成员：因为一个聚合的值不能包含它自身。（ 该限制同样适应于数组。） 但是S类型的结构体可以包含 *S 指针类型的成员</li><li>如果结构体的全部成员都是可以比较的，那么结构体也是可以比较的，那样的话两个结构体将可以使用或!=运算符进行比较。相等比较运算符将比较两个结构体的每个成员</li><li>Go语言有一个特性让我们只声明一个成员对应的数据类型而不指名成员的名字；这类成员就叫匿名成员，匿名成员的数据类型必须是命名的类型或指向一个命名的类型的指针</li><li>匿名嵌入的特性，我们可以直接访问叶子属性而不需要给出完整的路径</li></ul>