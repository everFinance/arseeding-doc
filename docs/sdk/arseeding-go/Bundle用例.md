## 发送数据
使用 arseeding-go 可以很方便的发送任何数据到 Arseeding 上面。
```
data := []byte("some data")
tags := []types.Tag{
    {"Content-Type", "application/text"},
    {"aa", "aaa"},
}
currency := "USDC" // everpay supported all tokens, like 'AR','ETH','USDT' and so on
order, err := sdk.SendData(data, currency, &schema.OptionItem{Tags: tags})
```
note: 这一步操作是将数据发送至 Arseeding 进行暂存并返回给用户一个待支付的订单，订单支付完成后 Arseeding 会将数据上链，（之后你可以通过 Arseeding 或 Arweave 网关进行数据查询）。若订单1小时内未支付则订单过期，数据删除。

返回值： [order](./类型.md#RespOrder)

## 支付订单
通过 arseeding-go 支付上传数据所需的费用后， Arseeding 可以 100% 保证将数据上传至 Arweave 进行永存。

```
everTx, err := sdk.PayOrder(order)
```
返回值: [everTx](./类型.md#EverTx)

note：若用户在 everpay 上面还没有资产，可以参考[这里](../../other/2.获取AR钱包.md#获取AR)进行资产跨链

## 发送数据+支付

arseeding-go 同样提供将发送数据+支付整合到一起的便捷方法，以此来满足在 everpay 中已经拥有资产的用户。
```
everTx, itemId, err := sdk.SendDataAndPay(data, currency, &schema.OptionItem{Tags: tags}) // your account must have enough balance in everpay
```
## 用 API Key 发送原始数据
Arseeding 可以提供 API Key 供用户直接上传数据而无需进行支付。
```go
arseedUrl := "https://arseed.web3infura.io"
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

根据你需要上传的数据量，返回费用值
```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

resFee, err := cli.BundleFee(dataSize, currency)
```
返回值：[resFee](./类型.md#RespFee)

## 获取用户订单
通过用户的地址查询该地址的所有订单。

```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

resOrders, err := cli.GetOrders(addr)
```

返回值：[resOrders](./类型.md#Order)


