# Manifest
manifest 旨在为用户提供文件夹上传并解析的功能，其中一个重要的应用场景便是静态网站的部署。现在，你可以通过 Arseeding 提供的 SDK 来上传你的静态网页文件夹，只需极低的花费（0.1-0.2 USDC）就可以将你的静态站点永久的部署到 Arweave 上。

## 使用

### 安装 SDK
```bash
npm i arseeding-js
```

创建一个 demo.js, 将以下代码复制进去。

```jsx
import {uploadFolderAndPay} from "arseeding-js/cjs/uploadFolder";

const path = 'Your Folder path'
const priv = 'YOUR PRIVATE KEY'
const arseedUrl = 'https://arseed.web3infra.dev'
const payCurrency = 'USDC' // or ETH,BNB etc.
const apiKey = 'your apiKey'

uploadFolderAndPay(path,priv,url,payCurrency).catch((e)=>{
    console.log(e)
}).then((res)=>{
    console.log(res.maniId)
})

// review manifest Data
curl --location --request GET 'https://arseed.web3infra.dev/{res.maniId}'
```


配置说明：

- 将你的 ECC 密钥填充到`YOUR PRIVATE KEY`。确保 private key 对应的钱包在 everPay 拥有资产。
- arseedUrl 是 Arseeding 后端服务地址，这里我们使用 everFinance 提供的 public  Arseeding 服务：https://arseed.web3infra.dev。
- `payUrl`是需要配置的 everPay 服务的 URL:[https://api.everpay.io](https://api.everpay.io/)
- path 为你想要上传的文件夹的路径，例如，部署静态网站，前端项目编译后会生成 build 或 dist 文件夹，选择该文件夹的路径即可。
- payCurrency 是需要选择的支付代币，如果你的 MetaMask 地址在 everPay 持有的是 usdc，这里请填写 usdc，如果持有的是其他代币，请填写其他代币的 symbol。

在准备好配置后，调用 uploadFolderAndPay(path,priv,url,payCurrency) 就可以将你的文件夹下的所有文件通过 manifest 的方式上传到 web3infra 的 Arseeding 节点。

```bash
node demo.js
```

正确执行后终端将返回：

```json
{
  fee: '0.004218',
  maniId: 'EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE'
	everHash:[
			0x46744320be6529c48bf18c348fa181facef3d9d6d920a24687dc9964ba3ead0a
	]
}
```

## 下载数据-页面访问

在返回的结果中可以找到`maniId`，上文中 maniId 为:EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE 。

在本教程中，我们上传的是一个 docusaurus 前端项目，在该项目下运行 `yarn build` 会生成一个build 文件夹，我们上传的正是这个文件夹。现在，我们可以通过 maniId 来访问这个站点了！

在你的浏览器中输入：

```bash
https://arseed.web3infra.dev/EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE
```

就可以访问到这个网站了，并且是永久可用的！