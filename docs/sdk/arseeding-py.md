## Installation

```python
pip install arseeding
```

## Usage
```python
import arseeding, everpay

# ar account
#signer = everpay.ARSigner('your ar wallet file')

# eth account 
signer = everpay.ETHSigner('your private key')

data = open('the name of file you want to upload', 'rb').read()

# send data to default arseeding service: https://arseed.web3infra.dev
# you could set your own arseeding:
# order = arseeding.send_and_pay(signer, 'usdc', data, arseed_url="your arseeding service url")
# pay usdc in your everpay account
order = arseeding.send_and_pay(signer, 'usdc', data)

# order['itemId'] is your file item id. 
# you could view your file in https://arseed.web3infra.dev/o['itemId'] or http://arweave.net/o['itemId']
print(order['itemId'])
```