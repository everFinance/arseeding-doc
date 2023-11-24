# Bundle
If you don't know how to generate Arseeding java sdk please see the previous section: [java SDK Overview](1.intro.md).

Using arseedingsdk4j-sdk can help developers to quickly send files to Arseeding nodes.

## Sending data

```java
String data = "hello world";
String currency = "usdc";
Tag tag1 = new Tag("abc", "abc");
Tag tag2 = new Tag("Content-Type", "application/text");
List<Tag> tags = Lists.newArrayList(tag1, tag2);
boolean needSeq = false;

DataSendResponse result =
        arSDK.sendData(data.getBytes(), currency, tags, "", "", needSeq);

System.out.println(result);
```
`data` is the data to be uploaded. You can read the file via io and complete the upload.

`tags` is a key-value index supported by Arweave, you can set the file type, set the file name and even the version number in `tags`. About Arweave Tag: TODO.

`Content-Type` in tags needs to be configured based on the content you upload. For example, if you upload an image in png format, configure it as `image/png`. For details, refer to [Content-Type](../../other/tags.md#content-type).

`currency` selects the currency you need to pay for the file storage, the value can be an empty string if you use the No_Fee mode node for personal deployments.

`needSeq` Arseeding supports sequential on-chain users' orders, if you need to on-chain in sequence, set it to true

Note: This step sends the data to Arseeding for staging and returns a pending order to the user, which will be uploaded by Arseeding once the order is paid (you can then query the data via the Arseeding or Arweave gateways). **If the order is not paid within 1 hour, the order expires and the data is deleted.**

Return value:
```java
  private String itemId; //  id used to query data

  private long size;  //  data size

  private String bundler;  // payer，Arseeding data uploader

  private String currency;  // pay Token

  private int decimals;  // Token decimal

  private String fee;   // Fees to be paid

  private long paymentExpiredTime;  // Order expiration time

  private long expectedBlock;  // The block number on Arweave where the data is expected to be stored
```

## Paying order
By paying the required fees for uploading data through java sdk, Arseeding can 100% guarantee the data will be uploaded to Arweave for permanent storage.

```java
PayOrder payOrder = getPayOrder() // get the pay order
        
PayOrdersResponse response = arSDK.payOrders(Lists.newArrayList(payOrder))
    
System.out.println(response);
```

Return value:
```java
  private String status;

  private String tokenSymbol;

  private String action;

  private String from;

  private String to;

  private String amount;

  private String fee;

  private String feeRecipient;

  private String nonce;

  private String tokenID;

  private String chainType;

  private String chainID;

  private String data;

  private String version;

  private String sig;
```
Note: If the user does not have assets on everpay yet, you can refer to [here](../../other/2.getAR.md#everpay) in order to cross-chain assets. The payment must be completed within **60 minutes**, otherwise the data will not be uploaded to Arweave and Arseeding will clear the data.

## Sending data + Paying order

arseedingsdk4j-sdk also offers a convenient way to integrate sending data + payments to satisfy users who already have assets in everpay.

```java
String data = "hello world";
String currency = "usdc";
Tag tag1 = new Tag("abc", "abc");
Tag tag2 = new Tag("Content-Type", "application/text");
List<Tag> tags = Lists.newArrayList(tag1, tag2);
boolean needSeq = false;

DataSendOrderResponse result =
        arSDK.sendDataAndPay(data.getBytes(), currency, tags, "", "", needSeq);

System.out.println(result);
```

## Send raw data with API Key

```java
Map<String,String> tags = new HashMap<>();
tags.put("abc", "abc");
String itemId = arSDK.submitNativeData("your apiKey", "usdc", "hello world".getBytes(), "text/html", tags);
System.out.println(itemId);
```

## Get bundle costs

Returns the cost value based on the amount of data you need to upload.

```java
BundleFee fee = arSDK.bundleFee(size, "usdc");
System.out.println(fee);
```

Return:
```java
private String currency; // Token type
private int decimals;  // Token decimal
private String finalFee;  // fee need to paid
```

## Get user orders

Look up all Bundle data upload orders for a user by their address for that address.
```java
List<BundleOrder> orders = arSDK.getOrders("your address", 0);
    
System.out.println(orders);
```
Return:
```java 
    private int id;
    private Date createdAt;
    private Date updatedAt;
    private String itemId;  // bundleItem id
    private String signer;  // item signer
    private int signType;
    private long size;
    private String currency;  // payment token symbol
    private int decimals;
    private String fee;
    private long paymentExpiredTime;
    private long expectedBlock;
    private String paymentStatus;  // "unpaid", "paid", "expired"
    private String paymentId;    // everHash
    private String onChainStatus;  // "waiting","pending","success","failed"
    private String apiKey;
    private boolean sort;
```
