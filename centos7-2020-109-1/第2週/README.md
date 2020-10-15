# 安裝VNC並使用畫面分享

* 若想要使用VNC的話，雙方都必須安裝VNC

以下指令請先切換到管理員模式，不然權限會不夠。

    su

使用以下指令安裝

    yum install tigervnc-server

下載完後，先將遠本在`/lib`的原伺服器檔，複製一份到`/etc`檔中，指令如下

    cp /lib/systemd/system/vncserver@.service /etc/systemd/system/vncserver@:1.service

並新創建一個使用者

    useradd tom
    passwd tom    //改使用者密碼

配置剛剛複製的檔案

    vim /etc/systemd/system/vncserver@:1.service

將裡頭原先的`user`改為剛剛新增的使用者名稱。

    [Service]
    Type=forking
    # Clean any existing files in /tmp/.X11-unix environment
    ExecStartPre=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'
    ExecStart=/usr/sbin/runuser -l tom -c "/usr/bin/vncserver %i"

    # 一般帳號
    PIDFile=/home/tom/.vnc/%H%i.pid

    # root 帳號
    #PIDFile=/root/.vnc/%H%i.pid

    ExecStop=/bin/sh -c '/usr/bin/vncserver -kill %i > /dev/null 2>&1 || :'

配置完成後，切換至`tom`帳號，並設置vnc密碼

    su - tom
    vncpasswd

設置完後，更新`systemctl`

    su -        //切換回管理員
    systemctl daemon-reload
    systemctl restart vncserver@:1.service
    systemctl status vncserver@:1.service       /查看狀態

之後將防火牆關閉

    systemctl stop firewall
    
並啟用vnc。

    systemctl start vnc-server

若之後想允許通過防火牆可以使用以下指令。

    firewall-cmd --zone=public --add-service=vnc-server
    firewall-cmd --zone=public --list-all       /查看防火牆的內部設定
    firewall-cmd --zone=public --remove-service=vnc-server      /移除

在測試windows連至linux時，在IP後面都必須加上5901的port號，如下

    192.0.0.1:5901