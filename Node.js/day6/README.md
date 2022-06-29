# [01.session案例](./01.session%E6%A1%88%E4%BE%8B/app.js)
## step1. [安裝 express-session 中間件](./指令.md)
```
npm install express-session
```
## step2. 配置 express-session 中間件
express-session 中間件安裝成功後，需要通過 `app.use()` 來註冊 session 中間件。
```js
app.use(session({
    secret: '[可以為任何字符串]',
    resave: false,
    saveUninitialized: true,
}))
```
其中，`resave: false` 和 `saveUninitialized: true` 是固定的寫法。

## step3. 向 session 中存數據
* 注意 : `req` 本身並沒有 `session` 屬性，只有當配置了 [**express-session 中間件**](#step2-配置-express-session-中間件) 後，才能使用 `req.session`。

當 `express-session`中間件 配置成功後，即可通過 `req.session` 來訪問和使用 `session` 對象，從而儲存用戶的關鍵信息，其中 `req.session.user` 儲存了包含 `req.body.username` 和 `req.body.password` 的數據，即 **admin、000000**。
```js
app.post('/api/login', (req, res) => {
  if (req.body.username != 'admin' || req.body.password != '000000') {
    return res.send({ status: 1, msg: '登錄失敗' })
  }
  
  req.session.user = req.body  // 存儲用戶的信息
  req.session.islogin = true   // 紀錄用戶的登入狀態

  res.send({ status: 0, msg: '登錄成功' })
})
```

## step4. 從 session 中取數據
可以直接從 `req.session` 對象上獲取之前儲存的數據。
```js
app.get('/api/username', (req, res) => {
    if(!req.session.islogin){
        res.send({status: '1', msg: 'fail'})
    }
    res.send({
        status: '0',
        msg: 'success',
        username: req.session.user.username
    })
})
```
### step5. 清空session
* 注意 : 調用`req.session.destory()` 函數，只清除當前用戶的session信息，並不會清除其他用戶的信息。
可以調用`req.session.destory()` 函數，即可清空服務器保存的 session信息。
```js
app.post('/api/logout', (req,res) => {
    req.session.destroy()
    res.send({
        status: '0',
        msg: '退出成功'
    })
})
```