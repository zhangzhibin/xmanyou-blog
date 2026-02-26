---
title: "#JavaScript 利用UserAgent判断是否手机浏览器"
description: "有些事情，原理很简单，但是实现起来很麻烦。"
pubDate: 2021-09-18T02:41:49.000Z
author: "阿斌"
tags: ["JavaScript", "h5 小游戏开发", "开发笔记"]
draft: false
type: post
slug: "javascript-detect-mobile-browser-using-navigator-useragent"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>游戏为了能更好的适配不同的浏览器，为不同浏览器提供不同的操作方式，比如：</p>
<ul>
<li>手机浏览器：虚拟摇杆+触摸操作</li>
<li>电脑浏览器：键盘操作</li>
</ul>
<p>这时候，需要能够检测当前的浏览器是否手机浏览器。</p>
<h1 id="">解决方法</h1>
<p>通常来说，可以通过检查navigator.userAgent的值，来判断是否手机浏览器。</p>
<p>这种做法的原理是，不同浏览器的userAgent值不同。</p>
<p>这个原理很简单，但是，问题是：市面上的浏览器太多了，需要判定太多的值。</p>
<p>网站<a href="http://detectmobilebrowsers.com/">detectmobilebrowsers</a>提供了一个匹配方法，可以适配目前大部分的手机浏览器。</p>
<p><img src="/images/2021/09/how-to-detect-mobile-browsers.png" alt="how-to-detect-mobile-browsers"></p>
<p>该网站还提供代码下载，非常方便。</p>
<h2 id="typescript">示例代码(typescript)</h2>
<pre><code class="language-TypeScript">function detectMobileBrowser(a){
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
    return true;
  }
  return false;
}

let _isMobileBrowser = undefined;
function isMobileBrowser(){
  // 只检测一次
  if(typeof(_isMobileBrowser) === &quot;undefined&quot;){
    // @ts-ignore
    _isMobileBrowser = detectMobileBrowser(navigator.userAgent||navigator.vendor||window.opera);
  }
  return _isMobileBrowser;
}

  // (navigator.userAgent||navigator.vendor||window.opera,'http://detectmobilebrowser.com/mobile');

export {isMobileBrowser};

</code></pre>
<h2 id="">其他方案</h2>
<ul>
<li><a href="http://detectmobilebrowsers.com/">http://detectmobilebrowsers.com/</a></li>
<li>通过窗口大小来判断 <a href="https://gist.github.com/MiguelDebruyne/10821062">https://gist.github.com/MiguelDebruyne/10821062</a></li>
<li><a href="https://github.com/hgoebl/mobile-detect.js/">https://github.com/hgoebl/mobile-detect.js/</a></li>
</ul>
<!--kg-card-end: markdown-->