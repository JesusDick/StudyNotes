const http = require('http')

// 創建服務器實例
const server = http.createServer()

// 綁定客戶端請求，當客戶端請求為 request 事件函數，就做什麼響應。
server.on('request', (req,res) => {
    // 1. 獲取請求的url地址
    const url = req.url

    // 2. 設置錯誤響應的網頁為 404 Not found
    let content = `<h1>404 Not found!</h1>`

    // 3. 判斷用戶請求的是否為 / 或 /index.html 首頁
    if(url === '/' || url ==='/index.html'){
        content = `<h1>首頁</h1>`

    // 4. 判斷用戶請求的是否為 /about.html 關於網頁
    }else if(url === '/about' || url === '/about.html'){
        content = `<h1>此為關於頁面</h1>`
    }

    // 5. 設置 Content-Type 響應頭，防止中文亂碼
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    // 6. 使用 res.end() 把內容返回給客戶端
    res.end(content)

})

server.listen(80, () => {
    console.log('Server running at http://127.0.0.1')
})


// *補充 : 關於 let 和 const 差別可以看這篇文章(https://ithelp.ithome.com.tw/articles/10199513)