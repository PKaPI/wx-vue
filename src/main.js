import Vue from 'vue'
import App from './App'
import store from '@/store';
import wx from '@/utils/wx';
import promisify from '@/utils/promisify';
import storage from '@/utils/storage';
import router from '@/utils/router';
import MyPlugin from './minxins';

import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'

// // 运行时错误和 promise 错误提示
// require('core-js/library/modules/_global.js').console = console;
// require('core-js/library/modules/_global.js').onunhandledrejection = console.errror

//全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
Vue.use(MyPlugin);
Vue.use(MpvueRouterPatch);

// TODO: 按需使用
Vue.prototype.$promisify = promisify;
Vue.prototype.$storage = storage;
Vue.prototype.$wx = wx;
Vue.prototype.$store = store;
Vue.prototype.$router = router;

Vue.config.productionTip = false

const app = new Vue({
    mpType:'app',
    store,
    ...App
})
app.$mount();
