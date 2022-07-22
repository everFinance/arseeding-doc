## 同步 AR 交易
Arseeding 作为一个轻节点可以同步指定的 AR 交易及其数据。
```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

err := cli.Sync(arId)
```
## 广播 AR 交易
Arseeding 可以将 AR 交易广播至所有经过筛选的 arweave 节点，使得该笔交易及数据尽可能多的存储在不同的节点上。
```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

err := cli.BroadcastTxData(arId)
```

## 广播 AR 交易元数据
Arseeding 可以将不带数据的 AR 交易广播至所有经过筛选的 arweave 节点，使得该笔交易尽快的在全网同步。
```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

err := cli.BroadcastTxMeta(arId)
```
## 获取同步、广播中的任务
```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

task := cli.GetBroadcastTask(arId) // 获取广播任务
task = cli.GetSyncTask(arId) // 获取同步任务
```
返回值： [task](./类型.md#Task)

## 停止同步、广播任务
```
arseedUrl := "https://arseed.web3infura.io"
cli := sdk.New(arseedUrl)

err := cli.KillBroadcastTask(arId)
err = cli.KillSyncTask(arId)
```