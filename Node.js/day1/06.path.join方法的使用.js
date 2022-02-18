const path = require('path')
const fs = require('fs')

// ../ ，這個字符串會回到前一個路徑，如同 cd ..
// const pathStr = path.join('/a', '/b/c', '../', './d', '/e')
// console.log(pathStr)

const pathStr02 = path.join(__dirname, '/day1.txt')
console.log(pathStr02)
fs.readFile(pathStr02, 'utf-8', function(err, dataStr){
    if(err){
        console.log('文件讀取失敗', err.message)
    }
    console.log('文件讀取成功\n', dataStr)
})
