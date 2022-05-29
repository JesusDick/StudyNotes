-- 通過 * 把 users 表中所有數據查詢出來
-- select * from users

-- 從 users 表中把 username 和 password 對應的數據查詢出來alter
-- select username, password from users

-- 向 users 表中，插入新數據，username 的值為 "tony start"， password值為 "098123"
-- insert into users (username, password) values ('tony start', '098123')

-- 將 id 為 4 的用戶密碼，更新成 888888
-- update users set password='888888' where id=4
-- select * from users

-- 更新 id 為 2 的用戶，把用戶密碼更新為 admin123，把用戶的狀態更新為 1
-- update users set password='admin123', status=1 where id=2
-- select * from users

-- 刪除 users 表中，id 為 4 的用戶
-- delete from users where id=4
-- select * from users

-- 演示 where 子句的使用
-- select * from users where status=1
-- select * from users where id>=2
-- select * from users where username<>'Amy'

-- 使用 AND 顯示所有狀態為 0，且 id 小於 3 的用戶
-- select * from users where status=0 AND id<3

-- 使用 OR 顯示，所有狀態為 1，或 username 為 Alex 的用戶
-- select * from users where status=1 OR username='Alex'

-- 對 users 表中的數據，按照 status 欄位進行升序排序
-- select * from users order by status

-- 對 id 對結果，進行降序的排序
-- select * from users order by id desc

-- 對 users 表中的數據，先照 status 進行降序，再對 username 進行深序的排序
-- select * from users order by status desc, username

-- 使用 count(*) 來統計 users 表中，狀態為 0 用戶的總數量
-- select count(*) from users where status=0

-- 使用 AS 關鍵字給欄位起別名
-- select count(*) as total from users where status=0
-- select username as uname, password as upwd from users