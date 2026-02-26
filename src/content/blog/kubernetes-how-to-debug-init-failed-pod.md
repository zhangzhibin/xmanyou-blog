---
title: "#kubernetes 如何调试k8s集群启动失败的应用"
description: "调试是每个程序员都躲不过去的必修课"
pubDate: 2021-05-14T03:49:09.000Z
author: "阿斌"
tags: ["Kubernetes", "开发笔记", "Elastic"]
draft: false
type: post
slug: "kubernetes-how-to-debug-init-failed-pod"
---

<!--kg-card-begin: markdown--><p>任何应用的开发过程，都不总会一帆风顺，那么，怎么调试，就是一个很重要的问题。</p>
<p>对于k8s集群，即使是按照文档一步步去部署一个很成熟的服务时，依然可能会出现各种各样的错误。</p>
<p>例如，最近在按照文档部署elk时，就出现过各种各样的问题。本文以此为例，示范如何进行调试，查找错误原因。</p>
<h2 id="1pod">1. 查看pod列表</h2>
<pre><code>kubectl get pods -n &lt;namespace&gt;
</code></pre>
<h3 id="">示例</h3>
<pre><code>kubectl get pod -n k8s-logging

NAME                      READY   STATUS                  RESTARTS   AGE
es-logging-es-default-0   0/1     Init:CrashLoopBackOff   7          14m
</code></pre>
<h2 id="2pod">2. 查看pod的详细信息</h2>
<p>可以用以下命令查看失败状态的pod的详细信息：</p>
<pre><code>kubectl describe pod &lt;pod name&gt; -n &lt;namespace&gt;
</code></pre>
<p>该命令会输出pod的Events列表，可以看到该pod运行过程中的相关事件。</p>
<p>有时候，这个Events列表中就已经包含了详细的错误原因。</p>
<h3 id="">示例</h3>
<pre><code>kubectl describe pod es-logging-es-default-0 -n k8s-logging

Name:         es-logging-es-default-0
Namespace:    k8s-logging
Priority:     0
Node:         k8s-node-02/192.168.1.15
Start Time:   Fri, 14 May 2021 02:35:49 +0000
Labels:       common.k8s.elastic.co/type=elasticsearch
              controller-revision-hash=es-logging-es-default-7ffcbbf5
              elasticsearch.k8s.elastic.co/cluster-name=es-logging
              elasticsearch.k8s.elastic.co/config-hash=1754400308
              elasticsearch.k8s.elastic.co/http-scheme=https
              elasticsearch.k8s.elastic.co/node-data=true
              elasticsearch.k8s.elastic.co/node-ingest=true
              elasticsearch.k8s.elastic.co/node-master=true
              elasticsearch.k8s.elastic.co/node-ml=true
              elasticsearch.k8s.elastic.co/node-remote_cluster_client=true
              elasticsearch.k8s.elastic.co/node-transform=true
              elasticsearch.k8s.elastic.co/node-voting_only=false
              elasticsearch.k8s.elastic.co/statefulset-name=es-logging-es-default
              elasticsearch.k8s.elastic.co/version=7.12.1
              statefulset.kubernetes.io/pod-name=es-logging-es-default-0
Annotations:  co.elastic.logs/module: elasticsearch
              update.k8s.elastic.co/timestamp: 2021-05-14T02:35:52.442769569Z
Status:       Pending
IP:           10.244.2.114
IPs:
  IP:           10.244.2.114
