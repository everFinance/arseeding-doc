#### 通过 apiKey 的方式可以直接提交原数据
```js
import { submitByApikey } from 'arseeding-js'
const arseedingUrl = 'https://arseed.web3infura.io'
const apikey = '<your arseeding apiKey>'
const data = '<need upload data, such as a picture>'
const contentType = 'image/png'
const tags = {'a':'aa','b':'bb'}
const res = await submitByApikey(arseedingUrl,apikey,data,contentType, tags)
// 返回示例
{
    itemId: "tSB2-PS3Qr-POmBgjIoi4wRYhhGq3UZ9uPO8dUf2LhM"
}
```
如何申请 apiKey 请跳转[申请 apiKey](../../../other/arseeding%20apiKey.md)。
