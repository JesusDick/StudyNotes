//導入fs文件系統模組
const fs = require('fs')

//調用fs文件寫入函式
fs.writeFile('./day1_2.txt', 'Test_OK', function(err){
    if(err){
        return console.log('文件寫入失敗!', err.message)
    }

    console.log('文件寫入成功!')
})