# Bundle 服务

### Get Bundler

获取 Arseeding Bundle 服务的钱包地址。该钱包用于 ANS-104 数据上传，并使用 everPay 收取上传服务费。

**Request**

- Method: **GET**
- URL: `/bundle/bundler`

**Response**

```json
{
    "bundler": "uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68"
}
```

### Submit Bundle Item

将 Bundle Item 提交到 Arseeding 节点。

**Request**

- Method: **POST**
- URL: `/bundle/tx/:currency`
    - 使用 USDC 支付：`/bundle/tx/USDC`
    - 使用 AR 支付：`/bundle/tx/AR`
- Headers: Content-Type:application/octet-stream
- Body:
  --data-binary 'bundle item data'

**Response**

```bash
{
    itemId:             "tSB2-PS3Qr-POmBgjIoi4wRYhhGq3UZ9uPO8dUf2LhM",
    bundler:            "Fkj5J8CDLC9Jif4CzgtbiXJBnwXLSrp5AaIllleH_yY",
    currency:           "AR",
    decimals:           12,
    fee:                "113123",
    paymentExpiredTime: 122132421,
    expectedBlock:      3144212,
}

```

### Submit Bundle Data By ApiKey

使用 X-API-KEY 提交数据到 Arseeding。

**Request**

- Method: **POST**
- URL: `/bundle/data`
- Header: X-API-KEY: 'your apiKey'
- Body: --data-binary 'data'

**Response**

```bash
{
    itemId: "tSB2-PS3Qr-POmBgjIoi4wRYhhGq3UZ9uPO8dUf2LhM"
}

```

注意：如果你想使用 apiKey 的方式在 web3infra 服务中上传数据，请联系 everFinance Team。

### Get Bundle Fee

查看上传数据的交易手续费。

**Request**

- Method: **GET**
- URL: `/bundle/fee/:size/:currency`

params:

`size`: 需要上传的 data binary length.

`currency`: 用于支付 fee 的 token symbol, 支持 everpay 跨链的所有 token.

**Response**

```bash
{
    "currency": "USDC",
    "decimals": 6,
    "finalFee": "4413"
}

```

### Get Bundle Orders

查看 Bundle 订单状态。

**Request**

- Method: **GET**
- URL: `/bundle/orders/:signer`
- Query Params:
    - `cursorId`: (option) 返回列表中最后一个记录的id，用于分页。

Params:

`signer`: bundle item 签名私钥对应的地址，ecc 或者 rsa 地址

**Response**

```bash
[
    {
        "id": 13,
        "createdAt": "2022-07-11T04:07:12.261Z",
        "updatedAt": "2022-07-11T05:07:44.369Z",
        "itemId": "n6Xv8LwdpsQgpaTQgaXQfUORW-KxYePDnj-1ka9dHxM",
        "signer": "0x4002ED1a1410aF1b4930cF6c479ae373dEbD6223",
        "signType": 3,
        "size": 7802,
        "currency": "USDT",
        "decimals": 6,
        "fee": "817",
        "paymentExpiredTime": 1657516032,
        "expectedBlock": 972166,
        "paymentStatus": "expired",
        "paymentId": "",
        "onChainStatus": "failed"
    },
    ...
]

```

### Get Item Meta

获得 Bundle Item 的 Meta 信息。

**Request**

- Method: **GET**
- URL: `/bundle/tx/:itemId`

Params:

`itemId`: bundle item Id

**Response**

```bash
{
    "signatureType": 3,
    "signature": "DC469T6Fz3ByFCtEjnP9AdsLSDFqINxvbIqFw1qwk0ApHtpmytRWFHZeY2gBN9nXopzY7Sbi9u5U6UcpPrwPlxs",
    "owner": "BCLR8qIeP8-kDAO6AifvSSzyCQJBwAtPYErCaX1LegK7GwXmyMvhzCmt1x6vLw4xixiOrI34ObhU2e1RGW5YNXo",
    "target": "",
    "anchor": "",
    "tags": [
        {
          "name": "a",
          "value": "aa"
        },
        {
          "name": "b",
          "value": "bb"
        },
        {
          "name": "Content-Type",
          "value": "image/png"
        }
      ],
    "data": "",
    "id": "IlYC5sG61mhTOlG2Ued5LWxN4nuhyZh3ror0MBbPKy4"
}

```

### Get Items By ArId

获得一笔 Arweave 交易下的所有 Bundle Items。

**Request**

- Method: **GET**
- URL: `/bundle/itemIds/:arId`

Params:

`arId`: arweave 原生 tx id

**Response**
```Bash
[
    "ikLaIRdrzTDD5-nL7C7LeWgZr_XEXbB5dB3C_hJZxXE",
    "x0gzOsOtos4X5vzoJ1CW9wq2pMPB7q7v_zjnvPPNjp0"
]
```