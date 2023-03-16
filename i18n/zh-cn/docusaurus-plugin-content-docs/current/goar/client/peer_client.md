# Peer Client

## 概述

goar 实现了一组自定义的 peers client，用来高效的进行数据的广播和获取，下面将对 peers client 的方法进行介绍。

## 使用

### 创建 goar client 实例

```go
package main

import (
	"github.com/everFinance/goar"
	"time"
)

func main() {
	arUrl := "https://arseed.web3infra.dev"
	cli := goar.NewClient(arUrl)
}
```

说明：

- `arUrl` ： Arweave 网关或者节点地址，通过调用网关或节点的接口就能获取到 Arweave 网络的所有相关信息，本例中我们填入的是 permadao 维护的公共服务地址 web3infra.dev,因为其维护了一组高可用的 peers，在通过 peers 获取和广播交易信息时，可以获得更高效的体验。
- `设置代理`： 在网络情况不佳的时候可以设置 `NewClient` 第二个参数。
- `cli`： 创建的 client 实例，通过调用该实例的方法可以获取到 Arweave 网络的各种信息。
- 接下来介绍 client 中的方法时，我们默认已经创建了 cli 这个实例。

### 广播交易数据

```go
txId := "J5FY1Ovd6JJ49WFHfCf-1wDM1TbaPSdKnGIB_8ePErE"
data, err := cli.GetTransactionData(txId, "json")
if err != nil {
	panic(err)
}
confirmNum := int64(20)
peers := <peers list or empty>
err = cli.BroadcastData(txId, data, confirmNum,peers)
if err != nil {
	fmt.Println(err)
}
fmt.Println("success")
```

说明：

- `confirmNum` 为需要确认的节点数量，本例中设置为 20，意味着有 20 个Arweave 矿工节点确认这笔数据后就视为该笔交易数据广播成功。
- `peers` 是进行数据广播的节点列表，可以不传入此参数，goar 会自动从创建 cli 实例时传入的网关去获取 peers 列表。

### 从 Peers 获取交易数据

```go
txId := "J5FY1Ovd6JJ49WFHfCf-1wDM1TbaPSdKnGIB_8ePErE"
peers := <peers list or empty>
data, err := cli.GetTxDataFromPeers(txId)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

返回：交易数据。

说明：该方法将会轮询 peers 列表，串行的对 peer 进行访问来数据获取，一旦从某一个 peer 获取到了数据，该方法会立即返回。

*注意*：这里建议不要自己传入 peers 列表，尽量使用 web3infra 服务来作为 cli 实例的网关地址。因为它维护了高可用的 peers 并对这些 peers 的可用性进行了权重排序，因此在调用 peers 相关的方法时，一般会在轮询的第一轮就获取数据并返回，从而提升了运行效率。

### 从 Peers 获取区块信息

```go
height := 510788
block, err := cli.GetBlockFromPeers(height)
fmt.Println(block.Txs)
```

返回值：

```json
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

说明：与获取交易数据相同，一旦从某一个 peer 获取到了数据，该方法会立即返回。

### 从 Peers 获取交易信息

```go
txId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tx, err := cli.GetTxFromPeers(txId)
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

### 获取未确认的交易

```go
txId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tx, err := cli.GetUnconfirmedTxFromPeers(txId)
if err != nil {
	panic(err)
}
fmt.Println(tx)
```

返回值：同上。

说明：未确认的交易是指还未打包进区块或者正在打包的交易。该方法获取交易的时候，如果该笔交易已经打包，那么也是会正确返回的。