# Bundle

### Upload data and pay fees

```jsx
const arseedUrl = '<https://arseed.web3infura.io>'
const data = Buffer.from('need upload data ...')
const payCurrency = 'USDC' // everpay supported all tokens,like 'AR','ETH','USDT' and so on
const ops = {
    tags: [
        {name: "Content-Type",value:"data type"},
        {name: "aa",value:"aaa"}
    ]
}
const resp = await instance.sendAndPay(arseedUrl, data, payCurrency, ops)

// Example Return
{
    status: 'ok',
    everpayTx: {
        tokenSymbol: 'VRT',
        action: 'transfer',
        from: '0x4002ED1a1410aF1b4930cF6c479ae373dEbD6223',
        to: 'iSueFPkz-UIXQCclZj8eaYaVM-oUwmV5CzzCUiIZfL4',
        amount: '3092857502178420',
        fee: '0',
        feeRecipient: '0x6451eB7f668de69Fb4C943Db72bCF2A73DeeC6B1',
        nonce: '1658389952428',
        tokenID: 'usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A',
        chainType: 'arweave',
        chainID: '0',
        data: '{"itemId":"pDwp5zAvpsOklGTUDB1AOqT9t4z8nnksHCTdzqeS1Sg","bundler":"iSueFPkz-UIXQCclZj8eaYaVM-oUwmV5CzzCUiIZfL4","currency":"VRT","decimals":18,"fee":"3092857502178420","paymentExpiredTime":1658393551,"expectedBlock":978980}',
        version: 'v1',
        sig: '0x5fd4ad8de747eef0f70e5f9ba20b024b061a587fc51526399f94711f6bf9ff7012cd743b2b23e1b9e6aad721006578539628be9e4456954917efe09eee2780d91b'
},
    everHash: '0xf9396e34d75ea7c34033f188e7e1632f538af8601d4dd5c5b46e0f113deb6d30',
    order: {
        itemId: 'pDwp5zAvpsOklGTUDB1AOqT9t4z8nnksHCTdzqeS1Sg',
        bundler: 'iSueFPkz-UIXQCclZj8eaYaVM-oUwmV5CzzCUiIZfL4',
        currency: 'VRT',
        decimals: 18,
        fee: '3092857502178420',
        paymentExpiredTime: 1658393551,
        expectedBlock: 978980
    }
}

```

`sendAndPay` will do both upload and payments, make sure your wallet has a sufficient amount of assets on everPay. If you’re using your own Arseeding node with No_Fee mode turned on, please use the "Upload data only" method for upload processing.

### Upload data only

```jsx
import { createAndSubmitItem } from 'arseeding-js'
import EthereumSigner from 'arseeding-arbundles/src/signing/chains/ethereumSigner'
import ArweaveSigner from "arseeding-arbundles/src/signing/chains/ArweaveSigner"
import {readFileSync} from "fs"
import path from "path"

// use ecc signer
const privateKey = '<your ecc private key>'
const signer = new EthereumSigner(privateKey)
// or use rsa signer
const wallet = JSON.parse(
    readFileSync(path.join(__dirname, "<your arweave keyfile>.json")).toString(),
);
const signer = new ArweaveSigner(wallet)

const data = '<need upload data, such as a picture>'
const ops = {
    tags: [
        { name: 'key01', value: 'val01' },
        { name: 'Content-Type', value: 'imag/png' } // you should set the data type tag
    ]
}
const arseedingUrl = '<https://arseed.web3infura.io>'
const currency = 'USDC' // everpay supported all tokens, like 'AR','ETH','USDT' and so on
const order = await createAndSubmitItem(arseedingUrl, signer, data, ops, currency)

// Example Return
{
    itemId: 'XTnZ26gmangoxn7BBXXXabZhxf-BQgnI-x8p1xNUDdA',
    bundler: 'uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68',
    currency: 'VRT',
    decimals: 18,
    fee: '3088600376948271',
    paymentExpiredTime: 1658394103,
    expectedBlock: 978983
}
```

`createAndSubmitItem` will upload data. If you use the Arseeding service provided by web3infra, you need to pay for the response order, otherwise the data will clear after 60 minutes. Once the payment is made, web3infra will 100% guarantee the upload of this data to the Arweave network.

If you turn on No_Fee mode using your own node, no additional payment work is required.

### Pay for order

```jsx
import { newEverpayByEcc, newEverpayByRSA, payOrder } from 'arseeding-js'

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

`payOrder` will complete a payment for an uploaded order. This feature provides the ability to pay on behalf of a service provider who can store payments for a specified user.

# Submit Data By ApiKey

### Use apiKey to upload raw data directly

```jsx
import { submitByApikey } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infura.io>'
const apikey = '<your arseeding apiKey>'
const data = '<need upload data, such as a picture>'
const contentType = 'image/png'
const tags = {'a':'aa','b':'bb'}
const res = await submitByApikey(arseedingUrl,apikey,data,contentType, tags)
// Example Return
{
    itemId: "tSB2-PS3Qr-POmBgjIoi4wRYhhGq3UZ9uPO8dUf2LhM"
}