Controlled By:  StatefulSet/es-logging-es-default
Init Containers:
  elastic-internal-init-filesystem:
    Container ID:  docker://ef9155f4c23f12cc95baf4eb56256497ef6495355c0c2a87adfd4c8973686855
    Image:         docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    Image ID:      docker-pullable://docker.elastic.co/elasticsearch/elasticsearch@sha256:561bf27aa989803bfbac48ebd48e32daadb4215cf7940c599a62c13f225427fa
    Port:          &lt;none&gt;
    Host Port:     &lt;none&gt;
    Command:
      bash
      -c
      /mnt/elastic-internal/scripts/prepare-fs.sh
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       Error
      Exit Code:    1
      Started:      Fri, 14 May 2021 02:56:55 +0000
      Finished:     Fri, 14 May 2021 02:56:55 +0000
    Ready:          False
    Restart Count:  9
    Limits:
      cpu:     100m
      memory:  50Mi
    Requests:
      cpu:     100m
      memory:  50Mi
    Environment:
      POD_IP:                  (v1:status.podIP)
      POD_NAME:               es-logging-es-default-0 (v1:metadata.name)
      NODE_NAME:               (v1:spec.nodeName)
      NAMESPACE:              k8s-logging (v1:metadata.namespace)
      HEADLESS_SERVICE_NAME:  es-logging-es-default
    Mounts:
      /mnt/elastic-internal/downward-api from downward-api (ro)
      /mnt/elastic-internal/elasticsearch-bin-local from elastic-internal-elasticsearch-bin-local (rw)
      /mnt/elastic-internal/elasticsearch-config from elastic-internal-elasticsearch-config (ro)
      /mnt/elastic-internal/elasticsearch-config-local from elastic-internal-elasticsearch-config-local (rw)
      /mnt/elastic-internal/elasticsearch-plugins-local from elastic-internal-elasticsearch-plugins-local (rw)
      /mnt/elastic-internal/probe-user from elastic-internal-probe-user (ro)
      /mnt/elastic-internal/scripts from elastic-internal-scripts (ro)
      /mnt/elastic-internal/transport-certificates from elastic-internal-transport-certificates (ro)
      /mnt/elastic-internal/unicast-hosts from elastic-internal-unicast-hosts (ro)
      /mnt/elastic-internal/xpack-file-realm from elastic-internal-xpack-file-realm (ro)
      /usr/share/elasticsearch/config/http-certs from elastic-internal-http-certificates (ro)
      /usr/share/elasticsearch/config/transport-remote-certs/ from elastic-internal-remote-certificate-authorities (ro)
      /usr/share/elasticsearch/data from elasticsearch-data (rw)
      /usr/share/elasticsearch/logs from elasticsearch-logs (rw)
Containers:
  elasticsearch:
    Container ID:
    Image:          docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    Image ID:
    Ports:          9200/TCP, 9300/TCP
    Host Ports:     0/TCP, 0/TCP
    State:          Waiting
      Reason:       PodInitializing
    Ready:          False
    Restart Count:  0
    Limits:
      memory:  2Gi
    Requests:
      memory:   2Gi
    Readiness:  exec [bash -c /mnt/elastic-internal/scripts/readiness-probe-script.sh] delay=10s timeout=5s period=5s #success=1 #failure=3
    Environment:
      POD_IP:                     (v1:status.podIP)
      POD_NAME:                  es-logging-es-default-0 (v1:metadata.name)
      NODE_NAME:                  (v1:spec.nodeName)
      NAMESPACE:                 k8s-logging (v1:metadata.namespace)
      PROBE_PASSWORD_PATH:       /mnt/elastic-internal/probe-user/elastic-internal-probe
      PROBE_USERNAME:            elastic-internal-probe
      READINESS_PROBE_PROTOCOL:  https
      HEADLESS_SERVICE_NAME:     es-logging-es-default
      NSS_SDB_USE_CACHE:         no
    Mounts:
      /mnt/elastic-internal/downward-api from downward-api (ro)
      /mnt/elastic-internal/elasticsearch-config from elastic-internal-elasticsearch-config (ro)
      /mnt/elastic-internal/probe-user from elastic-internal-probe-user (ro)
      /mnt/elastic-internal/scripts from elastic-internal-scripts (ro)
      /mnt/elastic-internal/unicast-hosts from elastic-internal-unicast-hosts (ro)
      /mnt/elastic-internal/xpack-file-realm from elastic-internal-xpack-file-realm (ro)
      /usr/share/elasticsearch/bin from elastic-internal-elasticsearch-bin-local (rw)
      /usr/share/elasticsearch/config from elastic-internal-elasticsearch-config-local (rw)
      /usr/share/elasticsearch/config/http-certs from elastic-internal-http-certificates (ro)
      /usr/share/elasticsearch/config/transport-certs from elastic-internal-transport-certificates (ro)
      /usr/share/elasticsearch/config/transport-remote-certs/ from elastic-internal-remote-certificate-authorities (ro)
      /usr/share/elasticsearch/data from elasticsearch-data (rw)
      /usr/share/elasticsearch/logs from elasticsearch-logs (rw)
      /usr/share/elasticsearch/plugins from elastic-internal-elasticsearch-plugins-local (rw)
