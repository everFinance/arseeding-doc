## Synchronization and broadcasting services

Arseeding can open multiple scheduling tasks. Developers can add, view and delete scheduling tasks.

There are three types of scheduling tasks.

1. Sync: Launch a data synchronization task to the whole network for the specified arid.
2. Broadcast: Broadcast the data of the specified arid to the whole network.
3. BroadcastMeta: Broadcast the meta information of the specified arid to the whole network.

### Synchronization and broadcasting

Developers can enable three scheduling tasks using the following interfaces.

**Request**

- Method: **POST**
- URL: `/task/:taskType/:arid`
  - Sync arTx: `/task/sync/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - Broadcast arTx: `/task/broadcast/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - Only broadcast arTx metadata: `/task/broadcast_meta/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`

**Response**

```json
ok
```

### Inspect ongoing tasks

Developers can view and manage scheduling tasks.

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

`taskType`: the type of task being executed

`countSuccessed`: the number of nodes that the task is currently interacting with successfully

`countFailed`: the number of nodes that the task has failed to interact with

`totalPeer`: the total number of nodes that need to be interacted with

`timestamp`: timestamp of the task creation

`close`: false means the task is not closed

### Kill task

The Sync, Broadcast and BroadcastMeta tasks can be terminated using the following three methods.

**Request**

- Method: **POST**
- URL: `/task/kill/:taskType/:arid`
  - Sync kill: `/task/kill/sync/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - Broadcast kill: `/task/kill/broadcast/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`
  - Broadcast arTx meta kill: `/task/kill/broadcast_meta/DW02g9sZaajWHSb6BHZ7371qxhANizyxPfXpX7SS-Jg`

**Response**

```bash
ok
```