// 導入 express 模塊
const express = require('express')
// 創建 express 的服務器實例
const app = express()

// 1. 定義中間件函數
const mw1 = (req, res, next) => {
    console.log('調用了第一個局部生效的中間件')
    next()
}

const mw2 = (req, res, next) => {
    console.log('調用了第二個局部生效的中間件')
    next()
}

// mw1 這個中間件，只在當前的路由中生效，這種用法屬於 "局部生效中間件"
// 2. 創建路由
app.get('/', mw1, mw2, (req, res) => {
    res.send('Home Page')
    
})

// mw1 這個中間件不會影響下面這個路由
app.get('/user',mw2, (req, res) => {
    res.send('user Page')
})


// 調用 app.listen() 方法，指定端口號並啟動web服務器
app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})