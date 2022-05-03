// 導入 express
const express = require('express')
// 創建服務器實例
const app = express()

// 配置表單數據的中間件
app.use(express.urlencoded({extended: false}))

app.use(express.json())


// 導入路由模塊
const router = require('./20.apiRouter')

// 先前說過 `app.use()` 就是註冊全局中間件，所以在這邊可以認為 router 就是一個中間件
app.use('/api', router)

// 啟動服務器
app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})