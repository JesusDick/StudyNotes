// 該模塊的展示請在 06.模塊化路由.js 執行
// 這是路由模塊
// 1. 導入 Express
const express = require('express')

// 2. 創建路由對象
const router = express.Router()


// 3. 掛載具體的路由
router.get('/user/list', (req, res) => {
    res.send("Get User List!")
})

router.post('/user/add', (req, res) => {
    res.send('Add New User!')
})

// 4. 向外導出路由對象
module.exports = router
