const mysql = require('mysql');
const config = require('../config/config');

/**
 * 转换where条件为String类型
 * @param {Object} obj 
 */
const convertWhereToString = (obj) => {
    if (obj.hasOwnProperty('page')) {
        delete obj.page;
    }
    if (obj.hasOwnProperty('pageSize')) {
        delete obj.pageSize;
    }
    const arr = [];
    Object.keys(obj).map(key => {
        if (obj[key] != '') {
            arr.push(`${key}='${obj[key]}'`);
        }
    });
    if (arr.length > 0) {
        return ` WHERE ` + arr.join(' and ');
    } else {
        return '';
    }
}

/**
 * 转换分页查询的语句
 * @param {Number} page 
 * @param {Number} pageSize 
 */
const convertLimitString = (page = 1, pageSize = 20) => {
    const start = (Number(page) - 1) * Number(pageSize);
    return `LIMIT ${start}, ${pageSize}`;
}

class Db {
    constructor () {
        this.mysql = mysql.createConnection(config.db);
        this.mysql.connect();
    }

    /**
     * 获取单条信息
     * @param {String} table 表名
     * @param {Object} where 筛选条件
     */
    get () {

    }

    /**
     * 
     * @param {String} table 表名字
     * @param {Array} values 字段值
     */
    insert (table, values) {
        // 获取字段列表
        const fields = Object.keys(values[0]).map(key => key);
        const columnString = fields.map(key => {
            return '`'+key+'`';
        }).join(',');
        const sql = `INSERT INTO ${table}(${columnString}) VALUES ?`;
        const datas = [];
        values.map(rowObj => {
            if (!rowObj) return false;
            const arr = [];
            fields.map(key => {
                arr.push(rowObj[key]);
            });
            datas.push(arr);
        });
        return new Promise((resolve, reject) => {
            this.mysql.query(sql, [datas], (err, rows, fields) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * 删除
     * @param {String} table 
     * @param {*} where 
     */
    delete (table, where = {}) {
        let sql = `DELETE FROM ${table}`;
        if (where) {
            const whereArr = [];
            Object.keys(where).map(key => {
                whereArr.push(`${key} = ${where[key]}`);
            });
            sql = sql + ` WHERE ${whereArr.join(' ')}`;
        }
        return new Promise((resolve, reject) => {
            this.mysql.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * 查询数据
     * @param {string} table 
     * @param {object} where 
     */
    select (table, where = {}, page = 1, pageSize = 20) {
        const whereString = convertWhereToString(where);
        const limitString = convertLimitString(page, pageSize);
        const sql = `SELECT * FROM ${table} ${whereString} ${limitString}`;
        return new Promise((resolve, reject) => {
            this.mysql.query(sql, (err, list) => {
                if (err) {
                    reject(err);
                } else {
                    this.mysql.query(`SELECT COUNT(*) as total FROM ${table} ${whereString}`, (err, totalRes, field) => {
                        resolve({
                            page: Number(page),
                            pageSize: Number(pageSize),
                            total: totalRes[0].total,
                            list: list,
                        });
                    });
                }
            });
        })
    }

    query (sql, callback) {
        this.mysql.query(sql, callback);
    }
}

const db = new Db();
module.exports = db;
