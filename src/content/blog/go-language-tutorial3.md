---
title: "Go语言圣经 学习笔记 第三章"
description: "本章主要学习了Go语言的基础数据类型，了解了相关数据类型的特殊用法"
pubDate: 2019-09-30T16:40:49.000Z
author: "remote_pluto"
tags: ["读书笔记"]
draft: false
type: post
slug: "go-language-tutorial3"
---

<h2 id="-">第三章 基础数据类型</h2><ul><li>Go语言将数据类型分为四类：基础类型，符合类型，引用类型，接口类型</li></ul><h3 id="3-1-">3.1 整型</h3><ul><li>Go语言同时提供了有符号和无符号类型的整数运算。这里有int8、int16、int32和int64四种截然不同大小的有符号整形数类型，分别对应8、16、32、64bit大小的有符号整形数，与此对应的是uint8、uint16、uint32和uint64四种无符号整形数类型</li><li>其中有符号整数采用2的补码形式表示，也就是最高bit位用作表示符号位，一个n-bit的有符号数的值域是从−<code>$2^{n-1}$</code>到<code>$2^{n-1}$</code>。无符号整数的所有bit位都用于表示非负数，值域是0到<code>$2^n − 1$</code></li><li>对于每种类型T，如果转换允许的话，类型转换操作T(x)将x转换为T类型。许多整形数之间的相互转换并不会改变数值；它们只是告诉编译器如何解释这个值。但是对于将一个大尺寸的整数类型转为一个小尺寸的整数类型，或者是将一个浮点数转为整数，可能会改变数值或丢失精度</li><li>浮点数到整数的转换将丢失任何小数部分，然后向数轴零方向截断</li><li>任何大小的整数字面值都可以用以0开始的八进制格式书写，例如0666；或用以0x或0X开头的十六进制格式书写，例如0xdeadbeef。十六进制数字可以用大写或小写字母</li><li>fmt使用技巧。通常Printf格式化字符串包含多个%参数时将会包含对应相同数量的额外操作数，但是%之后的[1]副词告诉Printf函数再次使用第一个操作数。第二，%后的#副词告诉Printf在用%o、%x或%X输出时生成0、0x或0X前缀,例如:</li></ul><!--kg-card-begin: code--><pre><code>o := 0666
fmt.Printf("%d %[1]o %#[1]o\n", o) // "438 666 0666"
x := int64(0xdeadbeef)
fmt.Printf("%d %[1]x %#[1]x %#[1]X\n", x)
// Output:
// 3735928559 deadbeef 0xdeadbeef 0XDEADBEEF
</code></pre><!--kg-card-end: code--><h3 id="3-2-">3.2 浮点数</h3><ul><li>Go语言提供了两种精度的浮点数，float32和float64。</li><li>浮点数的范围极限值可以在math包找到。常量math.MaxFloat32表示float32能表示的最大数值，大约是3.4e38；对应的math.MaxFloat64常量大约是1.8e308。它们分别能表示的最小值近似为1.4e-45和4.9e-324</li><li>通常应该优先使用float64类型，因为float32类型的累计计算误差很容易扩散<br><br>ps:其中的画图的例子很有意思</li></ul><h3 id="3-3-">3.3 复数</h3><ul><li>Go语言提供了两种精度的复数类型：complex64和complex128，分别对应float32和float64两种浮点数精度。内置的complex函数用于构建复数，内建的real和imag函数分别返回复数的实<br>部和虚部</li></ul><h3 id="3-4-">3.4 布尔型</h3><ul><li>一个布尔类型的值只有两种：true和false。布尔值可以和&amp;&amp;（ AND） 和||（OR）操作符结合，并且可能会有短路行为：如果运算符左边值已经可以确定整个布尔表达式的值，那么运算符右边的值将不在被求值</li><li>&amp;&amp; 的优先级比 || 高</li></ul><h3 id="3-5-">3.5 字符串</h3><ul><li>本字符串通常被解释为采用UTF8编码的Unicode码点<br>（ rune） 序列</li><li>内置的len函数可以返回一个字符串中的字节数目（ 不是rune字符数目） ，索引操作s[i]返回第i个字节的字节值</li><li>+操作符将两个字符串链接构造一个新字符串</li><li>字符串是不可修改的，尝试修改字符串内部数据的操作也是被禁止的</li></ul><!--kg-card-begin: code--><pre><code>s[0] = 'L' // compile error: cannot assign to s[0]
</code></pre><!--kg-card-end: code--><ul><li>Unicode转义字符让我们可以通过Unicode码点输入特殊的字符。有两种形式：\uhhhh对应16bit的码点值，\Uhhhhhhhh对应32bit的码点值，其中h是一个十六进制数字 例如:</li></ul><!--kg-card-begin: code--><pre><code>"世界"
"\xe4\xb8\x96\xe7\x95\x8c"
"\u4e16\u754c"
"\U00004e16\U0000754c"
</code></pre><!--kg-card-end: code--><ul><li>每一个UTF8字符解码，不管是显式地调用utf8.DecodeRuneInString解码或是在range循环中隐式地解码，如果遇到一个错误的UTF8编码输入，将生成一个特别的Unicode字符'\uFFFD'，在印刷中这个符号通常是一个黑色六角或钻石形状，里面包含一个白色的问号"�"</li><li>标准库中有四个包对字符串处理尤为重要：bytes、strings、strconv和unicode包</li><li>一个字符串是包含的只读字节数组，一旦创建，是不可变的。相比之下，一个字节slice的元素则可以自由地修改.字符串和字节slice之间可以相互转换</li></ul><!--kg-card-begin: code--><pre><code>s := "abc"
b := []byte(s)
s2 := string(b)
</code></pre><!--kg-card-end: code--><h3 id="3-6-">3.6 常量</h3><ul><li>常量表达式的值在编译期计算，而不是在运行期</li><li>如果是批量声明的常量，除了第一个外其它的常量右边的初始化表达式都可以省略，如果省略初始化表达式则表示使用前面常量的初始化表达式写法，对应的常量类型也一样的。例如：</li></ul><!--kg-card-begin: code--><pre><code>const (
    a = 1
    b 
    c = 2
    d
) 
fmt.Println(a, b, c, d) // "1 1 2 2"
</code></pre><!--kg-card-end: code--><ul><li>常量声明可以使用iota常量生成器初始化，它用于生成一组以相似规则初始化的常量，但是不用每行都写一遍初始化表达式。在一个const声明语句中，在第一个声明的常量所在的行，iota将会被置为0，然后在每一个有常量声明的行加一</li><li>只有常量可以是无类型的</li></ul>