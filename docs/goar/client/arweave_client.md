# Arweave Client

The goar client implements all Arweave HTTP API . Developers can use the goar client to call these APIs to obtain the basic information of Arweave network and Arweave transaction information conveniently.

# Usage

## Install

```go
go get github.com/everFinance/goar
```

## Create Goar Client

```go
package main

import (
	"github.com/everFinance/goar"
	"time"
)

func main() {
	arUrl := "https://arweave.net"
	cli := goar.NewClient(arUrl)
}
```

Note：

- `arUrl` : Address of Arweave gateway or  Arweave Node, All the relevant information of Arweave network can be obtained by calling the APIs of the gateway or node. In this example, we fill in the gateway address officially provided by Arweave.
- `cli`： Client instance, you can get various information of Arweave network by calling the method of this instance.
- When we introduce the methods in client next, we have created an instance of cli by default.

## Get Arweave Network Information

```go
info, err := cli.GetInfo()
if err != nil {
	panic(err)
}
fmt.Println(info)
```

return：

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

This method returns the basic information of Arweave network. Including version, block height, number of nodes, etc.

## Get All Peers

```go
peers, err := cli.GetPeers()
if err != nil {
	panic(err)
}
fmt.Println(peers)
```

return：

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

This method will return the current Arweave nodes info,present in  `ip:protNum` form.

## Get Meta Info of Transaction

```go
arId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tx, err := cli.GetTransactionByID(arId)
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

An ordinary Arweave native transaction is shown above, and the transaction information is explained below:

- `format` ：Transaction format, the current Arweave transaction format always set to 2.
- `id`：The hash of this transaction.
- `last_tx` ：An anchor,used to prevents replay attacks. Typically the hash of one of the last 50 blocks, or the last outgoing transaction ID of the sending wallet. An empty string can be used if this is the first transaction from the wallet.
- `owner`：RSA public key.
- `tags` ：Custom tags of the transaction. for example, the tags above are {"name":"ContentType", "value":"img/png"}, but the value you can see above is the base64Url encoded value, so you need to decode it to see the true value.
- `target`：The transfer address, if you just send data to Arweave, the value can be empty.
- `quantity`：Transfer amount, the unit is winston, 1 AR = 10^12 winston.
- `data`：Transaction data, this field is empty when obtaining transaction metadata.
- `data_size`：The size of the transaction data, in bytes.
- `data_root`：Merkle root hash of transaction data.
- `reward` : The miner fee for this transaction.
- `signature`： Signature of transaction.

## Get Transaction Status

```go
arId ：= "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
status, err := cli.GetTransactionStatus(arId)
if err != nil {
	panic(err)
}
fmt.Println(status)
```

return：

```json
{
    "block_height": 1003308,
    "block_indep_hash": "jmvPK-uRUQH93Xx6D4LrAktVEkYCo_3kytFlgo0hMpV0dNWx0AWKzmQ2OlRwLPqc",
    "number_of_confirmations": 40
}
```

This method will return the block height of the transaction, the block hash, and the number of nodes confirmed.

## Get Transaction Tags

```go
arId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
tags, err := cli.GetTransactionTags(arId)
if err != nil {
	panic(err)
}
fmt.Println(tags)
```

return：

```json
[{Content-Type image/png}]
```

When obtaining transaction metadata above, the transaction Tags we obtained were encoded, and the Tags we obtained here are decoded and readable Tags.

## Get Transaction Data

```go
extension := "png"
arId := "sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU"
data, err := cli.GetTransactionData(arId, extension)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

return: data of the transaction.

note：

- `extension` is optional,e.g.  png,txt.
- If the transaction data is larger than 12M, goar will efficiently obtain the data through chunks.

## Get Transaction Fee

```go
target := "An AR addr or nil"
txData := "txData"
data, err := cli.GetTransactionPrice([]byte(txData), &target)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

return: AR (unit is winston) to be paid for this transaction, the main purpose of the payment is to upload data to arweave and store it permanent.

note：

- `txData`  is the data carried by the transaction, which can be read through file IO.
- `target` Is the transfer address, the value is nil if only send data to Arweave.

## Get Tx_anchor

```go
anthor, err := cli.GetTransactionAnchor()
if err != nil {
	panic(err)
}
fmt.Println(anthor)
```

return：

```go
nE7kAIYYzIZ_4_xbxidX_WmzntSuGsnc-MMmf6tmeYVdT0b-i5X5pVGB95MIg3bw
```

note：

- `tx_anchor` is mainly used to fill in the `last_tx` field when constructing a transaction. This value is generally the hash value of one of the last 50 blocks. It can be used to determine whether the AR transaction has expired to prevent replay attacks.

## Submit AR Transaction

```go
tx := <AR Tx>
body, statusCode, err := cli.SubmitTransaction(tx)
```

note：

This method is mainly used by other modules (the module will assemble the AR transaction) to call this method. Generally, it is not necessary to directly New a client instance to call this method.

## Submit Chunk

```go
chunk := <AR data chunk>
body, statusCode, err := tt.Client.SubmitChunks(chunk) // always body is errMsg
```

note：

Like submitting an AR transaction, this method is also called by other modules (which divide the data into chunks).

## Conditional Query

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

return：

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

note：

- `qry` is query conditions, in this example, we query the block hash and timestamp corresponding to the specified arId. For more query examples, please refer to [graphQL](https://gql-guide.vercel.app/).

## Get Account Balance

```go
addr := "NVkSolD-1AJcJ0BMfEASJjIuak3Y6CvDJZ4XOIUbU9g"
bal, err := cli.GetWalletBalance(addr)
if err != nil {
	panic(err)
}
fmt.Println(bal)
```

return：229.422694029987

note：

- `addr` :Arweave address.
- `bal` : account balance,unit is AR.

## Get The Last Transaction

```go
addr := "NVkSolD-1AJcJ0BMfEASJjIuak3Y6CvDJZ4XOIUbU9g"
txId, err := cli.GetLastTransactionID(addr)
if err != nil {
	panic(err)
}
fmt.Println(txId)
```

return：arId.

note：Get the last AR transaction id of the specified address.

## Get Block Information by Block Hash

```go
id := "rEPeabLpDO_2y6tsNVvwHRjJNYYHgVz9oqyLhXM-3QjUzTtePPy1sOIpmnn57OY0"
block, err := cli.GetBlockByID(id)
if err != nil {
	panic(err)
}
fmt.Println(block)
```

## Get Block Information by Block Height

```go
height := 510788
block, err := cli.GetBlockByHeight(height)
if err != nil {
	panic(err)
}
fmt.Println(block)
```

return：

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

## Get Transaction by Specific Fields

```go
field := "data.png"
data, err := cli.GetTransactionField("sUfG7jvu7PBQptlSIxtl6t5zD9LBMxv66_uVAlBk8dU", field)
if err != nil {
	panic(err)
}
fmt.Println(data)
```

return: transaction data.

note：

- `field` The parameters that the field can accept are: `id,last_tx,owner,tags,target,quantity,data,data_root,data_size,reward,signature and data.{extension}` .