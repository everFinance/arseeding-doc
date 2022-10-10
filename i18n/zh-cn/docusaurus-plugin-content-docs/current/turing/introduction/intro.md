# 概述

## 什么是 Turing

Turing 是 Arweave 生态下构建基于存储共识范式（SCP）App 的重要基础设施，它允许用户将任意的数据集以一定的顺序上传至 Arweave 区块链进行永存，在这些数据集被确认打包进入区块链后，它能够以相同的顺序从 Arweave 区块链上将这些数据拉取下来进行进一步的解析和处理。需要注意的是：顺序的一致性是相当重要的，当这些数据集作为一个操作序列时，意味着任意的使用者从区块链上拉取到的操作序列都是一致的，这样就保证了给定一个相同的初始状态，在经过一致的操作后得到的最终状态的一致性。

代码仓库：[https://github.com/everFinance/turing](https://github.com/everFinance/turing)

# 架构

<div align="center"><img src="https://arseed.web3infra.dev/Wi_ELzEWLDD2h6vt3WtWdor_6SS10bJHfOi7i4CytXc" height="70%" width="70%"/></div>


Turing 的 架构如上图所示，下面对整个过程做一个简要介绍，具体实现可以进一步阅读 rollup 和 Tracker 两个部分。

- 用户将需要上传的 data item 提交给 RollUp 模块，RollUp 会根据用户的提交顺序将这些 data item 封装成一笔 AR 交易的 tx data 部分。
- rollup 自动组装一笔 AR 交易，将该笔交易发送到 Arweave 网络，这样就实现了 data item 的上链。
- Tracker 模块根据 AR 交易的 Id 从 Arweave 上获取到该笔 AR 交易，取出 AR 交易的 tx data 部分，将 tx data 经过解析后得到与上传顺序一致的 data item。