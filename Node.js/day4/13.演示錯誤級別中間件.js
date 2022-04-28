const express = require('express')
const app = express()

// 1. 定義路由
app.get('/', (req,res) => {
    // 1.1 人為的制造錯誤
    throw new Error('服務器內部發生了錯誤')

    res.send('Home page')
})


// 2. 定義錯誤級別中間件，捕獲整個項目的異常錯誤，從而防止程序的崩潰
app.use((err, req, res, next) => {
    console.log('發生了錯誤\n' + err.message)
    res.send('Error : ' + err.message)
})


app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})