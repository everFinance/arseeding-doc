### 同步和广播服务
##### Request
- Method: **POST**
- URL: ```/task/:taskType/:arid```
    - 同步 arTx: ```/task/sync/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg```
    - 广播 arTx: ```/task/broadcast/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg```
    - 只广播 arTx 元信息: ```/task/broadcast_meta/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg```
##### Response
```go
ok
```
### 停止指定的同步或广播任务
##### Request
- Method: **POST**
- URL: ```/task/kill/:taskType/:arid```
    - 同步 kill: ```/task/kill/sync/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg```
    - 广播 kill: ```/task/kill/broadcast/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg```
    - 广播 arTx meta kill: ```/task/kill/broadcast_meta/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg```
##### Response
```go
ok
```
