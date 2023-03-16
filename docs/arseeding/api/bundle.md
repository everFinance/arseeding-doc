## Bundle Service

### Get Bundler

Get the wallet address for the Arseeding Bundle service. This wallet is used for ANS-104 data uploads, and everPay is used to charge for the upload service.

**Request**

- Method: **GET**
- URL: `/bundle/bundler`

**Response**

```bash
{
    "bundler": "uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68"
}
```

### Submit Bundle Items

Submit the Bundle Item to the Arseeding node.

**Request**

- Method: **POST**
- URL: `/bundle/tx/:currency`
  - Pay with USDC：`/bundle/tx/USDC`
  - Pay with AR：`/bundle/tx/AR`
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

### Submit Bundle Data By an ApiKey

Use X-API-KEY to submit data to Arseeding.

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

Note: If you would like to upload data in the web3infra service using the apiKey method, please contact the permadao Team.

### Get Bundle Fee

Check the transaction fees for uploading data.

**Request**

- Method: **GET**
- URL: `/bundle/fee/:size/:currency`

params:

`size`: the binary length of the data to be uploaded.

`currency`: token symbol for payment fee, supports all cross-chain tokens of everpay.

**Response**

```bash
{
    "currency": "USDC",
    "decimals": 6,
    "finalFee": "4413"
}

```

### Get Bundle Orders

View Bundle order status.

**Request**

- Method: **GET**
- URL: `/bundle/orders/:signer`
- Query Params:
  - `cursorId`: (option) Return the id of the last record in the list, used for paging.

Params:

`signer`: The address corresponding to the signature private key, ecc or rsa address of bundle item.

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

Get the Meta information of the Bundle Item.

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

Get all Bundle Items under one Arweave tx.

**Request**

- Method: **GET**
- URL: `/bundle/itemIds/:arId`

Params:

`arId`: arweave  tx id

**Response**
```Bash
[
    "ikLaIRdrzTDD5-nL7C7LeWgZr_XEXbB5dB3C_hJZxXE",
    "x0gzOsOtos4X5vzoJ1CW9wq2pMPB7q7v_zjnvPPNjp0"
]
```