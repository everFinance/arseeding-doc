# Manifest
## Introduction
Arweave Manifests unlock new and unique experiences that can only be made possible on the Permaweb.

An Arweave Manifest is a mapping of Arweave Transaction IDs and friendly names. This map is put into a standardized, JSON structure and permanently stored on Arweave, and it allows users to create logical groupings of content. Arweave Gateways can interpret this structure, so users can then reference individual transactions by their file name and/or path.

This makes it easier for web masters, NFT creators or any other user to reference their transactions by a single “master” manifest transaction and the individual file path and name. They allow you to use friendlier URLs like...

https://arweave.net/Bgw5-GwpymUoe5VMeb-No9WWXpjWsq_8g4oeiGP5RnA/0.png

https://arweave.net/Bgw5-GwpymUoe5VMeb-No9WWXpjWsq_8g4oeiGP5RnA/333.png

...rather than opaque Arweave transaction IDs that ordinarily reference your data:
https://arweave.net/ISvPQyG8qWzJ1Pv5em5xK8Ht38HZ3ub1fPHbFEqDPK0

https://arweave.net/nHuFsR2Y-e_qtnsmj0avn37CTWxlZ4zvG_CKwtldK3I

This standard was originally created by the Arweave Team. More details on its motivation, schema and path resolution details can be found in their wiki.

https://github.com/ArweaveTeam/arweave/wiki/Path-Manifests

With Arseeding, any Drive or Folder can be turned into a Manifest. The file names and paths would each be represented within the Arweave Manifest, making it easier for developers and users to reference their content by the names used on their local file systems.

Arweave Manifests must be public, non-encrypted data for the Arweave Gateways or Arseeding Gateways to interpret them.

*The next part will show you how to use  manifest feature of Arseeding.*

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