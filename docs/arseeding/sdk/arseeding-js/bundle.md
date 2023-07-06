# Bundle

### Upload data and pay fees

```jsx
const arseedUrl = '<https://arseed.web3infra.dev>'
const data = Buffer.from('need upload data ...')
const tag = '<chaintype-symbol-id>' // everpay supported all token tag (chainType-symbol-id)
const options = {
    tags: [
        {name: "Content-Type",value:"data type"},
        {name: "aa",value:"aaa"}
    ]
}
 const resp = await instance.sendAndPay(arseedUrl, data, tag, options)

// If you need upload orders by sequence, you can configure the needSeq parameter to true
const resp = await instance.sendAndPay(arseedUrl, data, tag, options, true)

// Example Return
{
  everHash: '0xf88033873d3bfc525d9333ec51b60f3f3dc03f822a9a73f66a10ebbd944b29c6',
  order: {
    itemId: '2bpKpp0dtfFZE82-P0lOmeI5x4m2ynatFzdjBmCWd4k',
    size: 192,
    bundler: 'uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68',
    currency: 'USDC',
    decimals: 6,
    fee: '1141',
    paymentExpiredTime: 1690702235,
    expectedBlock: 1210331,
    tag: 'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  }
}

```

`sendAndPay` will do both upload and payments, make sure your wallet has a sufficient amount of assets on everPay. If you’re using your own Arseeding node with No_Fee mode turned on, please use the "Upload data only" method for upload processing.

