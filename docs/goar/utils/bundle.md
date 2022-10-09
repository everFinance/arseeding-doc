Bundle is one of the standards of the Arweave network with the ANS-104 standard, which assembles multiple independent items into Bundle data, puts the Bundle data into the data of an Arweave native transaction, and uploads it to Arweave for storage. Item has many same properties as an Arweave initial transaction in that it has owner, data, label, target, signature and id. The difference is that there is no way to transfer tokens and no reward because the initial transaction pays for uploading data for all bundleItems.

Packing multiple items into one AR transaction provides a number of benefits:

- Allowing the payment of dataItems to be delegated to a 3rd party while maintaining the identity and signature of the person who created the dataItem without requiring them to have a funded wallet.
- Allowing multiple dataItems as a writing group. Useful for some application scenarios such as static web page deployment.
- Increasing throughput of logically independent data writings to the Arweave network.

Goar provides a complete tool chain related to bundles, and developers can use these tools to easily assemble and parse bundle type data.

# Usage

## Assemble and signature

How to quickly assemble and sign a bundleItem, please refer to [item assembly signature](../bundle_singer/signer.md).

## Creating BundleItem

```go
func main() {
	// eccSigner
	privKey := ""
	eccSigner, err := goether.NewSigner(privKey)
	if err != nil {
		panic(err)
	}
	// rsaSigner
	keyfile := "keyfile path"
	rsaSigner, err := goar.NewSignerFromPath(keyfile)
	if err != nil {
		panic(err)
	}
	owner := utils.Base64Encode(eccSigner.GetPublicKey())
	signType := types.EthereumSignType
	if err != nil {
		panic(err)
	}
	tags := []types.Tag{
		{Name: "App-Name", Value: "everPay"},
	}
	target := ""
	anchor := ""
	data,err := ioutil.ReadFile("cat.img")
	if err != nil {
		panic(err)
	}
	item, err := utils.NewBundleItem(owner, signType, target, anchor, data, tags)
	if err != nil {
		panic(err)
	}
	fmt.Println(item)
}
```

Note:

- `eccSigner` is a signer instance created by using the Ethereum private key. This case will provide the information required for the signature of the bundleItem to prove that the ownership of the item belongs to the private key owner corresponding to this signer case.
- `rsaSigner` : Goar also supports creating an Arweave signer case to sign bundleItems. Its function is the same as `eccSigner`, and you can choose one of the two in actual use.
- `signType` : the signature type of the item, in this case the signature type is EthereumSignType.
- `tags` : custom tags.
- `target & anchor` : optional fields, usually empty.
- `data` : The data needs to be packed into item.

## Generating digital digest of item

This step is the preparation for signing the item. Developers who are familiar with blockchain should know that signing a transaction with a private key is actually to sign the digital summary of the transaction information. Different projects have different methods for generating digital digests. There are different rules, but essentially they use irreversible hash functions such as SHA-256. Arweave uses the deepHash method to generate digital summary, and goar also implements the deepHash generation algorithm. For details, please refer to the `DeepHash` method in `BundleItemSignData`.

```go
digest, err := utils.BundleItemSignData(*item)
fmt.Println(digest)
```

## Item Signature

```go
err = goar.SignBundleItem(signType, eccSigner, item)
if err != nil {
	panic(err)
}
```

Note:

- The `SignBundleItem` method will use the above `BundleItemSignData` to generate the digital digest of the item and sign the item.

## Generating ItemBinary

A structured bundleItem is obtained through the previous methods. The structured item needs to be serialized into a byte stream for network transmission.

```go
err := utils.GenerateItemBinary(item)
```

The generated ItemBinary will be put into the ItemBinary field of the item. When transferring the item, it is not necessary to transfer the entire item structure, but only the data of this field needs to be used.

## Parsing ItemBinary

When the item is transmitted over the network, the data receiver receives the itemBinary byte stream, and needs to deserialize the byte stream to obtain the complete structure of the item. Goar provides tools for parsing itemBinary.

```go
binary := <byte arr>
item, err := utils.DecodeBundleItem(binary)
```

## Verifying Bundle Item

After the receiver receives the data and parses it into the item structure, it needs to verify whether the signature of the item is legal, and the integrity of the data.

```go
err := utils.VerifyBundleItem(*item)
```

## Generating Bundle

After receiving a certain number of legal items, these items can be packed into a Bundle.

```go
items := []types.BundleItem{}
bundle, err := utils.NewBundle(items)
```

Note:

- There is a field `BundleBinary` in the `bundle` structure. Like itemBinary, it is also a byte stream sequence, which contains all item information.

After the Bundle is generated, we can send the BundleBinary to the Arweave network as the data of an Arweave initial transaction, and store the BundleBinary data permanently. How to send Arweave data transactions can refer to the related methods in [goar wallet].

## Parsing Bundle

Like parsing itemBinary, bundleBinary, as a serialized byte stream, also needs to be deserialized and parsed.

```go
bundleBinary := <byte arr>
bundle, err := utils.DecodeBundle(bundleBinary)
```

Note:

- The `items` field in the `bundle` structure is an item array that contains all item information.