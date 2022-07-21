### 查询 bundle item 存储费用
```js
import { getBundleFee } from 'arseeding-js'
const arseedingUrl = 'https://arseed.web3infura.io'
const size = '<data binary length>'
const currency = '<payment token symbol, such as eth,usdc. >'
const res = await getBundleFee(arseedingUrl,size, currency)

// 返回示例
{
    "currency": "USDC",
    "decimals": 6,
    "finalFee": "3503"
}
```
