// 1. 導入 mysql 模塊
const mysql = require('mysql')
// 2. 建立與 MySQL 資料庫的連線關係
const db = mysql.createPool({
    host: '127.0.0.1',      // 資料庫的 IP 地址
    user: 'root',           // 登入資料庫的帳號
    password: 'admin123',   // 登入資料庫的密碼
    database: 'my_db_01',    // 指定操作的資料庫的名稱
})

// 測試 mysql 模塊是否正常工作
db.query('SELECT 1', (err,results) => {
    // mysql 模塊工作期間報錯了，就打印錯誤訊息
    if(err) return console.log(err.message)
    console.log(results)
})