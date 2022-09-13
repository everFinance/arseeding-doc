# Arweave Client

## 概述

goar client 实现了所有的 Arweave http 接口调用，开发者可以利用 goar client 方便的调用这些接口，获取到 Arweave 网络的基本信息，交易信息。

## 使用

### 安装

```go
go get github.com/everFinance/goar
```

### 创建 goar client 实例

```go
package main

import (
	"github.com/everFinance/goar"
	"time"
)

func main() {
	arUrl := "https://arweave.net"
	proxyUrl := "http://127.0.0.1:portNum"
	cli := goar.NewClient(arUrl, proxyUrl)
}
```

说明：

- `arUrl` ： Arweave 网关或者节点地址，通过调用网关或节点的接口就能获取到 Arweave 网络的所有相关信息，本例中我们填入的是 Arweave 官方提供的网关地址。
- `proxyUrl`： 为可选参数,可以不传入，在网络情况不佳的时候可以设置该参数。
- `cli`： 创建的 client 实例，通过调用该实例的方法可以获取到 Arweave 网络的各种信息。
- 接下来介绍 client 中的方法时，我们默认已经创建了 cli 这个实例。

### 获取 Arweave 网络信息

```go
info, err := cli.GetInfo()
if err != nil {
	panic(err)
}
fmt.Println(info)
```

返回值：

```json
{
    "network": "arweave.N.1",
    "version": 5,
    "release": 52,
    "height": 1003310,
    "current": "WurQMcQD_f_YPDHi8fP7ClNebdLJTMCqU_50msl1jO47zVblGKfFjL5gazw-Tgu2",
    "blocks": 1003311,
    "peers": 25545,
    "queue_length": 0,
    "node_state_latency": 0
}
```

该方法返回的是 Arweave 网络的基本信息。包括版本号，区块高度，节点数量等。

### 获取全部节点

```go
peers, err := cli.GetPeers()
if err != nil {
	panic(err)
}
fmt.Println(peers)
```

返回值：

```json
[
    "198.54.132.54:55252",
    "223.204.22.110:1984",
    "207.53.233.64:1984",
    "131.239.134.6:1984",
			...............,
    "176.9.24.56:1984",
    "161.35.15.191:1984",
    "157.230.2.154:1984",
    "5.9.18.85:1984",
]
```

该方法将返回当前 Arweave 节点的 `ip:protNum` 。

### 获取交易元数据

```go
arId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tx, err := cli.GetTransactionByID(arId)
if err != nil {
	panic(err)
}
fmt.Println(tx)
```

返回值：

```json
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
    "target": "",
    "quantity": "0",
    "data": "",
    "data_size": "324218",
    "data_tree": [],
    "data_root": "vwuJoWSU5UFmarPmtWNfXk8ccsb92LMfy8bHpSAjXIc",
    "reward": "106343596",
    "signature": "W1FIZlGnAHm3-gfEf7a3fNfI_MORpvqn6VpLn37A-TCGV98p5HlQ8BI7lLBpLkBaO7Pd6ol3k_ZCW36-FPREJtBAGiQsv9CZRDmR6ABKqR1Ib1vJF7qFTNAc3XNWfO03xdVvuQWgi9Vsjtrr0rGv15Fpt4GCiNXwLRhnaeIg6kknNvbpQRkTR_9siGk4WL3ci5dfR-T1Vq6ihAicI2wPtE23mVKMHooAPxRGXPX4X7FIxomFYQ7k5vXaFkO3JTfvuVb2kPq4P-xgtqBbkB_oPYyu0PGQgBngnXggu9E3YxsZsxWrzPcyvzFH1dl1h684EGk6Prberte3c2n0Mez8Ee9YYBPN-oF5FpA0de6YHj1GkO50PpUmSeEYivW5HPNhIAagjrmAez1yQ6FPivKIjrz3FKy9qe-ZhU44RT5kireF585ARDiYInIa5RTbhmf0JV8xA1aICrapjoYSoM5Ghyooa4XhN9I1n6qoaUhOUw3mXxDIHYHf9wPyJdZ-bu43LMXjT4NgWlqX09MdfbhG4eQOvJwEONkqYTWpSegR5ZP06aqELiegZnFeVsGgD6O1QWcoiDYxaIbwdDwoQzxv2ij0Lk8LNOzScQGLQatNam7ncY3Zf2Uvg7m4ps1FSsWJyjU5t4uy7UAj5XCUrjHUaDeoistMi0nqOc-Yk5mpvWQ"
}
```

一笔 Arweave 原生交易如上所示，下面将对交易信息进行说明：

- `format` ：交易格式，目前 Arweave 交易的 format 都是 2。
- `id`：该笔交易的 hash 值。
- `last_tx` ：一个锚点 - 防止重放攻击。一般是最后 50 个区块之一的哈希值，也可以是发送钱包的最后一个传出交易 ID。如果这是来自钱包的第一笔交易，则可以使用空字符串。
- `owner`：RSA 公钥。
- `tags` ：交易的一些自定义标签，例如上例的 tags 为 `{”name”:”ContentType”, “value”:”img/png”}` ，但是展示出来的是经过 base64Url 编码后的值，所以你需要经过解码才能看到真实值。
- `target`：转账地址，如果只是发送数据到 Arweave 上，该值可以为空。
- `quantity`：转账金额，单位是 winston， 1 AR = 10^12 winston。
- `data`：交易数据，获取交易元数据时该字段为空。
- `data_size`：交易数据的 size， 单位是 byte。
- `data_root`：交易数据的默克尔根 hash。
- `reward` :该笔交易的矿工费。
- `signature`：交易签名。

