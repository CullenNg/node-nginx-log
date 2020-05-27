const fs = require('fs');
const path = require('path');
const db = require('./library/db');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.all('/api/*', (req, res) => {
    const moduleName = req.url.split('/')[2];
    const Controller = require('./controller/' + moduleName + '.js');
    new Controller(req, res, db);
});

app.listen(port);

