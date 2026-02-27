---
title: "Google Play 服务的各种错误码速查"
description: "错误速查表"
pubDate: 2020-02-25T08:03:44.000Z
author: "阿斌"
tags: ["开发笔记", "android"]
tagSlugs: ["dev", "android"]
draft: false
type: post
slug: "google-play-service-error-code"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>接入Google Play服务时，难免遇到各种错误，比如<br>
<img src="/content/images/2020/02/GooglePlay_ErrorCode.png" alt="GooglePlay_ErrorCode"></p>
<p>通常我们可以用result.getDebugMessage()来获取错误描述，result.getErrorCode来获取错误码。</p>
<p>然后对比官方文档来查看详细错误信息。</p>
<h2 id="">官方文档</h2>
<p><a href="https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes.html">https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes.html</a></p>
<h2 id="">错误参考</h2>
<table>
<thead>
<tr>
<th>Code</th>
<th>Const</th>
<th style="text-align:left">Desc</th>
</tr>
</thead>
<tbody>
<tr>
<td>-1</td>
<td><strong>SUCCESS_CACHE</strong></td>
<td style="text-align:left">The operation was successful, but was used the device's cache.</td>
</tr>
<tr>
<td>0</td>
<td><strong>SUCCESS</strong></td>
<td style="text-align:left">The operation was successful.</td>
</tr>
<tr>
<td>2</td>
<td><s>SERVICE_VERSION_UPDATE_REQUIRED</s></td>
<td style="text-align:left">This constant is deprecated. This case handled during connection, not during API requests. No results should be returned with this status code.</td>
</tr>
<tr>
<td>3</td>
<td><s>SERVICE_DISABLED</s></td>
<td style="text-align:left">This constant is deprecated. This case handled during connection, not during API requests. No results should be returned with this status code.</td>
</tr>
<tr>
<td>4</td>
<td><strong>SIGN_IN_REQUIRED</strong></td>
<td style="text-align:left">The client attempted to connect to the service but the user is not signed in.</td>
</tr>
<tr>
<td>5</td>
<td><strong>INVALID_ACCOUNT</strong></td>
<td style="text-align:left">The client attempted to connect to the service with an invalid account name specified.</td>
</tr>
<tr>
<td>6</td>
<td><strong>RESOLUTION_REQUIRED</strong></td>
<td style="text-align:left">Completing the operation requires some form of resolution.</td>
</tr>
<tr>
<td>7</td>
<td><strong>NETWORK_ERROR</strong></td>
<td style="text-align:left">A network error occurred.</td>
</tr>
<tr>
<td>8</td>
<td><strong>INTERNAL_ERROR</strong></td>
<td style="text-align:left">An internal error occurred.</td>
</tr>
<tr>
<td>10</td>
<td><strong>DEVELOPER_ERROR</strong></td>
<td style="text-align:left">The application is misconfigured.</td>
</tr>
<tr>
<td>13</td>
<td><strong>ERROR</strong></td>
<td style="text-align:left">The operation failed with no more detailed information.</td>
</tr>
<tr>
<td>14</td>
<td><strong>INTERRUPTED</strong></td>
<td style="text-align:left">A blocking call was interrupted while waiting and did not run to completion.</td>
</tr>
<tr>
<td>15</td>
<td><strong>TIMEOUT</strong></td>
<td style="text-align:left">Timed out while awaiting the result.</td>
</tr>
<tr>
<td>16</td>
<td><strong>CANCELED</strong></td>
<td style="text-align:left">The result was canceled either due to client disconnect or cancel().</td>
</tr>
<tr>
<td>17</td>
<td><strong>API_NOT_CONNECTED</strong></td>
<td style="text-align:left">The client attempted to call a method from an API that failed to connect.</td>
</tr>
</tbody>
</table>
<!--kg-card-end: markdown-->