### 获取交易状态

```go
arId ：= "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
status, err := cli.GetTransactionStatus(arId)
if err != nil {
	panic(err)
}
fmt.Println(status)
```

返回值：

```json
{
    "block_height": 1003308,
    "block_indep_hash": "jmvPK-uRUQH93Xx6D4LrAktVEkYCo_3kytFlgo0hMpV0dNWx0AWKzmQ2OlRwLPqc",
    "number_of_confirmations": 40
}
```

该方法将返回交易的区块高度，区块哈希以及确认的节点数量。

### 获取交易 Tags

```go
arId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tags, err := cli.GetTransactionTags(arId)
if err != nil {
	panic(err)
}
fmt.Println(tags)
```

返回值：

```json
[{Content-Type image/png}]
```

前面在获取交易元数据时，我们获取到的交易 Tags 是经过编码的，在此处我们获取到的 Tags 是经过解码的可供阅读的 Tags。

### 获取交易数据

```go
extension := "png"
arId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
data, err := cli.GetTransactionData(arId, extension)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

返回值：交易数据。

说明：

- `extension` 为可选字段，例如 png，txt 等。
- 如果交易数据大于 12M，goar 会通过 chunks 的方式来高效的获取数据。

### 获取交易价格

```go
target := "An AR addr or nil"
txData := "txData"
data, err := cli.GetTransactionPrice([]byte(txData), &target)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

返回值：该笔交易需支付的 AR （单位是 winston），支付的费用的主要用途是永存上传的 data。

说明：

- `txData` 是该笔 AR 交易所携带的数据，可以通过 file IO 来读取数据。
- `target` 是转账地址，如果只是发送数据到 Arweave 该值为 nil。

### 获取 tx_anchor

```go
anthor, err := cli.GetTransactionAnchor()
if err != nil {
	panic(err)
}
fmt.Println(anthor)
```

返回值：

```go
nE7kAIYYzIZ_4_xbxidX_WmzntSuGsnc-MMmf6tmeYVdT0b-i5X5pVGB95MIg3bw
```

说明：

- `tx_anchor` 主要用来构造交易时填充 `last_tx` 字段，该值一般为最近 50 个区块之一的哈希值，可以用来判断 AR 交易是否过期，用于防止重放攻击。

### 提交 AR 交易

```go
tx := <AR Tx>
body, statusCode, err := cli.SubmitTransaction(tx)
```

说明：

该方法主要是供其他模块（该模块会组装 AR 交易）调用，一般不会直接 New 一个客户端实例来调用此方法。

### 提交 Chunk

```go
chunk := <AR data chunk>
body, statusCode, err := tt.Client.SubmitChunks(chunk) // always body is errMsg
```

说明：

同提交 AR 交易一样，该方法也是由其他模块（该模块会将 data 分成一个个 chunk）调用。

### 条件查询

```go
qry := `{
    transactions(ids: ["G-1t0Lqysin897HC3IV8xu_Mr884B-Mo5YEnlhUH54k"]) {
        edges {
            node {
                id
				block {
					id
					timestamp
				}
            }
        }
    }
}`
res, err := cli.GraphQL(qry)
if err != nil {
	panic(err)
}
fmt.Println(string(res))
```

返回值：

```json
{
   "transactions":{
      "edges":[
         {
            "node":{
               "block":{
                  "id":"_W3jArV87Kzuf_VXHzgOgtivmtHTt26QD5jbwH9DPuxfa7KvTaWykeup_UKMv1zZ",
                  "timestamp":1600878676
               },
               "id":"G-1t0Lqysin897HC3IV8xu_Mr884B-Mo5YEnlhUH54k"
            }
         }
      ]
   }
}
```

说明：

