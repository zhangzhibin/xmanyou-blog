---
title: "ffmpeg合成视频笔记"
description: "本篇主要总结了近期视频合成的工作步骤"
pubDate: 2019-11-24T13:01:19.000Z
author: "remote_pluto"
tags: ["开发笔记"]
tagSlugs: ["dev"]
draft: false
type: post
slug: "ffmpeg-generate-video"
authorSlug: "remote_pluto"
---

<h2 id="-">一、需求</h2><p>近期有一个小需求，需要将一些图片和音频合成一段视频，期间踩了写坑，特记录一下，以备后面参考</p><h2 id="--1">二、整合的步骤</h2><h3 id="1-mp3-">1.将一张图片和一段mp3合成视频</h3><!--kg-card-begin: code--><pre><code>ffmpeg  -loop 1 -i ./1.jpg -i ./1.mp3 -absf aac_adtstoasc -s 1920*1080 -r 8 -c:v libx264 -x264-params keyint=1:scenecut=0 -c:a aac -b:a 64k -pix_fmt yuvj420p -t 20.00 ./out.mp4
</code></pre><!--kg-card-end: code--><ul><li>关键参数说明:<br><br>-r 指定帧率 <br><br>-t 指定视频时间</li><li>遇到的问题:<br><br>音视频时长不同(可以通过 mediainfo指令查看)<br></li><li>原因及解决:<br><br>采用的帧率为1(图像长度以1s为单位),而音频是毫秒级<br>因此导致，音画的时长不一致，相差较大。解决方法，<br>加大帧率(弊端:增加视频尺寸,处理速度降低)</li></ul><h3 id="2-mp4-">2.将多段mp4合成完整视频</h3><!--kg-card-begin: code--><pre><code>$ cat video_input.txt
file '/path/to/1.mp4'
file '/path/to/2.mp4'
file '/path/to/3.mp4'

ffmpeg  -safe 0 -f concat -i ./video_input.txt  -ac 1 -c copy ./output.mp4;
</code></pre><!--kg-card-end: code--><ul><li>关键参数说明:<br><br>-safe 0 加上此选项输入文件中可以包含绝对路径</li><li>遇到的问题:<br><br>报错:Unsafe file name ....<br></li><li>原因及解决:<br><br>未加上safe 0参数，并且输入文件中包含了绝对路径。解决方法，在-i之前加上 -safe 0</li></ul><h3 id="3-">3.将视频重整</h3><!--kg-card-begin: code--><pre><code>ffmpeg -ss 0 -i ./temp.mp4 -max_muxing_queue_size 1024 -vcodec h264  -acodec aac -copyts ./realoutput.mp4;
</code></pre><!--kg-card-end: code--><ul><li>关键参数说明:<br><br>-ss 0 此参数表示从视频起始点开始进行视频重编码<br><br>进行此步骤之后虽然编码方式没有改变，但是视频尺寸会小很多<br>具体原因尚未深究</li></ul><h2 id="--2">三、总结</h2><p>在做实验的过程中借鉴了<a href="https://www.jianshu.com/p/998d59afee5f">https://www.jianshu.com/p/998d59afee5f</a>这篇文章，里面总结各种坑，在实验过程中为我节省了大量的时间，虽然最终的方案跟此篇文章有些出入，但是依然要对对作者表示感谢。</p>