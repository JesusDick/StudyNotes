//導入fs模組，來操作文件
const fs = require('fs')

//fs.readFile()來讀取文件。當讀取出現錯誤時
fs.readFile('./day11.txt','utf8',function(err,dataStr){
    //當讀取出現錯誤時，回傳錯誤訊息
    if(err){
        return console.log("文件讀取失敗!" + err.message)
    }
    console.log(dataStr)
})