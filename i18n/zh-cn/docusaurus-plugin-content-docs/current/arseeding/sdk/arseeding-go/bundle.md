如果还不知道怎么生成 Arseeding golang 请看上一节：[golang SDK 概览](1.intro.md) 。

使用 Arseeding-go 可以帮助开发者快速将文件发送到 Arseeding 节点。

## 发送数据

```go
data := []byte("some data")
tags := []types.Tag{
    {"Content-Type", "application/text"},
    {"aa", "aaa"},
}
currency := "USDC" // everpay supported all tokens, like 'AR','ETH','USDT' and so on
order, err := sdk.SendData(data, currency, &schema.OptionItem{Tags: tags})
```

返回值： [order](type.md#order)

`data` 是需要上传的数据，通常是一个二进制数据。你可以通过 io 读取文件并完成上传。

`tags` 是 Arweave 支持的一种 key-value 索引，你可以在 `tags` 中设置文件类型，设置文件名称甚至是版本号。关于 Arweave Tag：TODO。

`currency` 选择你需要为文件存储支付的币种，如果使用个人部署的 No_Fee 模式节点，该值可以为空字符串。

注意: 这一步操作是将数据发送至 Arseeding 进行暂存并返回给用户一个待支付的订单，订单支付完成后 Arseeding 会将数据上链,（之后你可以通过 Arseeding 或 Arweave 网关进行数据查询）。**若订单1小时内未支付则订单过期，数据删除。**

## 支付订单

通过 arseeding-go 支付上传数据所需的费用后， Arseeding 可以 100% 保证将数据上传至 Arweave 进行永存。

```go
everTx, err := sdk.PayOrder(order)
```

返回值: [everTx](type.md#ever_tx)

注意：若用户在 everpay 上面还没有资产，可以参考[这里](https://www.notion.so/cfa4e630400048d484ffc6b1abbdea05)进行资产跨链。支付必须在**60分钟**内完成，否则数据将不会被上传至 Arweave 并且 Arseeding 会将该笔数据清除。

## 发送数据+支付

arseeding-go 同样提供将发送数据+支付整合到一起的便捷方法，以此来满足在 everpay 中已经拥有资产的用户。

```go
everTx, itemId, err := sdk.SendDataAndPay(data, currency, &schema.OptionItem{Tags: tags}) // your account must have enough balance in everpay
```

## 用 API Key 发送原始数据

Arseeding 可以提供 [API Key](../../other/arseeding%20apiKey.md) 供用户直接上传数据而无需进行支付。

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

apiKey := "aabbccddeee..."
data := "<such as a picture>"
contentType := "image/jpeg"
tags := map[string]string{
        "key1": "arseeding test",
        "key2": "a test bundle native data",
    }

res, err := cli.SubmitNativeData(apiKey, data, contentType, tags)
fmt.Println("itemId: %s",res.ItemId)
```

## 获取 bundle 费用

根据你需要上传的数据量，返回费用值。

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

resFee, err := cli.BundleFee(dataSize, currency)
```

返回值：[resFee](type.md#fee)

## 获取用户订单

通过用户的地址查询该地址的所有 Bundle 数据上传订单。

```
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

resOrders, err := cli.GetOrders(addr)

```

返回值：[resOrders](type.md#user_order)

