# Arseeding ApiKey

### What is Arseeding

Arseeding supports Bundle (ANS-104) type transactions. Compared to native transactions on [Arweave](https://www.arweave.org/), Bundle transactions are more suitable for storing large numbers of small files. When using Bundle transactions to store data, Arseeding supports using [everPay](https://everpay.io/) for storage fee payment, which means you don't need to hold AR tokens to use Arweave's file storage service. At the same time, Arseeding can guarantee 100% upload of files to Arweave nodes, improving the storage experience for developers.

### Why do we need Apikey

Because using Arseeding requires a wallet, it is not user-friendly for non-web3 users or developers. Therefore, we have developed a prepayment function (similar to a prepaid card) to support traditional developers in using Arweave. The prepayment function is mainly reflected in supporting apikey. Arseeding apikey needs to prepay a certain amount of tokens, and in the future, when using Arseeding to upload data to the Arweave network, storage fees can be deducted by passing in the apikey without using a web3 wallet!

This tutorial will introduce how to use apikey to upload data to Arweave and pay for it with Arseeding.

### How to get Apikey

Arseeding Apikey is bound to a wallet address. Visit the [Apikey front-end](https://apikey.web3infra.dev/) and log in with an EVM-compatible wallet. Recharge with tokens supported by everpay to get a pre-paid apikey (a new apikey will be generated for a new wallet on the first recharge), and later we can use this apikey to call Arseeding-related APIs to permanently save data to the Arweave network!

![apikeyPage](../../../../../../static/img/apikey.png)

### Using Apikey to Deduct Storage Fees

The example below uses the [arseedingjs sdk](../sdk/arseeding-js/bundle.md) to demonstrate how to use apikey to store data on Arweave.

```ts

const arseedingUrl = "https://arseed.web3infra.dev";
const apikey = process.env.APIKEY;
const data = "some data here....";
const contentType = "text/html; charset=utf-8";
const tags = { a: "aa", b: "bb" };

const res = await submitByApikey(
  arseedingUrl,
  apikey!,
  "USDC",
  Buffer.from(data),
  contentType,
  tags
);

console.log({ res });
// {
//  res: { itemId: '8pW7W74H8qLqj4p2ZX4vIkfO08K31j4CAXVVLS2pjMw', size: 18 }
// }

```

The above **submitByApikey** method uploads our data to Arseeding and is signed by Arseeding before being stored on Arweave. Sometimes, we want to use our own wallet to sign the uploaded data for authentication. In this case, we can use the **createAndSubmitItem** method:

```ts

const arseedingUrl = "https://arseed.web3infra.dev";
const apikey = process.env.APIKEY;
const secret = process.env.SECRET;

const data = "some data here....";
const tags = [
  {
    name: "a",
    value: "aaaa",
  },
  {
    name: "b",
    value: "bbb",
  },
  {
    name: "Content-Type",
    value: "text/html; charset=utf-8",
  },
];

const wallet = Wallet.fromMnemonic(secret!);

const eccSigner = new ArseedingArBundles.signers.EthereumSigner(
  wallet.privateKey.substring(2)
);

const res = await Arseeding.createAndSubmitItem(
  Buffer.from(data),
  { tags },
  {
    apiKey: apikey,
    currency: "USDC",
    arseedUrl: arseedingUrl,
    signer: eccSigner,
    path: "",
  }
);

console.log({ res });
// {
//   res: {
//     itemId: "TTQ-UsWo6Tj8e6m-WldrSmBmnirs9RmIs0jFMDW50Yw",
//     size: 221,
//     bundler: "uDA8ZblC-lyEFfsYXKewpwaX-kkNDDw8az3IW9bDL68",
//     currency: "USDC",
//     decimals: 6,
//     fee: "1805",
//     paymentExpiredTime: 0,
//     expectedBlock: 1159234,
//   },
// };

```

The complete code can be found in [this repository](https://github.com/ethever/arseeding-apikey-demo).