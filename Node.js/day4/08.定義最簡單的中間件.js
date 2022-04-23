const express = require('express')
const app = express()

// // 定義一個最簡單的中間件函數
// const mw = function(req, res, next){
//     console.log('這是最簡單的中間件函數')
    
//     // 把流轉關係，轉交給下一個中間件或路由
//     next()
// }

// // 將 mw 註冊為全局生效的中間件
// app.use(mw)


// 簡化的全局中間件
app.use((req, res, next) => {
    console.log('這是最簡單的中間件函數')
    next()
})

app.get('/', (req, res) => {

    console.log('調用了 / 這個路由')

    res.send('Home page')
})

app.get('/user', (req, res) => {

    console.log('調用了 /user 這個路由')

    res.send('User page')
})

app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})