# Signer

Goar’ s bundleItem.go implements the assembly and signature of bundle items, and absolutely supports the assembly of bundle type transactions.

# Usage

## Creating itemSigner

```go
keyFile := "keyFile path"
rsaSigner, err := goar.NewSignerFromPath(keyFile)
if err != nil {
	panic(err)
}
privKey := ""
eccSigner, err := goether.NewSigner(privKey)
if err != nil {
	panic(err)
}
rsaItemSigner, err := goar.NewItemSigner(rsaSigner)
if err != nil {
	panic(err)
}
eccItemSigner, err := goar.NewItemSigner(eccSigner)
if err != nil {
	panic(err)
}
```

Note:

- `keyFile` is the key-pair file corresponding to the Arweave address (or other public chain addresses compatible with the Arweave RSA signature algorithm). How to generate the KeyFile, please refer to: [here](https://web3infra.dev/docs/arseeding/other/getAR).
- `rsaSigner` is the signer instance corresponding to the address of the RSA signature algorithm.
- `rsaItemSigner` is the itemSigner case created by RSA signer.
- `privKey` is the private key corresponding to the Ethereum address (or other public chain address compatible with the Ethereum ECC signature algorithm).
- `eccSigner` is the signer case corresponding to the address of the ECC signature algorithm.
- `eccItemSigner` is the itemSigner case created by ECC signer.

Notice:

- When assembling by using goar’ s bundleItem and signing tool, only one of `eccItemSigner` and `rsaItemSigner` needs to be created. In this example, two itemSigners are created to show the creation process of these two itemSigners, so that readers can have a better understanding and contrast.

## Assembling and Signing BundleItem

```go
tags := []types.Tag{
	{Name: "App-Name", Value: "everPay"},
}
data, err := ioutil.ReadFile("cat.img")
if err != nil {
	panic(err)
}
target := ""
anchor := ""
item, err := eccItemSigner.CreateAndSignItem(data, target, anchor, tags)
if err != nil {
	panic(err)
}
fmt.Println(item)
```

This example uses the `eccItemSigner` created above to assemble and sign the data, resulting in a bundleItem.

Note:

- `tags` is custom, which can be filled with some project-related information, as well as a description of the bundleItem, which can be empty.
- `data` is the data that needs to be assembled into bundleItem. In this example, file I/O is used to read an image as data.
- `target` is optional for bundleItem, usually empty.
- `anchor` is optional for bundleItem, usually empty.
  As a [standard format of Arweave](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md), bundle item can be regarded as a lightweight AR transaction, which is more suitable for application scenarios with small data volume and large quantity.