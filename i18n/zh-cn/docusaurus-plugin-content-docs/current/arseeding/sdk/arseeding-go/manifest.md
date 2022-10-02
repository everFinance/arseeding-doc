# Manifest
## 介绍
Arweave Manifests 是实现 Permaweb 的重要手段之一。

Manifest 是 Arweave ID(包括原生交易 ID 和 bundle ID) 和名称的映射。 该映射被放入标准化的 JSON 结构并永久存储在 Arweave 上，它允许用户创建结构化的分组内容。 Arweave 网关以及 Arseeding 节点都可以解析这种结构，因此用户可以通过路径访问单个数据 item。

这使得网站维护者、NFT 创作者或任何其他用户更容易通过单个“主”清单交易以及单独的文件路径和名称来引用他们的数据。 这使得你可以使用更友好的 URL，例如...

https://arweave.net/Bgw5-GwpymUoe5VMeb-No9WWXpjWsq_8g4oeiGP5RnA/0.png

https://arweave.net/Bgw5-GwpymUoe5VMeb-No9WWXpjWsq_8g4oeiGP5RnA/333.png

...而不是通过每一张图片在 arweave 上的 ID 来访问它：

https://arweave.net/ISvPQyG8qWzJ1Pv5em5xK8Ht38HZ3ub1fPHbFEqDPK0

https://arweave.net/nHuFsR2Y-e_qtnsmj0avn37CTWxlZ4zvG_CKwtldK3I

该标准最初由 Arweave 团队创建。 有关其动机、模式和路径解析等更多细节可以在他们的 wiki 中找到。

https://github.com/ArweaveTeam/arweave/wiki/Path-Manifests

使用 Arseeding，任何文件夹都可以变成 Manifest 清单模式。 文件名和路径都将在 Arweave Manifest 中表示，使开发人员和用户更容易通过本地文件系统上使用的名称来引用他们的内容。

Manifest 必须是公开的、未加密的数据，以便 Arweave 网关或 Arseeding 节点对其进行解析。

*下面将为大家介绍如何便捷的在 Arseeding 中使用 Manifest 功能。*

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