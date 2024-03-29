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

module.exports = {
    htmlEscape,
    htmlUnEscape
}