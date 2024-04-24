如果还不知道怎么生成 Arseeding java sdk 请看上一节：[java SDK 概览](1.intro.md) 。

使用 arseedingsdk4j-sdk 可以帮助开发者快速将文件发送到 Arseeding 节点。

## 发送数据
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
其中

`data` 是需要上传的数据。你可以通过 io 读取文件并完成上传。

`tags` 是 Arweave 支持的一种 key-value 索引，你可以在 `tags` 中设置文件类型，设置文件名称甚至是版本号。关于 [Arweave Tag](../../other/tags.md)。

`tags` 中的 `Content-Type` 需要基于你上传的内容进行配置，例如 上传的 png 格式的图片，则配置为 `image/png`，详细说明参考 [Content-Type](../../other/tags.md#content-type)。

`currency` 选择你需要为文件存储支付的币种，如果使用个人部署的 No_Fee 模式节点，该值可以为空字符串。

`needSeq` Arseeding 支持顺序上链用户的订单，需要顺序上链则设置为 true 即可

注意: 这一步操作是将数据发送至 Arseeding 进行暂存并返回给用户一个待支付的订单，订单支付完成后 Arseeding 会将数据上链,（之后你可以通过 Arseeding 或 Arweave 网关进行数据查询）。**若订单1小时内未支付则订单过期，数据删除。**

返回值
```java
  private String itemId; //  用来查询数据的 id

  private long size;  //  数据大小

  private String bundler;  // 收款人，Arseeding 数据上传者

  private String currency;  // 需支付的 Token

  private int decimals;  // Token 的 decimal

  private String fee;   // 需支付的费用

  private long paymentExpiredTime;  // 订单过期时间

  private long expectedBlock;  // 预期该数据存储在 Arweave 上的区块号
```

## 支付订单
通过 sdk 支付上传数据所需的费用后， Arseeding 可以 100% 保证将数据上传至 Arweave 进行永存。
```java
PayOrder payOrder = getPayOrder() // get the pay order
        
PayOrdersResponse response = arSDK.payOrders(Lists.newArrayList(payOrder))
    
System.out.println(response);
```

返回值
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
注意：若用户在 everpay 上面还没有资产，可以参考[这里](https://www.notion.so/cfa4e630400048d484ffc6b1abbdea05)进行资产跨链。支付必须在**60分钟**内完成，否则数据将不会被上传至 Arweave 并且 Arseeding 会将该笔数据清除。

## 发送数据+支付
arseedingsdk4j-sdk 同样提供将发送数据+支付整合到一起的便捷方法，以此来满足在 everpay 中已经拥有资产的用户。

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

## 用 API Key 发送原始数据

```java
Map<String,String> tags = new HashMap<>();
tags.put("abc", "abc");
String itemId = arSDK.submitNativeData("your apiKey", "usdc", "hello world".getBytes(), "text/html", tags);
System.out.println(itemId);
```

## 获取 bundle 费用

根据你需要上传的数据量，返回费用值。

```java
BundleFee fee = arSDK.bundleFee(size, "usdc");
System.out.println(fee);
```
返回值
```java
private String currency; // Token 类型
private int decimals;  // Token decimal
private String finalFee;  // 需要支付的费用
```

## 获取用户订单

通过用户的地址查询该地址的所有 Bundle 数据上传订单。其中从第0页开始查询

```java
List<BundleOrder> orders = arSDK.getOrders("your address", 0);
    
System.out.println(orders);
```
返回值
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
