
The Arweave network has several upgrades, and the block structure also has some changes during the upgrade process, mainly because some fields will be added to the block with each upgrade. Goar can help developers easily obtain indepHash of blocks.

## Block Structure

There are mainly following types of block structures:

- height < `422250`
- `422250` ≤ height < `633720`
- height ≥ `633720`

To query the specific block structure, you can visit the Arweave gateway.

Type in the browser:

```
https://arweave.net/block/height/{height}
`{height}` means the height of the query, such as `20000` .
```

You can modify the obtained data with json formatting tools

# Usage

Goar is already compatible with indep_hash calculations for various versions of the block structure.

```go
blockInfo := "block info"
block, err := utils.DecodeBlock(blockInfo)
if err != nil {
	panic(err)
}
indep_hash := utils.GenerateIndepHash(*block)
```

Note:

- `blockInfo` is the block information of Arweave. The above mentioned blockInfo is obtained by accessing the browser.
- `DecodeBlock` parses Arweave block information (json string) into golang block structure.
- `GenerateIndepHash` calculates the block’ s indepHash based on the block’ s height.