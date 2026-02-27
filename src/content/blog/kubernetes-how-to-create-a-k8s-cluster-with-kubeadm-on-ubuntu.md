---
title: "#kubernetes 创建k8s集群简明步骤"
description: "使用kubeadm + containerd + flannel + ubuntu + exsi 部署一个k8s多节点集群"
pubDate: 2021-05-07T10:46:05.000Z
author: "阿斌"
tags: ["Kubernetes", "开发笔记"]
tagSlugs: ["kubernetes", "dev"]
draft: false
type: post
slug: "kubernetes-how-to-create-a-k8s-cluster-with-kubeadm-on-ubuntu"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="1k8s">1. 准备k8s环境</h2>
<h3 id="11">1.1. 主机配置</h3>
<ul>
<li>全新主机: 2cpu + 2g RAM</li>
<li>系统: linux系统，例如ubuntu 20</li>
<li>节点之间可以通过网络访问</li>
</ul>
<p>本例使用ESXi创建了3个主机，1个用作主节点，其他2个作为工作节点。</p>
<h3 id="12dockerdocker">1.2. 安装docker和docker运行环境</h3>
<h4 id="1containerddocker">1). 安装 containerd + docker</h4>
<p>参考：</p>
<blockquote>
<p><a href="https://xmanyou.com/a-li-yun-ubuntu-ecs-install-dockerhe-docker-compose-manually/">https://xmanyou.com/a-li-yun-ubuntu-ecs-install-dockerhe-docker-compose-manually/</a></p>
</blockquote>
<h4 id="2cgroup">2). 配置cgroup驱动</h4>
<p>参考：</p>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/">https://kubernetes.io/zh/docs/setup/production-environment/container-runtimes/</a></p>
</blockquote>
<p>以containerd为例</p>
<ul>
<li>首先，安装和配置的先决条件：</li>
</ul>
```bash
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 设置必需的 sysctl 参数，这些参数在重新启动后仍然存在。
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

# 应用 sysctl 参数而无需重新启动
sudo sysctl --system
```
<ul>
<li>然后，配置使用systemd cgroup驱动</li>
</ul>
```bash
# i). 先初始化配置文件
containerd config default | sudo tee /etc/containerd/config.toml

# ii). 修改配置文件
vi /etc/containerd/config.toml
在字段
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
添加
    SystemdCgroup = true
保存

# iii). 重启containerd
sudo systemctl restart containerd

# iv). 修改docker的daemon.json使用systemd来管理cgroup
sudo vi /etc/docker/daemon.json

{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}

# v). 重启docker服务
sudo systemctl enable docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```
<h2 id="2kubeadmkubectlkubelet">2. 安装kubeadm/kubectl/kubelet</h2>
<p>参考</p>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/">https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/</a></p>
</blockquote>
<p>kubeadm可以完成构建k8s集群的所有工作。本例使用kubeadm来创建k8s集群。</p>
<ul>
<li>1). 更新 apt 包索引并安装使用 Kubernetes apt 仓库所需要的包：</li>
</ul>
<pre><code>sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
</code></pre>
<ul>
<li>2). 下载 Google Cloud 公开签名秘钥：</li>
</ul>
<pre><code>sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
</code></pre>
<ul>
<li>3). 添加 Kubernetes apt 仓库：</li>
</ul>
<pre><code>echo &quot;deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main&quot; | sudo tee /etc/apt/sources.list.d/kubernetes.list
</code></pre>
<ul>
<li>4). 更新 apt 包索引，安装 kubelet、kubeadm 和 kubectl，</li>
</ul>
<pre><code>sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
</code></pre>
<ul>
<li>5). 锁定其版本</li>
</ul>
<pre><code>sudo apt-mark hold kubelet kubeadm kubectl
</code></pre>
<p><strong>注意</strong><br>
安装完后，kubelet 现在每隔几秒就会重启，因为它陷入了一个等待 kubeadm 指令的死循环。<br>
可以不用管。</p>
<h2 id="3pod">3. 选择一个pod网络组件</h2>
<p>参考：</p>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#pod-network">https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#pod-network</a></p>
</blockquote>
<p><img src="/content/images/2021/05/k8s-install-guide-pod-network-addon.png" alt="k8s-install-guide-pod-network-addon"></p>
<p>可选用的网络组件很多</p>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model">https://kubernetes.io/zh/docs/concepts/cluster-administration/networking/#how-to-implement-the-kubernetes-networking-model</a></p>
</blockquote>
<p><strong>注意</strong><br>
有些可能需要前置安装，有些不需要。</p>
<p>以Flannel为例，不需要前置安装。<br>
参考：</p>
<blockquote>
<p><a href="https://github.com/flannel-io/flannel">https://github.com/flannel-io/flannel</a></p>
</blockquote>
<p>部署的命令为（仅需要在集群初始化后再执行）：</p>
<pre><code>kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre>
<p><strong>特别注意</strong><br>
如果用Flannel，在下一步进行初始化时，需要指定--pod-network-cidr参数。</p>
<p><img src="/content/images/2021/05/k8s-install-guide-flannel.png" alt="k8s-install-guide-flannel"></p>
<h2 id="4k8s">4. 初始化k8s集群，并添加首个控制平面</h2>
<h3 id="41swap">4.1. 关闭swap功能</h3>
<p>初始化前需要先关闭swap功能</p>
<pre><code>sudo swapoff -a
</code></pre>
<h3 id="42kubeadminit">4.2. kubeadm init</h3>
<p>在第一个master节点主机上执行初始化命令，进行集群初始化，并添加第一个master节点，也就是Control Plane控制平面。</p>
<pre><code>sudo kubeadm init
</code></pre>
<p>不添加任何参数的话，可以直接创建一个单控制平面节点的集群。</p>
<p>可选参数：</p>
<ul>
<li>0). --dry-run 该选项表示只测试命令，不真正执行，可以用来检测安装条件是否都准备好了，或者测试命令是否写错。</li>
<li>1). --control-plane-endpoint 如果要配置高可用，也就是多台master节点，需要添加这个选项，值为控制平面节点的ip/主机名，需要注意保证该地址可以被集群的节点访问到。</li>
<li>2). --pod-network-cidr 配置pod网络，如果使用了Flannel，则必须指定--pod-network-cidr 10.244.0.0/16</li>
</ul>
<p>举例：<br>
如果控制平面节点的名字是 k8s-master，并且使用了Flannel，则初始化命令为：</p>
<pre><code>sudo kubeadm init --control-plane-endpoint k8s-master --pod-network-cidr 10.244.0.0/16
</code></pre>
<p>如果顺利，则会看到</p>
<pre><code>Your Kubernetes control-plane has initialized successfully!
</code></pre>
<p>在日志的最后，有一些重要提示，注意查看，保存下来，后续会用到：</p>
<ul>
<li>1). 配置kubectl的访问该cluster所需的参数</li>
</ul>
<pre><code>To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf
</code></pre>
<ul>
<li>2). 配置pod网络</li>
</ul>
<pre><code>You should now deploy a pod network to the cluster.

Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/
</code></pre>
<ul>
<li>3). 添加其他control-plane控制平面节点<br>
You can now join any number of control-plane nodes by copying certificate authorities<br>
and service account keys on each node and then running the following as root:</li>
</ul>
<pre><code>  kubeadm join k8s-master:6443 --token b37k0g.ojwzjqa6jfse4474 \
    --discovery-token-ca-cert-hash sha256:8d1b76a8ddb05b0865d90564d693e575bebecc46651af519c3a824d4a272e36f \
    --control-plane
