const fs = require('fs')

// 出現路徑拼接錯誤的問題，是因為提供了 ./ 或 ../ 開頭的相對路徑。
// 如果要解決問題，可以提供一個完整的文件存放路徑(絕對路徑)。
/*fs.readFile('./day1.txt', 'utf8', function(err, dataStr){
    if(err){
        return console.log('文件讀取失敗! ', err.message)
    }

    console.log('文件讀取成功', dataStr)
})*/


// 此方法移植性較差，且不利於維護
// *每台電腦的絕對路徑都不同。
/*fs.readFile('C:\\Users\\name\\Desktop\\StudyNotes\\Node.js\\day1\\day1.txt', 'utf8', function(err, dataStr){
    if(err){
        return console.log('文件讀取失敗! ', err.message)
    }

    console.log('文件讀取成功', dataStr)
})*/


// __dirname 表示當前文件所處的目錄
console.log(__dirname)
fs.readFile(__dirname + '/day1.txt', 'utf8', function(err, dataStr){
    if(err){
        return console.log('文件讀取失敗! ', err.message)
    }

    console.log('文件讀取成功', dataStr)
})