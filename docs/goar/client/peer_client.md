# Peer Client

goar implements a set of custom peers clients to efficiently broadcast and obtain data. The methods of peers clients will be introduced below.

# Usage

## Create Goar Client Instance

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

Note：

- `arUrl` ： Arweave gateway or node address, all relevant information of Arweave network can be obtained by calling the interface of gateway or node. In this example, we fill in the public service address web3infra.dev maintained by permadao, because it maintains a set of high availability The peers can get a more efficient experience when acquiring and broadcasting transaction information through peers.
- `cli`： Client instance, you can get various information of Arweave network by calling the method of this instance.
- When we introduce the methods in client next, we have created an instance of cli by default.

## Broadcast Transaction Data

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

Note：

- `confirmNum` The number of nodes that need to be confirmed is set to 20 in this example, which means that the transaction data is considered to be broadcast successfully after 20 Arweave miner nodes confirm the data.
- `peers`  is the list of nodes for data broadcasting. This parameter can be omitted. Goar will automatically obtain the peers list from the gateway passed in when creating the cli instance.

## Get transaction data from Peers

```go
txId := "J5FY1Ovd6JJ49WFHfCf-1wDM1TbaPSdKnGIB_8ePErE"
peers := <peers list or empty>
data, err := cli.GetTxDataFromPeers(txId)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

return：transaction data。

note：This method will poll the peers list and access the peers serially to obtain data. Once the data is obtained from a peer, the method will return immediately.

*Notice*：It is recommended not to pass in the peers list yourself, and try to use the web3infra service as the gateway address of the cli instance. Because it maintains highly available peers and weights the availability of these peers, when calling methods related to peers, data is generally obtained and returned in the first round of polling, thereby improving operational efficiency.

## Get block information from peers

```go
height := 510788
block, err := cli.GetBlockFromPeers(height)
fmt.Println(block.Txs)
```

return：

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

note：Same as getting transaction data, this method will return immediately once data is obtained from a peer.

## Get transaction information from Peers

```go
txId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tx, err := cli.GetTxFromPeers(txId)
if err != nil {
	panic(err)
}
fmt.Println(tx)
```

return：

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

## Get unconfirmed transactions

```go
txId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tx, err := cli.GetUnconfirmedTxFromPeers(txId)
if err != nil {
	panic(err)
}
fmt.Println(tx)
```

return：same as above

note：Unconfirmed transactions are transactions that have not yet been included in the block or are being packaged. When this method obtains a transaction, if the transaction has been packaged, it will also return correctly.