# 门限签名
# 概述

RSA 门限签名允许多个参与方在不暴露自己的私钥的情况下，分别用自己的私钥对一笔数据进行签名，在验证的时候，只需要获取一定数量签名（基于门限值的设定， 通常小于参与者的数量）就可以验证该笔数据的有效性。这提高了多方参与的效率和安全性。

goar 的 threshold.go 实现了门限签名算法，可以供开发者快速、便捷的生成密钥对，实现密钥分发，提高应用的安全性和可靠性。

# 使用

### 密钥生成

```go
k := 3
l := 5
bitSize := 1024
keyShares, keyMeta, err := goar.CreateTcKeyPair(bitSize, k, l)
if err != nil {
	panic(err)
}
fmt.Printf("%v\n%v", keyShares, keyMeta)
```

说明：

- `l` 是参与者的数量。
- `k` 是门限值，本例中设置为 3，意味着在这个门限签名的应用案例中，参与方是 5，只需要获取其中任意 3 个参与方的签名就可以验证数据的有效性。
- `bitSize` 与密钥生成时 RSA 私钥的二进制长度相关，goar 将这个值限定在 [512,4096] 区间，因为该值太短会导致安全性的不足，太长能增加安全性但是密钥生成的效率会大大降低。在生产环境中，将这个值设置为 4096 是足够安全的。
- `keyMeta` 是生成的门限签名公钥，里面包含了 参与方数量 `l` 和门限值 `k` ，这个公钥会分发给所有的参与方。
- `keyShares` 是生成的分发密钥，这是一个数组，其长度为 `l` ，数组中的每一个元素将会分别分发给所有的参与者，作为他们进行签名的私钥。

### 创建 TcSign 实例

```go
data := []byte("data need to sign")
salt := sha256.Sum256([]byte("everHash salt aaa"))
ts, err := goar.NewTcSign(keyMeta, data, salt[:])
```

说明：

- `data` 是需要签名的数据。
- `salt` 是添加的噪声。
- `keyMeta` 是生成门限签名时的公钥。

创建 TcSign 实例的主要作用是：

- 对于参与方来说，通过 keyMeta 创建一个 TcSign 实例后，才可以利用自己获得的分发密钥对数据进行签名，再将签名提交给验证者进行签名聚合和验证。
- 对于验证方来说，通过 keyMeta 创建一个 TcSign 实例后，才可以验证接收到的参与方的签名是否合法，若合法，则将合法的签名进行聚合，进行门限签名的验证。

下面分别介绍参与方与验证方如何使用 TcSign 实例。

### 参与方进行门限签名

```go
ts, err := goar.NewTcSign(keyMeta, data, salt[:])
key := keyShares[0]
sig0, err := ts.ThresholdSign(key)
```

说明：

- `key` 是编号为 0 的参与者获得的分发密钥，`keyShares` 是密钥生成步骤中为所有参与者生成的分发密钥。
- `sig0` 是编号为 0 的参与者对数据的签名。

参与者对数据进行门限签名后就可以将签名提交给验证者（签名聚合器）。

### 验证签名

```go
signedShares := tcrsa.SigShareList{
	sig0,
	sig1,
	sig2,
}
// assemble
signature, err := ts.AssembleSigShares(signedShares)
if err != nil {
	panic(err)
}
// verify
signHashed := sha256.Sum256(data)
err = rsa.VerifyPSS(keyMeta.PublicKey, crypto.SHA256, signHashed[:], signature, nil)
```

说明：

- `signedShares` 包含了参与者 0，1，2 对数据的签名。
- `signature` 是验证者对 0，1，2 号参与者的签名进行聚合后生成的签名。

在获取到聚合签名后，就可以对数据的签名进行合法性验证了，在本例中我们提供了三个参与者的签名，满足门限值 k 的设定。