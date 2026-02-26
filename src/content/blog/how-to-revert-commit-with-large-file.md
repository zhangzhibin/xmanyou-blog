---
title: "不小心误commit超大文件到git，怎么办？"
description: "如何正确删除误提交commit的超大文件到git"
pubDate: 2022-11-27T10:36:38.000Z
author: "阿斌"
tags: ["git", "开发笔记"]
draft: false
type: post
slug: "how-to-revert-commit-with-large-file"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>github 默认允许push推送的最大文件为100M，但是有时候使用一些外部插件时，依然会不小心误commit一些大文件，然后在推送到github时，就会遇到错误提示：</p>
<pre><code>remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com
</code></pre>
<p>意思是，检测到了大文件。</p>
<p>最糟糕的是，这个错误会导致本地所有未推送到远程的commit记录都无法正常推送。</p>
<h2 id="">解决方法</h2>
<h3 id="">错误做法</h3>
<p>首先需要提的是<strong>错误做法</strong>：删除该文件，然后再次提交commit。</p>
<p>这是一个标准的错误做法，因为删除文件后commit，并不会删除之前的提交历史，所以此时推送的话，会进行以下操作：</p>
<ul>
<li>提交大文件</li>
<li>...其他操作</li>
<li>删除大文件</li>
</ul>
<p>但是，在推送大文件时，依然会遇到错误，导致后续的删除无法进行。</p>
<p>那么，如何正确删除或者修改操作记录呢？</p>
<h3 id="">标准做法</h3>
<p>标准且直接的修改commit的方法是，使用以下命令:</p>
<ul>
<li>git log 查看commit历史记录，用于查找目标记录</li>
<li>git rebase -i 修改错误的提交记录</li>
<li>git rm 删除大文件</li>
<li>git commit --amend -C HEAD 提交修改过的commit记录</li>
<li>git rebase --continue 确认完整的修改历史</li>
</ul>
<p>顺利的话，最后你就可以正常进行<code>git push</code>了。</p>
<p>具体的可以参考以下教程:</p>
<ul>
<li><a href="https://medium.com/analytics-vidhya/tutorial-removing-large-files-from-git-78dbf4cf83a">https://medium.com/analytics-vidhya/tutorial-removing-large-files-from-git-78dbf4cf83a</a></li>
</ul>
<p>这一系列git操作，对于不熟悉的人来说，是很繁琐的，而且很容易出错，一旦出错，就要进行二次修正。</p>
<p>那么，有没有什么简便的方法呢？</p>
<h3 id="">便捷方法</h3>
<p>更便捷且不易出错的方法是，不直接去修改commit历史记录，而是先回滚，然后重新提交。</p>
<p>具体的操作步骤：</p>
<ul>
<li><strong>备份</strong>当前的所有文件，凡事先备份</li>
<li>回滚到出错之前的版本，如果不备份直接回滚，会之前所有的修改都丢失</li>
<li>将备份的文件覆盖回滚后的版本</li>
<li>将大文件添加到.gitignore忽略列表</li>
<li>重新提交</li>
</ul>
<p><strong>副作用</strong><br>
任何便捷的方法几乎都有副作用，这次也不例外：虽然你不会丢失任何文件，但是会丢失文件的版本记录，导致无法按需commit。<br>
如果需要这么做，那么你可以考虑依次回滚，然后依次提交，或者使用标准的rebase+amend方法。</p>
<p>以上。</p>
<!--kg-card-end: markdown-->