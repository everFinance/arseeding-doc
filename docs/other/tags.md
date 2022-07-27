## Arweave Tags

**什么是 Tags？**

tags 是 Arweave 交易中的一个字段，是由 {name,value} 组成的数组，其中 names 和 values 的总长度不能超过 2048 bytes。

通过自定义该字段的内容，你可以使用 Arweave 网关能够检索到 tags 对应的交易。

示例：

```bash
query {
    transactions(
        tags: {
            name: "App-Name",
            value: "everPay"
        }
    ) {
        edges {
            node {
                id
            }
        }
    }
}
```
tags 除了能标记你在 Arweave 上存储的数据，使其数据检索更加方便之外，还能够通过标记数据类型让 Arweave 网关能在 HTTP 响应 Header 中直接添加数据类型。

这样的好处是浏览器等内容接收器能够直接通过 Header 中的 Content-Type 知道数据类型并渲染出来，比如图片，视频，音频，PDF 等内容。

示例：

在 tags 中添加 Content-Type: image/png 来声明数据类型

[https://viewblock.io/arweave/tx/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c](https://viewblock.io/arweave/tx/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c)

<img src="https://arseed.web3infura.io/3zH1Ai9-qGTi1hhcnE1tYRutczuWgKB5KvLBJSSVatQ" height="60%" width="60%"/>

通过 Arweave 网关链接直接渲染出图片

[https://aioyqbrvucy3pas4ghnccoqupuef64njmdlkotbgad5vu7dt2u.arweave.net/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c](https://aioyqbrvucy3pas4ghnccoqupuef64njmdlkotbgad5vu7dt2u.arweave.net/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c)