</code></pre>
<ul>
<li>4). 添加worker工作节点</li>
</ul>
<pre><code>Then you can join any number of worker nodes by running the following on each as root:

kubeadm join k8s-master:6443 --token b37k0g.ojwzjqa6jfse4474 \
    --discovery-token-ca-cert-hash sha256:8d1b76a8ddb05b0865d90564d693e575bebecc46651af519c3a824d4a272e36f
</code></pre>
<h3 id="43kubectl">4.3. 设置kubectl</h3>
<p>根据提示，有2种方式，</p>
<ul>
<li>1). 对于非root用户</li>
</ul>
<pre><code>To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre>
<ul>
<li>2). 对于root用户</li>
</ul>
<pre><code>Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf
</code></pre>
<p>检查一下节点的情况：</p>
<pre><code>kubectl get nodes

NAME            STATUS      ROLES                  AGE   VERSION
k8s-master-01   NotReady    control-plane,master   ---   v1.21.0
</code></pre>
<p>STATUS状态应该是NotReady，因为需要继续配置Pod网络组件。</p>
<h3 id="44pod">4.4. 配置Pod网络组件</h3>
<pre><code>Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/
</code></pre>
<p>如果使用了Flannel，则为</p>
<pre><code>kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre>
<p>如果是其他组件，则参考相应的文档。</p>
<p>稍等一会，再次用kubectl检查node状态:</p>
<pre><code>kubectl get nodes

