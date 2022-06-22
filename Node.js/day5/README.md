# [使用 CORS 達到跨域共享資源](../CORS.md)
## [01.使用express寫接口.js](./01.使用express寫接口.js)


# 項目中操作MySQL
## 項目中操作資料庫的概略步驟
### step1. 安裝操作MySQL資料庫的第三方模塊。
```
npm i mysql
```
### step2. 通過 mysql 模塊連接到 MySQL 資料庫
### step3. 通過模塊執行 SQL 語句
* 以上步驟可以達到如下圖的效果。
![步驟效果](./pict/步驟效果.png)
> 圖片截自 : BiliBili黑馬程序員-Node.js

## [04.簡易測試MySQL模塊.js](./04.簡易測試MySQL模塊.js)
### 配置 mysql 模塊
當我們安裝好後，在使用 mysql 模塊操作 MySQL 資料庫之前，必須先對 mysql 模塊進行必要的配置，如下所示。
```js
const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})
```
1. `const mysql = require('mysql')` : 導入 mysql模塊。
2. 通過 mysql 模塊連接到 MySQL 資料庫 :
    ```
    const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
    })
    ```
    > `host` : 資料庫的 IP 地址。
    >
    > `user` : 登入資料庫的帳號。
    >
    > `password` : 登入資料庫的密碼。
    >
    > `database` : 指定操作的資料庫的名稱。
### 測試 mysql 模塊
調用 `db.query()` 函數，指定要執行的 SQL 語句，通過回調函數拿到執行的結果 :
```js
db.query('SELECT 1', (err,results) => {
     if(err) return console.log(err.message)
     console.log(results)
})
```

## [05.使用 mysql 模塊-查詢數據](./05.查詢數據-使用mysql.js)
* 注意 : 如果執行的是 select 查詢語句，則執行結果是數組。
如果想要查詢數據，語法結構如下 :
```js
db.query('[sql語法]', (err, results) => {
     if(err) return console.log(err.message)
    console.log(results)
})
```

### 1. 查詢 users 表中所有數據
```js
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
    if(err) return console.log(err.message)
    console.log(results)
})
```
1. `const sqlStr = 'select * from users'` : 預先寫好的 SQL語句，並儲存到 `sqlStr` 變量中。
2. `if(err) return console.log(err.message)` : 若 mysql 模塊工作期間報錯了，就打印錯誤訊息。
3. `console.log(results)` : 若查詢成功印出查詢結果。

    ![查詢users表](./pict/select01.png)

## [06.插入數據-使用mysql.js](./05.查詢數據-使用mysql.js)
### 使用 mysql 模塊-插入數據
* 語法結構跟上面的主題一樣，只不過 **sql語法** 不同而已。
* 注意 : 如果執行的是 **insert into** 插入語句，則 `results` 是一個 **對象**，可以通過 `affectedRows` 屬性，來判斷是否插入數據成功。

#### 1. 向 users表中新增數據，其中 username = Spider-man，passowrd = pcc123 :
在 **sql語句** 中，可以通過 **問號(`?`)**，問號的方式當作佔位符，也就是當下我不指名具體數據，但我之後必須填上具體數據。
```js
const user = {username: 'Spider-Man', password: 'pcc123'}
const sqlStr = 'insert into users(username, password) values(?, ?)'
db.query(sqlStr, [user.username, user.password], (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1){
        console.log("插入數據成功~!")
    }
})
```

![插入語句](./pict/insert_into01.png)
* 附註 : 這裡可能會有疑問，上圖的 `id` 為什麼是 5?因為先前我在 [**SQL基本語法**](./SQL基本語法.md) 的章節中，有刪除 `id = 4` 的用戶，且 `id` 具有唯一性的特性，所以即便被刪除的數據，該 `id` 也不會被占用。 

#### [2. 插入數據的便捷方式](./07.便捷插入數據-使用mysql.js)
在上面小節中，可以發現我是逐個打出欄位名，但這有個問題，就是如果當欄位名越來越多時，我必須打出每個欄位的名稱，且 `values()` 後面的 **問號(`?`)** 會越來越多，這樣不利於開發，所以當向表中新增數據時，如果 **數據對象的每個屬性** 和 **數據表的欄位** 一一對應，則可以通過如下方式快速插入數據 :

* 注意 :  `SET ?` : 代表將 `user` 物件中的所有屬性，和屬性對應的值，作為數據，插入到表中。
```js
const user = {username: 'Spider-Man2', password: 'pcc4321'}
const sqlStr = 'insert into users set ?'

db.query(sqlStr, user, (err, results) => {
    if(err) return console.log(err.message)
    if(results.affectedRows === 1){
        console.log("插入數據成功~!")
    }
})
```
![插入語句](./pict/insert_into02.png)