---
title: "#kubenetes k8s的一些概念"
description: "k8s学习笔记(1). 各种概念"
pubDate: 2021-04-30T03:16:41.000Z
author: "阿斌"
tags: ["Kubernetes", "开发笔记"]
tagSlugs: ["kubernetes", "dev"]
draft: false
type: post
slug: "kubenetes-k8s-note-01-concepts"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="1kubernetes">1. 什么是kubernetes？</h1>
<p>Kubernetes，缩写为k8s，官方的自我介绍是：</p>
<ul>
<li><a href="https://kubernetes.io/zh/">https://kubernetes.io/zh/</a><br>
Kubernetes 是用于自动部署，扩展和管理容器化应用程序的开源系统。</li>
<li><a href="https://github.com/kubernetes/kubernetes">https://github.com/kubernetes/kubernetes</a><br>
Production-Grade Container Scheduling and Management<br>
（生产成熟级别的）容器编排和管理系统</li>
</ul>
<blockquote>
<p>注意<br>
Production-Grade，是云原生基金会（CNCF）项目成熟度标准中的最高标准。<br>
<a href="https://www.cncf.io/projects/">https://www.cncf.io/projects/</a></p>
</blockquote>
<h2 id="k8s">k8s的竞品有哪些？</h2>
<p>通过google的自动搜索提示，可以看到最经常拿来与k8s对比的项目/概念：</p>
<p><img src="/content/images/2021/04/k8s_vs_docker_and_xxx.png" alt="k8s_vs_docker_and_xxx"></p>
<p><img src="/content/images/2021/04/k8s_vs_xxx.png" alt="k8s_vs_xxx"></p>
<p>这些项目涵盖了以下话题：</p>
<ul>
<li>容器</li>
<li>容器管理</li>
<li>自动化</li>
<li>集群</li>
</ul>
<h1 id="2k8s">2. k8s的组件/概念/模块/对象</h1>
<h2 id="21">2.1. 工具</h2>
<ul>
<li>kubectl</li>
<li>kubeadmin</li>
<li>minikube</li>
</ul>
<h2 id="22">2.2. 集群相关</h2>
<h3 id="1mastercontrolplane">1). 主控节点 master/control plane</h3>
<ul>
<li>Api Server</li>
<li>Controller Manager</li>
<li>Scheduler</li>
<li>etcd</li>
</ul>
<h3 id="2workernode">2). 工作节点 worker/node</h3>
<ul>
<li>container runtime</li>
<li>kubelet</li>
<li>kube-proxy</li>
</ul>
<h3 id="3">3). 插件</h3>
<ul>
<li>DNS</li>
<li>Web UI（控制面板）</li>
<li>容器监控</li>
<li>集群日志</li>
</ul>
<h2 id="23">2.3. 部署相关</h2>
<h3 id="1pod">1). Pod</h3>
<h3 id="2deployment">2). Deployment</h3>
<h3 id="3replicateset">3). ReplicateSet</h3>
<h2 id="24">2.4. 访问相关</h2>
<h3 id="1service">1). Service</h3>
<h3 id="2ingress">2). Ingress</h3>
<h2 id="25">2.5. 配置相关</h2>
<h3 id="1configmap">1). ConfigMap</h3>
<h3 id="2secret">2). Secret</h3>
<h2 id="26">2.6. 资源</h2>
<h3 id="1">1). 数据存储</h3>
<ul>
<li>Volume</li>
<li>PersistentVolume</li>
<li>PersistentVolumeClaim</li>
<li>StorageClass</li>
</ul>
<h2 id="27">2.7. 管理</h2>
<h3 id="1namespace">1). NameSpace</h3>
<h2 id="28">2.8. 其他</h2>
<h3 id="1statefulset">1). StatefulSet</h3>
<!--kg-card-end: markdown-->