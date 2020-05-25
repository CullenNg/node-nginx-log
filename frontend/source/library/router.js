import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import NotFoundComponent from '../views/404.vue';

const routes = [
    {
        path: '/',
        redirect: '/log/index'
    },
    {
        name: '我的',
        path: '/log/index',
        component: resolve => require(['../views/log/index'], resolve)
    },
    {
        path: '*',
        meta: { header_disabled: true, footer_disabled: true },
        component: NotFoundComponent
    }
];

const router = new VueRouter({ routes });

/**
 * 路由钩子，判断是否有cookie
 */
router.beforeEach((to, from, next) => {
    next();
});

export default router;
