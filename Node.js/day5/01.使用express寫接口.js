// 導入 express
const express = require('express')
// 創建服務器實例
const app = express()

// 配置表單數據的中間件
app.use(express.urlencoded({extended: false}))

// 必須在配置 cors 中間件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
    // TODO : 定義 JSONP 接口的具體過程
    // 1. 獲取客戶端發送過來的回調函數的名字
    const funcName = req.query.callback

    // 2. 定義要發送到客戶端的數據對象
    const data = {name:'jerry', age: 20}

    // 3. 拼接出一個函數調用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`

    // 4. 把拼接的字符串，響應給客戶端
    res.send(scriptStr)
})


// 一定要在路由之前，配置 cors 這個中間件，從而解決接口跨域的問題
const cors = require('cors')
app.use(cors())

// 導入路由模塊
const router = require('./02.apiRouter')

// 把路由模塊，註冊到 app 上
app.use('/api', router)

// 啟動服務器
app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})