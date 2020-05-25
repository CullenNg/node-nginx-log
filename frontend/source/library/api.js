import {get, post} from './service';


/**
 * 微信授权
 */
export const get_logs_list = (params) => { return get('/api/log/get_logs', params) };

/**
 * 修改密码
 * @param {Object} data 密码
 */
export const update_password = (data) => { return post('/kafan/api/user/updatePassword', data) };
