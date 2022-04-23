const http = require('http')
const server = http.createServer()

// req是請求對象，包含了與客戶端相關的數據和屬性
// () => {} 等價於 function(){}
server.on('request', (req,res)=>{
    // req.url 是客戶端請求的 URL 地址
    const url = req.url

    // req.method 是客戶端請求的 method 類型
    const method  = req.method

    // 是``(模板字符串)，不是''(普通字符串)
    const str = `Your request url is ${url}, and request method is ${method}`
    console.log(str)

    // 調用 res.end() 方法，向客戶端響應一些內容。
    res.end(str)
})

server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})