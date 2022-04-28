const express = require('express')

const router = express.Router()

// 掛在對應的路由
router.get('/get', (req, res) => {
    // 1. 通過 req.query 獲取客戶端通過查詢字符串，發送到服務器的數據
    const query = req.query

    // 2. 調用 res.send() 方法，向客戶端響應處理的結果
    res.send({
        status: '0', // 0 表示處理成功，1 表示處理失敗
        msg: "GET 請求成功", // 狀態的描述
        data: query // 需要響應給客戶端的數據
    })
    // console.log(query)
})

// 定義 POST 接口
router.post('/post', (req, res) => {
    // 1. 通過 req.body 獲取請求體中包含的 url-encoded 格式的數據
    const body = req.body
    // 2. 調用 res.send() 方法，向客戶端響應結果
    res.status(200).send({
        status: '0',
        msg: 'POST 請求成功!',
        data: body
    })
    // console.log(body)
})

// 定義 DELETE 接口
router.delete('/delete', (req, res) => {
    res.send({
        status: '0',
        msg: 'DELETE 請求成功!',
    })
})

module.exports = router