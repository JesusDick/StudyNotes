// 1. 定義格式化時間的方法
function dateformat(dtStr){
    // 給定 一個時間字符串到 dtStr。
    const dt = new Date(dtStr)

    // 年(y)、月(m)、日(d)
    const y = dt.getFullYear()
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())

    // 時(hh)、分(mm)、秒(ss)
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
 }

 // 定義補零函數
 // 說明三元條件運算子 : 
 // ?前 : 表示要判斷的東西，?後 : 表示實施的目標 
 // :前 : 表示為 True ， :後 : 表示為 False
 // 以下整句 : 10(n) > 9 嗎(?,True) 10(n) = 10，否則 1(n) > 9 嗎(?,False)  0(字串) + 1(n) = 01
 function padZero(n){
    return n > 9 ? n : '0' + n
 }

 module.exports = {
     dateformat
 }