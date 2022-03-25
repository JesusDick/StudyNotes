// 在外界使用 require 導入一個自訂義模塊的時候，得到的成員
// 就是那個模塊中使用 module.export 指向的那個對象
const m = require('./11.自訂義模塊')

console.log(m)