- `qry` 为查询条件，在本例中，我们查询的是指定 ArIds 对应的区块哈希和时间戳，更多的查询实例可以参考 [graphQL](https://gql-guide.vercel.app/)。

### 获取余额

```go
addr := "NVkSolD-1AJcJ0BMfEASJjIuak3Y6CvDJZ4XOIUbU9g"
bal, err := cli.GetWalletBalance(addr)
if err != nil {
	panic(err)
}
fmt.Println(bal)
```

返回值：229.422694029987

说明：

- `addr` :Arweave 地址。
- `bal` : 账户余额，以 AR 为单位。

### 获取最后一笔交易

```go
addr := "NVkSolD-1AJcJ0BMfEASJjIuak3Y6CvDJZ4XOIUbU9g"
txId, err := cli.GetLastTransactionID(addr)
if err != nil {
	panic(err)
}
fmt.Println(txId)
```

返回值：AR 交易的 id。

说明：获取指定地址的最后一笔 AR 交易 id。

### 通过区块哈希获取区块信息

```go
id := "rEPeabLpDO_2y6tsNVvwHRjJNYYHgVz9oqyLhXM-3QjUzTtePPy1sOIpmnn57OY0"
block, err := cli.GetBlockByID(id)
if err != nil {
	panic(err)
}
fmt.Println(block)
```

### 通过区块高度获取区块信息

```go
height := 510788
block, err := cli.GetBlockByHeight(height)
if err != nil {
	panic(err)
}
fmt.Println(block)
```

返回值：

```go
{
    "nonce": "gyms_ZAPH3conbCKIRm8JuODAtp8NlD3aBaLdCsp--I",
    "previous_block": "u1dfjcN3yH37oRN96CfUvVf7V0w7zoQ233JNgMXS_XWZhXTsibwCprbXcvp5G3io",
    "timestamp": 1597905785,
    "last_retarget": 1597904281,
    "diff": "115792089225334907412622155393890012047568246338521059128782635418398016667648",
    "height": 510788,
    "hash": "_____9BbiDatEnH3djvX0-NhBGA28NEWnjDIWLCkiB8",
    "indep_hash": "rEPeabLpDO_2y6tsNVvwHRjJNYYHgVz9oqyLhXM-3QjUzTtePPy1sOIpmnn57OY0",
    "txs": [
        "-NR_WOHN7feR53D5Sco-U8uQtw_1x5jENmcp0N-EOhk",
							.......................
        "2ZSx2Ast1AmBYKBotKHvdh3BnZq9vLxnwmd9M49UQDI",
		],
		"tx_root": "L-f7g24O5lHA5onKbmFmRbyKZ0R_dXboW7AZmPBo2iI",
    "tx_tree": [],
    "wallet_list": "ZekJxJrqTWIUkAxkYZt_yxS1Yvyp_9p1Y0VMrZlIMFz0dvXamtOaZNgr8ZLkFHN7",
    "reward_addr": "V12aL_AA2IiL3ltx44e4TTVQXuEaSdgy3qswrToFcJc",
    "tags": [],
    "reward_pool": 5119213831149206,
    "weave_size": 1160387834901,
    "block_size": 50468816,
    "cumulative_diff": "469151620099952",
    "hash_list_merkle": "Vrd5HYeH1O3XVCkFqWrBRcZgX8A_ItyUwdpNgrh5PYF-tChDUqXj2rMoh7khJEJg",
    "poa": {
        "option": "1",
        "tx_path": "-JFwjXN41_SRo8PFA6W1p-hk_hpFBRZZDGTT24Z5hg202t7EcuyZV9u02Wsv_82VO6YCCm6iReJO_I51X0m0PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMlStkRI-8YKz8VmNSwYEYMH2YL-Pjney2JX31ACcb6bwrPjIjg2BdHYXe9-FUsLhlA7xVTsA7Qsyux3qWv2amP0LZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAShVGoMskgWgBd-tBILt01zNBb-zRJmG66T6_byUU7vM5LSfvB70FgAtCPFMy7-XkRHIkAX8b-o-HB-iOAE5RFxzBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOhMKikwMvPZvB3Khu29C51mNhl1wcj-ZGMCriJ6Xw3khoX4UsGGdPv5N6lsUAtLofG7Ard5GS1HrSidKG47JucgQdQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAShPSTbG2LFU-qJ57Hl-ADcGPFV1PyR6ePNg5B9L2kYFZ_JgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEoT0g",
        "data_path": "hrxipQs9CNZOuUnxZn3uYHr2oIGUKYhyKny9rDdttmrbpOzVkObe7bpVeAG0U62w1h-ixPFGse9BMz294MTKXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAjS-HxbUwp9VESWe2tOi5CZj1Jg52kS_pJ9PIzGx4Q6IWxcmyQBaIWtZ3X2izltsBIf-oEMoAX3TV6Rd9pWmQiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAeOxWCbG1qLKw41g-KBLEC0g6Xfo58MC88OqHBhpJEvph4kbJT5vSt6nkjRYp2NaHr-xFdW_DgbxW3NuEKiOs8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAS2pyAEkkplSfU4ciSdbMUexYmGoK_kv_CoYKQbdk8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAA",
        "chunk": "PCFET0NUWVBFIGh0bWw-PGh0bWwgbGFuZz0iZW4tVVMiIHByZWZpeD0ib2c6IGh0dHA6Ly9vZ3AubWUvbnMjIiBzdHlsZT0idHJhbnNmb3JtOiBub25lOyI-PGhlYWQ-PG1ldGEgY2hhcnNldD0iVVRGLTgiPjxtZXRhIGh0dHAtZXF1aXY9IlgtVUEtQ29tcGF0aWJsZSIgY29udGVudD0iSUU9......"
		}
}
```

### 获取交易具体字段

```go
field := "data.png"
data, err := cli.GetTransactionField("sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU", field)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

返回值: 该笔交易的数据。

说明：

- `field` 字段可以接受的参数为：id, last_tx, owner, tags, target, quantity, data, data_root, data_size, reward, signature，以及 data.{extension}。