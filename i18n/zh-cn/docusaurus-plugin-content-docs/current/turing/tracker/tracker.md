# 使用指南

### 安装

```go
go get github.com/everFinance/turing
```

Turing 服务提供了两种存储模式，本地存储和云存储。

### 通过本地存储运行 tracker

```go
func main() {
	tags := []types.Tag{
		{Name: "Owner", Value: "k9sXK8x5lMxxM-PbDZ13tCeZi6rOtlll5a6_rrc2oGM"},
	}
	arOwner := "k9sXK8x5lMxxM-PbDZ13tCeZi6rOtlll5a6_rrc2oGM"
	arNode := "https://arweave.net"
	arseed := ""
	cursor := uint64(0)
	dbCfg := schema.Config{}
	tr := tracker.New(tags, arNode, arseed, arOwner, dbCfg)
	tr.Run(cursor)
	
	// receive subTx from channel
	for {
		comTx := <-tr.SubscribeTx()
		tx := &ts.Tx{}
		err := json.Unmarshal(comTx.Data, tx)
		if err != nil {
			panic(err)
		}
		fmt.Println(tx)
	}
}
```

### 通过云存储运行 Tracker

```go
func main() {
	tags := []types.Tag{
		{Name: "Owner", Value: "uGx-QfBXSwABKxjha-00dI7vvfyqIYblY6Z5L6cyTFM"},
	}
	arOwner := "uGx-QfBXSwABKxjha-00dI7vvfyqIYblY6Z5L6cyTFM"
	arNode := "https://arweave.net"
	arseed := ""
	cursor := uint64(40)
	dbCfg := schema.Config{
		UseS3:     true,
		AccKey:    "",
		SecretKey: "MOPfueG+//",
		BktPrefix: "turing",
		Region:    "ap-northeast-1",
	}
	tr := tracker.New(tags, arNode, arseed, arOwner, dbCfg)
	tr.Run(cursor)

	// receive subTx from channel
	for {
		tx := <-tr.SubscribeTx()
		fmt.Println(tx.CursorId)
	}
}
```

说明：

- `cursor` 是从哪一笔 data item 才开始将它放入 channel，一般设置为 0。
- 其他的参数配置请参考 [rollup 章节](../rollup/rollup.md)中的配置说明。