const config = require('../config/config');

/**
 * 获取get参数
 * @param {String} queryStr
 * @return {Object} 
 */
const get_query_params = (queryStr = '') => {
    queryStr = decodeURIComponent(queryStr);
    const obj = {};
    queryStr.split('&').map(res => {
        const arr = res.split('=');
        const key = arr[0];
        obj[key] = arr[1];
    });
    return obj;
}

/**
 * 获取POST参数
 */
const get_post_params = () => {

}

class Controller {
    config = config;
    
    constructor (req, res, db) {
        this.db = db;
        this.res = res;
        this.req = req;
        const actionName = req.url.split('?')[0].split('/')[3];
        const queryString = req.url.split('?')[1];
        const params = req.method == 'GET' ? get_query_params(queryString) : {};
        this[actionName](params);
    }

    success (value) {
        this.res.send({
            code: 0,
            data: value
        });
    }

    fail (error) {
        this.res.send({
            code: 1,
            data: error
        });
    }
}

module.exports = Controller;