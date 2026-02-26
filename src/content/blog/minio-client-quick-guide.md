---
title: "Minio Client常用命令总结"
description: "mc是管理minio的客户端命令行工具"
pubDate: 2021-09-30T09:07:05.000Z
author: "阿斌"
tags: ["minio", "开发笔记"]
tagSlugs: ["minio", "dev"]
draft: false
type: post
slug: "minio-client-quick-guide"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="0minio">0. 关于Minio</h1>
<blockquote>
<p><a href="https://min.io/">https://min.io/</a></p>
</blockquote>
<p>Minio客户端工具(mc)是一个用来管理Minio的命令行工具。</p>
<h1 id="1mc">1.安装mc</h1>
<p>mac版本</p>
<pre><code>brew install minio/stable/mc
</code></pre>
<h1 id="2">2. 命令与参数</h1>
<pre><code>mc --help

NAME:
  mc - MinIO Client for cloud storage and filesystems.

USAGE:
  mc [FLAGS] COMMAND [COMMAND FLAGS | -h] [ARGUMENTS...]

COMMANDS:
  alias      set, remove and list aliases in configuration file
  ls         list buckets and objects
  mb         make a bucket
  rb         remove a bucket
  cp         copy objects
  mirror     synchronize object(s) to a remote site
  cat        display object contents
  head       display first 'n' lines of an object
  pipe       stream STDIN to an object
  share      generate URL for temporary access to an object
  find       search for objects
  sql        run sql queries on objects
  stat       show object metadata
  mv         move objects
  tree       list buckets and objects in a tree format
  du         summarize disk usage recursively
  retention  set retention for object(s)
  legalhold  manage legal hold for object(s)
  diff       list differences in object name, size, and date between two buckets
  rm         remove objects
  version    manage bucket versioning
  ilm        manage bucket lifecycle
  encrypt    manage bucket encryption config
  event      manage object notifications
  watch      listen for object notification events
  undo       undo PUT/DELETE operations
  anonymous  manage anonymous access to buckets and objects
  tag        manage tags for bucket and object(s)
  replicate  configure server side bucket replication
  admin      manage MinIO servers
  update     update mc to latest release

GLOBAL FLAGS:
  --autocompletion              install auto-completion for your shell
  --config-dir value, -C value  path to configuration folder (default: &quot;/Users/zhangzhibin/.mc&quot;)
  --quiet, -q                   disable progress bar display
  --no-color                    disable color theme
  --json                        enable JSON lines formatted output
  --debug                       enable debug output
  --insecure                    disable SSL certificate verification
  --help, -h                    show help
  --version, -v                 print the version

TIP:
  Use 'mc --autocompletion' to enable shell autocompletion

VERSION:
  RELEASE.2021-09-02T09-21-27Z
</code></pre>
<p>添加自动补齐脚本</p>
<pre><code># 运行以下命令，然后重启shell
mc --autocompletion
</code></pre>
<h1 id="3">3. 使用</h1>
<h2 id="31alias">3.1. 设置服务器别名alias</h2>
<blockquote>
<p><a href="https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-alias.html">https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-alias.html</a></p>
</blockquote>
<pre><code>mc alias set ALIAS HOSTNAME ACCESSKEY SECRETKEY
</code></pre>
<h3 id="">移除服务器</h3>
<pre><code>mc alias remove ALIAS
</code></pre>
<h3 id="">查看所有服务器</h3>
<pre><code>mc alias list
</code></pre>
<h2 id="32bucket">3.2. 创建桶bucket</h2>
<blockquote>
<p><a href="https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-mb.html">https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-mb.html</a></p>
</blockquote>
<pre><code>mc mb --with-lock ALIAS/BUCKET
</code></pre>
<h2 id="33">3.3. 上传</h2>
<blockquote>
<p><a href="https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-cp.html">https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-cp.html</a></p>
</blockquote>
<h3 id="">上传文件</h3>
<pre><code>mc cp SOURCE ALIAS/PATH
</code></pre>
<h3 id="">上传文件夹</h3>
<pre><code>mc cp --recursive SOURCE ALIAS/PATH
</code></pre>
<p>示例</p>
<pre><code># 注意 本地目录后要加/，而目标目录可加可不加
mc cp --recursive ./test-folder/ local/apps/
or
mc cp --recursive ./test-folder/ local/apps/
</code></pre>
<h2 id="34">3.4. 同步文件夹</h2>
<blockquote>
<p><a href="https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-mirror.html">https://docs.min.io/minio/baremetal/reference/minio-cli/minio-mc/mc-mirror.html</a></p>
</blockquote>
<p>The mc mirror command synchronizes content to an S3-compatible host, similar to the rsync utility.</p>
<h3 id="">同步文件系统</h3>
<pre><code>mc mirror FILEPATH ALIAS/PATH
</code></pre>
<p>示例</p>
<pre><code>mc mirror ./test-folder local/apps/test-folder
或者 同步到另一个文件夹
mc mirror ./test-folder local/apps/test-folder2
</code></pre>
<h3 id="">同步对象存储</h3>
<pre><code>mc mirror --watch SRCALIAS/SRCPATH TGTALIAS/TGTPATH
</code></pre>
<h3 id="watch">关于--watch选项</h3>
<p>添加 --watch 选项，可以持续监听文件的变化，保持同步。</p>
<p><strong>但是</strong> 不适合文件非常多的文件夹，否则可能报错：</p>
<h2 id="35">3.5. 删除文件或者文件夹</h2>
<pre><code>mc rm
</code></pre>
<h3 id="">删除文件</h3>
<pre><code>mc rm ALIAS/PATH
</code></pre>
<p>示例</p>
<pre><code>mc rm -r --force  local/apps/test-folder2/index.html
</code></pre>
<h3 id="">删除文件夹</h3>
<pre><code>mc rm -r --force ALIAS/PATH

mc rm -r --force  local/apps/test-folder2
</code></pre>
<h2 id="36mcmv">3.6. 移动 mc mv</h2>
<h2 id="37policy">3.7. 设置访问权限 policy</h2>
<blockquote>
<p><a href="https://docs.min.io/docs/minio-client-complete-guide.html#policy">https://docs.min.io/docs/minio-client-complete-guide.html#policy</a></p>
</blockquote>
<pre><code>mc policy [FLAGS] set PERMISSION TARGET
</code></pre>
<p>举例</p>
<pre><code># 设置为公开访问
mc policy set public &lt;alias&gt;/&lt;bucket&gt;
</code></pre>
<!--kg-card-end: markdown-->