# day3 主要 : 第三方模塊
## [01.dateformat.js](./01.dateformat.js)
* ### 在使用第三方模塊之前，我們先自己寫一個格式化時間的模塊

1. `function dateformat(dtStr){}` : 定義格式化時間的方法。
2. `const dt = new Date(dtStr)` : 給定一個時間字符串到 `dtStr`。
3. `const y = dt.getFullYear()` : 取得時間 **(年)**。
4. `const m = dt.getMonth()` : 同上原理，取得時間 **(月)**。
5. 傳回樣板字符串的格式 :
    ```js
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    ```
6. 定義補零函數 :
   ```js
   function padZero(n){
    return n > 9 ? n : '0' + n
    }
   ```
   > 說明三元條件運算子 :
   >> `?` 前 : 表示要判斷的東西。
   >>
   >> `?` 後 : 表示實施的目標。
   >>
   >> `:` 前 : 表示為 True。
   >>
   >> `:` 後 : 表示為 False。
   >> 
   >> 以上整句 : 10(n) > 9 嗎(? = True) 10(n) = 10，否則 1(n) > 9 嗎(? = False)  0(字串) + 1(n) = 01
7. 對外公開 `dateformat` 方法，讓其他項目可以取用該方法 : 
   ```js
    module.exports = {
     dateformat
    }
   ```
---
```js
function dateformat(dtStr){
    const dt = new Date(dtStr)

    const y = dt.getFullYear()
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())

    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
 }

 function padZero(n){
    return n > 9 ? n : '0' + n
 }

 module.exports = {
     dateformat
 }
```

## [02.使用dataformat自訂義模塊.js](./02.使用dataformat自訂義模塊.js)
* ### 我們將使用 [01.dateformat.js](./01.dateformat.js) 的自訂義格式化時間的模塊，來替我們整理出目前的時間。
1. `const TIME = require('./01.dateformat')` : 導入 01.dateformat 的時間的自訂義模塊
2. `const dt = new Date()` : 調用方法，進行時間的格式化
3. `const newDT = TIME.dateformat(dt)` : 使用導入的模塊中的 `dateformat` 方法，並對取得的時間字符串，進行格式化。
```js
const TIME = require('./01.dateformat')

// 調用方法，進行時間的格式化
const dt = new Date()
//console.log(dt)
const newDT = TIME.dateformat(dt)
console.log(newDT)
```

## [03.使用moment對時間進行格式化.js](./03.使用moment對時間進行格式化.js)
* ### 關於如何[下載第三方模塊可以看篇](../指令.md#安裝第三方套件)