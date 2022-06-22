const mysql = require('mysql');
const db = mysql.createPool({
    host: '127.0.0.1',      // 資料庫的 IP 地址
    user: 'root',           // 登入資料庫的帳號
    password: 'admin123',   // 登入資料庫的密碼
    database: 'my_db_01',    // 指定操作的資料庫的名稱
})

// 查詢 users 表中的所有數據。
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
    // 若查詢失敗，反回錯誤訊息
    if(err) return console.log(err.message)
    // 若查詢成功，就打印數據
    console.log(results)
})