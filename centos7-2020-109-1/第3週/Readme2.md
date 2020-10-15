# 改SSH埠號並加入白名單

先下載semanage

    yum -y install policycoreutils-python

改埠號指令

    vim /etc/ssh/sshd_config
    將裡頭`#port 22`改為`port 2222`

並將埠號和ssh增加到白名單

    firewall-cmd --permanent --zone=public --add-service=ssh
    firewall-cmd --permanent --zone=public --add-port=2222/tcp
    firewall-cmd --reload
    firewall-cmd --zone=public --list-all --permanent       /查詢是否有加入成功

重啟ssh

    systemctl restart sshd
    systemctl status sshd

若不想讓對外連線的埠號被看到可以使用以下指令隱藏

    firewall-cmd --add-forward-port=port=1234:proto=tcp:toport=2222