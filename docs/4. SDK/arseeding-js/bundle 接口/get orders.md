### 获取 address 所有的 order
```js
import { getOrders } from 'arseeding-js'
const arseedingUrl = 'https://arseed.web3infura.io'
const address = '<your address>'
const res = await getOrders(arseedingUrl,itemId)

// 返回示例
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
