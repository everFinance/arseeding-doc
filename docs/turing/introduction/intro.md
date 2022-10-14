# Overview

**What is Turing?**

Turing is an important infrastructure based on the Arweave ecosystem to build a storage consensus paradigm (SCP) APP. It allows users to upload and store any data sets to Arweave for permanently in a certain order. After the data sets are confirmed and packaged into the blockchain, turing pull these data from Arweave with the same order for further analysis and processing. Notably, the consistency of the order is quite important. When these data sets are used as an operation sequence, it means that the operation sequences drawn by any user from the blockchain are same. In this way, the same initial state is ensured, and the final consistency can be obtained after consistent operations.

Repo: [https://github.com/everFinance/turing](https://github.com/everFinance/turing)

# **Structure**

<div align="center"><img src="https://arseed.web3infra.dev/Wi_ELzEWLDD2h6vt3WtWdor_6SS10bJHfOi7i4CytXc" height="70%" width="70%"/></div>

The structure of Turing is shown as above. A brief introduction to the entire process is as follow, Get more information: reading [rollup](../rollup/intro.md) and [Tracker](../tracker/intro.md) specifically.

- The user submits the data items to the rollup module that needs to be uploaded, and rollup will encapsulate these data items into a tx data part of AR transactions according to the users’  submission order.
- rollup automatically assembles an AR transaction and sends it to the Arweave network, which enables the data items to be packed into blockchain.
- Tracker module obtains this AR transaction from Arweave based on the ID of AR transactions, takes out the tx data part of the AR transaction, and parses the tx data to obtain the data items in the same order as the uploaded one.
