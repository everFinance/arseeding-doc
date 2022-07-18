### 什么是 Arseeding
Arseeding 是 Arweave 生态中的一个强大的基础设施，
它不仅提供了 Arweave 网关功能，还可以用它来上传，下载和广播任何 AR 原生交易和数据，这也就意味着你只需要关心你自己的业务数据而不用同步 arweave 全量数据，这将节省大量的服务器运维成本。
Arseeding 还支持 bundle 交易类型。相比于 AR 原生交易，bundle 交易类型更加适用于文件小数量多的存储场景。

### 为什么要有 Arseeding
目前对于 arweave 生态开发者面临两个严重的问题：
1. 生态项目严重依赖 arweave.net 网关，存在单点故障的问题
2. arweave 节点交易广播服务存在已知 bug。arweave.net 网关接收到的 txs 不能及时广播给其他出块节点。导致 arweave.net 网关 pending pool 累积大量的 txs，但其他出块节点没有交易进行打包。后果就是 pending pool 中大量的交易会过期
3. 生态中没有开源的 ANS-104 bundler 协议实现

为了解决以上问题，everFinance 团队开发了 arseeding 服务。

### Arseeding 实现功能

#### 广播需要上链的交易
把发送到 arweave.net  网关的交易，以相同的方式发送一份到 arseeding server，server 收到之后负责把交易广播到网络中的所有节点。此功能确保所有节点的 pending pool 中能及时接收到这笔交易，提高交易被打包的速率。

#### 广播链上交易 data
arweave 是通过概率存储机制确保链上数据大概率不会被丢失，但是存在刚上传上去的数据被丢失的情况。举例说明：Bob 通过 arweave.net 节点发送一笔存储交易，交易也被正常打包上链。但是如果 arweave.net 没有及时把 Bob 的数据广播给网络中的其他节点，或者只广播给了几个节点进行存储。如果发生这几个节点都不运行的情况，Bob 想从 arweave 网络上获取数据，是获取不到的。
arseeding 提供广播交易 data 到全网节点的功能，让交易 data 副本被全网节点存储。

#### 拉取交易 data
指定 arId 给 arseeding server， server 首先从 arweave.net 查询 arId 对应的 data，如果查询失败，则从 arweave 网络中的所有节点中去查询。
arweave 概率存储，意味着每个节点不需要存储所有的数据。即使是 arwave.net 网关也不可能存储了所有的链上数据。所以 arseeding 提供了此功能，帮助从全网节点获取指定交易的 data。

#### ANS-104 协议实现
接收 bundler item 交易，并聚合成 bundler 交易发送上链。
