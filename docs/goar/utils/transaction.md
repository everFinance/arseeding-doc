Transaction.go in the goar toolkit mainly includes the processing of Arweave’ s initial transaction data and the signature and verification of transactions.

The main feature of Arweave is that data is permanent. Data storage on Arweave is implemented by chunk. The data structure of chunks is as follows:

```go
type GetChunk struct {
	DataRoot string `json:"data_root"`
	DataSize string `json:"data_size"`
	DataPath string `json:"data_path"`
	Offset   string `json:"offset"`
	Chunk    string `json:"chunk"`
}
```

Note:

- `DataRoot` : The root of Merkel Hash Tree generates after all data is divided into chunks.
- `DataSize` : The size of the data, with the unit Byte.
- `DataPath` : Merkle Tree route proof for chunk.
- `Offset` : Used for Merkle route proof.
- `Chunk` : Chunk data.

In the process of data uploading, the data will be base64url encoded first, then the encoded data will be divided into chunks, and the Merkle Tree route proof will be generated for each chunk. The maximum size of each chunk is 256KB, and the division is completed and then uploaded one by one to Arweave for storage.

Notice:
When the data is less than 256 KB, the method is to put the data directly in the data field of the transaction, otherwise the transaction and data-uploading decoupling method need to be used.

# Usage

## Generating chunks

```go
tx := &types.Transaction{}
utils.PrepareChunks(tx, data)
```

Note:

- `tx` is the initial transaction of Arweave. You can refer to the related methods in wallet about how to construct a transaction.
- `PrepareChunks` will divide the data to be uploaded into chunks and put them into the `Chunks` field of `tx` to prepare for the next chunk upload.
  Generating a digital summary of transactions
  Illustration:
- `digest` is the summary of the data to be signed. Signing a transaction is essentially signing the summary.

## Transaction Signature

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

Note:

- `SignTransaction` internally uses the `GetSignatureData` method to generate the transaction data summary.
- `priv` is the private key used for signing in the RSA key pair, because Arweave’ s encryption system uses RSA encryption.

## Transaction Verification

```go
err = utils.VerifyTransaction(tx)
```

Verify the validity of the transaction signature.