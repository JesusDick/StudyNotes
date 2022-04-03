# ***mininet***創造網路拓樸
## 前言
***network namespace (隔離) :*** 

我們可以先創造兩個網路空間，再創造兩個虛擬乙太網路，原則上他們是一對的，之後將兩個命名空間分別放到 **net0(網路空間)** 和 **net1(網路空間)** ，之後即便兩張網路卡名稱一樣，也不會造成衝突，因為他們的網路空間不同，所以視為兩張不一樣的網路卡。

步驟 :

#1.創建橋接網路
*可以想像有一台網路數據機，上面有網路線插孔。
下載
root@ubuntu:/home/ubuntu# apt install bridge-utils
創建
root@ubuntu:/home/ubuntu# ip link add br0 type bridge
啟動
root@ubuntu:/home/ubuntu# ip link set dev br0 up
查看
root@ubuntu:/home/ubuntu# brctl show

#創建虛擬乙太網路對接(veth pair)
*可以想像成妳拉了一條網路線
root@ubuntu:/home/ubuntu# ip link add type veth
root@ubuntu:/home/ubuntu# ip link add type veth
root@ubuntu:/home/ubuntu# ip link add type veth

#創造網路空間
*可以想像成有一台主機，上面有路線插孔。
root@ubuntu:/home/ubuntu# ip netns add net0
root@ubuntu:/home/ubuntu# ip netns add net1
檢查查看
root@ubuntu:/home/ubuntu# ip netns ls

#用veth pair將一頭掛在網路空間。
*這步驟就是用網路線將主機和數據機做連接。
1 . 連接第一個網路空間
連接
root@ubuntu:/home/ubuntu# ip link set dev veth1 netns net0
重新命名
root@ubuntu:/home/ubuntu# ip netns exec net0 ip link set dev veth1 name eth0
設定IP
root@ubuntu:/home/ubuntu# ip netns exec net0 ip addr add 10.0.1.1/24 dev eth0
啟動
root@ubuntu:/home/ubuntu# ip netns exec net0 ip link set dev eth0 up
2. 連接第二個網路空間
連接
root@ubuntu:/home/ubuntu# ip link set dev veth3 netns net1
重新命名
root@ubuntu:/home/ubuntu# ip netns exec net1 ip link set dev veth3 name eth0
設定IP
root@ubuntu:/home/ubuntu# ip netns exec net1 ip addr add 10.0.1.2/24 dev eth0
啟動
root@ubuntu:/home/ubuntu# ip netns exec net1 ip link set dev eth0 up
3. 連接第三個網路空間
連接
root@ubuntu:/home/ubuntu# ip link set dev veth5 netns net2
重新命名
root@ubuntu:/home/ubuntu# ip netns exec net2 ip link set dev veth5 name eth0
設定IP
root@ubuntu:/home/ubuntu# ip netns exec net2 ip addr add 10.0.1.3/24 dev eth0
啟動
root@ubuntu:/home/ubuntu# ip netns exec net2 ip link set dev eth0 up

#將veth pair的另一頭掛在橋接網路，並啟動。
1. 掛接
root@ubuntu:/home/ubuntu# ip link set dev veth0 master br0
root@ubuntu:/home/ubuntu# ip link set dev veth2 master br0
root@ubuntu:/home/ubuntu# ip link set dev veth4 master br0
*查看是否有掛接成功，成功的話`interfaces`底下會有`veth0`，`veth2`，`veth4`。
root@ubuntu:/home/ubuntu# brctl show

2. 啟動
root@ubuntu:/home/ubuntu# ip link set dev veth0 up
root@ubuntu:/home/ubuntu# ip link set dev veth2 up
root@ubuntu:/home/ubuntu# ip link set dev veth4 up

# 1.測試
*我們將所以網路空間都接上橋接網路後就可以測試
`net0` : 剛剛我們設定了它的IP(`10.0.1.1/24`)
`ping [IP]-c 3` : 對指定的IP，限定只Pingn三次。
root@ubuntu:/home/ubuntu# ip netns exec net0 ip ping 10.0.1.2 -c 3
root@ubuntu:/home/ubuntu# ip netns exec net0 ip ping 10.0.1.3 -c 3

