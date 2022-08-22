# Sync & Broadcast

For more information on Sync and Broadcast tasks, please refer to the [API documentation](../../api/0.intro.md) 。

## Sync AR tx

Arseeding as a light node can synchronize specified AR transactions and their data.

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

err := cli.Sync(arId)
```

## Broadcast AR tx

Arseeding can broadcast AR transactions to all valid Arweave nodes across the network, allowing the transaction and data to be stored on as many different nodes as possible.

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

err := cli.BroadcastTxData(arId)
```

## Broadcast AR tx Metadata

Arseeding can broadcast an AR transaction without data to all valid Arweave nodes across the network so that the transaction is synchronized across the network as soon as possible.

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

err := cli.BroadcastTxMeta(arId)
```

## Get Broadcasting and Syncing Tasks

Each task takes time to execute, and developers can check the status of the task through the SDK.

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

task := cli.GetBroadcastTask(arId) // 获取广播任务
task = cli.GetSyncTask(arId) // 获取同步任务
```

Return value: [task](type.md#task)

## Stop Broadcasting and Syncing Tasks

You can use this interface to kill a task if it has been unresponsive for a while or if you need to stop it.
```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

err := cli.KillBroadcastTask(arId)
err = cli.KillSyncTask(arId)
```