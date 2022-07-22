### 上传数据并支付费用
```js
const arseedUrl = 'https://arseed.web3infura.io'
const data = Buffer.from('need upload data ...')
const payCurrency = 'USDC' // everpay supported all tokens,like 'AR','ETH','USDT' and so on
const ops = {
    tags: [
        {name: "Content-Type",value:"data type"},
        {name: "aa",value:"aaa"}
    ]
}
const resp = await instance.sendAndPay(arseedUrl, data, payCurrency, ops)

// 返回示例
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

### 只上传数据
```js
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
const arseedingUrl = 'https://arseed.web3infura.io'
const currency = 'USDC' // everpay supported all tokens, like 'AR','ETH','USDT' and so on
const order = await createAndSubmitItem(arseedingUrl, signer, data, ops, currency)

// 返回示例
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

### 为 order 支付费用
```js
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
