const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

const selectStr = 'select * from users'

// 定義標記刪除語句
// 謹記 : 標記刪除並不是真正的去執行 DELETE語句，而是去執行 UPDATE語句，去更新 status欄位 的狀態
const markDelStr = 'update users set status=? where id=?'
db.query(markDelStr, [1, 9], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1){
        console.log("標記刪除成功!~")
        db.query(selectStr, (err, results) => {
            if(err) return console.log(err.message)
            console.log(results, '\n標記刪除成功!~')
        })
    }
})
