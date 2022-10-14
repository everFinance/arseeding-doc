# Usage

## Install

```go
go get github.com/everFinance/turing
```

Turing service offers two storage models, local storage and cloud storage.

## Run with Local Storage

```go
func main() {
	tags := []types.Tag{
		{Name: "App", Value: "turing-test"},
		{Name: "Owner", Value: "k9sXK8x5lMxxM-PbDZ13tCeZi6rOtlll5a6_rrc2oGM"},
	}
	suggestLastArTxId := ""
	arOwner := "k9sXK8x5lMxxM-PbDZ13tCeZi6rOtlll5a6_rrc2oGM"
	arNode := "https://arweave.net"
	arWalletKeyPath := "./k9s.json"
	timeInterval := 2*time.Minute
	maxRollUp := 999
	rol := rollup.New(suggestLastArTxId, arNode, "", arWalletKeyPath, arOwner, tags, schema.Config{})
	rol.Run(timeInterval, maxRollUp)
	feedData(rol.AddTx())
}
```

Description:

- `tags` is the transaction tags used by Rollup when assembling AR transactions, it contains some custom information, the parameter that usually needs to be set is `{Name: "Owner", Value: "Adderss corresponding to your RollUp keyfile"}`
- `suggestLastArTxId` is a parameter that needs to be passed in after a service restart, usually the arId of the penultimate AR transaction uploaded by Rollup. This value is empty when first started.
- `arOwner` is the address of the Rollup.
- `arNode` is the address of the Arweave gateway or node, transactions can be uploaded to Arweave by calling the gateway or node's interface, in this case we fill in the official Arweave gateway address.
- `arWalletKeyPath` The path corresponding to the keyFile of the wallet.
- `timeInterval` The time interval between packet uploads.
- `maxRollUp` The maximum number of data items to be packed at once
- In this case, we use `feedData` to simulate external submission of data to Rollup. Normally, you need to pass the parameter `rol.AddTx()`, the data listening channel of Rollup, to other data generating modules that will submit data to Rollup.

## Run with Cloud Storage

Using cloud storage to build turing services requires only a few simple configurations to be provided.

```go
func main() {
	tags := []types.Tag{
		{Name: "App", Value: "turing-s3-test"},
		{Name: "Owner", Value: "k9sXK8x5lMxxM-PbDZ13tCeZi6rOtlll5a6_rrc2oGM"},
	}
	suggestLastArTxId := ""
	arOwner := "k9sXK8x5lMxxM-PbDZ13tCeZi6rOtlll5a6_rrc2oGM"
	arNode := "https://arweave.net"
	arWalletKeyPath := "./k9s.json"
	cfg := schema.Config{
		UseS3:     true,
		AccKey:    "",
		SecretKey: "MOPfuebKVsSTZK7XGq/",
		BktPrefix: "turing",
		Region:    "ap-northeast-1",
	}
	timeInterval := 2*time.Minute
	maxRollUp := 999
	rol := rollup.New(suggestLastArTxId, arNode, "", arWalletKeyPath, arOwner, tags, schema.Config{})
	rol.Run(timeInterval, maxRollUp)
	feedData(rol.AddTx())
```

Description:

- Cloud storage also requires some of the same necessary parameters as local storage, and these parameters are configured as described previously.
- A `UseS3` setting of `true` indicates the use of S3 cloud storage. If both `UseS3 & Use4EVER` are set, then the cloud storage service provided by 4everland is used.
- `AccKey` S3 or 4everland API Access Key, [How do I get the Key?](https://web3infra.dev/docs/arseeding/other/S3API%20Key)
- `SecretKey` S3 or 4everland API Secret Key
- `BktPrefix` S3 or 4everland buckets cannot have the same name in the same region (e.g. APAC), you need to check which regions you can create buckets in and, when starting the Turing service, you need to provide an appropriate bucket prefix to ensure that the bucket you create does not have the same name as other S3 users' buckets.
- `Region` configures which region your S3 bucket is located in, and you can see which regions you can create buckets in at AWS S3 (e.g ap-northeast-1)