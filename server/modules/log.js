const moment = require('moment');

class LogModule {
    constructor (str) {
        this.originString = str;
        if (str != '') {
            this.data = this.init(str);
        }
    }

    /**
     * 开始格式化
     * @param {String} str 
     */
    init (str = '') {
        const code = this.get_code(str);
        const ip = this.get_ip(str);
        const request = this.get_request(str);
        const method = this.get_method(str);
        const timestamp = this.get_timestamp(str);
        const reffer = this.get_reffer(str);
        const browser = this.get_browser(str);
        return {
            code,
            ip,
            request,
            method,
            timestamp,
            reffer,
            browser,
        }
    }

    /**
     * 获取http状态码
     * @param {String} str 
     */
    get_code (str = '') {
        const match = str.match(/"\s{1}\d{3}\s{1}/)[0].replace(/[^\d]/g, '');
        return match;
    }

    /**
     * 获取请求的IP
     * @param {String} str 
     */
    get_ip (str) {
        const match = str.match(/\d*\.\d*\.\d*\.\d*/)[0];
        return match;
    }

    /**
     * 获取请求方式
     * @param {String} str 
     */
    get_method (str) {
        const reg = /"[^"]*/;
        const match = str.match(reg)[0].split(' ')[0].replace(/"/g, '');
        const map = ['GET', 'POST', 'PUT'];
        if (map.includes(match)) {
            return match;
        } else {
            return 'unknow';
        }
    }

    /**
     * 获取请求链接
     * @param {String} str 
     */
    get_request (str) {
        const reg = /"[^"]*/;
        const match = str.match(reg)[0].split(' ')[1];
        return match || '';
    }

    /**
     * 获取时间戳，毫秒级
     * @param {String} str 
     */
    get_timestamp (str) {
        const reg = /\[[^\]]*/;
        const match = str.match(reg)[0].replace('[', '').replace(':', ' ');
        return moment(match).format('YYYY-MM-DD h:mm:ss');
    }

    /**
     * 获取来源
     * @param {String} str 
     */
    get_reffer (str) {
        const reg = /"[^"]*/g;
        const match = str.match(reg)[2].replace('"', '');
        return match;
    }

    /**
     * 获取浏览器标识
     * @param {String} str 
     */
    get_browser (str) {
        const reg = /"[^"]*/g;
        const match = str.match(reg)[4].replace('"', '');
        return match;
    }

    get_data () {
        return this.data;
    }
}

module.exports = LogModule;
