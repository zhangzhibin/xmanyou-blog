---
title: "Linux多进程编程"
description: "本篇主要总结了下工作中用到的多进程相关的知识点及容易混淆的地方"
pubDate: 2019-12-15T07:12:44.000Z
author: "remote_pluto"
tags: ["开发笔记"]
tagSlugs: ["dev"]
draft: false
type: post
slug: "linux-multi-process"
authorSlug: "remote_pluto"
---

<h2 id="-">需要介绍的几个函数</h2><ul><li>fork() 允许一个进程创建一个子进程，子进程获得父进程的栈，数据段，堆和执行文本段</li><li>exit(status) 终止一个进程，将进程占据的所有资源释放</li><li>wait(&amp;status) 如果子进程尚未调用exit()终止，那么wait()会挂起父进程直到子进程终止，子进程的终止状态通过wait函数的status参数返回</li></ul><h2 id="fork">fork</h2><ul><li>fork函数对其调用后将存在两个进程，并且每个进程都会从fork的返回处继续执行。在不同的进程中fork的返回值不同，父进程中返回创建的子进程ID,子进程中返回0</li><li>fork调用后系统会调度哪个进程，是无法确定的</li></ul><!--kg-card-begin: code--><pre><code>public function createProcess($count)
  {

    for ($liLoop = 0; $liLoop &lt; $count; $liLoop++) {
      $pid = pcntl_fork();
      switch ($pid) {
        case -1:
          echo "something error!\r\n";
          break;
        case 0:
          $childPid = posix_getpid();
          echo "I am child pid:" . $childPid . "\r\n";
          sleep(5);
          break;
        default:
          $this-&gt;mChildProcess[$pid] = true ;
          $this-&gt;mMasterPID = posix_getpid();
          echo "I am parent pid:" . posix_getpid() . "\r\n";
          break;
      }
    }
    $currentPid = posix_getpid();
    if($currentPid == $this-&gt;mMasterPID)
    {
      while (!empty($this-&gt;mChildProcess)) {
        $exitChild = pcntl_wait($exit);
        if ($exitChild &gt; 0) {
          echo "child ".$exitChild." finish task!\r\n";
          unset($this-&gt;mChildProcess[$exitChild]);
        }
      }
      echo posix_getpid() ." Experiment Finish\r\n";
    }
  }
</code></pre><!--kg-card-end: code--><!--kg-card-begin: image--><figure class="kg-card kg-image-card"><img src="/images/2019/12/fork--.jpg" class="kg-image"></figure><!--kg-card-end: image--><h2 id="--1">进程之间的文件共享</h2><ul><li>执行fork时，子进程会获得父进程所有文件描述符的副本.这些副本的创建方式类似于dup(),这也意味着子进程中的描述符均指向相同的打开的文件句柄。举例来说如果子进程更新了文件偏移量，会影响到父进程中相应的描述符</li><li>在使用fork调用后，如果不需要对文件描述符的共享方式，需要注意两点:1.令父子进程使用不同的描述符。2.各自关闭不再使用的描述符</li></ul><!--kg-card-begin: code--><pre><code>  public function shareFileDescriptor()
  {
    $file = fopen($this-&gt;mShareFile,"r");
    echo "before fork the current offset is:".ftell($file)."\r\n";
    $pid = pcntl_fork();
    switch ($pid) {
      case -1:
        echo "something error!\r\n";
        break;
      case 0:
        $childPid = posix_getpid();
        fseek($file,5);
        echo "in child we modify the offset the current offset is:".ftell($file)."\r\n";
        break;
      default:
        sleep(5);
        $content = fread($file,5);
        echo "in parent we read :".$content."\r\n";
        echo "in parent, child has modified the offset the current offset is:".ftell($file)."\r\n";
        break;
    }
  }
</code></pre><!--kg-card-end: code--><!--kg-card-begin: image--><figure class="kg-card kg-image-card"><img src="/images/2019/12/fork----------.png" class="kg-image"></figure><!--kg-card-end: image--><h2 id="fork-">fork的内存语义</h2><ul><li>内核将每一进程的代码标记位只读,使进程无法修改自身代码。这样，父子进程可共享同一代码段。系统调用fork在子进程创建代码段时，其构建的一系列进程级页表均指向与父进程相同的福利内存页帧</li><li>对于父进程数据段、堆段、和栈段中的各页，内核采用写时复制技术</li></ul><!--kg-card-begin: image--><figure class="kg-card kg-image-card"><img src="/images/2019/12/----.jpg" class="kg-image"></figure><!--kg-card-end: image--><h2 id="--2">进程间通讯</h2><!--kg-card-begin: image--><figure class="kg-card kg-image-card"><img src="/images/2019/12/IPC-Overview.png" class="kg-image"></figure><!--kg-card-end: image-->