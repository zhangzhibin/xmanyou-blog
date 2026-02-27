---
title: "#数字货币 使用1650s显卡和Gminer挖矿时报错：out of memory"
description: "尝试用低端显卡1650s挖矿，居然被鄙视了！"
pubDate: 2021-03-19T15:55:15.000Z
author: "阿斌"
tags: ["数字货币"]
tagSlugs: ["shu-zi-huo-bi"]
draft: false
type: post
slug: "eth-bth-mining-with-1650s-gminer-out-of-memory"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>2021年，数字货币太火了，我也忍不住掏出我的1650S来尝试挖一下以太坊ETH。</p>
<h1 id="">怎么挖呢？</h1>
<h2 id="">第一步，注册一个数字货币钱包</h2>
<p>我用的是mycryto</p>
<p>根据步骤创建好以后，保存必要的信息。</p>
<h2 id="">第二步，选择一个挖矿工具</h2>
<p>windows下使用nvidia卡挖矿，比较常用的是gminer和r-tex。</p>
<ul>
<li>gminer: <a href="https://github.com/develsoftware/GMinerRelease">https://github.com/develsoftware/GMinerRelease</a></li>
<li>r-tex: <a href="https://github.com/trexminer/T-Rex/releases">https://github.com/trexminer/T-Rex/releases</a></li>
</ul>
<h2 id="">第三步，选择矿池，挖矿开始挖矿</h2>
<p>下载好gminer以后，解压，可以看到一系列文件：<br>
<img src="/content/images/2021/03/eth-mining-gminer.png" alt="eth-mining-gminer"></p>
<p>其中 mine_eth.bat 就是用于挖以太坊eth的脚本了。<br>
用文本工具打开，可以看到内容非常简单：</p>
<pre><code>miner.exe --algo ethash --server eth.2miners.com:2020 --user 0x5218597d48333d4a70cce91e810007b37e2937b5
pause
</code></pre>
<p>其中：</p>
<ul>
<li>algo 表示算法</li>
<li>server 表示矿池</li>
<li>user 就是你的钱包地址</li>
</ul>
<p>修改一下：</p>
<ul>
<li>将server矿池改成亚洲地区：asia-eth.2miners.com:2020</li>
<li>user 改为自己的钱包地址</li>
</ul>
<p>开挖！</p>
<p>但是，居然报错了！！！</p>
<pre><code>Error on GPU0: out of memory
</code></pre>
<p><img src="/content/images/2021/03/eth-mining-gminer-out-of-memory.png" alt="eth-mining-gminer-out-of-memory"></p>
<p>这可怎么办？</p>
<h1 id="outofmemory">Out Of Memory的原因</h1>
<p>搜了一下，原来是因为我的1650s只有4G显存。</p>
<p>怎么办呢？</p>
<h1 id="">解决方法</h1>
<p>gminer不行，又试了一下r-tex，居然可以！</p>
<p>于是又下载了r-tex，解压。r-tex的脚本也差不多：</p>
<pre><code>t-rex.exe -a ethash -o stratum+tcp://eth.2miners.com:2020 -u 0x1f75eccd8fbddf057495b96669ac15f8e296c2cd -p x -w rig0
pause
</code></pre>
<p>修改矿池，然后把钱包地址改成自己的地址，可以了：<br>
<img src="/content/images/2021/03/eth-mining-t-rex-out-of-memory.png" alt="eth-mining-t-rex-out-of-memory"></p>
<h1 id="">算力？？</h1>
<p>好奇的我，又查了一下1650s挖以太坊的收益：</p>
<blockquote>
<p><a href="https://minerstat.com/hardware/nvidia-gtx-1650-super?lang=zh">https://minerstat.com/hardware/nvidia-gtx-1650-super?lang=zh</a></p>
</blockquote>
<p>结果大吃一惊！</p>
<p><img src="/content/images/2021/03/eth-mining-with-1650s.png" alt="eth-mining-with-1650s"></p>
<p>由于显存不足，居然挖不动以太坊ETH……</p>
<p>债见~</p>
<!--kg-card-end: markdown-->