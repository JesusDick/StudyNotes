# Google二次認證

下載相關套件

    yum -y install gcc make pam-devel libpng-devel libtool wget git
    yum groupinstall "Development Tools"-y

git認證程式

    git clone https://github.com/google/google-authenticator-libpam.git

切換到該目錄

    cd google-authenticator-libpam/
    ./bootstrap.sh
    ./configure
    make && make install        //編譯及安裝

拷貝

    cp /usr/local/google-authenticator/lib/security/pam_authenticator.so /lib64/security/

配置/etc/pam.d/sshd

    vim /etc/pam.d/sshd

在第一行加入

    auth    required    pam_authenticator.so

再對/etc/ssh/sshd_config進行配置

    將 (#PermitRootLogin yes) 改為 --> (PermitRootLogin yes)
    將 (#ChallengeResponseAuthentication no) 改為 --> (ChallengeResponseAuthentication yes)

重啟sshd

    systemctl restart sshd

執行程式

    ./google-authenticator      //其他配置默認就好


*   1. 手機必須下載`google authenticator`
    2. 之後用ssh連線時，出現的`verificatoin code`就是跟手機同步的6為數碼
    3. [若想移除可以參考此文章](https://www.taodabai.com/how/401111241.html)
