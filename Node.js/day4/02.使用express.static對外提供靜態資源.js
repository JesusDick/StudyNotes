const express = require('express')
const app = express()

// 在這裡，調用 express.static() 方法，快速的對外提供靜態資源
app.use(express.static('./clock'))

app.listen(80, () => {
    console.log('express server running http://127.0.0.1')
})