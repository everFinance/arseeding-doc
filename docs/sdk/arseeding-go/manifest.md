# Manifest

manifest is designed to provide users with the ability to upload and parse folders, and one of the key application cases is the deployment of static websites. Now you can upload your static web folders via the SDK and deploy your static site permanently to Arweave for a very low cost (0.1 - 0.2 USDC).

## Installation
Prepare the golang development environment and create a new demo project.

Open your terminal under the demo project and install arseeding sdk, goether using the following command

```go
go mod tidy
go get github.com/everFinance/arseeding
go get github.com/everFinance/goether
```

## Usage
### Upload

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

Configuration Notes:

- Populate your ECC key with `YOUR PRIVATE KEY`. Make sure that the wallet corresponding to the private key has assets in everPay.
- `arseedUrl` is the URL of the Arseeding backend service, here we use the public Arseeding service provided by everFinance: [https://arseed.web3infra.dev](https://arseed.web3infra.dev/).
- `payUrl` is the URL of the everPay service that needs to be configured: [https://api.everpay.io](https://api.everpay.io/)
- `payCurrency` is the payment token you need to choose, if your MetaMask address in everPay holds usdc, please fill in usdc here, if it holds other tokens, please fill in the symbol of other tokens.
- `path` is the path to the folder you want to upload, for example, to deploy a static website, the front-end project will generate a build or dist folder after the project is compiled, just choose the path to that folder.
- `batch` is the optional number of concurrent uploads, and our SDK provides high performance concurrent uploads to ensure high availability of the service.
- `indexFile` is the default index file for manifest. Static websites are usually index.html.

Execute the following command in the terminal for file upload:

```go
go run main.go
```

And return will contain a maniId: `EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE` .

### Download data-Access page

The maniId can be found in the returned result, the maniId above is `EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE`

In this tutorial, we are uploading a docusaurus front-end project, and running `yarn build` under that project will generate a build folder, which is the one we uploaded. Now, we can access the site via maniId!
```bash
https://arseed.web3infra.dev/EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE
```