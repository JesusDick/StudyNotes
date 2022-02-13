//導入fs模組，來操作文件
const fs = require('fs')

//fs.readFile()來讀取文件。
fs.readFile('./day1.txt','utf8',function(err,dataStr){
    console.log(err)
    console.log('-------')
    console.log(dataStr)
})