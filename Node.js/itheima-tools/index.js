// 這是套件的入口文件

// 定義格式化時間的函數
function dateFormat(dateStr){
    const dt = new Date(dateStr)

    const y = dt.getFullYear()
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())

    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 定義一個補零的函數
function padZero(n){
    return n > 9 ? n : "0" + n
}

// 定義轉義 HTML 字符的函數
function htmlEscape(htmlStr){
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        switch(match){
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case '&':
                return '&amp;'
        }
    })
}

// 定義還原 HTML 字符串的函數
function htmlUnEscape(str){
    return str.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch(match){
            case '&lt;':
                return '<'
            case '&gt;':
                return '>'
            case '&quot;':
                return '"'
            case '&amp;':
                return '&'
        }
    })
}

// 向外公開需要的成員
module.exports = {
    dateFormat,
    htmlEscape,
    htmlUnEscape
}
