// 1. 導入http模組
const http = require('http')

// 2. 創建服務器實例
const server = http.createServer()

// 3. 為服務器綁定"request"事件，監聽客戶端的請求
//https://nodejs.org/dist/latest-v16.x/docs/api/http.html
server.on('request', function(req, res){ 
    console.log('Someone visit our web server')
})

// 4. 啟動服務器
server.listen(8080, function(){
    console.log('server running at http://127.0.0.1:8080')
})