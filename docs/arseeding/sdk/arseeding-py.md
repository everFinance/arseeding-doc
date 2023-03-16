## Installation

```python
pip install arseeding
```

## Upload file
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

## Manifest

create a upload.py file。

```bash
import arseeding, everpay
# ar account
# signer = everpay.ARSigner('ar_wallet.json')
# eth account
signer = everpay.ETHSigner(pk)
folder = 'build'
currency = 'USDC'
index_page ='index.html'
arseedUrl = 'https://arseed.web3infra.dev'
payUrl = 'https://api.everpay.io'
# upload folder public
maniId, fee1, fee2 = arseeding.upload_folder_and_pay(signer, currency, folder, index_page,arseedUrl,payUrl,slient=False)
```

Configuration Notes:：

- `signer` is the created signature instance, currently supports two types of signature instances.
    - Arweave compatible RSA encryption system compatible with Arweave.
    - ECC encryption system compatible with Ethereum。
- `folder` : folder path need to upload。
- `payUrl` is the URL of the everPay service that needs to be configured: [https://api.everpay.io](https://api.everpay.io/)(the default url if you ignore this parameter)
- `arseedUrl` is the URL of the Arseeding backend service, here we use the public Arseeding service provided by permadao: [https://arseed.web3infra.dev](https://arseed.web3infra.dev/).（the default url if you ignore this parameter）
- `currency` is the payment token you need to choose, if your MetaMask address in everPay holds usdc, please fill in usdc here, if it holds other tokens, please fill in the symbol of other tokens.
- `index_page` is the default index file for manifest. Static websites are usually index.html ( default value ).

Execute the following command in the terminal for file upload:

```bash
$ python3 upload.py
```

return：

- `maniId` is the id that contains the structure information of the folder，In this tutorial, we are uploading a docusaurus front-end project, and running `yarn build` under that project will generate a build folder, which is the one we uploaded. Now, we can access the site via arseedUrl/maniId!
- `fee1` total cost。
- `fee2` total cost（ignore decimals）。fee1 == fee2 * 10^decimals。