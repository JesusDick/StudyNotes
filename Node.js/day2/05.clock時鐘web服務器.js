// 1.1 導入 http 模組
const http  = require('http')
// 1.2 導入 fs 模組
const fs = require('fs')
// 1.3 導入 path 模組
const path = require('path')

// 2.1 創建 web 服務器
const server = http.createServer()

// 2.2 監聽 web 服務器的request事件
server.on('request', (req,res) => {

    // 3.1 獲取到客戶端請求的 URL 地址
    const url = req.url
    console.log(url)

    // 3.2 把請求的 URL 地址映射為具體文件的存放路徑
    //const fpath = path.join(__dirname, url)

    //5.1 預定一個空白的文件存放路徑。
    let fpath = ''
    if(url === '/'){
        fpath = path.join(__dirname,'./clock/index.html')
    }else{
        fpath = path.join(__dirname, '/clock', url)
    }

    // 4.1 根據"映射"過來的文件路徑讀取文件內容
    fs.readFile(fpath, "utf8", (err,dataStr) => {
        // 4.2 如果文件讀取失敗，向客戶端返回固定消息
        let errStr = `<h1>404 Not Found</h1>`
        if(err) return res.end(errStr)

        // 4.3 讀取成功，將讀取成功的內容，響應給客戶端
        res.end(dataStr)
    })
})

// 2.3 啟動服務器
server.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})