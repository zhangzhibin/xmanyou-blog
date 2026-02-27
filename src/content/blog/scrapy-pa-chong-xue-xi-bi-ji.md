---
title: "Scrapy 爬虫学习笔记"
description: "爬虫新手的入门笔记"
pubDate: 2020-04-20T15:51:09.000Z
author: "阿斌"
tags: ["开发笔记", "python", "scrapy", "爬虫"]
tagSlugs: ["dev", "python", "scrapy", "pa-chong"]
draft: false
type: post
slug: "scrapy-pa-chong-xue-xi-bi-ji"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><blockquote>
<p><a href="https://scrapy.org/">https://scrapy.org/</a></p>
</blockquote>
<h2 id="1scrapy">1. 安装 Scrapy</h2>
<blockquote>
<p><a href="https://docs.scrapy.org/en/latest/intro/install.html">https://docs.scrapy.org/en/latest/intro/install.html</a></p>
</blockquote>
<pre><code>sudo pip3 install Scrapy
</code></pre>
<h2 id="2">2. 文档</h2>
<blockquote>
<p><a href="https://docs.scrapy.org/en/latest/intro/tutorial.html">https://docs.scrapy.org/en/latest/intro/tutorial.html</a></p>
</blockquote>
<h2 id="3">3. 示例</h2>
<h3 id="31">3.1. 创建爬虫项目</h3>
<pre><code>scrapy startproject &lt;spider_project&gt;
</code></pre>
<h3 id="32">3.2. 添加爬虫代码</h3>
<pre><code>cd &lt;spider_project&gt;
cd &lt;spider_project&gt;/spiders
</code></pre>
<p>在spiders目录下添加一个spider代码文件</p>
<pre><code>import scrapy


class QuotesSpider(scrapy.Spider):
    name = &quot;quotes&quot;   # 注意这里

    def start_requests(self):
        urls = [
            'http://quotes.toscrape.com/page/1/',
            'http://quotes.toscrape.com/page/2/',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split(&quot;/&quot;)[-2]
        filename = 'quotes-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)
</code></pre>
<h3 id="33">3.3. 运行爬虫</h3>
<pre><code>scrapy crawl quotes
</code></pre>
<h2 id="4">4. 抓取与分析</h2>
<h3 id="41">4.1. 抓取页面</h3>
<pre><code>yield scrapy.Request(url=url, callback=self.parse)
</code></pre>
<pre><code># 默认回调 parse
def parse(self, response):
</code></pre>
<h3 id="42css">4.2. 用css选择元素</h3>
<h4 id="1responsecss">1). response.css</h4>
<pre><code>response.css(&quot;&lt;type&gt;.&lt;class&gt;&quot;)
</code></pre>
<blockquote>
<p>参考：<a href="https://www.w3.org/TR/selectors/">https://www.w3.org/TR/selectors/</a></p>
</blockquote>
<h4 id="2">2). 选择元素属性</h4>
<pre><code>response.css(&quot;&lt;type&gt;.&lt;class&gt;::attr(&lt;attr_name&gt;)&quot;)

response.css('li.next a::attr(href)')
response.css('li.next a').attrib['href']
</code></pre>
<h4 id="3">3). 选择文本</h4>
<pre><code>response.css(&quot;&lt;type&gt;.&lt;class&gt;::text&quot;)
</code></pre>
<h4 id="4">4). 一次选择多个</h4>
<pre><code>quote.css(&quot;div.tags a.tag::text&quot;).getall()
</code></pre>
<h4 id="5">5). 使用正则表达式</h4>
<pre><code>response.css('title::text').re(r'Quotes.*')
</code></pre>
<h3 id="43xpath">4.3. 用XPath选择</h3>
<blockquote>
<p>参考：<a href="https://www.w3.org/TR/xpath/all/">https://www.w3.org/TR/xpath/all/</a></p>
</blockquote>
<pre><code>response.xpath('//title')
response.xpath('//title/text()').get()
</code></pre>
<h3 id="44">4.4. 抓取链接页面</h3>
<blockquote>
<p>参考： <a href="https://docs.scrapy.org/en/latest/intro/tutorial.html#following-links">https://docs.scrapy.org/en/latest/intro/tutorial.html#following-links</a></p>
</blockquote>
<pre><code>yield scrapy.Request(next_page, callback=self.parse)
</code></pre>
<p>或者</p>
<pre><code>yield response.follow(next_page, callback=self.parse)
</code></pre>
<p>跟踪多个链接</p>
<pre><code>anchors = response.css('ul.pager a')
yield from response.follow_all(anchors, callback=self.parse)
</code></pre>
<h2 id="5">5. 保存数据</h2>
<pre><code>scrapy crawl quotes -o quotes.json
</code></pre>
<p>或者 JSON Line</p>
<blockquote>
<p>参考：<a href="http://jsonlines.org/">http://jsonlines.org/</a><br>
JQ 工具：<a href="https://stedolan.github.io/jq">https://stedolan.github.io/jq</a></p>
</blockquote>
<pre><code>scrapy crawl quotes -o quotes.jl
</code></pre>
<h2 id="6">6. 流水线</h2>
<blockquote>
<p>参考：<a href="https://docs.scrapy.org/en/latest/topics/item-pipeline.html#topics-item-pipeline">https://docs.scrapy.org/en/latest/topics/item-pipeline.html#topics-item-pipeline</a></p>
</blockquote>
<h2 id="7">7. 其他</h2>
<h3 id="71">7.1. 过滤重复链接</h3>
<p><strong>DUPEFILTER_CLASS</strong></p>
<blockquote>
<p>参考：<a href="https://docs.scrapy.org/en/latest/topics/settings.html#std:setting-DUPEFILTER_CLASS">https://docs.scrapy.org/en/latest/topics/settings.html#std:setting-DUPEFILTER_CLASS</a></p>
</blockquote>
<pre><code>Another interesting thing this spider demonstrates is that, even if there are many quotes from the same author, we don’t need to worry about visiting the same author page multiple times. By default, Scrapy filters out duplicated requests to URLs already visited, avoiding the problem of hitting servers too much because of a programming mistake. This can be configured by the setting DUPEFILTER_CLASS.
</code></pre>
<h3 id="72">7.2. 向回调函数传参</h3>
<blockquote>
<p>参考：<a href="https://docs.scrapy.org/en/latest/topics/request-response.html#topics-request-response-ref-request-callback-arguments">https://docs.scrapy.org/en/latest/topics/request-response.html#topics-request-response-ref-request-callback-arguments</a></p>
</blockquote>
<h3 id="73">7.3. 使用规则</h3>
<blockquote>
<p>参考：<a href="https://docs.scrapy.org/en/latest/topics/spiders.html#scrapy.spiders.CrawlSpider">https://docs.scrapy.org/en/latest/topics/spiders.html#scrapy.spiders.CrawlSpider</a></p>
</blockquote>
<h3 id="74">7.4. 使用命令行参数来改变爬虫行为</h3>
<p>格式：-a &lt;参数&gt;</p>
<pre><code>scrapy crawl quotes -o quotes-humor.json -a tag=humor
</code></pre>
<!--kg-card-end: markdown-->