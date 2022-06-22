const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

// 預插入的數據
const user = {username: 'Spider-Man', password: 'pcc123'}
// 定義待執行的 SQL 語句
const sqlStr = 'insert into users(username, password) values(?,?)'
// 執行 SQL 語句
db.query(sqlStr, [user.username, user.password], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1){
        console.log('插入數據成功!~')
    }
})