const express = require('express')

const app = express()

// 1. 導入解析表單數據的中間件 body-parser
const parser = require('body-parser')

// 2. 使用 app.use() 註冊中間件
app.use(parser.urlencoded({extended: false})) 
// app.use(express.urlencoded({extended: false}))


app.post('/user', (req, res) => {
     //如果沒有配置任何解析表單數據的中間件，則 req.body 默認等於 undefined
    console.log(req.body)
    
    res.send('OK')
})





app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})