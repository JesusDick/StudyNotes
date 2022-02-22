// 1.1 導入fs模組
const fs = require('fs')
// 1.2 導入path模組
const path = require('path')


// 1.3 定義正則表達式，分別匹配<style></style> 和 <script></script> 標籤
//  其中 \s 表示空白字符； \S 表示非空白字符； * 表示匹配任意次
//  整句表示: 匹配<style>標籤內的任意字符，不管是空白還是非空白，且無次數限制直到結尾標籤</style>出現
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/


// 2.1 調用 fs.readFile() 方法讀取文件
fs.readFile(path.join(__dirname, '/files/index.html'), 'utf8', function(err, dataStr){
    // 2.2 讀取 HTML文件失敗
    if(err) return console.log('文件讀取失敗'+ err.message)
    // 2.3 賭取文件成功後，調用對應的三個方法，分別拆解 css, js, html
    resolveCSS(dataStr)
    resolveJS(dataStr)
    resolveHTML(dataStr)
})

// 3.1 定義處理 css 樣式的方法
function resolveCSS(htmlStr){
    // 3.2 使用正則提取需要的內容
    const r1 = regStyle.exec(htmlStr)
    //console.log(r1)
    //console.log('\n---\n')
    //console.log(r1[0])
    //console.log('\n---\n')
    // 3.3 將提取出來的樣式字符串，進行字符串的 replace 替換的操作
    const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
    //console.log(newCSS)

    // 3.4 調用 fs.writeFile() 方法，將提取的樣式，以 index.css 的文件寫入到 時鐘 目錄
    fs.writeFile(path.join(__dirname, '/clock/index.css'), newCSS, function(err){
        if(err) return console.log('寫入 CSS樣式 失敗!~'+ err.message)
        console.log('寫入樣式成功!~')
    })
}

// 4.1 定義處理 js 腳本的方法
function resolveJS(htmlStr){
    // 4.2 通過正則，提取對應的 <script></script> 標籤內容 
    const r2 = regScript.exec(htmlStr)
    // console.log(r2) 
    // console.log('\n---\n')
    // console.log(r2[0])
    // console.log('\n---\n')

    // 4.3 提取出來的內容中的 <script></script> 標籤做替換
    const newJS = r2[0].replace('<script>', '').replace('</script>', '')
    // console.log(newJS)

    // 4.4 將處理的結果，以 index.js 寫入到 時鐘 目錄內
    fs.writeFile(path.join(__dirname, '/clock/index.js'), newJS, function(err){
        if(err) return console.log('寫入 JS 失敗!~' + err.message)
        console.log('寫入 JS 成功!~')
    })
}

// 5.1 定義處理 HTML 結構的方法
function resolveHTML(htmlStr){
    // 5.2 將字符串調用 replace 方法，把內嵌的 <style> 和 <script> 標籤，替換為外連的 <link> 和 <script> 標籤
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css">').replace(regScript, '<script src="./index.js"></script>')
    // 5.3 寫入 index.html 這個文件
    fs.writeFile(path.join(__dirname, '/clock/index.html'), newHTML, err => {
        if(err) return console.log('寫入 HTML頁面 失敗!~' + err.message)
        console.log('寫入 HTML頁面 成功!~')
    })
}
