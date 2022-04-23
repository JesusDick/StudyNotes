## 安裝
```
npm install itheima-tools
```

## 導入
```js
const itheima = require('itheima-tools')
```

## 格式化時間
```js
// 調用 dateFormat 對時間進行格式化
const dt = itheima.dateFormat(new Date())
console.log(dt)
// 結果 : 2022-04-13 19:20:23
```

## 轉義 HTML 中的特殊字符
```js
// 待轉換的 HTML 字符串
const str = itheima.htmlEscape(htmlStr)
// 調用 htmlEscape 方法進行轉換
console.log("將HTML標籤轉義 :",str)
// 轉換結果 : &lt;h1 title=&quot;abc&quot;&gt;這是h1標籤&lt;spaot;&gt;這是h1標籤&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
```

## 還原 HTML 中的特殊字符
```js
// 待還原的 HTML 字符串
const str2 = itheima.htmlUnEscape(str)
console.log("此為還原HTML標籤 :", str2)
// 輸出的結果 : <h1 title="abc">這是h1標籤<span>123&nbsp;</span></h1>
```

## 開源協議
ISC