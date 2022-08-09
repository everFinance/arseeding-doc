关于 Sync 和 Broadcast 任务的详情，请参考 [API 文档](../../api/0.intro.md) 。

## 同步 AR 交易

Arseeding 作为一个轻节点可以同步指定的 AR 交易及其数据。

```go
arseedUrl := "<https://arseed.web3infura.io>"
cli := sdk.New(arseedUrl)

err := cli.Sync(arId)
```

## 广播 AR 交易

Arseeding 可以将 AR 交易广播至全网所有有效的 Arweave 节点，使得该笔交易及数据尽可能多的存储在不同的节点上。

```go
arseedUrl := "<https://arseed.web3infura.io>"
cli := sdk.New(arseedUrl)

err := cli.BroadcastTxData(arId)
```

## 广播 AR 交易元数据

Arseeding 可以将不带数据的 AR 交易广播至全网所有有效的 Arweave 节点，使得该笔交易尽快的在全网同步。

```go
arseedUrl := "<https://arseed.web3infura.io>"
cli := sdk.New(arseedUrl)

err := cli.BroadcastTxMeta(arId)
```

## 获取同步、广播中的任务

每一个任务需要执行时间，开发者可以通过 SDK 查看任务状态。

```go
arseedUrl := "<https://arseed.web3infura.io>"
cli := sdk.New(arseedUrl)

task := cli.GetBroadcastTask(arId) // 获取广播任务
task = cli.GetSyncTask(arId) // 获取同步任务
```

返回值： [task](./type.md#task)

## 停止同步、广播任务

如果有任务长时间未响应，或者需要停止任务可以使用该接口 Kill 任务。

```go
arseedUrl := "<https://arseed.web3infura.io>"
cli := sdk.New(arseedUrl)

err := cli.KillBroadcastTask(arId)
err = cli.KillSyncTask(arId)
```