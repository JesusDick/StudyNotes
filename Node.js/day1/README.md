# Node.js的第一天。

* #### 1. 我的程式運行環境是在`VScode`，如果要在`cmd`運行如下；使用[搜尋框搜尋cmd](../範例圖片/cmd01.png)或用[`win鍵+R`使用執行視窗搜尋`cmd`](../範例圖片/cmd02.png)如下;

* #### 2. [切換到程式存放位置。](../範例圖片/cmd03.png)

* #### 3. 之後可以在該程式檔存放位置使用，[`左shift+滑鼠右鍵`，點擊`開啟Powershell視窗`](../範例圖片/cmd04.png)，直接定位到程式檔存放位置，省的每次都到`cd [程式檔存放位置]`的麻煩

## 第一個程式[1.js](./1.js)

* 在電腦找到一個喜歡的位置後，建立"1.js"程式檔，代碼如下；
  
```
//輸出 : Hello Node.js!
console.log("Hello Node.js!")
```
在`終端機`執行1.js檔的代碼:
```
node 1.js
```

## fs模組範例
### [01.利用fs模組讀取day1.txt內容.js](./01.利用fs模組讀取day1內容.js)

`const fs = require('fs')` : 導入fs模組，來操作文件。
`fs.readFile('path', [option], 'callback')` : 
> `path` : 
> >要讀取的文件路徑，這裡我們讀取在該目錄下的`./day1.txt`文字檔。

> `[option]`
> >此函數我們使用`utf8`進行編碼；

> `callback` : 
> >回調函數，可以讓我們在讀取到文件時該做甚麼，`function(err,dataStr){}`
> > >`err` : 當出錯誤訊息時，該讓程式做什麼。
> > >
> > >`dataStar`：當讀取成功時，會直接列印出`day1.txt`內的內容。

```
const fs = require('fs')
fs.readFile('./day1.txt', 'utf8', function(err, dataStr){
	console.log(err)
	console.log('------')
	console.log('dataStr')
})
```

### [02.修改01來判斷文件是否讀取成功.js](./02.修改01來判斷文件是否讀取成功.js)
>*  如果文件讀取失敗時，回傳文字`文件讀取失敗!`到err函數裡，所以當讀取失敗時`err函數`會觸發，並回傳`文件讀取失敗!`的文字。
>>```
>>if(err){
>> return console.log("文件讀取失敗!" + err.message)
>>}
>>```

```
const fs = require('fs')
fs.readFile('./day11.txt','utf8',function(err,dataStr){
    //當讀取出現錯誤時，回傳錯誤訊息
    if(err){
        return console.log("文件讀取失敗!" + err.message)
    }
    console.log(dataStr)
})
```