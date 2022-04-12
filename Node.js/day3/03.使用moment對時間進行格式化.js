// 1. 導入需要的套件
// 注意 : 導入的名稱就是安裝的套件名。
const moment = require('moment')

moment.locale('zh-tw')
const dt = moment().format('YYYY-MM-DD dddd HH:mm:ss a ')
console.log(dt)