// 導入 express 模塊
const express = require('express')
// 創建 express 的服務器實例
const app = express()

// TODO_01：安裝並導入 JWT 相關的兩個包，分別是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

// 允許跨域資源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表單數據的中間件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// TODO_02：定義 secret 密鑰，建議將密鑰命名為 secretKey
const secretKey = '$budliao@1016!'

// TODO_04：註冊將 JWT 字符串解析還原成 JSON 對象的中間件
app.use(expressJwt.expressjwt({secret: secretKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}))

// 登錄接口
app.post('/api/login', function (req, res) {
  // 將 req.body 請求體中的數據，轉存為 userinfo 常量
  const userinfo = req.body
  // 登錄失敗
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登錄失敗！ '
    })
  }
  // 登錄成功
  // TODO_03：在登錄成功之後，調用 jwt.sign() 方法生成 JWT 字符串。並通過 token 屬性發送給客戶端
  const tokenStr = jwt.sign({username: userinfo.username}, secretKey, {expiresIn: '30s'})
  res.send({
    status: 200,
    message: '登錄成功！ ',
    token: tokenStr // 要發送給客戶端的 token 字符串
  })
})

// 這是一個有權限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.auth 獲取用戶信息，並使用 data 屬性將用戶信息發送給客戶端
  console.log(req.auth)
  res.send({
    status: 200,
    message: '獲取用戶信息成功！ ',
    data: req.auth // 要發送給客戶端的用戶信息
  })
})

// TODO_06：使用全局錯誤處理中間件，捕獲解析 JWT 失敗後產生的錯誤
app.use((err, req, res, next) => {
  // 若出現錯誤，就表示是由 token 解析失敗所導致。
  if(err.name === 'UnauthorizedError'){
    return res.status(401).sendFile('errtoken.html', {root: __dirname})
  }
  res.status(500).send({
    message: '未知的錯誤!'
  })
})

// 調用 app.listen 方法，指定端口號並啟動web服務器
app.listen(8888, function () {
  console.log('Express server running at http://127.0.0.1:8888')
})