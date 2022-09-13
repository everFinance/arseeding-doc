# 使用指南
# 安装

准备好 golang 开发环境，新建一个项目，在命令行终端执行：

```go
go mod tidy
go get github.com/everFinance/arsyncer
```

# 使用

```go
filterParams := arsyncer.FilterParams{}
startHeight := int64(879220)
arNode := "https://arweave.net"
concurrencyNumber := 10 // runtime concurrency number, default 10
subInfo := SubscribeTypeBlockAndTx
s := arsyncer.New(startHeight, nullFilterParams, arNode, concurrencyNumber, 15, subInfo)

// run
s.Run()

// subscribe tx
for {
		select {
		case sTx := <-s.SubscribeTxCh():
			// process synced txs
			fmt.Println("Tx", sTx[0].ID)
		case sBlock := <-s.SubscribeBlockCh():
			fmt.Println("Block", sBlock.Height, sBlock.IndepHash)
		}
	}
}
```

参数配置说明：

- `filterParams` 是需要过滤的交易参数，也是实现自定义交易拉取的关键参数。主要有以下几种用法。
    - 拉取全部交易，该参数为空，即表示不过滤交易

    ```go
    filterParams := arsyncer.FilterParams{}
    ```

    - 拉取指定发送地址的交易

    ```go
    filterParams := arsyncer.FilterParams{
    	OwnerAddress: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE",
    }
    ```

    - 拉取指定接收地址的交易

    ```go
    filterParams := arsyncer.FilterParams{
    	Target: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE", // arTx target address
    }
    ```

    - 拉取 smartweave（智能合约）类型的交易

    ```go
    filterParams := arsyncer.FilterParams{
    	Tags: []types.Tag{
    		{Name: "App-Name", Value: "SmartWeaveAction"}, // smart contract tag
    	},
    }
    ```

    - 以上几种类型的组合

    ```go
    filterParams := arsyncer.FilterParams{
    	OwnerAddress: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE",
    	Tags: []types.Tag{
    		{Name: "App-Name", Value: "SmartWeaveAction"}, // smart contract tag
    	},
    	Target: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE
    }
    ```

  *注意: `tags` 是由键值对组成的自定义数组。*

- `startHeight` 是拉取交易的起始区块高度。
- `arNode` 是拉取交易的网关地址，arsyncer 首先从网关拉取区块信息，因为网关是更可靠的。
- `concurrencyNumber` 是并发度，arsyncer 采用了 golang 并发编程，能够高效的获取区块信息和交易，默认值为 10。
- `subInfo` 是订阅模式，主要有三种模式：
    - `SubscribeTypeTx` 只返回交易信息
    - `SubscribeTypeBlock` 只返回区块信息
    - `SubscribeTypeBlockAndTx` 返回全部信息
- `sTx := <-s.SubscribeTxCh()` 监听 arsyncer 返回的交易信息并做进一步的处理。
- `sBlock := <-s.SubscribeBlockCh()` 监听 arsyncer 返回的区块信息并做进一步的处理。