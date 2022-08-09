## order
```
type RespOrder struct {
    ItemId             string   //  用来查询数据的 id
    Bundler            string  // 收款人，Arseeding 数据上传者
    Currency           string // 需支付的 Token
    Decimals           int    // Token 的 decimal
    Fee                string  // 需支付的费用
    PaymentExpiredTime int64  // 订单过期时间
    ExpectedBlock      int64  // 预期该数据存储在 Arweave 上的区块号
}
```
note: No_Fee 模式下返回的 Fee 和 Currency 字段均为空。
## ever_tx
```
type Transaction struct {
	TokenSymbol  string `json:"tokenSymbol"`
	Action       string `json:"action"`
	From         string `json:"from"`
	To           string `json:"to"`
	Amount       string `json:"amount"`
	Fee          string `json:"fee"`
	FeeRecipient string `json:"feeRecipient"`
	Nonce        string `json:"nonce"`
	TokenID      string `json:"tokenID"`
	ChainType    string `json:"chainType"`
	ChainID      string `json:"chainID"`
	Data         string `json:"data"`
	Version      string `json:"version"`
	Sig          string `json:"sig"`

	ArOwner     string `json:"-"`
	ArTxID      string `json:"-"`
	ArTimestamp int64  `json:"-"`
}
```

## fee
```
type RespFee struct {
	Currency string // Token 类型
	Decimals int    // Token decimal
	FinalFee string // 需要支付的费用
}
```

## user_order
```
type Order struct {
	ID        uint      `gorm:"primarykey" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`

	ItemId   string `json:"itemId"`                   // bundleItem id
	Signer   string `gorm:"index:idx1" json:"signer"` // item signer
	SignType int    `json:"signType"`

	Size               int64  `json:"size"`
	Currency           string `json:"currency"` // payment token symbol
	Decimals           int    `json:"decimals"`
	Fee                string `json:"fee"`
	PaymentExpiredTime int64  `json:"paymentExpiredTime"` // uint s
	ExpectedBlock      int64  `json:"expectedBlock"`

	PaymentStatus string `json:"paymentStatus"` // "unpaid", "paid", "expired"
	PaymentId     string `json:"paymentId"`     // everHash

	OnChainStatus string `json:"onChainStatus"` // "waiting","pending","success","failed"
	ApiKey        string `gorm:"index:idx2" json:"-"`
}
```

## task
```
type Task struct {
	ArId           string `json:"arId"`
	TaskType       string `json:"taskType"`
	CountSuccessed int64  `json:"countSuccessed"`
	CountFailed    int64  `json:"countFailed"`
	TotalPeer      int    `json:"totalPeer"`
	Timestamp      int64  `json:"timestamp"` // begin timestamp
	Close          bool   `json:"close"`
}
```