# 更改xterm字的大小
## 1. 到達根目錄

    cd ~

## 2. 創建

    gedit .Xresources
---
* 編寫以下內容，它會固定字體大小為18px
```
xterm*font:     *-fixed-*-*-*-18-*
```

## 3. 在終端機輸入，合併你所做的更改

    xrdb -merge ~/.Xresources

* 完成之後開xterm應該有所改變