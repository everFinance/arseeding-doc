# Arweave 交易
# 概述

goar 工具包中的 transaction.go 主要包含了对 Arweave 原生交易数据的处理和交易的签名和验证。

Arweave 主要的特性是数据永存，在 Arweave 上数据存储是通过 chunk 的方式实现的，chunk 的数据结构如下：

```go
type GetChunk struct {
	DataRoot string `json:"data_root"`
	DataSize string `json:"data_size"`
	DataPath string `json:"data_path"`
	Offset   string `json:"offset"`
	Chunk    string `json:"chunk"`
}
```

说明：

- `DataRoot` ：整个数据切分成 chunk 后生成的 默克尔树根哈希。
- `DataSize` ：数据的大小，单位是 Byte。
- `DataPath` ：chunk 的默克尔树路径证明。
- `Offset` : 默克尔路径证明时使用。
- `Chunk` : chunk 数据。

在数据上传的过程中，首先会将数据进行 base64url 编码，在将编码后的数据，切分成 chunks，并为每个 chunk 生成默克尔树路径证明，每个 chunk 最大体积为 256KB，切分完成后就将 chunks 逐个上传至 Arweave 进行永存。

**注：**

当数据小于 256 KB 时，采用的方式是将数据直接放在交易的 data 字段中，否则都采用 交易、数据上传解耦的方式。

# 使用

### 生成 chunks

```go
tx := &types.Transaction{}
utils.PrepareChunks(tx, data)
```

说明：

- `tx` 是 Arweave 原生交易，如何构造一笔交易，可以参考 [wallet](https://www.notion.so/3-wallet-05aa0e34ae15426aac429be8a3ee1898) 中的相关方法。
- `PrepareChunks` 会将要上传的数据切分成 chunks，并放入 `tx` 的 `Chunks` 字段，为接下来的 chunk 上传做准备。

### 生成交易的数字摘要

```go
tx := &types.Transaction{}
digest, err := utils.GetSignatureData(tx)
```

说明：

- `digest` 是待签名的数据摘要。对交易的签名本质上就是对这个摘要进行签名。

### 交易签名

```go
tx := &types.Transaction{}
keyfile := "keyfile path"
rsaSigner, err := goar.NewSignerFromPath(keyfile)
if err != nil {
	panic(err)
}
priv := rsaSigner.PrvKey
err = utils.SignTransaction(tx, priv)
```

说明：

- `SignTransaction` 内部会调用 `GetSignatureData` 方法生成交易的数据摘要。
- `priv` 是 RSA 密钥对中的用来签名的私钥，因为 Arweave 的加密体系采用的是 RSA 加密方式。

### 交易验证

```go
err = utils.VerifyTransaction(tx)
```

对交易签名的合法性进行验证。