NAME            STATUS   ROLES                  AGE   VERSION
k8s-master-01   Ready    control-plane,master   ---   v1.21.0
</code></pre>
<h2 id="5worker">5. 加入worker工作节点</h2>
<h3 id="51">5.1. 环境准备</h3>
<ul>
<li>0). 全新主机</li>
<li>1). 安装docker环境，(参考：1.2. 安装docker和docker运行环境)</li>
<li>2). 安装kubeadm/kubelet，其中kubectl可选。(参考：2. 安装kubeadm/kubectl/kubelet)</li>
<li>3). 关闭swap (参考：4.1. 关闭swap功能)</li>
<li>4). 保证能访问到control-plane节点，特别是初始化时指定了control-plane-endpoint的情况</li>
</ul>
<h3 id="52k8s">5.2. 加入k8s集群</h3>
<p>使用kubeadm join可以添加节点(包括worker和control-plane节点)到集群中。</p>
<p>命令格式：</p>
<pre><code>kubeadm join &lt;control-plane address&gt;:&lt;port(默认6443)&gt; \
    --token &lt;访问token&gt; \
    --discovery-token-ca-cert-hash sha256:&lt;发现token的hash值&gt;
</code></pre>
<p>可以直接使用刚刚保存的命令提示：</p>
<pre><code>sudo kubeadm join k8s-master:6443 --token b37k0g.ojwzjqa6jfse4474 \
    --discovery-token-ca-cert-hash sha256:8d1b76a8ddb05b0865d90564d693e575bebecc46651af519c3a824d4a272e36f
</code></pre>
<p>注意，该token默认的有效期是一天，如果token失效了，则需要重新获取。</p>
<p>顺利的话，会看到以下输出：</p>
<pre><code>This node has joined the cluster:
</code></pre>
<p>并在日志的最后，提示到控制平面节点来检查状态</p>
<pre><code>Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
</code></pre>
<h3 id="53">5.3. 检查节点状态</h3>
<p>在控制平面节点上运行：</p>
<pre><code>kubectl get nodes
NAME            STATUS   ROLES                  AGE   VERSION
k8s-master-01   Ready    control-plane,master   15h   v1.21.0
k8s-node-01     Ready    &lt;none&gt;                 15h   v1.21.0
k8s-node-02     Ready    &lt;none&gt;                 15h   v1.21.0
</code></pre>
<p>如果状态都为Ready，表示一切顺利。</p>
<h2 id="6">6.如果安装失败了...</h2>
<p>不要慌，可以尝试重置，并重新安装：</p>
<pre><code>sudo kubeadm reset
</code></pre>
<p>如果是第一个control-plane控制平面节点就失败了，需要重置所有的节点。如果只是worker节点失败，只重置这个就行了。</p>
<h2 id="6sonobuoy">6. 使用sonobuoy检查状态</h2>
<p>参考:</p>
<blockquote>
<p><a href="https://github.com/vmware-tanzu/sonobuoy">https://github.com/vmware-tanzu/sonobuoy</a></p>
</blockquote>
<h2 id="7">7. 测试</h2>
<p>可以快速部署一个微服务应用来测试一下k8s的使用：</p>
<blockquote>
<p><a href="https://github.com/microservices-demo/microservices-demo">https://github.com/microservices-demo/microservices-demo</a></p>
</blockquote>
<p>部署成功后，可以用以下命令检查部署情况：</p>
<pre><code>kubectl get pods --namespace sock-shop
NAME                           READY   STATUS    RESTARTS   AGE
carts-7c9df6fdb4-j25fc         1/1     Running   0          15h
carts-db-6c6c68b747-9nglf      1/1     Running   0          15h
catalogue-7c6dcb64f7-8zc75     1/1     Running   0          16h
catalogue-db-96f6f6b4c-rp5qw   1/1     Running   0          16h
front-end-7b8bcd59cb-rhsrs     1/1     Running   0          15h
orders-c9994cff9-76pzk         1/1     Running   0          16h
orders-db-659949975f-gf7m9     1/1     Running   0          15h
payment-8576977df5-4r8n9       1/1     Running   0          15h
queue-master-bbb6c4b9d-wl9pz   1/1     Running   0          16h
rabbitmq-6d77f74dc-7sxjm       1/1     Running   0          15h
shipping-5d7c4f8bbf-cr5w8      1/1     Running   0          16h
user-846f474c46-xtnl9          1/1     Running   0          16h
user-db-5f68d7b558-9c6lt       1/1     Running   0          15h

