# Node-nginx-log

# Start

### 1. 复制配置文件
```
$ cd server/config
$ cp config.js.back config.js
$ vim config.js #根据自己的环境来修改
```
#### logPath 存放nginx-log的目录

### 2. 创建数据库以及数据表 

### 3. 启动服务
```
$ pm2 start server/index.js
```


