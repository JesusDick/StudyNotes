const express = require('express')
const app = express()

// 定義第一個全局中間件
app.use((req, res, next) => {
    console.log('調用了第一個全局中間件')
    next()
})

// 定義第二個全局中間件
app.use((req, res, next) => {
    console.log('調用了第二個全局中間件')
    next()
})

// 定義一個路由
app.get('/user', (req, res) => {
    res.send('User page.')
})


app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})