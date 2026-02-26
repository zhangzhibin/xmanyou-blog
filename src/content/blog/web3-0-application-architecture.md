---
title: "《Web 3.0 应用架构》解读"
description: "构建于区块链之上的Web3.0与Web2.0的应用架构有什么区别？"
pubDate: 2022-01-06T16:42:16.000Z
author: "阿斌"
tags: ["区块链", "以太坊", "Web3.0"]
draft: false
type: post
slug: "web3-0-application-architecture"
---

<!--kg-card-begin: markdown--><p>本文大量内容摘自Preethi Kasireddy的《The Architecture of a Web 3.0 application》一文，并添加了我的解读。</p>
<p>感兴趣的同学可以去阅读原文：</p>
<blockquote>
<p><a href="https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application">https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application</a></p>
</blockquote>
<p>在讲Web 3.0应用架构之前，我们需要先了解一下Web 2.0。</p>
<h1 id="web20">Web 2.0 应用架构</h1>
<p>一个典型的Web 2.0应用，例如一个博客应用，通常包含3个部分：</p>
<h2 id="">数据存储系统</h2>
<p>这个系统用于存储博客应用的重要数据，例如用户、文章、标签、评论等等，构成了一个数据持续更新的数据库。</p>
<h2 id="">后端代码</h2>
<p>后端代码用于定义博客应用的业务逻辑，例如注册用户，发表文章，发布评论等等。</p>
<h2 id="">前端代码</h2>
<p>前端代码则是博客应用的用户界面（UI）逻辑，包括博客的外在表现，以及如何与用户进行交互。</p>
<p>总结一下，我们使用一个博客应用时，我们与它的前端代码进行交互，然后前端代码再与后端代码交互，而后端再与数据库进行交互。</p>
<p>博客应用的这些代码被部署在<strong>中心化的服务器</strong>上，然后其他用户通过浏览器来访问。</p>
<p><img src="/images/2022/01/web3.0-application-architecture-01.png" alt="web3.0-application-architecture-01"></p>
<p>但是，区块链技术为Web3.0解锁了一个全新的方向。</p>
<h1 id="web30">Web 3.0 有何不同？</h1>
<p>Web 2.0 的应用需要部署在中心化的服务器上。以博客为例，原文举的例子是Meidum，例如新浪博客（或者其他程序员们熟悉的各种技术博客），或者微信朋友圈，QQ空间等，他们所部署的服务器，都属于某个实体公司或者组织，如新浪或者腾讯，这就是所谓的<strong>中心化</strong>服务器。</p>
<p>而Web 3.0消除了这个中间人的必要性，不再需要中心化数据库来存储应用的数据和状态，也不需要中心化的Web服务器来运行前端和后端代码。</p>
<p>取而代之，我们可以使用区块链技术，在由<strong>无数匿名节点</strong>组成的<strong>非中心化状态机</strong>上，搭建各种应用。</p>
<p>这里的状态机，指的是用于维护程序状态和状态变化规则的机器。区块链，就是由这样的状态机组成的。</p>
<p>这些状态机，由网络上的所有人一起共同维护，不属于任何一个实体，所以是非中心化的。</p>
<p>Web 3.0的后端代码，也就是应用的业务逻辑，通过编写智能合约（Smart Contract），然后部署到这些非中心化的状态机上来实现。任何人都可以写一个区块链应用然后部署到这些共享的非中心化状态机上。</p>
<p>所以，先不考虑前端代码的情况下，Web 3.0应用的架构就变成这样子：</p>
<p><img src="/images/2022/01/web3.0-application-architecture-02.png" alt="web3.0-application-architecture-02"></p>
<p>所以 Web 3.0应用架构中包含：</p>
<h2 id="">区块链</h2>
<p>以太坊区块链，经常被称为“世界计算机”，因为它可以一个可以被全世界所访问，由无数节点组成并共同维护的状态机。<br>
它被设计为可以被任何人访问和编写，于是，也就无法被任何人所拥有，而只能共同拥有。<br>
另外，一条很重要的规则是，区块链上的数据无法被修改，只能被增加。也就是说，我们只能往区块链上增加数据，而不能删除或者修改原数据。</p>
<h2 id="">智能合约</h2>
<p>智能合约是运行在区块链上的代码，它定义了区块链上状态变化的逻辑。这些代码通常使用高级语言编写，例如Solidity或者Vyper。</p>
<p>这些代码存储在区块链上，可以被任何人访问和审查。</p>
<p>示例<br>
<img src="/images/2022/01/web3.0-application-architecture-03.png" alt="web3.0-application-architecture-03"></p>
<h2 id="">以太坊虚拟机</h2>
<p>以太坊虚拟机用来执行智能合约的代码。智能合约需要被编译成字节码才能在以太坊虚拟机上运行。</p>
<h2 id="">前端代码</h2>
<p>Web 3.0的前端代码负责用户交互，并与通过智能合约定义的业务逻辑进行交互。</p>
<p>但是真实情况是，这部分要比图上画的要复杂的多。</p>
<h1 id="">前端代码如何与以太坊网络上的智能合约进行交互？</h1>
<p>注意，可能是由于以太坊作为是区块链的一个典型代表，所以，原文从这里开始经常把以太坊和区块链经常混着用。<br>
在以太坊的网络上，任何一个节点都包含以太坊状态机的所有状态，包括代码，以及所有智能合约的相关数据。任何事务在虚拟机上的执行请求，都会被广播到网络中的其他节点中。<br>
所以，当我们想要访问区块链上的数据时，我们需要与其中任意一个节点进行交互。然后一个所谓的“矿工”会负责执行我们的请求，并把最终状态传播到整个网络上。</p>
<p>广播一个新事务请求有两种方式：</p>
<ul>
<li>1). 自己搭建一个运行以太坊区块链软件的节点</li>
<li>2). 使用第三方服务，例如 Infura, Alchemy, 或者 QuickNode。</li>
</ul>
<p>使用第三方是更经济的方式，因为自己搭建以太坊节点需要花费很多天的时间，因为有大量的数据需要同步，而且这些数据会越来越多。</p>
<p>这些第三方服务，被称为节点供应商 Provider。</p>
<p><img src="/images/2022/01/web3.0-application-architecture-04.png" alt="web3.0-application-architecture-04"></p>
<p>所有的以太坊客户端都通过JSON-RPC这种统一方式来进行交换数据。</p>
<p>一旦我们通过节点供应商连接到上了区块链网络，我们就可以访问区块链上的所有数据了。<br>
但是，如果想要往区块链上写入状态，在向区块链提交这个事务之前，则还需要做一件事：用你的私钥对这个事务进行签名。</p>
<p>以区块链博客应用为例，用户通常可以随意浏览博客文章，但是，如果想要发布新文章，则需要对这个发布文章的事务进行签名，否则这个事务将不被受理。</p>
<p>对事务进行签名，就是<strong>Metamask</strong>这个工具做的工作：签名工具。</p>
<p><img src="/images/2022/01/web3.0-application-architecture-05.png" alt="web3.0-application-architecture-05"></p>
<p>在这个图中，前端代码还没有被存储在区块链中，它依然可以像以前一样，部署在亚马逊的AWS或者阿里云上，但是，这样就不能成为一个彻底的<strong>非中心化</strong>应用。</p>
<p>所以，还需要一个非中心化的存储方案，例如IPFS 或者 Swarm。</p>
<p>现在，我们的非中心化软件架构变成了这样：<br>
<img src="/images/2022/01/web3.0-application-architecture-06.png" alt="web3.0-application-architecture-06"></p>
<h1 id="">区块链数据查询</h1>
<p>讲完如何通过智能合约向区块链写数据，那么该如何查询智能合约的数据呢？有两种主流方式：</p>
<h2 id="">智能合约事件</h2>
<p>我们可以监听智能合约的事件。通过在智能合约代码中编写相应的事件发布逻辑，前端代码可以获取到对应的事件，并进行相应处理。<br>
这种方法有个很大的缺陷：由于区块链不允许修改数据，包括智能合约代码，一旦智能合约被部署，如果想补充新的事件，就只能重新部署一个新智能合约，并重新监听。</p>
<h2 id="thegraph">The Graph 图查询接口</h2>
<p>The Graph 图查询接口，是一种为了方便查询区块链数据的离链索引方案。我们可以定义需要索引的智能合约，相关的事件，以及如何进行数据转换。通过这种方式，区块链的数据就被索引起来，然后再通过GraphQL语言来进行查询。</p>
<p><img src="/images/2022/01/web3.0-application-architecture-07.png" alt="web3.0-application-architecture-07"></p>
<h1 id="">规模化非中心化应用</h1>
<p>在以太坊网络上构建非中心化应用，需要花费大量的费用成本，而且体验很差（主要指要将数据同步到所有的节点需要花费比较长的时间）。<br>
一个比较流行的方案是<em>Ploygon</em>，L2 规模化方案。这种方案通过在“侧链”而非主链上执行事务，然后定期将状态同步到主链，从而大大降低了成本提高了速度。</p>
<p><img src="/images/2022/01/web3.0-application-architecture-08.png" alt="web3.0-application-architecture-08"></p>
<p>类似的方案还有 Optimistic Rollups和zkRollups。</p>
<p>现在，我们的架构变成了这样子：<br>
<img src="/images/2022/01/web3.0-application-architecture-09.png" alt="web3.0-application-architecture-09"></p>
<h1 id="">集成方案</h1>
<p>为了降低非中心化应用的开发难度，一些开发框架正在被开发出来。例如，<strong>Hardhat</strong>就是一个方便以太坊开发者创建、部署和测试智能合约的框架。通过Hardhat的网络，开发者甚至可以把智能合约部署在本地而不需要部署到线上环境。它还提供了插件系统和其他工具等来提升开发体验。</p>
<p>以上。</p>
<h1 id="">个人总结</h1>
<p>本文中，我特意将两个词做了个人倾向的翻译：</p>
<ul>
<li><strong>decentralize</strong>： 翻译为“非中心化”而不是通常的“去中心化”</li>
<li><strong>transaction</strong>：翻译“事务”而非“交易”<br>
希望可以更冷静地看待当前的区块链、Web3.0以及元宇宙的相关技术。<br>
技术只是工具，可以用来造福社会，也可以用来割韭菜。</li>
</ul>
<!--kg-card-end: markdown-->