```

To request an apiKey, please contact the everFinance Team.

# Get Orders

### Get all orders for address

```jsx
import { getOrders } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infura.io>'
const address = '<your address>'
const res = await getOrders(arseedingUrl,itemId)

// Example Return
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
        "paymentStatus": "paid",
        "paymentId": "",
        "onChainStatus": "success"
    },
    ...
]

```

This interface allows you to get all data upload orders for a certain address. The service provider can subscribe to the upload orders for the user's address and perform the payment service on behalf of the user.

# Get Item Meta

### Get item meta by itemId

```jsx
import { getItemMeta } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infura.io>'
const itemId = '<itemId>'
const res = await getItemMeta(arseedingUrl,itemId)

// Example Return
{
    "signatureType": 1,
    "signature": "D0G5Sm-UWdNyxy-jmFKx7yYF0s0QxtO2THJtZ_duFntdmgfT15aHTU9H2-DENoZ-SdYvgFwH1_1fpTWtxQ6EhWrvSdPV6O--hOFAqdTAF-dH9-Krk_MyCf0YOhaV6JrUDam1j9cKcZGH7Ra-mmo3jdZKUtf9OxPjeZMl5DZCY_N9G9gEnI6nQ2VTVhcb8Yrjo3kalARFhwMU-MOw_vHtVQSv7gfSvabWqUQ5WrsJ7ULPqoY63bKQJ9BjRoq0E1B36upmwHkGRyJ7smLay0YJeRb8DXNUkQJm0Gm9TkQ632m4muWEwdDGpelji9CkqIFQWTLZ7iHPzgMSJivkstPLhDHd5wrK5osPImdGODf8bPmgKwZrWDmxxTByVk8AhOchNuoArEXnAUcaoDGnBWPE6KdHUPPSYoF1elm3kWRmZ-GMgtKEPp9AAPtFQ7ANk-nBQd88QvPsNpipgqIBG6VMMBFxP1GWn2jrlBxY5UIb_8Pc6dCN_t9EoUTsApe5XYsx_S2dCou3WNmEx2GvPfcrdQQmqSrxbmFNaE6-V-7N1oe3AAfd0SJgRKheKmC0vIrzaChQUFEiZb0yutWEUi0au8gAi8LzsmtkFKbGlgf3_w0F_p_x53Ay_qQvrghvC3dkfahmIV9JxaiYPXC0d9kNqBEBGZU0gUw4yL787TRrObo",
    "owner": "rHaWu2SNSRRgl1AFINnNQFeSgjI4ywjsq4Y7Lt3vQ2Fv0qGY5uWIO23hcjavGM1uOjhUwKCok4JfeDwwGqvBvYDWaFFXdeniV1_zrhEmT_jvtAE5tY_hhvHB4Pw6wKXFzAOZMtx5jdbkqvG-UHil-mlkzsKtg6-q187lNRJy08dDtZBIKMJIjPScVUPXBwGW1Vww95Xe05uhWtWpv3SLfqkCE1RlLi9oXoAXtEi0GoPgQK4-wF6zDalyyHZS8mnsvaurCBQfgf795MzJG98K2EnTxYdXrnaWpCpCtEMpdOTrUXFh9wQZMpKaKGYnyIukpkDpSEXBr9faglBdO1pnAiJLXdoocMyPvfZxVeyPbb5YJYxrbc4_w4DW3OlE6Y-dCdBtN_qfhpU33CZ-034MQKYZ89wOrBHRST8STueYaWVvCQzKfJLLZfpdNkfeTCO3unhg6PTzW0sI56R4vEjoio2KxtPyQ3_tC1rTIYlEdA-GnCC4xpODpxYmgvVhD2oQP44QeUXVvkjaWTLBVc-NH3708OcZ8L03aadmn693AlhRP2_i_fns6KU7dmEUc0xfvkYwjvTV4Br4fJ7HZtpvFS8KWTRub_qB25S9ef1lhe0qTA_bb_YSog86G_Ndopl3vQv-xjHWlVSXAX3zBRapNwO3eDRvLlzR2DGMeTb2p3c",
    "target": "",
    "anchor": "",
    "tags": [
    {
        "name": "Content-Type",
        "value": "application/x.arweave-manifest+json"
    }
],
    "data": "",
    "id": "l5WNC__ih6YZLO3WGyUb7L0hcl_vIdTEw3eWOOnnX2Y"
}

```

# Get Bundle Fee

### Query bundle item storage costs
```js
import { getBundleFee } from 'arseeding-js'
const arseedingUrl = '<https://arseed.web3infura.io>'
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
