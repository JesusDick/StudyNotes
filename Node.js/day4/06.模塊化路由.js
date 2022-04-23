const express = require('express')
const app = express()

// 1. 導入路由模塊
const router = require('./07.Route')
// 2. 註冊路由模塊
app.use('/api',router)

// 注意 : app.use() 函數的作用，就是來註冊全局中間件

app.listen(80, () => {
    console.log("server running http://127.0.0.1")
})