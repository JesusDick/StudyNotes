# [path路徑模組](./day1/README.md)
* path模組是由Node.js官方提供，用來***處理路徑問題***的模組，用來滿足使用者對路徑處理的需求。

### 1. `../`的字符串，代表會回到前一個路徑，如同在終端機輸入`cd ..`一樣。
> ***例如***
>>* console.log(path.join('/a', '/b/c', '../', './d', '/e'))
>>* 輸出: /a/b/d/e

### 2. 今後凡是涉及到路徑拼接的操作，都要使用[`path.join()`](./day1/06.path.join方法的使用.js)的方法進行處理，並應該盡量避免使用`+`號來拼接路徑，因為會導致拼接錯誤。
> ***例如***
>>* fs.readFile(__dirname + './a/b/c/index.html', [options], callback)
>>* 輸出: C:\Users\username\Desktop .\a\b\c\index.html


## ___方法 :___


### path語法
   
   1. `path.join('...paths')` : 拼接路徑。
   2. `path.basename('/a/b/c/d/index.html')` : 只返回最後的路徑，`index.html`。
   3. `path.basename('/a/b/c/d/index.html', ['.html'])` : 把最後的路徑的副檔名移除，`index`。
   4. `path.extname('/a/b/c/d/e/index.html')` : 返回最後路徑的副檔名，`.html`。