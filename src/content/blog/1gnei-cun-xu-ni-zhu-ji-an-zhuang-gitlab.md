---
title: "不作死就不会死！1G内存虚拟主机安装Gitlab的悲剧及拯救过程"
description: "一次no zuo no die的故(shi)事(gu)"
pubDate: 2017-11-18T08:51:39.000Z
author: "阿斌"
tags: ["开发笔记", "gitlab", "杂七杂八", "阿里云"]
draft: false
type: post
slug: "1gnei-cun-xu-ni-zhu-ji-an-zhuang-gitlab"
image: "/images/2017/11/41639009-1.png"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>最近影子工作室搞了个阿里云的ECS，对，性价比最高的那个，1CPU + 1G内存，用nginx+ghost跑个工作室官网还是没问题的。</p>
<p>折腾完官网以后，我又开始考虑能不能再多利用一下这个资源，比如，在上边搭一个gitlab？这样就可以省下github的每个月7美元的订阅费了。<br>
<img src="/images/2017/11/38882190.png" alt="38882190"></p>
<blockquote>
<p>吐个槽，这个github的市场莫非也是程序员在做，包年预付居然一点折扣都没有。</p>
</blockquote>
<p>闲话少说，说干就干，上gitlab网站看看安装流程，然而，网站上赫然写着：</p>
<p>推荐4G以上内存</p>
<p><img src="/images/2017/11/39028496.png" alt="39028496"></p>
<p>啥？<br>
我这台<em>超</em>高<em>性</em>价<em>比</em>机器就这么被鄙视了？</p>
<p>话说，我们就这么点人，要管理的项目也非常少，内存小一些大概也没有关系吧……</p>
<p>我心底升起一股侥(zuo)幸(si)的想法。</p>
<p>按照官网的流程，在Ubuntu上安装Gitlab还是很简单的：</p>
<ol>
<li>安装依赖应用 openssh和postfix</li>
</ol>
<blockquote>
<p>sudo apt-get install -y curl openssh-server ca-certificates</p>
<p>sudo apt-get install -y postfix</p>
</blockquote>
<ol start="2">
<li>添加gitlab包并安装</li>
</ol>
<blockquote>
<p>curl -sS <a href="https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh">https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh</a> | sudo bash</p>
<p>sudo EXTERNAL_URL=&quot;<a href="http://gitlab.example.com">http://gitlab.example.com</a>&quot; apt-get install gitlab-ce</p>
</blockquote>
<ol start="3">
<li>搞定，通过浏览器访问你的gitlab网站。</li>
</ol>
<p>3步搞定，so easy ~</p>
<p>说干咱就干！不管三七二十一，就是一顿捣鼓。</p>
<p>虽然中间因为网速问题，gitlab的包下载的有那么一点点慢，370M的包，花了几个小时才下载完。</p>
<p>不过，好歹可以安装了。</p>
<p>一边看着安装的进度条，我心里一边盘算着又节省了多少开支：</p>
<blockquote>
<p>每个月7美元，换算成人民币是，7x6.5，每月大概45块钱，一年就是540块，两年就是1080，三年就是……</p>
</blockquote>
<p>矮油，装完了！</p>
<p>我仿佛听到了数钱的声音，好像赚了几个亿，刷刷刷，刷刷刷，多美妙~</p>
<p><img src="/images/2017/11/41977064.png" alt="41977064"></p>
<p>哎哎，好像有什么地方不对……<br>
<img src="/images/2017/11/42086844.png" alt="42086844"></p>
<p>机器怎么反应这么慢……</p>
<p>输入的指令半天才显示出来……</p>
<p>啊……掉……线……了……</p>
<p>重……新……登……录……</p>
<p>输……入……密……码……</p>
<p>登……录……失……败……</p>
<p>什么情况？！！我心底有一股不祥的预感，连忙打开网站。</p>
<p>妈蛋，网站打不开了！<br>
<img src="/images/2017/11/42116184.png" alt="42116184"></p>
<p>淡定！</p>
<p>祭出必杀技：重启。</p>
<p>重……启……中……</p>
<p>经过了大概几个世纪，终于</p>
<p>重……启……完……毕……</p>
<p>登…………录…………</p>
<p>输……入……密……码……</p>
<p>登……录……失……败……</p>
<p>重……新……登……录……</p>
<p>输……入……密……码……</p>
<p>登……录……成……功……</p>
<p>然而，</p>
<p>依然……慢……慢……慢……</p>
<p>网站依然……打……不……开……</p>
<p>我这个暴脾气啊￥%￥#一下就上来了！<br>
<img src="/images/2017/11/42151684.png" alt="42151684"></p>
<p>淡定，一定要淡定！</p>
<p>ping一下，没问题啊。</p>
<p>可能，也许，大概，gitlab真的不能装在1G内存的机器上？</p>
<p>搜了一下gitlab的一些指令：<br>
先查看一下状态：</p>
<blockquote>
<p>sudo gitlab-ctl status</p>
<p>-bash: fork: Cannot allocate memory<br>
（无法分配内存！）</p>
</blockquote>
<p>我的心咯噔一下……不会什么指令都操作不了吧。<br>
算了，直接停止吧。</p>
<blockquote>
<p>sudo gitlab-ctl stop</p>
</blockquote>
<p>整个世界一下快起来了<br>
<img src="/images/2017/11/41058757.png" alt="41058757"></p>
<p>既然不能用，还是赶紧把这个惹麻烦的家伙赶出门吧。<br>
搜搜怎么卸载，倒是不麻烦：</p>
<p><img src="/images/2017/11/40513744.png" alt="40513744"></p>
<p>由于我还没有开始使用gitlab，所以，只需要第1步就好了，顶多再执行第4步删除安装包。</p>
<blockquote>
<p>sudo gitlab-ctl uninstall<br>
sudo dpkg -P gitlab-ce</p>
</blockquote>
<p>一切都顺利的不像话！<br>
<img src="/images/2017/11/41132729.png" alt="41132729"></p>
<p>今天的事故到此结束<br>
谢谢大家的光看</p>
<p><img src="/images/2017/11/55680986.png" alt="55680986"><br>
没有彩蛋</p>
<p>没有彩蛋</p>
<p>没有彩蛋</p>
<p>真的没有彩蛋</p>
<p>哎~，网站为什么还是没反应！！<br>
<img src="/images/2017/11/41195698.png" alt="41195698"></p>
<p>为什么！</p>
<p>为什么！！</p>
<p>为什么！！！</p>
<p>瞬间化身为十万个为什么</p>
<p><img src="/images/2017/11/41293463.png" alt="41293463"></p>
<p>淡定……淡定……</p>
<p>尝试重启nginx：</p>
<blockquote>
<p>sudo systemctl restart nginx</p>
<p>Job for nginx.service failed because the control process exited with error code. See &quot;systemctl status nginx.service&quot; and &quot;journalctl -xe&quot; for details.</p>
</blockquote>
<p>失败！！<br>
<img src="/images/2017/11/42305440.png" alt="42305440"></p>
<p>我依稀记得，gitlab好像是自带nginx的，不会是跟我原本安装的那个冲突了吧？<br>
查看一下nginx的进程：</p>
<blockquote>
<p>ps -ef|grep nginx</p>
<p>root      1592  1589  0 23:27 ?        00:00:00 runsv nginx<br>
root      1618  1592  0 23:27 ?        00:00:00 svlogd -tt /var/log/gitlab/nginx<br>
root      1619  1592  0 23:27 ?        00:00:00 nginx: master process /opt/gitlab/embedded/sbin/nginx -p /var/opt/gitlab/nginx<br>
gitlab-+  1637  1619  0 23:27 ?        00:00:00 nginx: worker process<br>
gitlab-+  1639  1619  0 23:27 ?        00:00:00 nginx: cache manager process</p>
</blockquote>
<p>果然有好多，而且不是我之前装的那个。</p>
<p>直接kill吧。</p>
<blockquote>
<p>kill 1592<br>
kill 1589</p>
</blockquote>
<p>这下整个世界真的清净了。</p>
<p><img src="/images/2017/11/41639009.png" alt="41639009"></p>
<p>再次启动nginx</p>
<blockquote>
<p>sudo systemctl restart nginx</p>
</blockquote>
<p>网站回来了！</p>
<p><img src="/images/2017/11/38671577.png" alt="38671577"></p>
<p>关机！<br>
睡觉！！<br>
债见！！！<br>
一气呵成！！！！</p>
<p><img src="/images/2017/11/41863866.png" alt="41863866"></p>
<hr>
<p>我是阿斌，欢迎关注我的公众号【阿斌的日常】，一起开心做游戏。<br>
如果你有什么想法，也可以给我留言哦。<br>
<img src="/images/2017/11/qc_unitymvp.jpg" alt="qc_unitymvp"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->