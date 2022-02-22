const fs = require('fs')

fs.readFile('./files/成績.txt', 'utf8',function(err, dataStr){
    if(err){
        return console.log('文件讀取失敗', err.message)
    }

// 4.1 先把成績的數組，按造空格分割
const arrOld = dataStr.split(' ')
console.log(arrOld)

// 4.2 循環分割後的數組，對每一項數據，進行字符串的替換
const arrNew = []
arrOld.forEach(item => {
    arrNew.push(item.replace('=', ':'))
})
console.log(arrNew)

// 4.3 把新數組中的每一項，進行合併，得到一個新的字符串。
const newStr = arrNew.join('\r\n')
console.log(newStr)

// 5. 調用fs.writeFile()方法，把處理完畢的成績，寫入到新文件中。
fs.writeFile('./成績-OK.txt', newStr, function(err){
    if(err){
        return console.log('文件寫入失敗!', err.message)
    }
    console.log('文件寫入成功!')
})

})

