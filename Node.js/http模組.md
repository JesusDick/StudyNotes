# [http模組](./day2/README.md)
* ### ***http模組*** : 是由Node.js官方提供，用來創建***web服務氣***的模組，可以透過***http模組***內的`http.createServer()`方法，就可以把一台電腦，變成***web服務器***`，從而對外提供Web資源服務。

* ### 在Node.js中，我們不需要使用 ***IIS***、***Apache*** 等等的第三方web服務器軟體，因為我們可以使用Node.js中的**http模組**，寫入一些代碼，就能輕鬆的創建一個服務器，從而對外提供Web服務。
   > 服務器和普通電腦的區別在於，服務器上安裝了web服務器軟體，例如 : IIS、Apache等，通過安裝這些服務器軟體， 就能把一台普通的電腦變成一台web服務器。

## 瀏覽過程 :

在瀏覽網站時 **請求url的地址**，透過自己寫的 **web服務器**，讀取文件實際存放的路徑，將讀取到的文件內容透過`res.end()`響應給客戶端，而客戶端請求回來的內容，不是具體的文件而是文件中所存儲的字符串。
> **request 請求** : 客戶端在瀏覽網頁時，向伺服器發出，通常會是`URL`地址。
> 
> **response響應** : 伺服器回應客戶端的請求。

![過程圖](範例圖片/http01.png)
> (擷取自bilibili的黑馬程序員-Node.js)


## ___方法 :___


### 3. http語法

   1. `http.createServer()` ; 創建web服務
   2. `server.on('even', 'callback')` ;  指定事件，即回呼方法，[其他事件及函數](https://nodejs.org/dist/latest-v16.x/docs/api/http.html)
   3. `server.listen('port', 'callback')` ; 啟動監聽服務器。
   4. `res.end()` ; 向客戶端響應一些內容，也代表不再有東西寫入`res`內。
