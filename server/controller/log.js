const fs = require('fs');
const path = require('path');
const Controller = require('./base');
const LogModule = require('../modules/log.js');

/**
 * 读取日志文件
 * @param {String} fullPath 文件路径
 * @returns {Array}
 */
const get_log_file_detail = (fullPath) => {
    const res = fs.readFileSync(fullPath, 'utf-8').split(/[\n]/).map(row => {
        const log = new LogModule(row);
        return log.get_data();
    });
    return res;
};

class LogController extends Controller {

    /**
     * 获取Log日志文件列表
     */
    get_files () {
        let filePath = this.config.logPath;
        // 返回目录下文件
        fs.readdir(filePath, (err, files) => {
            if (err) {
                if (err) throw  err;
            } else {
                // 获取文件数量
                let arrLen = files.length - 1,
                arr = [];
                files.forEach((filename, index) => {
                    arr.push(filename);
                    if (arrLen === index) {
                        this.success(arr);
                    }
                });
            }
        });
    }

    /**
     * 导入log文件
     */
    import_file (params = {}) {
        const datas = get_log_file_detail(params.filePath);
        this.db.insert('logs', datas).then(res => {
            this.success(res);
        }).catch(err => {
            this.fail(err);
        });
    }

    /**
     * 查询日志记录
     * @param {Object} params 
     */
    get_logs (params = {}) {
        if (params.type == 'now') {
            // 读取文件
            const filePath = path.join(this.config.logPath, './access.log');
            let content = get_log_file_detail(filePath);
            // 开始过滤
            content = content.filter(x => {
                if (!x) return false;
                if (params.method != '') {
                    if (params.method != x.method) return false;
                }
                if (params.code != '') {
                    if (params.code != x.code) return false;
                }
                return true;
            });
            this.success({
                list: content,
                page: 1,
                pageSize: content.length,
                total: content.length
            });
        } else {
            delete params.type;
            this.db.select('logs', params, params.page, params.pageSize).then(res => {
                this.success(res);
            }).catch(err => {
                this.fail(err);
            });
        }
    }
}

module.exports = LogController;