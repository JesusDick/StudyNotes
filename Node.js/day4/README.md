# day4
## [01.使用express創建最基本的服務器.js](./01.使用express創建最基本的服務器.js)
* ### 若想查看結果可以使用 [Postman](https://www.postman.com/)，需要註冊和下載桌面代理。
執行下方程式碼，並打開 **Postman** 查看，並將網址如下圖的方式輸入到 **Postman** 的網址欄中。

<img src="./pict/使用Postman.png" width="70%">

* 並且欄位左邊的下拉選單可以選擇使用的方法

<img src="./pict/使用Postman02.png" width="60%">

---
1. `const express = require('express')` : 導入 express。
2. `const app = express()` : 創建 Web 服務器。
3. `app.get('/user', (req,res) => {}` : 監聽客戶端的 GET 和 POST 請求，並向客戶端響應具體的內容。
4. `res.send({name:'jerry',age:20,gender:'男'})` : 調用 express 提供的 res.send() 方法，向客戶端響應一個 **JSON** 對象，該對象內擁有 **name、age、gender** 三種屬性。
5. `app.post('/user', (req,res) => {}` : 跟上面的 `app.get()` 同原理，只不過這裡監聽的是 `POST` 方法。
6. `res.send('請求成功')` : 調用 **express** 提供的 `res.send()` 方法，向客戶端響應一個 **文本字符串**。
7. `console.log(req.query)` : 在終端介面打印出，通過 `req.query()` 獲取到客戶端發送過來的查詢字符串(`?`)之後的參數。
    * 注意 : 默認情況下，`req.query()` 是一個空對象

8. `res.send(req.query)` : 將查詢字符串(`?`)之後的參數，響應回給客戶端。
9. `app.get('/user/:ids/:name', (req,res) => {}` : 可以通過下面的 `req.params()`，獲取到冒號(`:`)之後的[動態參數](../Express基礎.md#4-獲取url中的動態參數day401使用express創建最基本的服務器js)。
    * 注意 : `req.params()` 默認是一個空對象。
10. `console.log(req.params)` : 將獲取到的動態參數，打印在終端介面上。
11. `res.send(req.params)` : 將獲取到的動態參數，響應回客戶端上。
12. 啟動 Web 服務器 :
```js
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})
```
---
```js
const express = require('express')

const app = express()

app.get('/user', (req,res) => {
    res.send({name:'jerry',age:20,gender:'男'})
})

app.post('/user', (req,res) => {
    res.send('請求成功')
})

// 寫入README.md : 一樣對 Postman 欄位寫入 `http:/127.0.0.1/?name=jerry&age=20`，
// 就可以看到`req.query`的效果，如下圖
app.get('/', (req,res) => {
    console.log(req.query)
    res.send(req.query)
})

// 注意: 這裡的 :id 是一個動態的參數
// 例如 : 可以在瀏覽器的搜尋欄輸入 http://127.0.0.1/user/2/jerrey 測試
app.get('/user/:ids/:name', (req,res) => {
    console.log(req.params)
    res.send(req.params)
})

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})
```
---
*  一樣對 Postman 欄位寫入 `http:/127.0.0.1/?name=jerry&age=20`，就可以看到`req.query`的效果，如下圖。
```js
app.get('/', (req,res) => {
    console.log(req.query)
    res.send(req.query)
})
```

<img src="./pict/req.query.png" width="60%">