---
title: "用AI编写一个在线CSV分享工具 tempcsv.com"
description: "分享tempcsv.com的实现过程。AI 编程肯定是大势所趋了，作为程序员，投身其中才能真正体会到这场变革的不可逆，并找到自己在这场变革中的位置。"
pubDate: 2026-02-02T09:48:31.000Z
author: "阿斌"
tags: ["AI"]
tagSlugs: ["ai"]
draft: false
type: post
slug: "building-tempcsv-with-ai"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">背景</h2>
<p>这几年，AI越来越走进工作生活的方方面面，作为一个程序员，AI对于编程的提升，所谓的Vibe Coding，已经从最早的智能提示，到现在直接完全替代手搓代码，几乎是一个翻天覆地的变化。</p>
<p>参与到这场工业革命最好的方法，就是亲自尝试，投入其中。</p>
<p>于是乎，我就临时起意，想了一个需求：在线查看和分享csv表格。</p>
<p>项目已经部署在：<a href="https://tempcsv.com">https://tempcsv.com</a><br>
代码分享在github： <a href="https://github.com/open4game/tempcsv">https://github.com/open4game/tempcsv</a></p>
<h2 id="">过程</h2>
<h3 id="cursor">第一个版本：Cursor 建功</h3>
<p>这个项目最早是2025年3月上传第一行代码。我选择的技术栈是</p>
<ul>
<li>Cursor：开发主力</li>
<li>Vue：前端</li>
<li>Hono：后端</li>
<li>CloudFlare：Worker + R2</li>
</ul>
<p><img src="/content/images/2026/02/ai-coding-practice-tempcsv-01.png" alt="ai-coding-practice-tempcsv-01"></p>
<p>与几乎所有的AI项目一样，前面80%的代码都异常顺利，剩下的20%中的80%，只要可能花时间慢慢与AI进行battle，基本上都能搞定。</p>
<p>但是，最后的4%，纯靠AI + 一个半桶水的程序员，几乎是不可能完成的任务。</p>
<p>为了能确保上线，我选择了保守策略：精简需求 + 提高容忍度，简单说，能用就好。</p>
<p>所以，差不多也就两三天的功夫，第一个Vue版本的 tempcsv.com 上线了。</p>
<h3 id="cc">第二个版本：CC 重构</h3>
<p>过了大半年，我又重新拾起这个项目，然后用 Claude Code 对前端进行了重度的重构。这次，我一方面想修复一些小bug，另一方面也是为了测试 CC 的长任务能力。这半年里，AI编程的进化几乎是一日千里，与这个项目最初创建时，已经不可同日而语，而 CC 也超越 Cursor 成为 AI 编程的 C 位。</p>
<p>我先让 CC 阅读了项目代码，分析了 Vue 版本的前端实现，然后制定了 Next 版本的重构计划，并对测试和部署方案进行了一些修改。一切都很顺利，直到又再次最后的 20% 问题。</p>
<p><img src="/content/images/2026/02/ai-coding-practice-tempcsv-02.png" alt="ai-coding-practice-tempcsv-02"></p>
<p>严格的说，这次 CC 遇到的问题比 Cursor 麻烦，因为 CC 对中国的限制访问，我只能用一些特殊方法，导致使用上非常不便，一直遇到奇怪的问题：</p>
<pre><code>API Error: Claude's response exceeded the 32000 output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.
</code></pre>
<p>这个问题在最近一周持续困扰我，导致cc始终无法完成上线的最低需求。</p>
<h3 id="cursor">第三个版本：Cursor 接盘</h3>
<p>我尝试用Cursor来接盘 CC 的代码修复bug，完成上线。</p>
<p>这时候，意外发生了：Cursor 一打开 CC 改过的项目，就直接崩溃了……</p>
<p>最后，我只好重新拉取代码，这次Cursor 顺利打开，然后剩下就是 Cursor 的舒适区了：</p>
<p><img src="/content/images/2026/02/ai-coding-practice-tempcsv-03.png" alt="ai-coding-practice-tempcsv-03"></p>
<p>于是乎，最终版本上线了。</p>
<p><img src="/content/images/2026/02/ai-coding-practice-tempcsv-04.png" alt="ai-coding-practice-tempcsv-04"></p>
<p>虽然最终还是用 Cursor 完成了最后一公里，但是，今天的 Cursor 和一年前的 Cursor 其实也已经不可同日而语了。</p>
<h2 id="">总结</h2>
<p>AI 编程肯定是大势所趋了，作为程序员，投身其中才能真正体会到这场变革的不可逆，并找到自己在这场变革中的位置。</p>
<!--kg-card-end: markdown--><p></p>