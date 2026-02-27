---
title: "#IronSource Android游戏banner广告快速接入指南"
description: "给非Android开发人员的一个快速接入指南"
pubDate: 2021-04-02T09:27:20.000Z
author: "阿斌"
tags: ["android", "开发笔记", "IronSource"]
tagSlugs: ["android", "dev", "ironsource"]
draft: false
type: post
slug: "ironsource-android-banneryan-gao-jie-ru-zhi-nan"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>最近IronSource开始支持Banner广告了，总结一下Android游戏接入IronSource Banner广告的一些要点：</p>
<h2 id="">官方文档</h2>
<p><a href="https://developers.ironsrc.com/ironsource-mobile/android/banner-integration-android">https://developers.ironsrc.com/ironsource-mobile/android/banner-integration-android</a></p>
<h2 id="">详细接入步骤</h2>
<h3 id="1banner">1. 初始化Banner广告</h3>
<ul>
<li>1). 创建banner的容器 FrameLayout</li>
<li>2). 创建banner view （设置尺寸）</li>
<li>3). 将banner view添加到容器里</li>
<li>4). 将banner容器添加到MainActivity</li>
<li>5). 设置banner回调方法</li>
<li>6). 加载banner广告</li>
</ul>
<pre><code>    public static void initBanner(boolean showAfterLoad){
        // _app = MainActivity
        if(_app == null){
            Log.w(TAG, &quot;initBanner: App not inited&quot;);
            return;
        }

        // 1). 创建banner容器
        FrameLayout bannerContainer = new FrameLayout(_app);
        FrameLayout.LayoutParams containerParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.WRAP_CONTENT
        );
        containerParams.gravity = Gravity.BOTTOM;
        _bannerContainer = bannerContainer;

        // 2). 创建banner view
        IronSourceBannerLayout banner = IronSource.createBanner(_app, ISBannerSize.BANNER);
        _banner = banner;
        FrameLayout.LayoutParams bannerParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.WRAP_CONTENT);

        // 3). 将banner view添加到容器里
        bannerContainer.addView(banner, 0, bannerParams);

        // 4). 把bannerContainer添加到MainActivity里
        _app.addContentView(bannerContainer, containerParams);

        // 5). 设置banner回调方法
        banner.setBannerListener(new BannerListener() {
            @Override
            public void onBannerAdLoaded() {
                // Called after a banner ad has been successfully loaded
                Log.d(TAG, &quot;onBannerAdLoaded: ===&gt; Banner loaded&quot;);
            }

            @Override
            public void onBannerAdLoadFailed(IronSourceError error) {
                Log.d(TAG, &quot;onBannerAdLoadFailed: ===&gt; Banner load failed: &quot; + error.getErrorMessage());
                // Called after a banner has attempted to load an ad but failed.
                _app.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        _bannerContainer.removeAllViews();
                        // TODO: 也许可以尝试重新创建banner view并load
                    }
                });
            }

            @Override
            public void onBannerAdClicked() {
                // Called after a banner has been clicked.
                Log.d(TAG, &quot;onBannerAdClicked: ===&gt; Banner Clicked&quot;);
            }

            @Override
            public void onBannerAdScreenPresented() {
                // Called when a banner is about to present a full screen content.
                Log.d(TAG, &quot;onBannerAdScreenPresented: ===&gt; Banner Showed&quot;);
            }

            @Override
            public void onBannerAdScreenDismissed() {
                // Called after a full screen content has been dismissed
                Log.d(TAG, &quot;onBannerAdScreenDismissed: ===&gt; Banner Hided&quot;);
            }

            @Override
            public void onBannerAdLeftApplication() {
                // Called when a user would be taken out of the application context.
                Log.d(TAG, &quot;onBannerAdLeftApplication: &quot;);
            }
        });

        // 6). 加载banner广告
        IronSource.loadBanner(_banner);
        
        // 7). 如果不需要马上显示，可以隐藏
        if(!showAfterLoad){
            hideBanner();
        }
    }

</code></pre>
<h3 id="2banner">2. 加载Banner</h3>
<pre><code>IronSource.loadBanner(_banner);
</code></pre>
<h3 id="3banner">3. 销毁Banner</h3>
<pre><code>IronSource.destroyBanner(_banner);
</code></pre>
<p>如果销毁了的话，应该是要重新创建banner view的。</p>
<h3 id="4banner">4. 显示Banner</h3>
<pre><code>    public static void showBanner(){
        if(_banner == null){
            Log.w(TAG, &quot;showBanner: Banner Not Inited&quot;);
            return;
        }
        Log.d(TAG, &quot;showBanner: ===&gt; start loading banner&quot;);
        _banner.setVisibility(View.VISIBLE);
    }
</code></pre>
<h3 id="5banner">5. 隐藏Banner</h3>
<pre><code>    public static void hideBanner(){
        if(_banner == null){
            Log.w(TAG, &quot;hideBanner: Banner Not Inited&quot;);
            return;
        }

        Log.d(TAG, &quot;hideBanner: ===&gt; hide banner&quot;);
        _banner.setVisibility(View.INVISIBLE);
    }
</code></pre>
<!--kg-card-end: markdown-->