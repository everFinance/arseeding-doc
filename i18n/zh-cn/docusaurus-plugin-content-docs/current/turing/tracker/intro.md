# 简介

Tracker 的主要功能是将 rollup 的数据进行下载，保证数据集的顺序一致。

# 实现

```go
func (t *Tracker) jobTxsPullFromChain() {
	log.Info("job txs pull running...")
	defer func() {
		log.Info("job txs pull done")
		time.Sleep(5 * time.Second)
		t.isSynced = true
	}()

	// get all unprocessed txs
	lastTxID, err := t.store.GetConstant(schema.LastProcessArTxIdKey)

	ids := reverseIDs(MustFetchTxIdsByNativeMethod(t.qryTags, lastTxID, t.arClient))

	// process txs
	arTxsCounts := 0
	bizTxsCounts := 0

	for _, id := range ids {
		owner, timestamp, height, data := t.mustFetchDataByID(id)

		// 1. process
		// Only execute transactions where the owner and arOwner are the same or where the arOwner is ""
		num := 0
		if t.arOwner == "" || t.arOwner == owner {
			num = t.processTxs(id, owner, timestamp, height, data)
		}

		// 2. update last process ar tx id to store
		if err := t.store.UpdateLastProcessArTxId(id); err != nil {
			log.Error("update last process ar tx id store error", "err", err)
			panic(err)
		}

		log.Info("process txs", "arTxId", id, "number", num) // If num = 0 means the arTx is not part of the transaction on the arOwner chain
		bizTxsCounts += num
		arTxsCounts++
	}

}
```

说明：

- `tracker` 通过定时任务的方式定时从 Arweave 上拉取 Rollup 上传的 AR 交易。
- 获取到 AR 交易后，tracker 按照交易提交的时间顺序逐一提取交易的 data，并将 data 解析成为 RollUp 中 `poolTx` 的形式， `poolTx` 中包含了外部向 rollup 提交的 data item。
- 获取到 dataItem 后，tracker 会将 dataItem 封装成 `SubscribeTransaction` 提交到 channel，订阅该 channel 的其他模块就可以顺序的获取到从链上拉取到并且由 rollup 上传的数据了。