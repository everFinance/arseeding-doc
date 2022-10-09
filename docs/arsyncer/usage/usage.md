# Guide

# Install

Prepare the golang development environment, create a new project, and execute at the command line terminal:

```go
go mod tidy
go get github.com/everFinance/arsyncer
```

# Usage

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

Configuration description:

- `filterParams` is a transaction parameter that needs to be filtered, and it is also a key parameter for realizing custom transaction pull. There are mainly the following usages.
    - Pull all transactions, this parameter is empty, which means that transactions are not filtered

    ```go
    filterParams := arsyncer.FilterParams{}
    ```

    - Pull the transaction of the specified sending address

    ```go
    filterParams := arsyncer.FilterParams{
    	OwnerAddress: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE",
    }
    ```

    - Pull the transaction of the specified receiving address

    ```go
    filterParams := arsyncer.FilterParams{
    	Target: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE", // arTx target address
    }
    ```

    - Pull transactions of smartweave (smart contract) type

    ```go
    filterParams := arsyncer.FilterParams{
    	Tags: []types.Tag{
    		{Name: "App-Name", Value: "SmartWeaveAction"}, // smart contract tag
    	},
    }
    ```

    - A combination of the above types

    ```go
    filterParams := arsyncer.FilterParams{
    	OwnerAddress: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE",
    	Tags: []types.Tag{
    		{Name: "App-Name", Value: "SmartWeaveAction"}, // smart contract tag
    	},
    	Target: "cSYOy8-p1QFenktkDBFyRM3cwZSTrQ_J4EsELLho_UE"
    }
    ```

  Note*: `tags` is a custom array of key-value pairs.*

- `startHeight` is the starting block height of the pull transaction.
- `arNode` is the gateway address of the pull transaction, arsyncer first pulls block information from the gateway, because the gateway is more reliable.
- `concurrencyNumber` is the degree of concurrency. Arsyncer uses golang concurrent programming, which can efficiently obtain block information and transactions. The default value is 10.
- `subInfo` is a subscription type, there are three main types:
    - `SubscribeTypeTx` Only return transaction information
    - `SubscribeTypeBlock` Only return block information
    - `SubscribeTypeBlockAndTx` return all information
- `sTx := <-s.SubscribeTxCh()` Listen to the transaction information returned by arsyncer and do further processing.
- `sBlock := <-s.SubscribeBlockCh()` Listen to the block information returned by arsyncer and do further processing.