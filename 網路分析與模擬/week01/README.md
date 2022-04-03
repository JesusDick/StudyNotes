# mininet安裝和SimpleHTTPServer應用
## mininet安裝
* 此操作的安裝時間很長。
1. 從***Github***克隆安裝包下來。

    `root@ubuntu:/home/ubuntu# git clone https://github.com/mininet/mininet.git`
2. 切換到安裝包目錄下。 
    
    `root@ubuntu:/home/ubuntu# cd mininet`

3. 執行安裝檔，可以使用`-h`看一下說明

    `root@ubuntu:/home/ubuntu/mininet# util/install.sh -a`
    
    `root@ubuntu:/home/ubuntu/mininet# util/install.sh -h`
* 成功如下圖
![成功圖](/網路分析與模擬/week01/圖片/downloadcomplete.png)

## SimpleHTTPServer應用
1. 進入***mininet***環境。

    `root@ubuntu:/home/ubuntu/mininet# mn`
2. 創造名為`h1`和`h2`的節點`。

    `mininet> xterm h1`

    `mininet> xterm h2`
3. 在***Node : h2***的終端機上創建***http***的簡易伺服器。

    `root@ubuntu:/home/ubuntu/mininet# echo 'mininet' > mininet.htm`

    `root@ubuntu:/home/ubuntu/mininet# python -m SimpleHTTPServer 80`
    
4. 在***Node : h1***的終端機上連上***Node: h2***的***http***伺服器。

    `root@ubuntu:/home/ubuntu/mininet# curl http://10.0.0.2/mininet.htm`
* 沒有`curl`請回到***本機***上安裝`curl`，這樣你的***Node : h1***才會有`curl`
* 成功如下圖

![圖](/網路分析與模擬/week01/圖片/simplehttpserver.png)

> 補充 : 你的本機(host)有安裝哪些工具或程式，大部分會反映在你創造出來的節點當中。