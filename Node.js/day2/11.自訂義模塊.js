// 此為一個模塊，在此模塊中如果什麼都不寫的話
// 預設情況下，module.exports = {}，也就是一個空對象

// 向 module.export 對象公開 username 屬性
module.exports.username = '傑瑞'

// 向 module.export 對象公開 sayHello 方法
module.exports.sayHello = function(){
    console.log('Hello Node.js!')
}

// 此變量沒有公開
// 可以理解程 C# private
const age = 20

// 使用module.export 公開 age 變量
// 可以理解為 C# 中的 public。
module.exports.age = age


// 讓 module.export 指向一個全新的對象。
module.exports = {
    nickname : '小白',
    sayHi(){
        console.log('Hi!')
    }
}