`Content-Type` in tags needs to be configured based on the content you upload. For example, if you upload an image in png format, configure it as `image/png`. For details, refer to [Content-Type](../../other/tags.md#content-type).

`tag` consists of `chainType`, `symbol`, `id` via `'-'`. All `tags` for the specified `currency` can be obtained via the [getTokenTagByEver](bundle.md#get-token-tag) method for payment of storage fees.

### Upload data only

```jsx
import { createAndSubmitItem, EthereumSigner, ArweaveSigner } from 'arseeding-js'
import {readFileSync} from "fs"
import path from "path"
import {Config} from "../src/types";

// use ecc signer
const privateKey = '<your ecc private key>'
const signer = new EthereumSigner(privateKey)
// or use rsa signer
const wallet = JSON.parse(
    readFileSync(path.join(__dirname, "<your arweave keyfile>.json")).toString(),
);
const signer = new ArweaveSigner(wallet)

const data = '<need upload data, such as a picture>'
const options = {
    tags: [
        { name: 'key01', value: 'val01' },
        { name: 'Content-Type', value: 'data type' } // you should set the data type tag
    ]
}
const arseedingUrl = '<https://arseed.web3infra.dev>'
const tag = '<chaintype-symbol-id>' // everpay supported all token tag (chainType-symbol-id)
const config: Config =  {
    signer: signer,
    path:"",
    arseedUrl: arseedingUrl,
    tag: tag
}
const order = await createAndSubmitItem( data, ops, config)

// Example Return
{
  itemId: 'VoPNz4JVdWw5hDUfzmYlBWDm9ZLt7otBZ8yJbWTAG1E',
  size: 201,
  bundler: 'uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68',
  currency: 'USDC',
  decimals: 6,
  fee: '1244',
  paymentExpiredTime: 1690970459,
  expectedBlock: 1212405,
  tag: 'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
}
```

`createAndSubmitItem`: will upload data. If you use the Arseeding service provided by web3infra, you need to pay for the response order, otherwise the data will clear after 60 minutes. Once the payment is made, web3infra will 100% guarantee the upload of this data to the Arweave network.

`tag` consists of `chainType`, `symbol`, `id` via `'-'`. All `tags` for the specified `currency` can be obtained via the [getTokenTagByEver](bundle.md#get-token-tag) method for payment of storage fees.

`config`: If you want the order to be sequentially wound you can configure the needSeq parameter in the config to be true, the default is false.

If you turn on No_Fee mode using your own node, no additional payment work is required.

### Pay for order

```jsx
import {
  newEverpayByEcc,
  newEverpayByRSA,
  payOrder
} from 'arseeding-js/cjs/payOrder'

// use ecc wallet
const eccPrivate = '<your ecc private key>'
const pay = newEverpayByEcc(eccPrivate)
// or use rsa wallet
const arJWK = '<your arweave wallet keyFile>'
const arAddress = '<your arweave wallet address>'
const pay = newEverpayByRSA(arJWK, arAddress)

// pay
const everHash = await payOrder(pay, order)
```

`order` is the data structure of the order to be paid returned by [`createAndSubmitItem`](./bundle.md#upload-data-only). If this order is forgotten, it can be found by using the [`getOrders`](. /bundle.md#get-orders) function to find the corresponding order.

`payOrder` will complete a payment for an uploaded order. This feature provides the ability to pay on behalf of a service provider who can store payments for a specified user.

# Submit Data By ApiKey

### Use apiKey to upload raw data directly

```jsx
import { submitByApikey, getTokenTagByEver } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const apikey = '<your arseeding apiKey>'
const tag = '<chaintype-symbol-id>' // everpay supported all token tag (chainType-symbol-id)
const data = Buffer.from('<need upload data, such as a picture>')
const contentType = 'data type'
const tags = { a: 'aa', b: 'bb' }
const res = await submitByApikey(
  arseedingUrl,
  apikey,
  tag,
  data,
  contentType,
  tags
)
// Example Return
{
  itemId: 'tSB2-PS3Qr-POmBgjIoi4wRYhhGq3UZ9uPO8dUf2LhM'
}
```

To request an apiKey, please contact the permadao Team.

# Get Orders

### Get all orders for address

```jsx
import { getOrders } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const address = '<your account address>'
const res = await getOrders(arseedingUrl,itemId)

// Example Return
[
    {
      id: 1121936,
      createdAt: '2023-07-04T10:29:31.313Z',
      updatedAt: '2023-07-04T10:29:31.313Z',
      itemId: 'b9qf5fCDY0dB-nF3ixPqL6pHVPFLiDvNYBm_MOi4yq4',
      signer: '0x26361130d5d6E798E9319114643AF8c868412859',
      bundler: 'uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68',
      signType: 3,
      size: 203,
      currency: 'USDC',
      decimals: 6,
      fee: '1247',
      paymentExpiredTime: 1691058571,
      expectedBlock: 1213090,
      paymentStatus: 'unpaid',
      paymentId: '',
      onChainStatus: 'waiting',
      sort: false,
      kafka: false
    },
    ...
]

```

This interface allows you to get all data upload orders for a certain address. The service provider can subscribe to the upload orders for the user's address and perform the payment service on behalf of the user.

:::danger
The payment order does not contain a `tag` field, the user or service provider can include the tag via [`getTokenTagByEver(currrency)`](. /bundle.md) to include the tag. and pay for its storage via `payOrder`.
:::

# Get Item Meta

### Get item meta by itemId

```jsx
import { getItemMeta } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const itemId = '<itemId>'
const res = await getItemMeta(arseedingUrl,itemId)

// Example Return
{
  signatureType: 3,
  signature: 'AicM-UAHqrZTAtngxLPpe_F8rHiivKYkFCYI784P4Dsg0e2WCfP67vtRLlvzX7bniH6GtH1IgBdhaoE3qdo8DBs',
  owner: 'BAztruEItSG5MwXkcTsOGURHq_3YU52AgPK1uoZGdjsMfqlVhPBASHs6A7AMeHEU3z6bBO-p3mTjCDKp7nl2cPM',
  target: '',
  anchor: '',
  tags: [
    { name: 'Content-Type', value: 'text/plain' },
    { name: 'aa', value: 'aaa' }
  ],
  data: '',
  id: 'ZpX2EUJjvXdQYtDpSEopKeqF8mFJrwjEoBTDHg16QiI',
  tagsBy: 'BBhDb250ZW50LVR5cGUUdGV4dC9wbGFpbgRhYQZhYWEA'
}

```

# Get Bundle Fee

### Query bundle item storage costs

```js
import { getBundleFee } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const size = '<data binary length>'
const currency = '<payment token symbol, such as eth, usdc. >'
const res = await getBundleFee(arseedingUrl, size, currency)

// 返回示例
{
    "currency": "USDC",
    "decimals": 6,
    "finalFee": "3503"
}
```

# Get Token Tag

### Get tag by currency

`tag` consists of `chainType`,`symbol`,`id`, and is a unique identifier for the `token` used to pay the storage fee.

```js
import { getTokenTagByEver } from 'arseeding-js'

const currency = '<payment token symbol, such as eth, usdc. >'
const tokenTags = await getTokenTagByEver(currency) //
[
  'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  // ...
]
```
