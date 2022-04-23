const express = require('express')
const app = express()

app.use('/files',express.static('./files'))
app.use(express.static('./clock'))

app.listen(80, () => {
    console.log('express server running http://127.0.0.1')
})