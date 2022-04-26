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
* ### 關於如何[下載第三方模塊可以看這篇](../指令.md#安裝第三方套件)
* ### 注意 : 導入的名稱就是安裝的套件名。
1. `const moment = require('moment')` : 導入需要的套件。
2. `moment.locale('zh-tw')` : 轉換為該地區的語言。
   * 關於此[用法可以看這篇](https://stackoverflow.com/questions/31109303/how-to-obtain-a-list-of-available-locale-keys-from-momentjs-with-locale)
3. `const dt = moment().format('YYYY-MM-DD dddd HH:mm:ss a ')` : 轉換時間字符串成規定格式。
   * 有關規定的格式可以看[官方文檔](https://momentjs.com/docs/)
```js
const moment = require('moment')

moment.locale('zh-tw')
const dt = moment().format('YYYY-MM-DD dddd HH:mm:ss a ')
console.log(dt)
```

## [itheima-tools(自訂義套件)](./itheima-tools/README.md)
* ### 注意 : 該套件是基於練習使用，不應該亂上傳到 ***npm*** 官網上，即便是練習上傳也該立刻刪除該套件。
### 1. [不同功能的方法函數應該要分開來寫。](./itheima-tools/src/)
### 2. [index.js作為模塊的入口，必須導入不同功能的功能模塊，並對外公開這些模塊成員。](./itheima-tools/index.js)
### 3. [package.json必須記錄一些資訊給導入該模塊的人。](./itheima-tools/package.json)
1. `"name"` : 該套件的名稱。
2. `"version"` : 目前版本。
   > 版本格式 :
   >> 主要號、次版號、修訂號。
   >>>例如 : 1.0.0
   >>>
   >>> `1` : 當你做了不相容的 API 修改，該號往上加。
   >>>
   >>> `0` : 當你新增了功能，該號往上加。
   >>>
   >>> `0` : 當你修正了某些該套件上的問題，該號往上。
3. `"main"` : 作為入口的文檔為誰。
4. `"description"` : 概略說明有什麼功能。
5. `"keywords"` : 當搜尋該套件時，可以依什麼關鍵字搜索到。
6. `"license"` : 開源協議。
```json
{
    "name": "itheima-tools",
    "version": "1.0.0",
    "main": "index.js",
    "description": "提供了格式化時間，HTMLEscape相關功能",
    "keywords": ["itheima", "dateFormat", "escape"],
    "license": "ISC"
}
```

### 4. [當有人下載自己的套件時，應該告訴他人如何使用，所以必需有README.md的文檔存在。](./itheima-tools/README.md)

## [04.使用自訂義發布套件.js](./04.使用自訂義發布套件.js)
* ### 該項目使用了 *itheima-tools* 目錄中的自訂義模塊。
1. `const itheima = require("./itheima-tools")` : 導入自訂義套件
2. 使用格式化時間的功能，並印出 :
   ```js
   const dt = itheima.dateFormat(new Date())
   console.log(dt)
   ```
3. 測試自訂義的套件是否可以將 html標籤 轉義為 實體字符 :
   ```js
   const htmlStr = '<h1 title="abc">這是h1標籤<span>123&nbsp;</span></h1>'
   const str = itheima.htmlEscape(htmlStr)
   console.log("將HTML標籤轉義 :",str)
   ```
4. 測試自訂義的套件是否可以將 實體字符 轉義為 html標籤 :
   ```js
   const str2 = itheima.htmlUnEscape(str)
   console.log("此為還原HTML標籤 :", str2)
   ```
* #### 小補充 : 如果在某些時候，沒將 ***html標籤*** 轉義為 ***實體字符***，或  ***實體字符*** 轉義為 ***html標籤*** 的狀況，可能會衍生成 [***XSS攻擊***](https://medium.com/hannah-lin/%E5%BE%9E%E6%94%BB%E6%93%8A%E8%87%AA%E5%B7%B1%E7%B6%B2%E7%AB%99%E5%AD%B8-xss-cross-site-scripting-%E5%8E%9F%E7%90%86%E7%AF%87-fec3d1864e42)；簡明扼要的說，就是你的瀏覽器讀取到 **html標籤(`<>`)**，並認定了標籤的形式，所以將標籤內的(`<h1>`)內容(`</h1>`)，轉換成標籤內形式(`h1`)，這導致讓惡意人士寫入某些(`<script>`)腳本(`</script>`)攻擊你的網站。
---
```js
const itheima = require("./itheima-tools")

const dt = itheima.dateFormat(new Date())
console.log(dt)
console.log("----------------")
const htmlStr = '<h1 title="abc">這是h1標籤<span>123&nbsp;</span></h1>'

const str = itheima.htmlEscape(htmlStr)
console.log("將HTML標籤轉義 :",str)
console.log("----------------")

// 測試自訂義的套件是否可以將 實體字符 轉義為 html標籤
const str2 = itheima.htmlUnEscape(str)
console.log("此為還原HTML標籤 :", str2)
```

## [05.自訂義模塊.js](./05.自訂義模塊.js)
* ### 該項目會在 [06.重複加載自訂義模塊.js](./06.重複加載自訂義模塊.js) 展示出來，並說明
```js
// 請在 06.重複加載模塊 執行此 自訂義模塊.js
console.log('不要重複加載模塊')
```

## [06.重複加載自訂義模塊.js](./06.重複加載自訂義模塊.js)

因為 [05.自訂義模塊.js](./05.自訂義模塊.js) 已被加入記憶體，所以第1個 `require` 已經從記憶體拿取了該模塊，因此下面的 `require` 並不會重複調用。
```js
require('./05.自訂義模塊')
require('./05.自訂義模塊')
require('./05.自訂義模塊')
require('./05.自訂義模塊')
```

## [07.a.js](./07.a.js)
* ### 若想還原 node.js加載機制 請按照下面步驟 :
### step1. 請在當前目錄創建 test、test.js、test.json、test.node 文件
### step2. 在 test 文件內，寫入 :
```js
console.log('你加載了test文件')
```
### step3. 在 test.js 文件內，寫入 :
```js
console.log('你加載了test.js文件')
```
### step4. 在 test.json 文件內，寫入 :
```js
{ "name" : "test.js" }
```
### step5. test.node 文件內不用寫任何東西
### step6. 再回到此並執行此文件 :
```
node 07.a.js 
```
### step7. 再依次分別刪除 test、test.js、test.json、test.node 查看文件加載機制

### 結論 :
當我們導入一個模塊，並沒有有副檔名時，***Node.js*** 的加載順序分別是，1. 跟加載的模塊檔名一模一樣的文件，2. 檔名一樣並擁有 ***.js*** 副檔名的文件，3. 檔名一樣並擁有 ***.json*** 副檔名的文件，4. 檔名一樣並擁有 ***.node*** 副檔名的文件。
```js
const m  = require('./test')
console.log(m)
```

## [08.test.js](./08.test.js)
* ### 該項目是導入整個目錄，將會實驗有 **package,json** 文件，和沒有 **package,json** 文件，導入整個目錄時 **Node.js** 會怎麼做。

### 步驟還原 :
#### step1. 創建 *testm* 目錄
#### steo2. 創建三個文件，分別是 **a.js**、**index.js**、**package.js**
#### step3. 將以下內容寫入 **a.js** :
```js
console.log("通過 package.json 加載了 a.js文件")
```
#### step4. 將以下內容寫入 **index.js** :
```js
console.log("加載了index.js")
```
#### step5. 將以下內容寫入**package.js** :
```json
{
    "main": "a.js"
}
```
#### step6. [回到該執行檔](./08.test.js)，先執行第一次
#### step7. 刪掉 [**package.js**](./testm/package.json) ，並在執行第二次
### 結論
可以發現在 **第一次執行時**，[**a.js**](./testm/a.js) 作為 [**package.js**](./testm/package.json)的入口文件，[**package.js**](./testm/package.json) 會導引著 **Node.js** 並讀取到 [**a.js**](./testm/a.js) 內的內容，**第二次執行時**，一旦沒有了 [**package.js**](./testm/package.json) ，**Node.js** 便會以檔名為 **index** 的文件作為入口文件，並讀取 [**index.js**](./testm/index.js) 內的內容。
```js
require("./testm")
```