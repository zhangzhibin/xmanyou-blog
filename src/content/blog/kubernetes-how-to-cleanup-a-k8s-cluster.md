---
title: "#kubernetes 如何移除一个k8s集群"
description: "k8s集群安装失败了，准备重新安装，在这之前都需要做哪些清理工作呢？"
pubDate: 2021-05-07T07:28:33.000Z
author: "阿斌"
tags: ["Kubernetes", "开发笔记"]
draft: false
type: post
slug: "kubernetes-how-to-cleanup-a-k8s-cluster"
---

<!--kg-card-begin: markdown--><p>k8s集群安装失败了，准备重新安装，在这之前需要做一些清理工作：</p>
<pre><code>sudo kubeadm reset
</code></pre>
<p>然后重新初始化即可。</p>
<p><strong>注意</strong><br>
Control Plane重置以后，所有的worker节点也要用kubeadm reset来重置。</p>
<p><s>## 1. 重置配置</s></p>
<pre><code>kubectl config unset clusters
kubectl config unset contexts
kubectl config unset users
</code></pre>
<p><s>## 2. 停止并移除相关docker容器</s></p>
<pre><code>docker container prune
</code></pre>
<p><s>## 3. 移除配置文件</s></p>
<pre><code>sudo mv /etc/kubernetes /etc/kubernetes.old
</code></pre>
<p><s>否则会报错</s></p>
<pre><code>[init] Using Kubernetes version: v1.21.0
[preflight] Running pre-flight checks
error execution phase preflight: [preflight] Some fatal errors occurred:
    [ERROR FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml]: /etc/kubernetes/manifests/kube-apiserver.yaml already exists
    [ERROR FileAvailable--etc-kubernetes-manifests-kube-controller-manager.yaml]: /etc/kubernetes/manifests/kube-controller-manager.yaml already exists
    [ERROR FileAvailable--etc-kubernetes-manifests-kube-scheduler.yaml]: /etc/kubernetes/manifests/kube-scheduler.yaml already exists
    [ERROR FileAvailable--etc-kubernetes-manifests-etcd.yaml]: /etc/kubernetes/manifests/etcd.yaml already exists
    [ERROR Swap]: running with swap on is not supported. Please disable swap
    [ERROR DirAvailable--var-lib-etcd]: /var/lib/etcd is not empty
[preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`
To see the stack trace of this error execute with --v=5 or higher
</code></pre>
<p><s>## 4. 停止kubelet服务</s></p>
<pre><code>sudo systemctl stop kubelet
</code></pre>
<p><s>否则会提示端口(10250)被占用</s></p>
<pre><code>[init] Using Kubernetes version: v1.21.0
[preflight] Running pre-flight checks
error execution phase preflight: [preflight] Some fatal errors occurred:
    [ERROR Port-10250]: Port 10250 is in use
</code></pre>
<p><s>## 5. 移除etcd配置</s></p>
<pre><code>sudo mv /var/lib/etcd /var/lib/etcd.old
</code></pre>
<p><s>否则提示etcd目录已经存在</s></p>
<pre><code>error execution phase preflight: [preflight] Some fatal errors occurred:
    [ERROR DirAvailable--var-lib-etcd]: /var/lib/etcd is not empty
</code></pre>
<p><s>## 6. 移除kubelet</s></p>
<pre><code>sudo apt-get purge kubelet
</code></pre>
<p><s>记得重新安装</s></p>
<p><s># 测试</s></p>
<pre><code>sudo kubeadm init --dry-run
```~~</code></pre>
<!--kg-card-end: markdown-->