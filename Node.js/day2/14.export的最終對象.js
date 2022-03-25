// 請執行 15.導入14模塊查看最後對象.js

const username = '傑瑞'

exports.username = username

exports.age =20

exports.sayHello = function(){
    console.log('大家好!，我是傑瑞')
}

// 最終，向外共享的結果，永遠都是 module.exports 所指向的對象。
module.exports = {
    nickname : '小傑',
    sayHi(){
        console.log('我是小傑!')
    }
}