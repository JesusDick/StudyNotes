const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

const selectStr = 'select * from users'

// 定義刪除的 SQL 語句
const delStr = 'delete from users where id=? '
// 執行 SQL 語句
db.query(delStr, 11, (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1){
        console.log("刪除數據成功!~")
    }
})

