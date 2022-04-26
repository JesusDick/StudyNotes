// 若想還原 node.js加載機制 請按照下面步驟
// step1. 請在當前目錄創建 test、test.js、test.json、test.node 等文件
// step2. 在 test 文件內，寫入 : console.log('你加載了test文件') 
// step3. 在 test.js 文件內，寫入 : console.log('你加載了test.js文件') 
// step4. 在 test.json 文件內，寫入 : { "name" : "test.js" }
// step5. test.node文件內不用寫任何東西
// step6. 再回到此並執行此文件 ; node 07.a.js
// step7. 依次分別刪除 test、test.js、test.json、test.node 查看文件加載機制


const m  = require('./test')
console.log(m)