# npm指令測試
## 該目錄用來測試 npm 相關指令

## 安裝第三方套件
* `npm install [完整套件名稱]`；效果一樣
```    
npm i [完整套件名稱]
```
## 安裝指定版本的第三方套件
* 例如 : npm i moment@2.22.2
```
npm i [完整套件名稱]@[版本號]
```

## 快速創建 package.json 配置文件的指令
* 該文件是用來記錄安裝了哪些第三方套件
1. 在開發新項目之前，先執行該指令。
2. 只能在英文的目錄下成功執行，不要使用中文，不能出現空格。
3. 執行`npm install`命令安裝套件時，npm會自動添加套件名稱和版本編號，紀錄到`package.json`中。
```
npm init -y
```

## 卸載第三方套件指令
* 該使令除了從 **npm_modules** 中移除套件外，還會從 **package.json** 的 `dependencies`內移除該套件名。
```
npm uninstall [套件名稱]
```

## devDependencies指令
1. 如果有些套件只在開發階段會用到，就把這些套件加到 **devDependencies節點** 當中。
2. 如果有些套件開方和項目上線後都需要用到，就必需加到 **dependencies節點** 當中。
```
npm i [套件名稱] -D
```
