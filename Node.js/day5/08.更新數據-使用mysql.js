const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

// 定義查詢語句
const selectStr = 'select * from users'

// 預更新的數據
const updateOBJ = {username: 'Allison', password: 'summer', id: 9}
// 定義更新語句
const updateStr = 'update users set username=?, password=? where id=?'
// 執行 SQL 語句
db.query(updateStr, [updateOBJ.username, updateOBJ.password, updateOBJ.id], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1){
        console.log("更新數據成功")
    }
})

// db.query(selectStr, (err, results) => {
//     if(err) return console.log(err.message)
//     console.log(results)
// })