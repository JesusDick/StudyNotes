# 01. split分割與合併檔案

1. 以往對`/etc`目錄進行打包壓縮，並分割成數個檔案，必須使用兩個指令。

        tar -czvf etc.tar.gz /etc       
        //壓縮並打包

        split -b 4M etc.tar.gz "etc.part."
        //將分割後的數個小檔，限制在4MB內

2. 若要一鍵處理完以上過程可以使用此指令。

        tar czvf - "/etc" | split -b 4M - "etc.part."

3. 並若要將分割後的數個小檔，合併回一個大檔，可以使用以下指令

         cat etc.part.* > etc.tar.gz


---

## 02. 簡易腳本程式

### 1. 編輯檔案

    gedit ping.sh

### 2. 先看程式碼

    #!/usr/bin/bash

    for pin in 123.456.78.{1..10}
    do
       ping -c 1 -W 1 $pin 2>&1 >/dev/null
       if [[ $? -eq 0 ]]
       then
          echo "$pin ping ok"
          echo "$pin">>test.txt
       else
          echo "$pin ping fails"
    fi
    done

以上程式碼是在說，對`123.456.78.1到10`的IP進行ping迴圈，且ping只出現1行和逾時1秒的時間，不論成功與否都丟到黑洞，如果返還值等於0，就顯示`"ping OK"`，否則就顯示`"ping fails"`，大致上就這樣

### 3. 變更可執行與測試

    chmod -x ping.sh
    ./ping.sh