# 2.測試(網頁伺服器)
*我們將開啟一個簡單的網頁伺服器，並測試是否可以連上該網頁。
1. 在`net1`開一個簡易伺服器
root@ubuntu:/home/ubuntu# ip netns exec net1 ip echo "Hello" > hi.htm
root@ubuntu:/home/ubuntu# ip netns exec net1 ip python -m SimpleHTTPServer 80
`python -m [modelname]` : 開啟模組。
`80` : 啟用80埠號。
2. 在`net0`嘗試去連接`net1`的網頁伺服器。
root@ubuntu:/home/ubuntu# ip netns exec net0 curl http://10.0.1.2/hi.htm
![成功圖](p1.PNG)

# 清除設定。

### 1. 清除橋接網路掛接。
root@ubuntu:/home/ubuntu# brctl delif br0 veth0
root@ubuntu:/home/ubuntu# brctl delif br0 veth2
root@ubuntu:/home/ubuntu# brctl delif br0 veth4
root@ubuntu:/home/ubuntu# brctl show

### 2. 刪除橋接網路
關閉橋接網路
root@ubuntu:/home/ubuntu# ifconfig br0 down
root@ubuntu:/home/ubuntu# brctl delbr br0

### 3. 清除虛擬乙太網路對接
root@ubuntu:/home/ubuntu# ip link delete veth0
root@ubuntu:/home/ubuntu# ip link delete veth2
root@ubuntu:/home/ubuntu# ip link delete veth4

### 4. 清除網路空間
root@ubuntu:/home/ubuntu# ip netns del net0
root@ubuntu:/home/ubuntu# ip netns del net1
root@ubuntu:/home/ubuntu# ip netns del net2

# 以本機當Router連接其他網路空間。
1. 啟動路由功能
root@ubuntu:/home/ubuntu# echo 1 > /proc/sys/net/ipv4/ip_forward
*關閉
`echo 0 > /proc/sys/net/ipv4/ip_forward`
*查看
`cat /proc/sys/net/ipv4/ip_forward`
2. 創造網路空間
root@ubuntu:/home/ubuntu# ip netns add net0
root@ubuntu:/home/ubuntu# ip netns add net1
3.  創建虛擬乙太網路對接
root@ubuntu:/home/ubuntu# ip link add type veth
root@ubuntu:/home/ubuntu# ip link add type veth
4 . 連接網路空間
*連接第一個網路空間
root@ubuntu:/home/ubuntu# ip link set dev veth1 netns net0
重新命名
root@ubuntu:/home/ubuntu# ip netns exec net0 ip link set dev veth1 name eth0
設定IP
root@ubuntu:/home/ubuntu# ip netns exec net0 ip addr add 10.0.1.1/24 dev eth0
啟動
root@ubuntu:/home/ubuntu# ip netns exec net0 ip link set dev eth0 up
*連接第二個網路空間
連接
root@ubuntu:/home/ubuntu# ip link set dev veth3 netns net1
重新命名
root@ubuntu:/home/ubuntu# ip netns exec net1 ip link set dev veth3 name eth0
設定IP
root@ubuntu:/home/ubuntu# ip netns exec net1 ip addr add 10.0.2.1/24 dev eth0
啟動
root@ubuntu:/home/ubuntu# ip netns exec net1 ip link set dev eth0 up
5. 為網路空間加上內定路由
root@ubuntu:/home/ubuntu# ip netns exec net0 ip route add default via 10.0.1.254
root@ubuntu:/home/ubuntu# ip netns exec net1 ip route add default via 10.0.2.254
查看
root@ubuntu:/home/ubuntu# ip netns exec net0 ip route show
root@ubuntu:/home/ubuntu# ip netns exec net1 ip route show
6. 啟動虛擬網路接口
root@ubuntu:/home/ubuntu# ifconfig veth0 up
root@ubuntu:/home/ubuntu# ifconfig veth2 up
7. 配置虛擬網路接口
root@ubuntu:/home/ubuntu# ip addr add 10.0.1.254/24 dev veth0
root@ubuntu:/home/ubuntu# ip addr add 10.0.2.254/24 dev veth2
8. 測試
root@ubuntu:/home/ubuntu# ip netns exec net0 ping 10.0.2.1 -c 3

#第二周結束