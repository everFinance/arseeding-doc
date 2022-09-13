# Bundle
# 概述

Bundle 是 Arweave 网络的标准之一，ANS-104 标准，它将多个独立的 item 组装成为 Bundle data， 将 Bundle data 放入一笔 Arweave 原生交易的 data 中，上传至 Arweave 进行永存。 Item 与 Arweave 原生交易具有许多相同的属性，因为它具有 owner、数据、标签、目标、签名和 id。 不同之处在于无法转移代币，也没有奖励，因为原生交易为所有 bundleItem 支付了上传数据的花销。

将多个 item 打包放到一笔 AR 交易中提供了许多好处：

- 允许将 dataItem 的付款委托给第 3 方，同时保持创建 dataItem 的人的身份和签名，而不需要他们有一个有资金的钱包。
- 允许将多个 dataItems 作为一个组写入。对一些应用场景（如静态网页部署）十分有用。
- 增加对 Arweave 网络的逻辑独立数据写入的吞吐量。

goar 提供了 bundle 相关的完整工具链，开发者可以利用这些工具便捷的进行 Bundle 类型的数据组装和解析。

# 使用

### 组装和签名

如何快速组装并签名一笔 bundleItem ，可以参考 [item 组装签名](../bundle_singer/signer.md)。

### 创建 BundleItem

```go
func main() {
	// eccSigner
	privKey := ""
	eccSigner, err := goether.NewSigner(privKey)
	if err != nil {
		panic(err)
	}
	// rsaSigner
	keyfile := "keyfile path"
	rsaSigner, err := goar.NewSignerFromPath(keyfile)
	if err != nil {
		panic(err)
	}
	owner := utils.Base64Encode(eccSigner.GetPublicKey())
	signType := types.EthereumSignType
	if err != nil {
		panic(err)
	}
	tags := []types.Tag{
		{Name: "App-Name", Value: "everPay"},
	}
	target := ""
	anchor := ""
	data,err := ioutil.ReadFile("cat.img")
	if err != nil {
		panic(err)
	}
	item, err := utils.NewBundleItem(owner, signType, target, anchor, data, tags)
	if err != nil {
		panic(err)
	}
	fmt.Println(item)
}
```

说明：

- `eccSigner` 是通过以太坊私钥创建的一个 signer 实例，这个实例将会提供 bundleItem 签名所需的信息，以此来证明该笔 item 的所有权属于这个 signer 实例对应的私钥所有者。
- `rsaSigner` ：goar 也支持创建 Arweave 的 signer 实例来对 bundleItem 进行签名。它的作用和 `eccSigner` 相同，实际使用时二者选其一即可。
- `signType` ：item 的签名类型，本例中的签名类型为 EthereumSignType。
- `tags` : 自定义的标签。
- `target & anchor` : 可选字段,一般为空。
- `data` ：需要打包到 item 中的数据。

## 生成 item 的数字摘要

这一步是对 item 进行签名的准备工作，熟悉区块链的开发者应该知道，用私钥对交易进行签名，实际上是对交易信息的数字摘要进行签名，不同的项目对于数字摘要的生成都有不同的规则，但是本质上都是采用的不可逆的哈希函数，例如 SHA-256。Arweave 生成数字摘要采用了 deepHash 的方法，goar 也实现了 deepHash 的生成算法，具体可以参考 `BundleItemSignData` 中的  `DeepHash` 方法。

```go
digest, err := utils.BundleItemSignData(*item)
fmt.Println(digest)
```

### item 签名

```go
err = goar.SignBundleItem(signType, eccSigner, item)
if err != nil {
	panic(err)
}
```

说明：

- `SignBundleItem` 方法内部会调用上面的 `BundleItemSignData` 生成 item 的数字摘要，对 item 进行签名。

### 生成 ItemBinary

通过前面几个方法就得到了一个结构化的 bundleItem，结构化的 item 需要序列化成字节流便于进行网络传输。

```go
err := utils.GenerateItemBinary(item)
```

生成的 ItemBinary 会放入 item 的 `ItemBinary` 字段中，在进行 item 传输时，不需要传输整个 item 结构，只需要取该字段的数据即可。

### 解析 ItemBinary

在将 item 进行网络传输时，数据接收方接收到的是 itemBinary 字节流，需要将字节流反序列化后得到 item 的完整结构。goar 提供了解析 itemBinary 的工具。

```go
binary := <byte arr>
item, err := utils.DecodeBundleItem(binary)
```

### 验证 Item 合法性

接收者在接收到数据并解析成 item 结构后，需要验证 item 的签名是否合法，同时也需要验证数据的完整性。

```go
err := utils.VerifyBundleItem(*item)
```

### 生成 Bundle

在接收到一定数量的合法 item 后，就可以将这些 item 打包成一个 Bundle。

```go
items := []types.BundleItem{}
bundle, err := utils.NewBundle(items)
```

说明：

- `bundle` 结构中有一个字段 `BundleBinary` ，和 itemBinary 一样，它也是一个字节流序列，里面包含了所有的 item 信息。

在生成 Bundle 后，我们就可以将 BundleBinary 作为一笔 Arweave 原生交易的数据发送至 Arweave 网络，并将 BundleBinary 这笔数据进行永存了。如何发送 Arweave 数据交易可以参考 [goar wallet](https://www.notion.so/3-wallet-05aa0e34ae15426aac429be8a3ee1898) 中的相关方法。

### 解析 Bundle

与解析 itemBinary 一样，bundleBinary 作为序列化后的字节流，也需要进行反序列化解析。

```go
bundleBinary := <byte arr>
bundle, err := utils.DecodeBundle(bundleBinary)
```

说明：

- `bundle` 结构中的 `items` 字段是一个 item 数组，包含了所有的 item 信息。