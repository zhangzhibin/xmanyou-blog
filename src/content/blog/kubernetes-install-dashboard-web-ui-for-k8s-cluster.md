---
title: "#kubernetes 为k8s集群添加dashboard控制面板"
description: "Dashboard 是基于网页的 Kubernetes 用户界面。 "
pubDate: 2021-05-08T09:43:00.000Z
author: "阿斌"
tags: ["Kubernetes", "开发笔记"]
tagSlugs: ["kubernetes", "dev"]
draft: false
type: post
slug: "kubernetes-install-dashboard-web-ui-for-k8s-cluster"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="dashboard">关于dashboard</h2>
<p>官方描述</p>
<blockquote>
<p>Dashboard 是基于网页的 Kubernetes 用户界面。 你可以使用 Dashboard 将容器应用部署到 Kubernetes 集群中，也可以对容器应用排错，还能管理集群资源。 你可以使用 Dashboard 获取运行在集群中的应用的概览信息，也可以创建或者修改 Kubernetes 资源 （如 Deployment，Job，DaemonSet 等等）。 例如，你可以对 Deployment 实现弹性伸缩、发起滚动升级、重启 Pod 或者使用向导创建新的应用。</p>
<p>Dashboard 同时展示了 Kubernetes 集群中的资源状态信息和所有报错信息。</p>
</blockquote>
<p>官方文档</p>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/tasks/access-application-cluster/web-ui-dashboard/">https://kubernetes.io/zh/docs/tasks/access-application-cluster/web-ui-dashboard/</a></p>
</blockquote>
<p>详细步骤：</p>
<h2 id="1dashboard">1. 添加dashboard</h2>
<pre><code>kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml

namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created
</code></pre>
<h2 id="proxy">开启proxy</h2>
<pre><code>kubectl proxy
</code></pre>
<p><strong>注意</strong><br>
dashboard只能在本机通过localhost或者127.0.0.1进行访问。<br>
而一般k8s集群是部署在不带桌面组件的linux服务器中，所以需要将kubectl proxy需要运行在一个带有桌面的机器上，例如mac开发机等等。<br>
否则，将无法访问。</p>
<h2 id="2dashboard">2. 打开dashboard页面</h2>
<blockquote>
<p><a href="http://127.0.0.1:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/">http://127.0.0.1:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/</a></p>
</blockquote>
<p><img src="/images/2021/05/k8s-dashboard-web-ui.png" alt="k8s-dashboard-web-ui"></p>
<h2 id="3dashboard">3. 登录dashboard</h2>
<p><strong>注意</strong> 当前仅支持通过token登录</p>
<p><img src="/images/2021/05/k8s-dashboard-login-with-token-only.png" alt="k8s-dashboard-login-with-token-only"></p>
<p>所以，需要先创建一个用户，并获取登录token。</p>
<h3 id="token">创建用户，并获取token</h3>
<blockquote>
<p><a href="https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md">https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md</a></p>
</blockquote>
<ul>
<li>1). 创建配置文件<br>
文件名：dashboard-adminuser.yaml</li>
</ul>
<pre><code>apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
</code></pre>
<ul>
<li>2). 应用</li>
</ul>
<pre><code>kubectl apply -f dashboard-adminuser.yaml
serviceaccount/admin-user created
clusterrolebinding.rbac.authorization.k8s.io/admin-user created
</code></pre>
<ul>
<li>3). 获取token</li>
</ul>
<pre><code>kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath=&quot;{.secrets[0].name}&quot;) -o go-template=&quot;{{.data.token | base64decode}}&quot;

eyJhbGciOiJSUzI1NiIsImtpZCI6IndHVXJBb3pjc2plQlR0T2ZoMGt4Znh6Ty1vNnpuNjIxS1JPVElDZ29ZeVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWRoeHB3Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkNjU1OGU0NS1jM2M4LTQ3YTctYTM2YS1lNjRjYzRkNDE5NjYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.VdZnFnIsVl8HJI7T7pUcQZNbgGWfNMochKur6QS3pwXGe5LEV3SLbaZXq4JXaIOEiYPH1Zm2xPR75M9hOJ9l8ZoOjYy1EuFNh4Q_eURKlfrjvmBlb3PVzL-pckg8jrhhnLocoFNxT1WE-_JusDZh0hpg_cqJcFa-qfowJJrfSiWQ_ZsUFgCUmrqBcvoXuAzn7EXmVrpE8ub2MGVCjB6FkJg3qdQS6jztDZ3ozZ1t7Yp8pc82VQbdD64w7B_i7-tB3BSbwUGrtw1xnsRyPV1VdnuHUf84fTpzcrT-8CHh6eiueV5qFc7ERi9bs1Droz_kV7xTP8pvUMhoCJZRPfLuOg
</code></pre>
<h3 id="token">使用token登录</h3>
<p>看到以下界面就表示成功了<br>
<img src="/images/2021/05/k8s-dashboard-overview.png" alt="k8s-dashboard-overview"></p>
<h2 id="4">4. 移除用户</h2>
<p>如果要移除刚刚创建的用户，可以用以下命令</p>
<pre><code>kubectl -n kubernetes-dashboard delete serviceaccount admin-user
kubectl -n kubernetes-dashboard delete clusterrolebinding admin-user
</code></pre>
<h2 id="5">5. 其他</h2>
<p>关于dashboard的更多内容，可以查看dashboard的文档：</p>
<blockquote>
<p><a href="https://github.com/kubernetes/dashboard/tree/master/docs">https://github.com/kubernetes/dashboard/tree/master/docs</a></p>
</blockquote>
<!--kg-card-end: markdown-->