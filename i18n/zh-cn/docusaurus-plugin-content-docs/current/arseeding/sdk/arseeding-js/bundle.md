# Submit

### 上传数据并支付费用

```jsx
const arseedUrl = '<https://arseed.web3infra.dev>'
const data = Buffer.from('need upload data ...')
const tag = '<chaintype-symbol-id>' // everPay 支持的 token tag (chainType-symbol-id)
const options = {
    tags: [
        { name: 'Content-Type', value: 'data type' },
        { name: 'aa', value: 'aaa' }
    ]
}
const resp = await instance.sendAndPay(arseedUrl, data, tag, options)

// 如果需要订单顺序上链可以配置 needSeq 参数为 true
const resp = await instance.sendAndPay(arseedUrl, data, tag, options, true)


// 返回示例
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

`sendAndPay` 会同时完成上传和支付两个动作，请确保你的钱包在 everPay Protocol 上有充足的资产。如果使用自有 Arseeding 节点并打开 No_Fee 模式，请使用“只上传数据”的方式进行上传处理。

`tags` 中的 `Content-Type` 需要基于你上传的内容进行配置，例如 上传的 png 格式的图片，则配置为 `image/png`，详细说明参考 [Content-Type](../../other/tags.md#content-type)。

`tag` 由 `chainType`，`symbol`，`id` 通过 `'-'`组成。可通过 [getTokenTagByEver](bundle.md#get-token-tag) 方法获取指定 `currency` 的所有 `tag`， 用于支付存储费用。

### 只上传数据

```jsx
import { createAndSubmitItem, EthereumSigner, ArweaveSigner } from 'arseeding-js'
import {readFileSync} from "fs"
import path from "path"
import { Config } from "arseeding-js/cjs/types";

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
const tag = '<chaintype-symbol-id>' // everPay 支持的 token tag (chainType-symbol-id)
const config: Config =  {
    signer: signer,
    path:"",
    arseedUrl: arseedingUrl,
    tag: tag
}
const order = await createAndSubmitItem( data, ops, config)

// 返回示例
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

`createAndSubmitItem`: 将进行数据上传。如果使用 web3infra 提供的 Arseeding 服务，需要对 Response 的订单进行支付，否则数据将在 60 分钟后清空。完成费用支付，web3infra 将 100% 保证该数据上传到 Arweave 网络。

`tag` 由 `chainType`，`symbol`，`id` 通过 `'-'`组成。可通过 [getTokenTagByEver](bundle.md#get-token-tag) 方法获取指定 `currency` 的所有 `tag`， 用于支付存储费用。

`config`: 如果需订单进行顺序上链可以配置 config 中的 needSeq 参数为 true，默认情况下为 false。

如果使用自有节点打开 No_Fee 模式，无需再进行额外的支付工作。

### 为 order 支付费用

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

`order`: 为 [`createAndSubmitItem`](./bundle.md#只上传数据) 返回的待支付订单数据结构。若该 order 遗忘，可通过[`getOrders`](./bundle.md#get-orders) 函数找到对应 order。

`payOrder`: 完成一笔上传订单的支付。该功能提供了代付的能力，服务商可以为指定的用户进行存储付费。

# Submit Data By ApiKey

### 通过 apiKey 的方式可以直接提交原始数据

```jsx
import { submitByApikey } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const apikey = '<your arseeding apiKey>'
const tag = '<chaintype-symbol-id>' // everPay 支持的 token tag (chainType-symbol-id)
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
// 返回示例
{
  itemId: 'tSB2-PS3Qr-POmBgjIoi4wRYhhGq3UZ9uPO8dUf2LhM'
}
```

如何申请 apiKey 请联系 permadao Team。

# Get Orders

### 获取 address 所有的 order

```jsx
import { getOrders } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const address = '<your account address>'
const res = await getOrders(arseedingUrl, address)

// 返回示例
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

通过该接口可以获得某个地址所有的数据上传待支付订单。服务商可以订阅用户地址的上传订单，为用户进行代付服务。

:::danger 警告
该支付订单中未包含 `tag` 字段，用户或服务商可通过 [`getTokenTagByEver(currrency)`](./bundle.md) 获取 tag 并将其包含在内, 即可通过 `payOrder` 为其支付存储费用。
:::

# Get Item Meta

### 通过 itemId 获取 item meta

```js
import { getItemMeta } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infra.dev>'
const itemId = '<itemId>'
const res = await getItemMeta(arseedingUrl, itemId)

// 返回示例
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

### 查询 bundle item 存储费用

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

### 通过 currency 获取 tag

`tag` 由 `chainType`,`currency`,`id`, 组成，是支付存储费用时所用 `token`的唯一标识。

```js
import { getTokenTagByEver } from 'arseeding-js'

const currency = '<payment token symbol, such as eth, usdc. >'
const tokenTags = await getTokenTagByEver(currency) //
[
  'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  // ...
]
```
