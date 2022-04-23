// 這是套件的入口文件

const date = require('./src/dateFormat') 
const escape = require('./src/htmlEscape')

// 向外公開需要的成員
module.exports = {
    ...date,
    ...escape
}
