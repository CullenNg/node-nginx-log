const express = require('express')
const app = express()
const port = 3000

const router = require('./library/router.js');

app.get('*', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

