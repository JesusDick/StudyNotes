// 導入 express 模塊
const express = require('express')
// 創建 express 的服務器實例
const app = express()

// TODO_01：請配置 Session 中間件
const session = require('express-session')
app.use(session({
  secret: 'budliao',
  resave: false,
  saveUninitialized: true
}))


// 託管靜態頁面
app.use(express.static('./pages'))
// 解析 POST 提交過來的表單數據
app.use(express.urlencoded({ extended: false }))

// 登錄的 API 接口
app.post('/api/login', (req, res) => {
  // 判斷用戶提交的登錄信息是否正確
  if (req.body.username != 'admin' || req.body.password != '000000') {
    return res.send({ status: 1, msg: '登錄失敗' })
  }

  // TODO_02：請將登錄成功後的用戶信息，保存到 Session 中
  req.session.user = req.body  // 用戶的信息
  req.session.islogin = true   // 用戶的登入狀態

  res.send({ status: 0, msg: '登錄成功' })
})

// 獲取用戶姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：請從 Session 中獲取用戶的名稱，響應給客戶端
  if(!req.session.islogin){
    return res.send({ status: 1, msg: 'fail'})
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
})

// 退出登錄的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息 
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登入成功!'
  })
})

// 調用 app.listen 方法，指定端口號並啟動web服務器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1:80')
})