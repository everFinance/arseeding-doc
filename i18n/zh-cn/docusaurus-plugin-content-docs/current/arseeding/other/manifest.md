## 介绍
Arweave Manifests 是实现 Permaweb 的重要手段之一。

Manifest 是 Arweave ID(包括原生交易 ID 和 bundle ID) 和名称的映射。 该映射被放入标准化的 JSON 结构并永久存储在 Arweave 上，它允许用户创建结构化的分组内容。 Arweave 网关以及 Arseeding 节点都可以解析这种结构，因此用户可以通过路径访问单个数据 item。

这使得网站维护者、NFT 创作者或任何其他用户更容易通过单个“主”清单交易以及单独的文件路径和名称来引用他们的数据。 这使得你可以使用更友好的 URL，例如...

https://arweave.net/Bgw5-GwpymUoe5VMeb-No9WWXpjWsq_8g4oeiGP5RnA/0.png

https://arweave.net/Bgw5-GwpymUoe5VMeb-No9WWXpjWsq_8g4oeiGP5RnA/333.png

...而不是通过每一张图片在 arweave 上的 ID 来访问它：

https://arweave.net/ISvPQyG8qWzJ1Pv5em5xK8Ht38HZ3ub1fPHbFEqDPK0

https://arweave.net/nHuFsR2Y-e_qtnsmj0avn37CTWxlZ4zvG_CKwtldK3I

该标准最初由 Arweave 团队创建。 有关其动机、模式和路径解析等更多细节可以在他们的 wiki 中找到。

https://github.com/ArweaveTeam/arweave/wiki/Path-Manifests

使用 Arseeding，任何文件夹都可以变成 Manifest 清单模式。 文件名和路径都将在 Arweave Manifest 中表示，使开发人员和用户更容易通过本地文件系统上使用的名称来引用他们的内容。

Manifest 必须是公开的、未加密的数据，以便 Arweave 网关或 Arseeding 节点对其进行解析。