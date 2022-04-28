// 導入 Node.js 內置的 querystring 模塊
const qs = require('querystring')

const bodyParser = (req, res, next) => {
    // 定義中間件具體的業務邏輯
    // 1. 定義一個 str 字符串，專門用來儲存客戶端發送過來的請求體數據
    let str = ''

    // 2. 監聽 req 的 data 事件
    req.on('data', (chunck) => {
        str += chunck
    })

    // 3. 監聽 req 的 end 事件
    req.on('end', () => {
        // 在 str 中存放的是完整的請求體數據。
        // console.log(str)
        // TODO : 把字符串格式的請求體數據，解析成對象格式
        const body = qs.parse(str)
        req.body = body
        next()
    })


}

module.exports = bodyParser