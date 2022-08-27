# Manifest

manifest 旨在为用户提供文件夹上传并解析的功能，其中一个重要的应用场景便是静态网站的部署。现在，你可以通过 Arseeding 提供的 SDK 来上传你的静态网页文件夹，只需极低的花费（0.1-0.2 USDC）就可以将你的静态站点永久的部署到 Arweave 上。

## 使用

准备好 golang 开发环境。

新建一个 demo project。

### **安装**

在 demo project 下打开你的终端，使用以下指令安装 arseeding sdk, goether

```go
go mod tidy
go get github.com/everFinance/arseeding
go get github.com/everFinance/goether
```

### 上传文件

在 demo 项目下创建 一个 `main.go` 文件， 将以下代码复制进去：

```go
import (
	"fmt"
	"github.com/everFinance/arseeding/sdk"
	"github.com/everFinance/goether"
)

func main() {
	priv := "YOUR PRIVATE KEY"
	signer, err := goether.NewSigner(priv)
	if err != nil {
		panic(err)
	}
	arseedUrl := "https://arseed.web3infra.dev"
	payUrl := "https://api.everpay.io"
	currency := "USDC"
	batch := 10
	indexFile := "index.html"
	uploader, maniId, err := sdk.NewSDK(arseedUrl, payUrl, signer)
	if err != nil {
		panic(err)
	}
	path := "./cmd"
	ords, mnifId, err := uploader.UploadFolder(path,batch,indexFile,currency)
	if err != nil {
		panic(err)
	}
	res,err := uploader.BatchPayOrders(ords)
	if err != nil {
		panic(err)
	}
	fmt.Println(res,maniId)
}
```

配置说明：

- 将前文提到的 MetaMask 钱包对应的密钥填充到`YOUR PRIVATE KEY`。
- arseedUrl 是需要配置的 Arseeding 后端服务地址，这里我们使用的是 web3infra 服务，URL 为：https://arseed.web3infra.dev。
- `payUrl`是需要配置的 everPay 服务的 URL，一般情况下 URL 为：[https://api.everpay.io](https://api.everpay.io/)
- path 为你想要上传的文件夹的路径，例如，部署静态网站，前端项目编译后会生成 build 文件夹，选择该文件夹的路径即可。
- payCurrency 是需要选择的支付代币，如果你的 MetaMask 地址在 everPay 持有的是 usdc，这里请填写 usdc，如果持有的是其他代币，请填写其他代币的 symbol。
- batch 是可选择的并发度，我们的 SDK 提供了高性能的并发上传来保证服务的高可用性。
- indexFile 为 manifest 默认的索引文件。静态网站一般为 index.html。

在终端执行以下命令进行文件上传：

```bash
go run main.go
```

正确执行后将返回一个 maniId， 本例中 maniId 为：
`EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE`

## 下载数据-页面访问

在返回的结果中可以找到`maniId`，上文中 maniId 为EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE 。

在本教程中，我们上传的是一个 docusaurus 前端项目，在该项目下运行 `yarn build` 会生成一个build 文件夹，我们上传的正是这个文件夹。现在，我们可以通过 maniId 来访问这个站点了！

在你的浏览器中输入：

```bash
https://arseed.web3infra.dev/EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE
```

就可以访问到这个网站了，并且是永久可用的！