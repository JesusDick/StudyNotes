# samba網路芳鄰
## 1.安裝及使用
下載samba

    yum install samba samba-client samba-common -y

建立Samba帳號，在建立Samba帳號時，必須有此使用者帳號。

    smbpasswd -a user

啟用Samba

    systemctl start smb
    systemctl start nmb

允許Samba通過防火牆

    firewall-cmd --permanent --zone=public --add-service=samba
    firewall-cmd --reload

查詢ip

    ifconfig

在紅色箭頭輸入剛剛查詢的IP

    \\192.168.***.***

![示意圖](Notes01.PNG)

---

## 2. Samba設定

使用以下指令設定可以共用的目錄。

    vim /etc/samba/smb.conf

說明下圖

![示意圖](Notes02.PNG)

    該圖片說明，在使用網路芳鄰時，/home/user此目錄的使用權限

    read only = Yes     //表示該目錄只能讀
    writeable = No      //表示該目錄不能寫

---

加入tmp資料夾使其可以共用

    [tmp]
        comment = Temporary file space
        path = /tmp
        read only = No
        public = Yes

![示意圖](Notes03.PNG)

#### 說明下圖

![示意圖](Notes04.PNG)

#### 若沒有加入`tmp`的話，就只會有`user`這個資料夾看得到。