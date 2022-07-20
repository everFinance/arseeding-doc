##### Request
- Method: **POST**
- URL: ```/bundle/tx/:currency```
    - 使用 USDC 支付：```/bundle/tx/USDC```
    - 使用 AR 支付：```/bundle/tx/AR```
- Headers: Content-Type:application/octet-stream
- Body:
  --data-binary 'bundle item data'
##### Response
```js
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
