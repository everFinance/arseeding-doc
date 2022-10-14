# Introduction

The main goal of rollup is to send the data back to the main blockchain. It first caches the incoming data, packages the cached data at regular intervals, and puts the data into the Data instruction of an AR transaction, then sends to the Arweave network for persistent storage.

# Implement

As mentioned earlier, the process of rollup is divided into receiving data and caching it, and packing the data to the chain at regular intervals, which are described in detail below.

## Receiving and Caching

```go
func (rol *Rollup) listenTokenTxToPool() {
	for {
		select {
		case <-rol.stop:
			return
		case tx := <-rol.txChan:
			parentHash := rol.lastAddPoolTokenTxHash
			txHash := types.HashBytes(tx)

			poolTx := &types.Transaction{
				TxData:   tx,
				TxId:     txHash,
				ParentId: parentHash,
			}
			// put tx to all tx bucket
			if err := rol.store.PutTokenTx(poolTx); err != nil {
				panic(err)
			}
			// put tx id to pool bucket
			if err := rol.store.PutPoolTokenTxId(poolTx.TxId); err != nil {
				panic(err)
			}

			// add to pool
			err := rol.txPool.AddTx(poolTx)
			if err != nil {
				log.Error("Add tx to tx pool error", "error", err)
				panic(err)
			} else {
				// update LastAddPoolTokenTxIdKey
				if err := rol.store.UpdateConstant(schema.LastAddPoolTokenTxIdKey, []byte(txHash)); err != nil {
					panic(err)
				}
				rol.lastAddPoolTokenTxHash = txHash
				log.Info("success add one tokenTx to pool", "parentHash", parentHash, "tokenTxHash", txHash)
			}
		}
	}
}
```

Description:

- rollup first listens to external messages via channel and receives data, encapsulating it into a `Transaction` structure.
- The `poolTx` with the data is first stored persistently (to prevent data loss in case of a service crash) and then put into the cache pool.
- `lastAddPoolTokenTxHash` and `ParentId` are used to ensure the consistency of the received data order.

## Storing Data on Blockchain

```go
func (rol *Rollup) sealTxOnChain(timeInterval time.Duration, maxOfRollup int) {
	ticker := time.NewTicker(timeInterval)
	for {
		select {
		case <-rol.stop:
			return
		case <-ticker.C:
			log.Info("seal tx on chain...")
			// load pending txs
			if rol.txPool.PendingTxNum() == 0 {
				log.Debug("tx pool pending cache is null")
				continue
			}
			if maxOfRollup > 0 {
				// peek txs
				txs, index := rol.txPool.PeekPendingTxs(maxOfRollup)
				if len(txs) == 0 || index < 0 {
					continue
				}
				log.Info("peek pool txs", "tx number", index+1)
				// txs on chain process
				data, err := txs.MarshalFromOnChain()

				arId, err := rol.txOnChain(data)

				rol.setWatcherInfo(arId, len(txs))

				// watcher tx
				txStatus := arTxWatcher(rol.arWallet.Client, rol.arSeedingCli, arId)

				rol.setWatcherInfo("", 0)

				// on chain success and modify some status
				// 1. modify db constants 'lastArTxId'
				if err := rol.store.UpdateConstant(schema.LastArTxIdKey, []byte(arId)); err != nil {
					log.Error("modify lastArTxIdKey error", "error", err, "newValue", arId)
					panic(err)
				}
				// 2. modify db  constants 'lastOnChainTokenTxHash'
				if err := rol.store.UpdateConstant(schema.LastOnChainTokenTxHashKey, []byte(txs[len(txs)-1].TxId)); err != nil {
					log.Error("modify lastOnChainTokenTxHashKey error", "error", err, "newValue", txs[len(txs)-1].TxId)
					panic(err)
				}
				// 3. delete poolTxIndex bucket txs index
				if err := rol.store.BatchDelPoolTokenTxId(txs); err != nil {
					// maybe not need panic
					panic(err)
				}
				// 4. change lastTxHash
				rol.setLastArTxId(arId)
				// 5. pop txs from tx pool
				rol.txPool.PopPendingTxs(index + 1)
			}
		}
	}
}
```

Description：

- rollup first pulls a certain number of `poolTx` from the cache pool.
- Serialize `poolTxs` and put it into the data field of the AR transaction for uploading.
- Start a listening service to ensure that the AR transaction is confirmed and packed into the block, thus ensuring that data is on the blockchain.
- Update the associated status.