kubectl get services --namespace sock-shop
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
carts          ClusterIP   10.97.41.208     &lt;none&gt;        80/TCP         16h
carts-db       ClusterIP   10.97.225.173    &lt;none&gt;        27017/TCP      16h
catalogue      ClusterIP   10.107.125.32    &lt;none&gt;        80/TCP         16h
catalogue-db   ClusterIP   10.110.166.149   &lt;none&gt;        3306/TCP       16h
front-end      NodePort    10.102.223.111   &lt;none&gt;        80:30001/TCP   16h
orders         ClusterIP   10.109.10.215    &lt;none&gt;        80/TCP         16h
orders-db      ClusterIP   10.96.58.45      &lt;none&gt;        27017/TCP      16h
payment        ClusterIP   10.98.235.63     &lt;none&gt;        80/TCP         16h
queue-master   ClusterIP   10.111.113.251   &lt;none&gt;        80/TCP         16h
rabbitmq       ClusterIP   10.109.209.14    &lt;none&gt;        5672/TCP       16h
shipping       ClusterIP   10.98.26.179     &lt;none&gt;        80/TCP         16h
user           ClusterIP   10.102.102.26    &lt;none&gt;        80/TCP         16h
user-db        ClusterIP   10.110.108.10    &lt;none&gt;        27017/TCP      16h
</code></pre>
<p>并通过浏览器访问web页面：</p>
<blockquote>
<p>http://&lt;control-plane地址&gt;:30001</p>
</blockquote>
<p><img src="/content/images/2021/05/k8s-install-guide-view-sock-shop.png" alt="k8s-install-guide-view-sock-shop"></p>
<h2 id="8">8. 其他</h2>
<p>现在，一个单控制平面+多工作节点的k8s集群，就基本完成了。但是，还有更多任务要继续探索：</p>
<ul>
<li>1). 增加更多控制平面节点，来实现高可用</li>
<li>2). token过期后，如何继续添加新节点</li>
<li>3). 安装失败的话，如何进行诊断和重新安装</li>
<li>4). 如何进行权限管理</li>
<li>5). 如何通过k8s集群之外的机器来管理集群</li>
<li>6). 如何为集群添加其他辅助功能，比如dashboard，ingress，日志等等</li>
<li>7). 如何部署自己的服务</li>
<li>8). ...</li>
</ul>
<h2 id="9">9. 参考</h2>
<p>本教程主要参考：</p>
<ul>
<li>1). kubernetes官方教程，非常详细，还有中文:《使用 kubeadm 创建集群》</li>
</ul>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/">https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/</a></p>
</blockquote>
<ul>
<li>2). 马永亮所著的《Kubernetes进阶实战》，细节很到位</li>
</ul>
<blockquote>
<p><a href="https://item.jd.com/13140598.html">https://item.jd.com/13140598.html</a></p>
</blockquote>
<ul>
<li>3). How to Create a Kubernetes Cluster on Ubuntu 16.04 with kubeadm and Weave Net</li>
</ul>
<blockquote>
<p><a href="https://www.gremlin.com/community/tutorials/how-to-create-a-kubernetes-cluster-on-ubuntu-16-04-with-kubeadm-and-weave-net/">https://www.gremlin.com/community/tutorials/how-to-create-a-kubernetes-cluster-on-ubuntu-16-04-with-kubeadm-and-weave-net/</a></p>
</blockquote>
<h2 id="10">10. 感谢</h2>
<p>感谢团队的小伙伴陪我一起开荒k8s，帮我解决了很多问题，节省了大量时间和精力，最重要的，让我知道我不是在孤军奋战。</p>
<!--kg-card-end: markdown-->