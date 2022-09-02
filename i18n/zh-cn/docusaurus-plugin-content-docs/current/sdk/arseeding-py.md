## 安装

```python
pip install arseeding
```

## 文件上传
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

## 上传文件夹

创建一个 upload.py 文件。

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

配置说明：

- `signer` 是创建的签名实例，目前支持两种类型的签名实例。
    - Arweave 网络兼容的 RSA 加密体系。
    - 以太坊 网络兼容的 ECC 加密体系。
- `folder` 是需要上传的文件夹路径。
- `payUrl`是需要配置的 everPay 服务的 URL，可以不传入此参数，默认情况下 URL 为[https://api.everpay.io](https://api.everpay.io/)
- `arseedUrl` 是 Arseeding 后端服务地址，这里我们使用 everFinance 提供的 public  Arseeding 服务：https://arseed.web3infra.dev。（该 url 也是此参数的默认值）
- `currency` 是需要选择的支付代币，如果你的 MetaMask 地址在 everPay 持有的是 usdc，这里请填写 usdc，如果持有的是其他代币，请填写其他代币的 symbol。
- `index_page`为 manifest 默认的索引文件。静态网站一般为 index.html（不传入时的默认值）。

在终端执行以下命令进行文件上传：

```bash
$ python3 upload.py
```

返回值：

- `maniId` 是包含文件夹的结构信息的数据 Id，在本教程中，我们上传的是一个 docusaurus 前端项目，在该项目下运行 `yarn build` 会生成一个build 文件夹，我们上传的正是这个文件夹。现在，我们可以通过 arseedUrl/maniId 来访问这个站点了！
- `fee1` 支付的总费用。
- `fee2` 支付的总费用（经过 decimals 处理）。fee1 == fee2 * 10^decimals。