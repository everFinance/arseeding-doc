

## 同步、广播 arweave 上的交易

```
func TestTaskAPI(t *testing.T) {
  arSeed := "https://arseed.web3infura.io" // arseeding 服务地址
  
  arId := “need process arId…”
  
  cli := sdk.New(arSeed) // new 一个 client
  
  cli.SyncTx(arId) // 同步 AR 交易到 arseeding
  
  cli.GetSyncTask() // 获取 arseeding 中的正在 sync 的 task
  
  cli.KillSyncTask(arId) // 停止同步
  
  cli.BroadcastTxMeta(arId) // 同步 AR 交易的 meta 信息
  
  cli.GetBroadcastMetaTask() // 获取 arseeding 中正在广播交易 meta 信息的任务
  
  cli.KillBroadcastMetaTask(arId) // 停止广播该 arId 对应的 broadcast meta 任务
  
  cli.BroadcastTxData(arId) // 将带数据的交易广播到 arweave 节点
  
  cli.GetBroadcastTask() // 获取 arseeding 中正在广播交易信息的任务
  
  cli.KillBroadcastTask(arId) // 停止广播该 arId 对应的 broadcast 任务
  
}
```

## Bundle

SendDataAndPay 方法
```
func TestSDK_SendDataAndPay_EccSigner(t *testing.T) {
	priKey := "your eth pri key"
	eccSigner, err := goether.NewSigner(priKey)
	if err != nil {
		panic(err)
	}
	payUrl := "https://api.everpay.io"
	seedUrl := "https://arseed.web3infura.io"
	s, err := sdk.NewSDK(seedUrl, payUrl, eccSigner) // new 一个 sdk
	if err != nil {
		panic(err)
	}
	data := []byte("some data")
	tags := []types.Tag{
		{"Content-Type", "text"},
	}

    // send and pay
	tx, itemId, err := s.SendDataAndPay(data, "usdt", &schema.OptionItem{Tags: tags}) // your account must have enough balance in everpay
	t.Log("itemId:", itemId)
}

```
通过SendDataAndPay方法，可以将你需要上传的数据一键打包成bundle上传至arseeding服务并完成支付。

