# Node.js的第二天
## http模組範例
### [01.創建基本的Web服務器.js](./01.創建基本的Web服務.js)
1. `const server = http.createServer()` : 創建一個服務器，命為`server`。
2. `server.on('request', function(req, res){})` : 為服務器開啟監聽事件，監聽`request`請求。
    > `request` : 當有網頁遭到瀏覽就會觸發此事件。
    > 
    > `function(req,res)` : 當是`request`事件該如何回應客戶端。
    >> `req` : 擷取客戶端相關請求的數據和屬性
    >>
    >> `res` : 向客戶端響應內容
* [想看更多事件內容可以點我](https://nodejs.org/dist/latest-v16.x/docs/api/http.html)

3. `server.listen(8080, function(){})` : 啟動服務器，並監聽連線。
    > `8080` : `http`預設埠為80，我把它改成8080


```
const http = require('http')

const server = http.createServer()

server.on('request', function(req, res){ 
    console.log('Someone visit our web server')
})

server.listen(8080, function(){
    console.log('server running at http://127.0.0.1:8080')
})
```
---
### [02.了解req請求對象.js](./02.了解req請求對象.js)
1. `const url = req.url` : req.url 是客戶端請求的 URL 地址
2. `const method  = req.method` : req.method 是客戶端請求的 method 類型
3. `${url}` : 關於此方法可以點[這裡](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/First_steps/Strings)

```
const http = require('http')
const server = http.createServer()

server.on('request', (req,res)=>{

    const url = req.url

    const method  = req.method

    const str = `Your request url is ${url}, and request method is ${method}`
    console.log(str)

    res.end(str)
})

server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})
```
---
### [03.解決中文亂碼的問題.js](./03.解決中文亂碼的問題.js)
`res.setHeader('Content-Type', 'text/html; charset=utf-8')` :
> `Content-Type` : 告訴瀏覽器以什麼編碼格式解析發送的內容。
>
>`text/html; charset=utf-8` : 通過此參數，告訴`Content-Type`，使用此編碼來解析參數。

```
const http = require('http')
const server = http.createServer()

server.on('request', (req,res)=>{
    const str = `你請求的 URL 是 ${req.url}, 請求的 method 類型為 ${req.method}`
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    res.end(str)
})

server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})
```
---
### [04.根據URL返回不同的網頁.js](./04.根據URL返回不同的網頁.js)
`if(url === '/' || url ==='/index.html'){}` : 如果請求的字符串全等於`/`或`/index.html`
就返回網頁內容為`首頁`。

```
const http = require('http')
const server = http.createServer()

server.on('request', (req,res) => {
    const url = req.url

    let content = `<h1>404 Not found!</h1>`

    if(url === '/' || url ==='/index.html'){
        content = `<h1>首頁</h1>`

    }else if(url === '/about' || url === '/about.html'){
        content = `<h1>此為關於頁面</h1>`
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(content)

})

server.listen(80, () => {
    console.log('Server running at http://127.0.0.1')
})
```
* 補充 : 關於 let 和 const 差別可以看[這篇文章](https://ithelp.ithome.com.tw/articles/10199513)
---
### [05.clock時鐘web服務器.js](./05.clock時鐘web服務器.js)

#### 1. 獲取文件路徑 

1. `const url = req.url` : `url`只有獲取***根路徑***(`/`)
* 如果我們要想獲取到`index.html`檔，那我們必須要在搜尋欄手動打上`/clock/index.html`。

2. `index.html` : 內會自動獲取同級目錄(`/clock`)的`/index.js`、`/index.css`，兩個文件。
    > 因為在`index.html`檔內有 : 
    >> `<link rel="stylesheet" href="./index.css">`
    >>
    >> `<script src="./index.js"></script>`

3. `const fpath = path.join(__dirname, url)` :
那`clock`目錄實際存在`/day2`目錄內，跟`05.clock時鐘web服務器.js`是一樣的，那我們可以用`__dirname`來獲取到，`/day2`目錄前面的所有路徑。


```
const http  = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req,res) => {


    const url = req.url

    const fpath = path.join(__dirname, url)

    fs.readFile(fpath, "utf8", (err,dataStr) => {
        let errStr = `<h1>404 Not Found</h1>`
        if(err) return res.end(errStr)

        res.end(dataStr)
    })
})

server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})
```

#### 2. 優化

1. `let fpath = ''` : 不想與其他作用域互相干擾，只在該作用域內執行就用`let`.
2. `fpath = path.join(__dirname,'./clock/index.html')` : 當瀏覽網頁時，自動幫客戶端補上`./clock/index.html`

```
    let fpath = ''
    if(url === '/'){
        fpath = path.join(__dirname,'./clock/index.html')
    }else{
        fpath = path.join(__dirname, '/clock', url)
    }
```

#### 3. 完整代碼
```
const http  = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer()

server.on('request', (req,res) => {

    const url = req.url
    console.log(url)

    let fpath = ''
    if(url === '/'){
        fpath = path.join(__dirname,'./clock/index.html')
    }else{
        fpath = path.join(__dirname, '/clock', url)
    }

    fs.readFile(fpath, "utf8", (err,dataStr) => {
        let errStr = `<h1>404 Not Found</h1>`
        if(err) return res.end(errStr)

        res.end(dataStr)
    })
})
server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})
```

## 導入自訂義模塊

### [06.自訂模塊.js](./06.自訂模組.js)
* 該模塊要和[07.使用自訂模塊.js](/07.js)搭配使用
```
var test = "你使用了自訂模組範例"
```

### [07.使用自訂模塊.js](./07.使用自訂模組.js)
* 該代碼是去執行 **[06.自訂模塊.js](./06.自訂模組.js)** 。
1. 注意 : 在使用 `require()` 加載用戶自訂義的模組期間，可以省略 **.js** 的副檔名
2. 使用自訂模塊時，如果該模塊內的函數或方法沒有對外公開的話，是讀取不到該函數或方法的。
3. 預設導入的自訂義模塊都是 **空對象( `{ }` )**，也就是 ***Node.js*** 自動對外空開的屬性，
```
const custom = require('./06.自訂模組')
console.log(custom)
```

### [08.模塊作用域.js](./08.模塊作用域.js)
* 我將在 **[09演示模塊作用域.js](./09.演示模塊作用域.js)** 去執行該模塊。
我們在該模塊內寫入一些函數代碼，但沒有對外公開它，這跟 [06.自訂模塊.js](./06.自訂模組.js) 很相似。
```
const username = '傑夫'
function sayHello(){
    console.log('大家好，我是'+ username)
}
```

### [09.演示模塊作用域.js](./09.演示模塊作用域.js)
* 我將會去讀取 **[08.模塊作用域.js](./08.模塊作用域.js)** 的模塊內的變數和方法。
當我們去執行該代碼時，可以發現得到的是一個 **空對象(`{ }`)**，是因為我們沒有對外公開 **[08.模塊作用域.js](./08.模塊作用域.js)** 內的變數和方法，這點跟 **[07.使用自訂模塊](./07.使用自訂模組.js)** 很像。
```
const username = require('./08.模塊作用域')
console.log(username)
```

### [10.演示module對象.js](./10.演示module對象.js)
我們可以在終端機上執行該文件，印出它的所有 **屬性**和 **它所在的位置**。
```
console.log(module)
```

### [11.自訂義模塊.js](./11.自訂義模塊.js)
* 我們將嘗試對外公開一些變數和方法。
1. `module.exports.username = '傑瑞'` : 用`module.exports`對外公開`username`這個屬性內的資料(也就是傑瑞這個字串)。
2. 用`module.export`對外公開 sayHello 方法
    ```
    module.exports.sayHello = function(){
    console.log('Hello Node.js!')
    }
    ```
3. `const age = 20` : 我們之後會對外公開該變數，**現階段可理解為，該變數是這個模塊或代碼內的私有變數**，其他的代碼是無法去使用或讀取到該變數的。
4. `module.exports.age = age` : 我去對外公開 `age`變數，使他的屬性為 `age`，其他的執行檔想讀取該變數內容時，是使用它對外公開的屬性，也就是 **`age`**。
5. 我們在讀取自定義模塊時，最終的讀取對象是`module.exports`指向的對象。
    ```
    module.exports = {
        nickname : '小白',
        sayHi(){
            console.log('Hi!')
        }
    }
    ```
---
```
module.exports.username = '傑瑞'


module.exports.sayHello = function(){
    console.log('Hello Node.js!')
}

const age = 20

module.exports.age = age

module.exports = {
    nickname : '小白',
    sayHi(){
        console.log('Hi!')
    }
}
```

### [12.導入11模塊.js](./12.導入11模塊.js)
* 在外界使用 `require()` 導入一個自訂義模塊的時候，得到的成員就是那個模塊中使用 `module.export` 指向的那個對象
```
const m = require('./11.自訂義模塊')

console.log(m)
```

### [13.export對象.js](./13.export對象.js)
* 我們將介紹 **`module.exports`** 的簡化寫法。
我們完全可以使用 `exports` 這個簡化寫法去取代 `module.exports`，
執行該代碼就可以發現 `exports` 是全等於 `module.exports` 的屬性。
```
console.log(exports)
console.log(module.exports)

console.log(exports === module.exports)
```

### [14.exports的最終對象.js](./14.export的最終對象.js)
1. 我們可以使用`exports`去對外公開 **變數** 和 **方法** 的，效果和使用 `module.exports` 是一樣的。
2. 但是在我們讀取該模塊時，最終向外共享的對象，永遠都是 `module.exports` 所指向的為主。
```
const username = '傑瑞'

exports.username = username

exports.age =20

exports.sayHello = function(){
    console.log('大家好!，我是傑瑞')
}

module.exports = {
    nickname : '小傑',
    sayHi(){
        console.log('我是小傑!')
    }
}
```

### [15.導入14模塊查看最後對象.js](./15.導入14模塊查看最後對象.js)
1. 我們將去執行[14.exports的最終對象.js](./14.export的最終對象.js)，看看效果是否一樣
2. 並驗證最終向外共享的對象是否為 `module.exports` 所指向的為主，我可以去嘗試註解[14.exports的最終對象.js](./14.export的最終對象.js)的 ***14-19行*** 看看差別。
```
const m = require('./14.export的最終對象')
console.log(m)
```