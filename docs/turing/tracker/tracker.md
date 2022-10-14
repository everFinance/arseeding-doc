# Usage

## Installation

```go
go get github.com/everFinance/turing
```

Turing service offers two storage modes: local storage and cloud storage.

## Running Tracker with local storage

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

## Running Tracker with cloud storage

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

Note:

- `cursor` start to put it in the channel from which data item, setting to 0 by default.
- For other parameter configuration, please refer to configuration instruction in the [rollup section](../rollup/rollup.md).