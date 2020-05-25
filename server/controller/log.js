const fs = require('fs');
const Controller = require('./base');
const LogModule = require('../modules/log.js');

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
        const datas = this.get_log_detail(params.filePath);
        this.db.insert('logs', datas).then(res => {
            this.success(res);
        }).catch(err => {
            this.fail(err);
        });
    }

    get_log_detail (filePath) {
        const res = fs.readFileSync(filePath, 'utf-8').split(/[\n]/).map(row => {
            const log = new LogModule(row);
            return log.get_data();
        });
        return res;
    }

    /**
     * 查询日志记录
     * @param {Object} params 
     */
    get_logs (params = {}) {
        this.db.select('logs', params, params.page, params.pageSize).then(res => {
            this.success(res);
        }).catch(err => {
            this.fail(err);
        });
    }
}

module.exports = LogController;