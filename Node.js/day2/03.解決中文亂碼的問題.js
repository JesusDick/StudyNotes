const http = require('http')
const server = http.createServer()

server.on('request', (req,res)=>{
    // 定義一個字符串，包含中文內容
    const str = `你請求的 URL 是 ${req.url}, 請求的 method 類型為 ${req.method}`
    
    // 調用 res.setHead() 方法，設置 Content-Type 響應頭，解決中文亂碼的問題。
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    // res.end() 將內容響應給客戶端。
    res.end(str)
})

server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})