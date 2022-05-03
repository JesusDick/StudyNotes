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
5. `app.post('/user', (req,res) => {}` : 跟上面的 `app.get()` 同原理，只不過這裡監聽的是 **POST** 方法。
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

app.get('/', (req,res) => {
    console.log(req.query)
    res.send(req.query)
})

app.get('/user/:ids/:name', (req,res) => {
    console.log(req.params)
    res.send(req.params)
})

app.listen(80, () => {
    console.log('express server running at http://127.0.0.1')
})
```
---
* 以下為使用 **POST** 方法的效果
```js
app.post('/user', (req,res) => {
    res.send('請求成功')
})
```

<img src="./pict/使用Postman03.png" width="60%"> 

*  一樣對 Postman 欄位寫入 `http:/127.0.0.1/?name=jerry&age=20`，就可以看到`req.query`的效果，如下圖。
```js
app.get('/', (req,res) => {
    console.log(req.query)
    res.send(req.query)
})
```

<img src="./pict/req.query.png" width="60%">


* 可以在瀏覽器的搜尋欄輸入 `http://127.0.0.1/user/2/jerrey` 測試，就可以看到`req.params`的效果，如下圖。
```js
app.get('/user/:ids/:name', (req,res) => {
    console.log(req.params)
    res.send(req.params)
})
```
<img src="./pict/req.params03.png" width="60%">
---

## [02.使用express.static對外提供靜態資源.js](./02.使用express.static對外提供靜態資源.js)
1. `app.use(express.static('./clock'))` : 在這裡，調用 `express.static()` 方法，快速的對外提供靜態資源，這樣我們就可以快速瀏覽 **clock** 目錄內的所有檔案。
```js
const express = require('express')
const app = express()

app.use(express.static('./clock'))

app.listen(80, () => {
    console.log('express server running http://127.0.0.1')
})
```

## [03.託管多個靜態資源.js](./03.託管多個靜態資源.js)
要想託管多個靜態資源，只要重複調用 `express.static()` 即可。

但這會涉及到 **優先順序問題**，因 **files 和 clock** 目錄內都有 `index.html` 檔，但 **files** 目錄先被 `express.static()` 讀取，所以會先顯示 **files** 目錄內的 `index.html`。

要想解決這問題可以使用 [04.在express.static前掛載路徑前綴.js](./04.在express.static前掛載路徑前綴.js) 內的寫法解決；介紹將會在下面的主題講解。
```js
const express = require('express')
const app = express()

app.use(express.static('./files'))
app.use(express.static('./clock'))

app.listen(80, () => {
    console.log('express server running http://127.0.0.1')
})
```

## [04.在express.static前掛載路徑前綴.js](./04.在express.static前掛載路徑前綴.js)
加上前綴名可以解決 **優先順序問題**，因使用 `express.static()` 託管的靜態資源，在路徑上是一樣的，為了 **區分不同目錄**，但 **同路徑的資源**，所以我們可以 **加上前綴名**，這樣我們就可以 **訪問到不同路徑上的不同目錄中的資源** 了。

---

1. `app.use('/files',express.static('./files'))` : 為 **files** 目錄，加上前綴名。
```js
const express = require('express')
const app = express()

app.use('/files',express.static('./files'))
app.use(express.static('./clock'))

app.listen(80, () => {
    console.log('express server running http://127.0.0.1')
})
```
* 執行上方代碼，在瀏覽器搜尋欄分別訪問`http://127.0.0.1`、`http://127.0.0.1/files`查看效果。

## [05.最簡單的路由用法.js](./05.最簡單的路由用法.js)
這與 [**01.使用express創建最基本的服務器.js**](./01.使用express創建最基本的服務器.js) 沒有太大差異，與此不再贅述。
```js
const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.post('/', (req,res) => {
    res.send('Post Request!')
})

app.listen(80, () => {
    console.log('express server running http://127.0.0.1')
})
```

## [06.模塊化路由.js](./06.模塊化路由.js)
* 注意 : `app.use()` 函數的作用，就是來註冊[全局中間件](../Express基礎.md#8-中間件概念day408定義最簡單的中間件js)

將 **Express** 路由模塊化，可以使我們的代碼更加精簡，如何將路由模塊化可以看 [**07.Route.js**](./07.Route.js)。

---
1. `const router = require('./07.Route')` : 導入路由模塊。
2. `app.use('/api',router)` : 註冊路由模塊，並統一加上前綴名(`/api`)。

```js
const express = require('express')
const app = express()

const router = require('./07.Route')

app.use('/api',router)

app.listen(80, () => {
    console.log("server running http://127.0.0.1")
})
```
* 執行該代碼後，請使用 **Postman** 操作查看效果，`http://127.0.0.1/api/user/list`、`http://127.0.0.1/api/user/add`。
  
## [07.Route.js](./07.Route.js)

* 該模塊的展示請在 [06.模塊化路由.js](./06.模塊化路由.js) 執行，這是路由模塊。

1. `const router = express.Router()` : 創建路由對象。
2. `router.get('/user/list', (req, res) => {res.send("Get User List!")}` : 掛載具體的路由，並響應客戶端字符串。
3. `router.post('/user/add', (req, res) => {res.send('Add New User!')}` : 同上原理，但獲取 **POST** 方法。
4. `module.exports = router` : 向外導出路由對象。

```js
const express = require('express')

const router = express.Router()


router.get('/user/list', (req, res) => {
    res.send("Get User List!")
})

router.post('/user/add', (req, res) => {
    res.send('Add New User!')
})

module.exports = router
```

## [08.定義最簡單的中間件.js](./08.定義最簡單的中間件.js)
* 更多的中間件介紹可以看[這裡](../Express基礎.md#8-中間件概念day408定義最簡單的中間件js)。
* 注意 : 若是一個中間件，**記得要在路由之前，並加上 `next()`**。


1. 定義一個最簡單的中間件函數 :
```js
const mw = function(req, res, next){
    console.log('這是最簡單的中間件函數')
    
    next()
}
```
> **next()** :
>> 把流轉關係，轉交給下一個中間件或路由
>
> 簡單說明 : 
>> 中間件享有共同的 `req`、`res` 函數，也就是說在中間件處理過的 `req`、`res` 函數，會轉交給下個中間件或路由，就像推積木一樣，一層層的推積。

2. `app.use(mw)` : 將 mw 註冊為全局生效的中間件。
```js
const express = require('express')
const app = express()

const mw = function(req, res, next){
    console.log('這是最簡單的中間件函數')
    
    next()
}

app.use(mw)

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
```
---
* 上方代碼可以再精簡，如下方代碼所示。
```js
const express = require('express')
const app = express()

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
```

## [09.體驗中間件的作用.js](./09.體驗中間件的作用.js)

1. `const time = Date.now()` : 獲取到當前的時間值(毫秒)。
2. `req.startTime = time` : 使用`req.startTime`儲存獲取的時間。
3. `res.send('Home page' + req.startTime)` : 向客戶端響應字符串和`req.startTime`儲存的時間值。

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {

    const time = Date.now()
    req.startTime = time

    next()
})

app.get('/', (req, res) => {

    res.send('Home page' + req.startTime)
})

app.get('/user', (req, res) => {

    res.send('User page' + req.startTime)
})

app.listen(80, () => {
    console.log('server running http://127.0.0.1')
})
```