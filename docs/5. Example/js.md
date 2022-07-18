## Bundle Web 端
```
import { genAPI } from 'arseeding-js'
const instance = await genAPI(window.ethereum)

const arseedUrl = 'https://arseed.web3infura.io'
const data = Buffer.from('........')
const payCurrency = 'usdc' // everpay 支持其他多种 Token
const ops = {
    tags: [{name: "Content-Type",value:'data type'}]
}
const res = await instance.sendAndPay(arseedUrl, data, payCurrency, ops)
console.log('res',res)

// 获取刚刚上传的 data
curl --location --request GET 'https://arseed.web3infura.io/{{res.order.itemId}}'
```
## Bundle Node 端
```
import { genNodeAPI } from 'arseeding-js'

const instance = await genNodeAPI('YOUR PRIVATE KEY')

instance.sendAndPay('https://arseed.web3infura.io', Buffer.from('aa bb cc'), 'usdc', {})
```