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