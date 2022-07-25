##### Request
- Method: **GET**
- URL: ```/bundle/fee/:size/:currency```
  
params:   
`size`: 需要上传的 data binary length.   
`currency`: 用于支付 fee 的 token symbol, 支持 everpay 跨链的所有 token.
##### Response
```js
{
    "currency": "USDC",
    "decimals": 6,
    "finalFee": "4413"
}
```
