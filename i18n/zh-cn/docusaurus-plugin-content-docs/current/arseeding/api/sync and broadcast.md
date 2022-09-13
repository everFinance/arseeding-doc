# 同步和广播服务

一个 Arseeding 可以开启多个调度任务，开发者可以增加、查看和删除调度任务。

调度任务分为三种类型：

1. Sync：向全网发起指定 arid 的数据同步任务。
2. Broadcast：将指定 arid 的数据向全网进行广播。
3. BroadcastMeta：将指定 arid 的 meta 信息向全网进行广播。

### 同步和广播

开发者可以使用下列接口开启三种调度任务。

**Request**

- Method: **POST**
- URL: `/task/:taskType/:arid`
  - 同步 arTx: `/task/sync/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - 广播 arTx: `/task/broadcast/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - 只广播 arTx 元信息: `/task/broadcast_meta/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`

**Response**

```json
ok
```

### 查看正在执行的任务

开发者可以对调度任务进行查看和管理。

**Request**

- Method: **GET**
- URL: /task/cache

**Response**

```json
{
    "tasks": {
        "broadcast-uYOHcFmnCsJzf3c9CXEqF9zq6iWxr6eTFhCWhGDMnwg": {
            "arId": "uYOHcFmnCsJzf3c9CXEqF9zq6iWxr6eTFhCWhGDMnwg",
            "taskType": "broadcast",
            "countSuccessed": 20,
            "countFailed": 88,
            "totalPeer": 112,
            "timestamp": 1658845267,
            "close": false
        }
    },
    "total": 1
}
```

`taskType`: 正在执行的任务类型

`countSuccessed`: 该任务当前成功交互的节点数量

`countFailed`: 该任务当前失败交互的节点数量

`totalPeer`: 需要交互的总的节点数量

`timestamp`: 创建任务的时间戳

`close`: false 代表任务未关闭状态

### 停止任务

可以使用下面三种方法结束 Sync、Broadcast 和 BroadcastMeta 任务。

**Request**

- Method: **POST**
- URL: `/task/kill/:taskType/:arid`
  - 同步 kill: `/task/kill/sync/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - 广播 kill: `/task/kill/broadcast/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - 广播 arTx meta kill: `/task/kill/broadcast_meta/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`

**Response**

```bash
ok
```

