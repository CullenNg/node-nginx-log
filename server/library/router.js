const db = require('./db');
const router = (req, res) => {
    const moduleName = req.url.split('/')[1];
    const Controller = require('../controller/' + moduleName + '.js');
    new Controller(req, res, db);
};

module.exports = router;