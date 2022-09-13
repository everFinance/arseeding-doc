# Signer 实例
# 概述

goar 的 bundleItem.go 实现了 bundle item 的组装和签名，完全支持 bundle 类型交易的组装。

# 使用

### 创建 itemSigner

```go
keyFile := "keyFile path"
rsaSigner, err := goar.NewSignerFromPath(keyFile)
if err != nil {
	panic(err)
}
privKey := ""
eccSigner, err := goether.NewSigner(privKey)
if err != nil {
	panic(err)
}
rsaItemSigner, err := goar.NewItemSigner(rsaSigner)
if err != nil {
	panic(err)
}
eccItemSigner, err := goar.NewItemSigner(eccSigner)
if err != nil {
	panic(err)
}
```

说明：

- `keyFile` 是 Arweave 地址（或其他兼容 Arweave RSA 签名算法的公有链地址）对应的 keyFile 文件，如何生成 KeyFile，可以参考：[获取 keyfile](https://web3infra.dev/zh-cn/docs/other/getAR)。
- `rsaSigner` 是 RSA 签名算法的地址对应的 signer 实例。
- `rsaItemSigner` 是 RSA signer 创建的 itemSigner 实例。
- `privKey` 是以太坊地址（或其他兼容以太坊 ECC 签名算法的公有链地址）对应的私钥。
- `eccSigner` 是 ECC 签名算法的地址对应的 signer 实例。
- `eccItemSigner` 是 ECC signer 创建的 itemSigner 实例。

注意：

- 在使用 goar 的 bundleItem 组装和签名工具时，`eccItemSigner` 和 `rsaItemSigner` 只需要创建一个，本例中创建了两种 itemSigner 是为了展示这两种 itemSigner 的创建过程，方便读者有更好的了解和对比。

### 组装并签名 bundleItem

```go
tags := []types.Tag{
	{Name: "App-Name", Value: "everPay"},
}
data, err := ioutil.ReadFile("cat.img")
if err != nil {
	panic(err)
}
target := ""
anchor := ""
item, err := eccItemSigner.CreateAndSignItem(data, target, anchor, tags)
if err != nil {
	panic(err)
}
fmt.Println(item)
```

本例中使用了上面创建的 `eccItemSigner` 来将数据组装并签名，生成了一个 bundleItem。

说明：

- `tags` 是自定义的标签，可以填入一些项目相关的信息，也是对该笔 bundleItem 的说明，可为空。
- `data` 是需要组装成 bundleItem 的数据，本例中采用 file I/O 读取了一张图片作为数据。
- `target` 是 bundleItem 的可选项，一般为空。
- `anchor` 是 bundleItem 的可选项，一般为空。

作为 Arweave 的一种标准格式 `[ANS-104 标准](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)` ，bundle item 可以被视为轻量级的 AR 交易，其更适用于数据体积小、数量多的应用场景。