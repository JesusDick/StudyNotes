const itheima = require("../itheima-tools")

// 格式化時間的功能
// const dt = itheima.dateFormat(new Date())
// console.log(dt)

const htmlStr = '<h1 title="abc">這是h1標籤<span>123&nbsp;</span></h1>'

const str = itheima.htmlEscape(htmlStr)
console.log("將HTML標籤轉義 :",str)
console.log("----------------")
const str2 = itheima.htmlUnEscape(str)
console.log("此為還原HTML標籤 :", str2)