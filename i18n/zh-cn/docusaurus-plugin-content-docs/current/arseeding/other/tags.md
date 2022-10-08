## Arweave Tags

**什么是 Tags？**

tags 是 Arweave 交易中的一个字段，是由 {name,value} 组成的数组，其中 names 和 values 的总长度不能超过 2048 bytes。

通过自定义该字段的内容，你可以使用 Arweave 网关能够检索到 tags 对应的交易。

示例：

```bash
query {
    transactions(
        tags: {
            name: "Content-Type",
            value: "image/png"
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

### Content-Type

Content-Type（内容类型），一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。

Content-Type 标头告诉客户端实际返回的内容的内容类型。

语法格式：
```
Content-Type: text/html
Content-Type: multipart/form-data
```
定义好 Content-Type 这个 Tag ，可以使浏览器等内容接收器能够直接通过 Header 中的 Content-Type 知道数据类型并渲染出来，比如图片，视频，音频，PDF 等内容。

示例：

在 tags 中添加键值对 `{name:Content-Type, value:image/png}` 来声明数据类型

[https://viewblock.io/arweave/tx/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c](https://viewblock.io/arweave/tx/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c)

<div align="center"><img src="https://arseed.web3infra.dev/3zH1Ai9-qGTi1hhcnE1tYRutczuWgKB5KvLBJSSVatQ" height="60%" width="60%"/></div>

通过 Arweave 网关链接直接渲染出图片

[https://aioyqbrvucy3pas4ghnccoqupuef64njmdlkotbgad5vu7dt2u.arweave.net/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c](https://aioyqbrvucy3pas4ghnccoqupuef64njmdlkotbgad5vu7dt2u.arweave.net/Ah2IBjWgsbeCXDHaIToUfQhf-calg1qdMJgD7Wnxz1c)

开发者应该基于上传文件的类型赋予它们相对应的 `Content-Type`

常见的媒体格式类型如下：

- text/html ： HTML 格式
- text/plain ：纯文本格式
- text/xml ： XML 格式
- image/gif ：gif 图片格式
- image/jpeg ：jpg 图片格式
- image/png：png 图片格式

以 application 开头的媒体格式类型：

- application/xhtml+xml ：XHTML 格式
- application/xml： XML 数据格式
- application/atom+xml ：Atom XML 聚合格式
- application/json： JSON 数据格式
- application/pdf：pdf 格式
- application/msword ： Word 文档格式
- application/octet-stream ： 二进制流数据（如常见的文件下载）

更多的关于 content-type 与文件扩展名的对应关系可以参考：
https://tool.oschina.net/commons/_contenttype.dea