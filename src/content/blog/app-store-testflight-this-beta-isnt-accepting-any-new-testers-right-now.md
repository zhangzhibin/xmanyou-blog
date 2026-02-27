---
title: "#App Store# TestFlight 此beta版本目前不接受任何新测试员 是什么情况？"
description: "利用TestFlight进行beta测试，好不容易通过了审核，却遇到了“此Beta版本目前不接受任何新测试员”，该怎么解决？"
pubDate: 2019-07-14T15:05:29.000Z
author: "阿斌"
tags: ["开发笔记", "App Store", "TestFlight", "ios"]
tagSlugs: ["dev", "app-store", "testflight", "ios"]
draft: false
type: post
slug: "app-store-testflight-this-beta-isnt-accepting-any-new-testers-right-now"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题描述</h2>
<p>自从TestFlight允许通过链接直接加入测试以后，极大地方便了beta测试的过程。</p>
<p>但是，beta测试的审核有时候反而要比正式版本慢很多。我们最近有个App提交beta测试审核，第一个版本，居然审了一天多。</p>
<p>刚刚提交的版本状态是，“<strong>正在等待审核</strong>”<br>
<img src="/content/images/2019/07/TestFlight_This_beta_isnt_accepting_any_new_testers_right_now_01.jpeg" alt="TestFlight 此beta版本目前不接受任何新测试员: 正在等待审核"></p>
<p>左等右等，盼星星盼月亮，终于等到“<strong>正在审核</strong>”</p>
<p><img src="/content/images/2019/07/TestFlight_This_beta_isnt_accepting_any_new_testers_right_now_02.jpeg" alt="TestFlight 此beta版本目前不接受任何新测试员: 正在审核"></p>
<p>某天终于是“<strong>审核通过</strong>”了，高兴得忘记了截图。</p>
<p>看到“<strong>审核通过</strong>”，我就兴冲冲地去<strong>创建公开链接</strong>，然后发给测试组。可是，咦，怎么看到这么个页面：<br>
<img src="/content/images/2019/07/TestFlight_This_beta_isnt_accepting_any_new_testers_right_now_04.jpeg" alt="TestFlight 此beta版本目前不接受任何新测试员"></p>
<p>如果用TestFlight打开，则是：</p>
<p><img src="/content/images/2019/07/TestFlight_This_beta_isnt_accepting_any_new_testers_right_now_06.png" alt="TestFlight 此beta版本目前不接受任何新测试员"></p>
<p>这是怎么回事？</p>
<h2 id="">原因</h2>
<ol>
<li>没有设置测试人数</li>
<li>没有发送邀请</li>
<li>改动设置以后，苹果服务器有延迟</li>
</ol>
<h2 id="">解决</h2>
<ol>
<li>
<p><strong>添加测试人数</strong><br>
<img src="/content/images/2019/07/TestFlight_This_beta_isnt_accepting_any_new_testers_right_now_07.png" alt="TestFlight 此beta版本目前不接受任何新测试员：添加测试人数"></p>
</li>
<li>
<p><strong>发送邀请</strong> （这里借用网上截图一张~）<br>
<img src="/content/images/2019/07/TestFlight_This_beta_isnt_accepting_any_new_testers_right_now_08.png" alt="TestFlight 此beta版本目前不接受任何新测试员：发送邀请"></p>
</li>
<li>
<p><strong>耐心等待</strong>几分钟</p>
</li>
</ol>
<p>终于搞定。</p>
<blockquote>
<p><strong>注意</strong>：如果测试人员从TestFlight安装beta版本，遇到安装失败，多半是网络原因，多试几次就好了。</p>
</blockquote>
<h2 id="">参考</h2>
<ol>
<li>
<p><a href="https://stackoverflow.com/questions/53758738/testflight-public-link-doesnt-accept-new-beta-testers">StackOverflow: TestFlight public link doesn't accept new beta testers</a></p>
</li>
<li>
<p><a href="https://xmanyou.com/why-you-cannot-download-beta-app-from-testlight/">给非开发人员解释一下为什么你没法通过TestFlight下载beta版本应用了</a></p>
</li>
</ol>
<h2 id="">其他情况请关注公众号咨询</h2>
<p>最近有不少同学遇到这个问题，如果本文中的方法不能解决你的问题，请关注公众号提问。</p>
<!--kg-card-end: markdown-->