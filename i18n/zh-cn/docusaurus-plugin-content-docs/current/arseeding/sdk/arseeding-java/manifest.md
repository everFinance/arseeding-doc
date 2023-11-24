# Manifest

manifest 旨在为用户提供文件夹上传并解析的功能，其中一个重要的应用场景便是静态网站的部署。现在，你可以通过 Arseeding 提供的 SDK 来上传你的静态网页文件夹，只需极低的花费（0.1-0.2 USDC）就可以将你的静态站点永久的部署到 Arweave 上。

了解更多：[Manifest 介绍](../../other/manifest.md)

### 上传文件

```java
ManifestUploadResponse response = 
        arSDK.uploadFolder("your root path", batchSize, "index file", payCurrency);

System.out.println(response);
```
其中

- your root path 为你想要上传的文件夹的路径，例如，部署静态网站，前端项目编译后会生成 build 文件夹，选择该文件夹的路径即可。
- batchSize 是可选择的并发度，我们的 SDK 提供了高性能的并发上传来保证服务的高可用性。
- index file 为 manifest 默认的索引文件。静态网站一般为 index.html。
- payCurrency 是需要选择的支付代币，如果你的 MetaMask 地址在 everPay 持有的是 usdc，这里请填写 usdc，如果持有的是其他代币，请填写其他代币的 symbol。

在返回的结果中可以找到`itemId`