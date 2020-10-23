# 磁碟分割與配置

 * 在做磁碟分割時，在安裝時就必須先分配好磁碟空間。分配如下圖

![示意圖](note.PNG)
![示意圖](note02.PNG)
![示意圖](note03.PNG)
![示意圖](note04.PNG)
![示意圖](note05.PNG)

* 我們主要測試的配置目錄是home目錄

![示意圖](note06.PNG)

* 在這邊linux預設的配置單位是MB，所以是5000MB也可以打5GB。

![示意圖](note07.PNG)

* 其他的`/, /boot, /var, /swap`的配置大小就隨便。

![示意圖](note08.PNG)
![示意圖](note09.PNG)

* 剩下的安裝步驟就照一般的程序走就好。

### 磁碟分配到這邊結束。

---

### BIOS設定quota

先進到選單畫面，之後按下鍵盤上的E鍵，編輯選擇項目。
![示意圖](note10.PNG)

往下捲動，並在`quiet`後面加上`1`，加好後按下F10。
![示意圖](note11.PNG)

這邊就打上你的root密碼
![示意圖](note12.PNG)

在dos視窗打以下指令，編輯fstab檔

    vim /etc/fstab

並在`/home`的defaults後面加上`usrquota`，儲存後`reboot`，如下圖
![示意圖](note13.PNG)

重啟後可以依照上面的步驟，到dos視窗後打以下指令，檢查是否有修改成功，成功如下圖

    cat /etc/fstab

![示意圖](note14.PNG)

* 若有成功會多出`usrquota`，如紅色圈起來的地方

---
## 磁碟配額設定工具

若想查看指定目錄的磁碟配額，可以使用以下指令

    xfs_quota -xc 'report -h' /home