Conditions:
  Type              Status
  Initialized       False
  Ready             False
  ContainersReady   False
  PodScheduled      True
Volumes:
  elasticsearch-data:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  elasticsearch-data-es-logging-es-default-0
    ReadOnly:   false
  downward-api:
    Type:  DownwardAPI (a volume populated by information about the pod)
    Items:
      metadata.labels -&gt; labels
  elastic-internal-elasticsearch-bin-local:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:
    SizeLimit:  &lt;unset&gt;
  elastic-internal-elasticsearch-config:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  es-logging-es-default-es-config
    Optional:    false
  elastic-internal-elasticsearch-config-local:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:
    SizeLimit:  &lt;unset&gt;
  elastic-internal-elasticsearch-plugins-local:
    Type:       EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:
    SizeLimit:  &lt;unset&gt;
  elastic-internal-http-certificates:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  es-logging-es-http-certs-internal
    Optional:    false
  elastic-internal-probe-user:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  es-logging-es-internal-users
    Optional:    false
  elastic-internal-remote-certificate-authorities:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  es-logging-es-remote-ca
    Optional:    false
  elastic-internal-scripts:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      es-logging-es-scripts
    Optional:  false
  elastic-internal-transport-certificates:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  es-logging-es-default-es-transport-certs
    Optional:    false
  elastic-internal-unicast-hosts:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      es-logging-es-unicast-hosts
    Optional:  false
  elastic-internal-xpack-file-realm:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  es-logging-es-xpack-file-realm
    Optional:    false
  elasticsearch-logs:
    Type:        EmptyDir (a temporary directory that shares a pod's lifetime)
    Medium:
    SizeLimit:   &lt;unset&gt;
QoS Class:       Burstable
Node-Selectors:  &lt;none&gt;
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason            Age                   From               Message
  ----     ------            ----                  ----               -------
  Warning  FailedScheduling  24m                   default-scheduler  0/3 nodes are available: 3 pod has unbound immediate PersistentVolumeClaims.
  Normal   Scheduled         23m                   default-scheduler  Successfully assigned k8s-logging/es-logging-es-default-0 to k8s-node-02
  Normal   Pulled            22m (x5 over 23m)     kubelet            Container image &quot;docker.elastic.co/elasticsearch/elasticsearch:7.12.1&quot; already present on machine
  Normal   Created           22m (x5 over 23m)     kubelet            Created container elastic-internal-init-filesystem
  Normal   Started           22m (x5 over 23m)     kubelet            Started container elastic-internal-init-filesystem
  Warning  BackOff           3m57s (x92 over 23m)  kubelet            Back-off restarting failed container
</code></pre>
<p>从示例可以看到，该pod最后的错误警告是：</p>
<pre><code>Warning  BackOff           3m57s (x92 over 23m)  kubelet            Back-off restarting failed container
</code></pre>
<p>很不幸，Events事件列表中，只包含的比较简单的信息：容器启动失败。</p>
<h2 id="3pod">3. 查看pod日志</h2>
<p>当事件列表中找不到详细错误时，需要查看pod的详细日志来定位：</p>
<pre><code>kubectl logs &lt;pod name&gt; -n &lt;namespace&gt;
</code></pre>
<h3 id="">示例</h3>
<pre><code>kubectl logs -n k8s-logging es-logging-es-default-0

Error from server (BadRequest): container &quot;elasticsearch&quot; in pod &quot;es-logging-es-default-0&quot; is waiting to start: PodInitializing
</code></pre>
<p>表示该pod的默认container是elasticsearch，而它还没有初始化成功，所以没有运行日志。</p>
<p>说明出错的不是默认的container。</p>
<h2 id="4container">4. 查看对应container的日志</h2>
<p>这时候需要查看特定contaienr的日志：</p>
<pre><code>kubectl logs &lt;pod name&gt; -n &lt;namespace&gt; -c &lt;container&gt;
</code></pre>
<h3 id="">示例</h3>
<p>从刚刚pod的详情里，找到Init Containers的列表。</p>
<p>示例中，Init Containers只有一个elastic-internal-init-filesystem，这个信息与Events列表中也是一致的。</p>
<p><img src="/images/2021/05/k8s-debug-01-describe-pod.png" alt="k8s-debug-01-describe-pod"></p>
<pre><code>kubectl logs -c elastic-internal-init-filesystem -n k8s-logging es-logging-es-default-0

# 以下是输出日志
Starting init script
Linking /mnt/elastic-internal/xpack-file-realm/users to /usr/share/elasticsearch/config/users
Linking /mnt/elastic-internal/xpack-file-realm/roles.yml to /usr/share/elasticsearch/config/roles.yml
Linking /mnt/elastic-internal/xpack-file-realm/users_roles to /usr/share/elasticsearch/config/users_roles
Linking /mnt/elastic-internal/elasticsearch-config/elasticsearch.yml to /usr/share/elasticsearch/config/elasticsearch.yml
Linking /mnt/elastic-internal/unicast-hosts/unicast_hosts.txt to /usr/share/elasticsearch/config/unicast_hosts.txt
File linking duration: 0 sec.
Copying /usr/share/elasticsearch/config/* to /mnt/elastic-internal/elasticsearch-config-local/
removed '/mnt/elastic-internal/elasticsearch-config-local/elasticsearch.yml'
'/usr/share/elasticsearch/config/elasticsearch.yml' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/elasticsearch.yml'
'/usr/share/elasticsearch/config/http-certs/..2021_05_14_02_35_50.501721750/ca.crt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/..2021_05_14_02_35_50.501721750/ca.crt'
'/usr/share/elasticsearch/config/http-certs/..2021_05_14_02_35_50.501721750/tls.crt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/..2021_05_14_02_35_50.501721750/tls.crt'
'/usr/share/elasticsearch/config/http-certs/..2021_05_14_02_35_50.501721750/tls.key' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/..2021_05_14_02_35_50.501721750/tls.key'
removed '/mnt/elastic-internal/elasticsearch-config-local/http-certs/ca.crt'
'/usr/share/elasticsearch/config/http-certs/ca.crt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/ca.crt'
removed '/mnt/elastic-internal/elasticsearch-config-local/http-certs/tls.crt'
'/usr/share/elasticsearch/config/http-certs/tls.crt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/tls.crt'
removed '/mnt/elastic-internal/elasticsearch-config-local/http-certs/tls.key'
'/usr/share/elasticsearch/config/http-certs/tls.key' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/tls.key'
removed '/mnt/elastic-internal/elasticsearch-config-local/http-certs/..data'
'/usr/share/elasticsearch/config/http-certs/..data' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/http-certs/..data'
'/usr/share/elasticsearch/config/jvm.options' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/jvm.options'
'/usr/share/elasticsearch/config/log4j2.file.properties' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/log4j2.file.properties'
'/usr/share/elasticsearch/config/log4j2.properties' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/log4j2.properties'
'/usr/share/elasticsearch/config/role_mapping.yml' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/role_mapping.yml'
removed '/mnt/elastic-internal/elasticsearch-config-local/roles.yml'
'/usr/share/elasticsearch/config/roles.yml' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/roles.yml'
'/usr/share/elasticsearch/config/transport-remote-certs/..2021_05_14_02_35_50.623420157/ca.crt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/transport-remote-certs/..2021_05_14_02_35_50.623420157/ca.crt'
removed '/mnt/elastic-internal/elasticsearch-config-local/transport-remote-certs/ca.crt'
'/usr/share/elasticsearch/config/transport-remote-certs/ca.crt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/transport-remote-certs/ca.crt'
removed '/mnt/elastic-internal/elasticsearch-config-local/transport-remote-certs/..data'
'/usr/share/elasticsearch/config/transport-remote-certs/..data' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/transport-remote-certs/..data'
removed '/mnt/elastic-internal/elasticsearch-config-local/unicast_hosts.txt'
'/usr/share/elasticsearch/config/unicast_hosts.txt' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/unicast_hosts.txt'
removed '/mnt/elastic-internal/elasticsearch-config-local/users'
'/usr/share/elasticsearch/config/users' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/users'
removed '/mnt/elastic-internal/elasticsearch-config-local/users_roles'
'/usr/share/elasticsearch/config/users_roles' -&gt; '/mnt/elastic-internal/elasticsearch-config-local/users_roles'
Empty dir /usr/share/elasticsearch/plugins
Copying /usr/share/elasticsearch/bin/* to /mnt/elastic-internal/elasticsearch-bin-local/
'/usr/share/elasticsearch/bin/elasticsearch' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch'
'/usr/share/elasticsearch/bin/elasticsearch-certgen' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-certgen'
'/usr/share/elasticsearch/bin/elasticsearch-certutil' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-certutil'
'/usr/share/elasticsearch/bin/elasticsearch-cli' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-cli'
'/usr/share/elasticsearch/bin/elasticsearch-croneval' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-croneval'
'/usr/share/elasticsearch/bin/elasticsearch-env' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-env'
'/usr/share/elasticsearch/bin/elasticsearch-env-from-file' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-env-from-file'
'/usr/share/elasticsearch/bin/elasticsearch-keystore' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-keystore'
'/usr/share/elasticsearch/bin/elasticsearch-migrate' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-migrate'
'/usr/share/elasticsearch/bin/elasticsearch-node' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-node'
'/usr/share/elasticsearch/bin/elasticsearch-plugin' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-plugin'
'/usr/share/elasticsearch/bin/elasticsearch-saml-metadata' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-saml-metadata'
'/usr/share/elasticsearch/bin/elasticsearch-setup-passwords' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-setup-passwords'
'/usr/share/elasticsearch/bin/elasticsearch-shard' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-shard'
'/usr/share/elasticsearch/bin/elasticsearch-sql-cli' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-sql-cli'
'/usr/share/elasticsearch/bin/elasticsearch-sql-cli-7.12.1.jar' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-sql-cli-7.12.1.jar'
'/usr/share/elasticsearch/bin/elasticsearch-syskeygen' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-syskeygen'
'/usr/share/elasticsearch/bin/elasticsearch-users' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/elasticsearch-users'
'/usr/share/elasticsearch/bin/x-pack-env' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/x-pack-env'
'/usr/share/elasticsearch/bin/x-pack-security-env' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/x-pack-security-env'
'/usr/share/elasticsearch/bin/x-pack-watcher-env' -&gt; '/mnt/elastic-internal/elasticsearch-bin-local/x-pack-watcher-env'
Files copy duration: 0 sec.
chowning /usr/share/elasticsearch/data to elasticsearch:elasticsearch
chown: changing ownership of '/usr/share/elasticsearch/data': Operation not permitted
failed to change ownership of '/usr/share/elasticsearch/data' from 1024:users to elasticsearch:elasticsearch
</code></pre>
<p>在日志的最后，可以看到出错原因：</p>
<pre><code>failed to change ownership of '/usr/share/elasticsearch/data' from 1024:users to elasticsearch:elasticsearch
</code></pre>
<p><img src="/images/2021/05/k8s-debug-02-pod-container-log.png" alt="k8s-debug-02-pod-container-log"></p>
<p>根据对应的错误，查找原因即可。</p>
<h1 id="">更多调试方法</h1>
<blockquote>
<p><a href="https://kubernetes.io/zh/docs/tasks/debug-application-cluster/debug-running-pod/">https://kubernetes.io/zh/docs/tasks/debug-application-cluster/debug-running-pod/</a></p>
</blockquote>
<!--kg-card-end: markdown-->