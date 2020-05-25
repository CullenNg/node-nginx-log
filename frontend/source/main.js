import Vue from 'vue';
import router from './library/router';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 页面佈局
import layout from './layout/index';

// 注册所有接口
import * as api from './library/api';
Vue.prototype.$api = api;

// 引用自定义的样式
import './less/index.less';

// 实例化 geshop
window.vm = new Vue({
    router,
    render: h => h(layout),
}).$mount('#app');
