# 简介

rollup 主要功能是将数据上链，它首先将接收到的数据缓存起来，定时将缓存的数据打包，并组装成为 AR 交易的数据部分发送到 Arweave 网络进行永存。

# 实现

如前所述，rollup 的工作分为接收数据并缓存，定时将数据打包上链，下面对这两个部分进行详细描述。

## 接收数据并缓存

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

说明：

- rollup 首先通过 channel 监听外部信息并接收数据，将数据封装为 `Transaction` 结构。
- 将带有数据的 `poolTx` 先进行持久化存储（防止服务崩溃数据丢失），再将其放入缓存池中。
- `lastAddPoolTokenTxHash` 和 `ParentId` 是用来保证接收到的数据顺序的一致性。

## 数据上链

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

说明：

- rollup 首先从缓存池中拉取一定数量的 `poolTx`
- 将 `poolTxs` 进行序列化，并将其放入 AR 交易的 data 字段进行上链
- 启动一个监听服务，来确保 AR 交易被确认打包进入区块，从而确保数据 100% 上链
- 更新相关的状态