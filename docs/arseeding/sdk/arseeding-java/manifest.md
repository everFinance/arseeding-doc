# Manifest

manifest is designed to provide users with the ability to upload and parse folders, and one of the key application cases is the deployment of static websites. Now you can upload your static web folders via the SDK and deploy your static site permanently to Arweave for a very low cost (0.1 - 0.2 USDC).

More detail: [Introduction about manifest](../../other/manifest.md)

### Upload

```java
ManifestUploadResponse response = 
        arSDK.uploadFolder("your root path", batchSize, "index file", payCurrency);

System.out.println(response);
```
Configuration Notes:
- `payCurrency` is the payment token you need to choose, if your MetaMask address in everPay holds usdc, please fill in usdc here, if it holds other tokens, please fill in the symbol of other tokens.
- `your root path` is the path to the folder you want to upload, for example, to deploy a static website, the front-end project will generate a build or dist folder after the project is compiled, just choose the path to that folder.
- `batchSize` is the optional number of concurrent uploads, and our SDK provides high performance concurrent uploads to ensure high availability of the service.
- `index file` is the default index file for manifest. Static websites are usually index.html.

And return will contain a itemId