# 特別說明 module.exports
* ## 注意 : module.exports 全等於 exports ，但module.exports有較大的優先權
* ## 注意 : 為了防止混亂，建議兩個當中擇一使用就好。

### [案例01](./案例01.js)
1. 可以[執行exports對象](./../day2/13.export對象.js)，查看得知他們是全等於的
2. 在剛開始預設它們是指向同一個 { } (空對象)
3. 接著`exports`指向一個新對象，後來了個新對象給了`module.exports`
4. 最終還是得看`module.exports`指向的對象
5. [執行顯示 : { nickname: 'Bee', age: 22 }](./ex.執行個別案例.js)
```
exports.username = 'Bobx'
module.exports = {
    nickname : 'Bee',
    age : 22
}
```

### [案例02](./案例02.js)
1. 重申`module.exports`全等於`exports`
2. 預設它們指向 { } (空對象)
3.  man、Amy、Bobx 都被`module.exports`和`exports`所指向
4. 但`exports.usernam(Amy)`和`module.exports.username(Bobx) `有衝突
5. 最終看`module.exports`所指向的對象，所以 Amy 消失了
6. [執行顯示 : { sex: 'man', username: 'Bobx' }](./ex.執行個別案例.js)
```
exports.sex = 'man'
exports.username = 'Amy'
module.exports.username = 'Bobx'
```

### [案例03](./案例03.js)
1. `module.exports`的優先權比較大
2. 但`exports`被`module.exports`給指向
3. 所以`module.exports`等同指向了`username(Bobx)`、`sex(man)`、`age(22)`
4. [執行顯示 : { username: 'Bobx', sex: 'man', age: 22 }](ex.執行個別案例.js)
```
exports = {
    username : 'Bobx',
    sex : 'man'
}

module.exports = exports
module.exports.age = 22
```