const express = require('express')



const app = express()


// 1. 導入自己封裝的中間件模塊
const customBodyParser = require('./18.custom-body-parser')

// 2. 將自訂義的中間件函數，註冊為全局可用的中間件
app.use(customBodyParser)

app.post('/user', (req, res) => {
    res.send(req.body)
})



app.listen(80, (req, res) => {
    console.log('server running http://127.0.0.1')
})