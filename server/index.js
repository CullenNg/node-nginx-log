const db = require('./library/db');
const express = require('express');
const app = express();
const port = 3000;

app.get('*', (req, res) => {
    const moduleName = req.url.split('/')[1];
    const Controller = require('./controller/' + moduleName + '.js');
    new Controller(req, res, db);
});

app.listen(port);

