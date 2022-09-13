# Arweave 区块解析
# 概述

Arweave 网络经过了几次升级，区块结构在升级的过程中也发生了一些变化，主要是随着每次升级会增加一些字段在区块中。goar 可以帮助开发者便捷的获取区块的 indepHash。

### 区块结构

区块结构主要有以下几种类型：

- height < `422250`
- `422250` ≤ height < `633720`
- height ≥ `633720`

查询具体区块结构可以访问 Arweave 网关。

在浏览器输入：

```
https://arweave.net/block/height/{height}
```

`{height}` 为查询的高度，如 `20000` 。

可以将获取到的数据用 json 格式化工具美化一下。

# 使用

goar 已经兼容了各种版本的区块结构的 indep_hash 计算。

```go
blockInfo := "block info"
block, err := utils.DecodeBlock(blockInfo)
if err != nil {
	panic(err)
}
indep_hash := utils.GenerateIndepHash(*block)
```

说明：

- `blockInfo`是 Arweave 的区块信息，上文提到的在浏览器访问获得的就是 blockInfo。
- `DecodeBlock` 将 Arweave 区块信息（json 字符串）解析为 golang 的 block 结构。
- `GenerateIndepHash` 根据区块高度计算出区块的 indepHash。