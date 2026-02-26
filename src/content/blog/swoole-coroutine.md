---
title: "Swoole 协程使用注意事项"
description: "PHP Swoole 协程使用注意事项"
pubDate: 2019-09-08T14:33:53.000Z
author: "remote_pluto"
tags: ["swool", "coroutine", "connector pool", "开发笔记"]
draft: false
type: post
slug: "swoole-coroutine"
---

<!--kg-card-begin: markdown--><p>近期公司的项目需要，用Swoole搭建TCP服务器，过程中使用了Coroutine\Redis，以及Coroutine\Mysql,在第一个版本中为了节省TCP及Redis的连接数，协程的理解的不够深入，多个协程使用了同一个Redis及Mysql客户端，导致不同的协程之间发生了数据错乱。<br>
在此简要分析如下:<br></p>
<pre><code>简单数据类型:
$number = 1;
go(function () use(&amp;$number) {
  Co::sleep(1);
  $number++;
  echo &quot;In First Coroutine Number is:&quot;.$number;
});

$number++;
echo &quot;In Main &quot;.$number.&quot;\n&quot;;

go(function () use(&amp;$number) {
  $number++;
  echo &quot;In Second Coroutine Number is:&quot;.$number;
});
</code></pre>
<p>本来想获得顺序为</p>
<pre><code>In First Coroutine Number is:2
In Main 3
In Second Coroutine Number is:4

</code></pre>
<p>运行此代码获得如下结果:</p>
<pre><code>In Main 2
In Second Coroutine Number is:3
In First Coroutine Number is:4

</code></pre>
<p>示例很简单，但是展示了协程的乱序可能会导致的程序错误。<br>
在调试过程中因为使用了单一连接客户端导致过:</p>
<pre><code>Uncaught Swoole\Error: Socket#8 has already been bound to another coroutine
</code></pre>
<p>因此在swoole中使用协程时，一般使用协程客户端连接池。<br>
示例代码如下:</p>
<pre><code>
/**
 * Class RedisPool
 */
class RedisPool
{
  protected $mAvailable;
  protected $mPool;
  protected $mConfig;

  public function __construct($config)
  {
    $this-&gt;mAvailable = true;
    $this-&gt;mPool = new SplQueue();
    $this-&gt;mConfig = $config;
  }

  public function push($redisClient)
  {
    if ($this-&gt;mAvailable) {
      $this-&gt;mPool-&gt;enqueue($redisClient);
    }
  }

  public function pop()
  {
    $redisClient = null;
    if ($this-&gt;mAvailable) {
      try {
        $redisClient = $this-&gt;mPool-&gt;dequeue();
      } catch (\RuntimeException $exception) {
        //队列中为空
        $redisClient = new RedisClient($this-&gt;mConfig);
        if (empty($redisClient) || $redisClient-&gt;connect()) {
          $redisClient = null;
        }
      }
    }
    return $redisClient;
  }

  public function isAvailable()
  {
    return $this-&gt;mAvailable;
  }

  public function setAvailable($available)
  {
    $this-&gt;mAvailable = $available;
  }


  public function __destruct()
  {
    // 连接池销毁, 置不可用状态, 防止新的客户端进入常驻连接池, 导致服务器无法平滑退出
    $this-&gt;mAvailable = false;
    while (!$this-&gt;mPool-&gt;isEmpty()) {
      $this-&gt;mPool-&gt;dequeue();
    }
  }

  public function __call($name, $arguments)
  {
    // TODO: Implement __call() method.
    if (!is_callable(array($this-&gt;mPool, $name))) {
      throw new BadFunctionCallException(&quot;Function Name:&quot; . $name . &quot; Args:&quot; . implode(&quot;,&quot;, $arguments));
    }
    return call_user_func_array([$this-&gt;mPool, $name], $arguments);
  }
</code></pre>
<p>在协程中，从连接池中获取连接客户端，保证每个协程使用不同的连接</p>
<!--kg-card-end: markdown-->