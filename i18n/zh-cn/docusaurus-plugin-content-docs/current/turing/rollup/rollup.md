# 使用指南

## 安装

```go
go get github.com/everFinance/turing
```

Turing 服务提供了两种存储模式，本地存储和云存储。

## 通过本地存储运行 rollup

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

说明：

- `tags` 是 rollup 组装 AR 交易时用到的 交易 tags，里面包含了一些自定义的信息，通常需要设置的参数是 `{Name: "Owner", Value: "Adderss corresponding to your RollUp keyfile"}`
- `suggestLastArTxId` 是服务重启后需要传入的参数，通常是 RollUp 上传倒数第二笔 AR 交易的 arId。初次启动该值为空。
- `arOwner` 是 rollup 的地址。
- `arNode` 是 Arweave 网关或者节点地址，通过调用网关或节点的接口就能将交易上传至 Arweave，本例中我们填入的是 Arweave 官方提供的网关地址。
- `arWalletKeyPath` 钱包的 keyFile 对应的路径。
- `timeInterval` 打包上传数据的间隔时间。
- `maxRollUp` 一次打包的 data item 的最大个数
- 在本例中，我们使用 `feedData` 来模拟外部提交数据给 RollUp，通常情况下，你需要将 rollup 的数据监听 channel `rol.AddTx()` 这个参数传递给其他数据生成的模块，由其他模块来向 rollUp 提交数据。

## 通过云存储运行 rollup

使用云存储来搭建 turing 服务，只需要提供一些简单的配置即可。

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

说明：

- 云存储也需要提供一些和本地存储相同的必要的参数，这些参数配置说明如前所述。
- `UseS3` 设置为 `true` 则表明使用 S3 云存储。如果同时设置 `UseS3 & Use4EVER` 则表明使用 4everland 提供的云存储服务。
- `AccKey` S3 或 4everland API Access Key，[如何获取 Key ？](https://web3infra.dev/zh-cn/docs/arseeding/other/S3API%20Key)
- `SecretKey` S3 或 4everland API Secret Key
- `BktPrefix` S3 或 4everland 的 bucket 在同一个大区（例如 亚太地区）名字是不能相同的，你需要查看可以在哪些大区创建 bucket，并且，在启动 Turing 服务时，你需要提供一个合适的 bucket 前缀，以此来确保你创建的 bucket 不会和其他 S3 用户的 bucket 重名。
- `Region` 配置你的 S3 bucket 位于哪个区域，你可以在 AWS S3 处查看可以在哪些区域创建 bucket （e.g ap-northeast-1）