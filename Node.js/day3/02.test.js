// 導入 01.dateformat 的時間的自訂義模塊
const TIME = require('./01.dateformat')

// 調用方法，進行時間的格式化
const dt = new Date()
//console.log(dt)
const newDT = TIME.dateformat(dt)
console.log(newDT)