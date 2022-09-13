# Goar 钱包实例
# 概述

使用 goar wallet 可以非常便捷的发送一笔 AR 转账交易或者数据上传类型的交易。也可以进行 PST Token 的转账交易。

# 使用

### 创建 AR 钱包实例

```go
package main

import (
	"github.com/everFinance/goar"
)

func main() {
	arNode := "https://arweave.net"
	path := <your keyfile path>
	wallet, err := goar.NewWalletFromPath(path, arNode, proxyUrl)
}
```

说明：

- `arNode`： Arweave 网关或者节点地址，通过调用网关或节点的接口就能获取到 Arweave 网络的所有相关信息，本例中我们填入的是 Arweave 官方提供的网关地址。
- `path`: 钱包路径，如何创建钱包，可以参考：[创建 AR 钱包](https://web3infra.dev/zh-cn/docs/other/getAR)。
- `wallet`: 创建的钱包实例。
- 接下来介绍 wallet 中的方法时，我们默认已经创建了 wallet 这个实例。

### 发送转账交易

```go
tags := []types.Tag{
	{Name: "AppName", Value: "everPay"},
}
arAmount := new(big.Float).SetFloat64(0.02)
target := "4JOmaT9fFe2ojFJEls3Zow5UKO2CBOk7lOirbPTtX1o"
speedFactor := int64(20)
tx, err := wallet.SendAR(arAmount, target, tags)
if err != nil {
	panic(err)
}
fmt.Println(tx)
tx, err = wallet.SendARSpeedUp(arAmount, target, tags, speedFactor)
if err != nil {
	panic(err)
}
winstonAmount := new(big.Int).SetInt64(1000000000)
tx, err = wallet.SendWinston(winstonAmount, target, tags)
if err != nil {
	panic(err)
}
tx, err = wallet.SendWinstonSpeedUp(winstonAmount, target,tags, speedFactor)
if err != nil {
	panic(err)
}
fmt.Println(tx)
```

返回值：

```go
{
    "format": 2,
    "id": "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU",
    "last_tx": "qs7DSGzs55TDuu2J3rLjH2zv0CxikbWO8Cv6CopOoNUfskQ3vvwmu2muyBjAx-Gi",
    "owner": "ybuxOeQh6PUQnz1t8h4-sZ1WMLWbq2r8xLaRgAofKimabNKUFW37UpaNXpLu-NCoPutYksFbh46RutWB3mxZaBFRwaWPHHg9qsvqUMrnQjmIAUom_Mkhewp-0o3SXl0PhaIlwLuUzJpQYBe2alZtnDSWLfEp6BP7is5th6KNeEq7_xGEPMSyxP6y6emEiYGAqpcnueM0NdDBcyjUmlmOrU4z-NHL_hBrSWvtD5hcuuaLvZPH9UCocWXyBBZ1gNnGsGEYBFu2bF_R6Ex3g_iY0MmdT0E52MldtkiiUQ9gFSffyUgf_WLyFDKtEkvytP2nqmyPuhouK2vehAcSsWVEdrw4469ccB-iiY4T5ACTRW9xnPGSiefcHjdS7DdnAxxL9PBl0dZPoJDR203Jwvamk7ekdquXBoVCvoxkER1bro7z5MHP9tRxT5VY_oqi9_O1cUGvZQ9gSlUedlsxbDClKhKpsGvJvOA8ecCuZszZLFJKpqkmkcHzJdlqcneVd4Kcnszb2Fw621r61VU8cXyF3mhk_7tRpmJM75wzSissCBq08eBaLeOhzYiNlA0rJFOBNT6uRASbPaPpF7WfvA5gRcHinPEdOdKXeQtS58-Z8TkD_kYYsL2G7-2pjeh1q9gdaCeff0OHwsLstFHTxgtjrZgi5PWk35_4sdEQalzTwYs",
    "tags": [
        {
            "name": "Q29udGVudC1UeXBl",
            "value": "aW1hZ2UvcG5n"
        }
    ],
    "target": "4JOmaT9fFe2ojFJEls3Zow5UKO2CBOk7lOirbPTtX1o",
    "quantity": "20000000000",
    "data": "",
    "data_size": "0",
    "data_tree": [],
    "data_root": "",
    "reward": "106343596",
    "signature": "W1FIZlGnAHm3-gfEf7a3fNfI_MORpvqn6VpLn37A-TCGV98p5HlQ8BI7lLBpLkBaO7Pd6ol3k_ZCW36-FPREJtBAGiQsv9CZRDmR6ABKqR1Ib1vJF7qFTNAc3XNWfO03xdVvuQWgi9Vsjtrr0rGv15Fpt4GCiNXwLRhnaeIg6kknNvbpQRkTR_9siGk4WL3ci5dfR-T1Vq6ihAicI2wPtE23mVKMHooAPxRGXPX4X7FIxomFYQ7k5vXaFkO3JTfvuVb2kPq4P-xgtqBbkB_oPYyu0PGQgBngnXggu9E3YxsZsxWrzPcyvzFH1dl1h684EGk6Prberte3c2n0Mez8Ee9YYBPN-oF5FpA0de6YHj1GkO50PpUmSeEYivW5HPNhIAagjrmAez1yQ6FPivKIjrz3FKy9qe-ZhU44RT5kireF585ARDiYInIa5RTbhmf0JV8xA1aICrapjoYSoM5Ghyooa4XhN9I1n6qoaUhOUw3mXxDIHYHf9wPyJdZ-bu43LMXjT4NgWlqX09MdfbhG4eQOvJwEONkqYTWpSegR5ZP06aqELiegZnFeVsGgD6O1QWcoiDYxaIbwdDwoQzxv2ij0Lk8LNOzScQGLQatNam7ncY3Zf2Uvg7m4ps1FSsWJyjU5t4uy7UAj5XCUrjHUaDeoistMi0nqOc-Yk5mpvWQ"
}
```

说明：

- `tags`: 自定义的标签，可以填入一些项目或应用相关的信息。
- `arAmount`: 转账金额，单位是 AR， 本例中转账金额为 0.02 AR。
- `winstonAmount`: 转账金额，单位是 winston， 本例中转账金额为 20000000000 winston（等价 0.02 AR）
- `target`: 转账的收款地址。
- `speedFactor`: 加速因子。在本例中，该值为 20，意味着我们将多支付 20% 的矿工费来加速交易的确认和打包，在调用 speedUp 后缀的方法时可以设置此参数。
- 在成功调用该方法后，将返回交易信息，里面记录了交易收款地址，交易金额，签名等信息。

### 上传数据

Arweave 作为一条为数据永存而生的区块链，可以以极低的花费让使用者将数据永存在上面。在Arweave 上进行数据存储的方式也是发送一笔 AR 交易，然后将需要上传的数据经过格式化后放入 AR 交易的 data 字段即可。下面介绍如何利用 goar wallet 方便的上传数据至 Arweave。

```go
tags := []types.Tag{
	{Name: "AppName", Value: "everPay"},
}
data, err := ioutil.ReadFile("dataFile")
if err != nil {
	panic(err)
}
speedFactor := int64(20)
tx, err := wallet.SendData(data, tags)
if err != nil {
	panic(err)
}
tx, err = wallet.SendDataSpeedUp(data, tags, speedFactor)
if err != nil {
	panic(err)
}
fmt.Println(tx)
```

返回值：与转账交易相同。

说明：

- `tags` , `speedFactor` 参数的作用同转账交易一样。
- `data` 是需要上传的数据，可以通过 golang 的文件 IO 进行数据读取，然后调用 SendData 方法即可将数据上传至 Arweave 永存。

### 发送 PST 转账交易

```go
tags := []types.Tag{
	{Name: "Project", Value: "everPay"},
}
contractId := "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A"
target := "Ii5wAMlLNz13n26nYY45mcZErwZLjICmYd46GZvn4ck"
qty := big.NewInt(1)
speedFactor := 50
arTx, err := wallet.SendPst(contractId,target,qty,tags,speedFactor)
if err != nil {
	panic(err)
}
fmt.Println(arTx)
```

返回值：与转账交易相同。

说明：

- `tags`: 自定义的标签，但是这些标签的 `Name` 字段不能包含 `App-Name` , `App-Version` , `Contract`, `Input` 这几个值，因为它们是用来标识 PST 交易的，goar wallet 会自动组装这些Tags，尝试用自定义的 Tags 覆盖这些 Tags 会导致 PST 交易失败。
- `contractId` 代币的合约地址，唯一标识一种 PST 代币。
- `qty` 转账金额，整数。

### 发送 Bundle 类型的交易

```go
tags := []types.Tag{
	{Name: "Project", Value: "everPay"},
}
data := <bundle binary data>
speedFactor := 50
arTx, err := wallet.SendBundleTxSpeedUp(data, tags, speedFactor)
```

说明：

- `data` 字段需要传入一个 bundle binary 的字节流。生成 bundle binary 首先需要[生成 bundle item](https://www.notion.so/4-bundle-item-d756bb872c5842ee8020b28384439ee5)，再将 bundle item 打包生成 bundle binary，最后将 bundle binary 作为 AR 交易的数据上传至 Arweave 上。

### 发送交易

goar wallet 中有一个 `SendTransaction` 方法，上面提到的三种类型的交易（转账，数据上传，PST交易）最终都会调用这个方法，下面对该方法进行介绍,也是让对技术感兴趣的读者更深入的理解 goar。

```go
func (w *Wallet) SendTransaction(tx *types.Transaction) (types.Transaction, error) {
	anchor, err := w.Client.GetTransactionAnchor()
	if err != nil {
		return types.Transaction{}, err
	}
	tx.LastTx = anchor
	tx.Owner = w.Owner()
	if err = w.Signer.SignTx(tx); err != nil {
		return types.Transaction{}, err
	}

	uploader, err := CreateUploader(w.Client, tx, nil)
	if err != nil {
		return types.Transaction{}, err
	}
	err = uploader.Once()
	return *tx, err
}
```

说明：

- `GetTransactionAnchor` 是获取最近的区块哈希（通常是最近 50 个区块哈希之一），获取到的值将用来组装交易中的 `LastTx` 字段，防止重放攻击。
- `SignTx` 是相对重要的一环，在这个方法中，会将交易数据切分成 chunks，将这些 chunks 作为叶子结点生成一颗默克尔树，并为每一个 chunk 生成默克尔树的路径证明。最终将默克尔树的根哈希（data_root) 作为数据不可篡改的依据，将 data_root 和交易的其他字段进行一次签名，以上就完成整个数据分块和签名过程。（普通转账交易 data_root == 0）
- `CreateUploader` 会创建一个 dataUploader，这个 uploader 会将数据通过 chunk 的方式上传至 Arweave 节点或者网关（取决于 wallet 创建时选取的 arNode）。