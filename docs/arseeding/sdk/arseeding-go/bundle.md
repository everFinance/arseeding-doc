# Bundle
If you don't know how to generate Arseeding golang please see the previous section: [golang SDK Overview](1.intro.md).

Using Arseeding-go can help developers to quickly send files to Arseeding nodes.

## Sending data

```go
data := []byte("some data")
tags := []types.Tag{
    {"Content-Type", "application/text"},
    {"aa", "aaa"},
}
currency := "USDC" // everpay supported all tokens, like 'AR','ETH','USDT' and so on
order, err := sdk.SendData(data, currency, &schema.OptionItem{Tags: tags})
```

Return value: [order](type.md#order)

`data` is the data to be uploaded, usually binary data. You can read the file via io and complete the upload.

`tags` is a key-value index supported by Arweave, you can set the file type, set the file name and even the version number in `tags`. About Arweave Tag: TODO.

`currency` selects the currency you need to pay for the file storage, the value can be an empty string if you use the No_Fee mode node for personal deployments.

Note: This step sends the data to Arseeding for staging and returns a pending order to the user, which will be uploaded by Arseeding once the order is paid (you can then query the data via the Arseeding or Arweave gateways). **If the order is not paid within 1 hour, the order expires and the data is deleted.**

## Paying order

By paying the required fees for uploading data through arseeding-go, Arseeding can 100% guarantee the data will be uploaded to Arweave for permanent storage.

```go
everTx, err := sdk.PayOrder(order)
```

Return value: [everTx](type.md#ever_tx)

Note: If the user does not have assets on everpay yet, you can refer to [here](../../other/2.getAR.md#everpay) in order to cross-chain assets. The payment must be completed within **60 minutes**, otherwise the data will not be uploaded to Arweave and Arseeding will clear the data.

## Sending data + Paying order

arseeding-go also offers a convenient way to integrate sending data + payments to satisfy users who already have assets in everpay.

```go
everTx, itemId, err := sdk.SendDataAndPay(data, currency, &schema.OptionItem{Tags: tags}) // your account must have enough balance in everpay
```

## Send raw data with API Key

Arseeding can provide [API Keys](../../other/arseeding%20apiKey.md) for users to upload data directly without having to make payments.

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

apiKey := "aabbccddeee..."
data := "<such as a picture>"
contentType := "image/jpeg"
tags := map[string]string{
        "key1": "arseeding test",
        "key2": "a test bundle native data",
    }

res, err := cli.SubmitNativeData(apiKey, data, contentType, tags)
fmt.Println("itemId: %s",res.ItemId)
```

## Get bundle costs

Returns the cost value based on the amount of data you need to upload.

```go
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

resFee, err := cli.BundleFee(dataSize, currency)
```

Return: [resFee](type.md#fee)

## Get user orders

Look up all Bundle data upload orders for a user by their address for that address.

```
arseedUrl := "<https://arseed.web3infra.dev>"
cli := sdk.New(arseedUrl)

resOrders, err := cli.GetOrders(addr)

```

Return: [resOrders](type.md#user_order)