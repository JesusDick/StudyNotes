# 蜜罐(pentBox)

* pentBox是一套安全測試套件，它模擬一個具有BUG的沙盒世界，吸引駭客來攻擊，但發生在pentBox世界裡的任何事件，都不會對原網路造成任何傷害，並可以用監控軟體，監視駭客入侵後的舉動，pentBox還可以吸引電腦病毒的入侵，從而對此病毒解析並加以破解。

## 蜜罐的安裝與使用

1. 下載
    
        wget https://github.com/technicaldada/pentbox/archive/master.zip

2. 解壓縮

        tar -zxvf pentbox-1.8.tar.gz

3. 執行

        cd pentbox-1.8/
        ./pentbox.rb

---

# 課程補充

1. seq指令

*   1. -s   :   指定分隔的符號

            seq -s "-" 1 10

            1-2-3-4-5-6-7-8-9

2. sort指令

    創建測試檔

        gedit a.txt

    測試內容

        123 4
        43 2
        66 3
        3 5


*   1. -n : 按整數小到大排序

            cat a.txt | sort -n

            3 5
            43 2
            66 3
            123 4

    
    2. -r : 以第一行做遞減排序

            cat a.txt | sort -r

            66 3
            43 2
            3 5
            123 4

    3. -k : 指定行數進行排序。

        -r -k2 : 以第二行做遞減排序

            cat a.txt | sort -r -k2

            3 5
            123 4
            66 3
            43 2

    4. -t : 指定字段分隔符

            使用方法 sort -n -t[分隔符] -k2 [檔名]

            如 sort -n -t: -k2 a.txt
                        ︽
                        ||
            對a.txt檔案以冒號的第二行以大排到小進行排序。