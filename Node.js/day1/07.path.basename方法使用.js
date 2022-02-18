const path = require('path')

//定義文件存放路徑
const fpath = '/a/b/c/d/index.html'
const fullName = path.basename(fpath)
console.log(fullName)   //輸出: index.html

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt)     //輸出: index