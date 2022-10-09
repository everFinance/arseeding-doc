# Goar Wallet

By using goar wallet, you can easily send an AR transfer transaction or data upload type transaction. also support PST Token transfer transactions.

# Usage

## Create AR Wallet Instance

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

note：

- `arNode`：Address of Arweave gateway or  Arweave Node,All the relevant information of Arweave network can be obtained by calling the APIs of the gateway or node. In this example, we fill in the gateway address officially provided by Arweave.
- `path`: wallet key file path, how to create a wallet, please refer to: [Create an AR Wallet](https://web3infra.dev/docs/other/getAR).
- `wallet`: wallet instance.
- When we introduce the methods in wallet instance next, we have created an instance of wallet by default.

## Send Transfer Transaction

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

return：

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

note：

- `tags`: A custom label that can be filled with some information relate to your project or application.
- `arAmount`: transfer amount, the unit is AR. The transfer amount in this example is 0.02 AR.
- `winstonAmount`: Transfer amount, the unit is winston. In this example, the transfer amount is 20000000000 winston (equivalent to 0.02 AR).
- `target`: The recipient address of the transfer.
- `speedFactor`: acceleration factor. In this example, the value is 20, which means that we will pay 20% more miner fees to speed up transaction confirmation and packaging. This parameter can be set when calling the speedUp suffix method.
- After the method is successfully called, the transaction information will be returned, which contains the transaction payment address, transaction amount, signature and other information.

## Upload Data

As a blockchain for data perpetuity, Arweave allows users to store data on it permanent at a very low cost. The way to store data on Arweave is to send an AR transaction, and then put the data to be uploaded into the data field of the AR transaction after formatting. The following code describes how to use goar wallet to conveniently upload data to Arweave.

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

return：Same as transfer transaction.

note：

- `tags` , `speedFactor` Same as the transfer transaction.
- `data` is the data that needs to be uploaded. You can read the data through golang's file IO, and then call the SendData method to upload the data to Arweave for permanent storage.

## Send PST Transfer Transaction

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

return：Same as transfer transaction.

note：

- `tags`: Custom tags, but the Name field of these tags cannot contain the values of `App-Name` , `App-Version`, `Contract`, `Input`, because they are used to identify PST transactions, goar wallet will automatically assemble these Tags, try to use Overriding these Tags by the defined Tags will cause the PST transaction to fail.
- `contractId` The contract address of the token, which uniquely identifies a PST token.
- `qty` The transfer amount, an integer.

## Send Transaction of Bundle type

```go
tags := []types.Tag{
	{Name: "Project", Value: "everPay"},
}
data := <bundle binary data>
speedFactor := 50
arTx, err := wallet.SendBundleTxSpeedUp(data, tags, speedFactor)
```

note：

- `data` The field needs to pass in a byte stream of a bundle binary. To generate a bundle binary, you need to generate a bundle item, then package the bundle item to generate a bundle binary, and finally upload the bundle binary as AR transaction data to Arweave.

## Send Transaction

There is a `SendTransaction` method in goar wallet. The three types of transactions mentioned above (transfer, data upload, PST transaction) will eventually call this method. The following is an introduction to this method, which is also for readers who are interested in technology. users can  get a deep understanding of goar.

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

note：

- `GetTransactionAnchor` is used to get the latest block hash (usually one of the last 50 block hashes), and the obtained value will be used to assemble the `LastTx` field in the transaction to prevent replay attacks.
- `SignTx`is an important part. In this method, the transaction data is divided into chunks, and these chunks are used as leaf nodes to generate a Merkle tree, and the path proof of the Merkle tree is generated for each chunk. Finally, the root hash (data_root) of the Merkle tree is used as the basis for data that cannot be tampered with, and the data_root and other fields of the transaction are signed once, and the entire data block and signature process is completed. (In Ordinary transfer transaction data_root == 0)
- `CreateUploader` A `dataUploader` will be created, and this uploader will upload the data to Arweave node or gateway (depending on the arNode selected when the wallet is created) by chunks.