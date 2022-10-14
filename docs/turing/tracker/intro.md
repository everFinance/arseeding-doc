# Introduction

The purpose of Tracker is to download the data from rollup to ensure the consistency of data sets’ order.

# Implementation

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

Note:

- `tracker` pull AR transactions uploaded by rollup from Arweave in the form of a scheduled task.
- After obtaining AR transactions, tracker extracts the data of the transactions one by one in the submission order of the transaction, and parses the data into the form of the `pooltx` in rollup, which contains the data items externally submitted to rollup.
- After obtaining the dataItem, tracker will encapsulate the dataItem as a `SubscribeTransaction` and then submit it to the channel. Other modules that subscribe to the channel can sequentially access the data drawn from the chain and uploaded by rollup.