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