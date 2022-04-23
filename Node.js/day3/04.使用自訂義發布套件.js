// 該執行檔使用了 [itheima-tools目錄](./itheima-tools) 內的自訂義套件
const itheima = require("./itheima-tools")

// 格式化時間的功能
const dt = itheima.dateFormat(new Date())
console.log(dt)
console.log("----------------")
const htmlStr = '<h1 title="abc">這是h1標籤<span>123&nbsp;</span></h1>'

// 測試自訂義的套件是否可以將 html標籤 轉義為 實體字符
const str = itheima.htmlEscape(htmlStr)
console.log("將HTML標籤轉義 :",str)
console.log("----------------")

// 測試自訂義的套件是否可以將 實體字符 轉義為 html標籤
const str2 = itheima.htmlUnEscape(str)
console.log("此為還原HTML標籤 :", str2)