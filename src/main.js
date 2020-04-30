// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { library } from '@fortawesome/fontawesome-svg-core';

import Print from '@/unit/print'
Vue.use(Print)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'


library.add(
    faUser,
);
import VueAxios from 'vue-axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import qs from 'qs'
import Vuex from 'vuex'
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.prototype.$qs = qs;
Vue.use(VueAxios, axios);

Vue.filter('filterExport',function(data){
    if(data===true){
        return '加载中'
    }else if(data===false){
        return '导出Excel'
    }
    
})

// axios.defaults.baseURL = 'http://127.0.0.1:4000/' 我的测试地址
// axios.defaults.baseURL = 'http://118.89.215.247:8080/'
// axios.defaults.headers={     //转化为对象
//     "Access-Control-Allow-Origin":"*",
//     "Access-Control-Allow-Headers":"X-Requested-With",
//     "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
//     "Content-Type":"application/json;charset=utf-8",
//     "Content-type":"application/x-www-form-urlencoded"  //请求格式
// }  
Vue.use(XLSX, FileSaver);
Vue.use(ElementUI)
Vue.use(Vuex)
const store = new Vuex.Store({
    //全局状态
    state: {
        count: 0,
        sideIndex:0,
    },
    //对state做一些包装处理
    getters: {
        myCount(state){
            return `vuex count is ${state.count}`
        },
    },
    //只能通过mutations修改state的属性
    mutations: {
        change_sideIndex(state,params){
            state.sideIndex=params
        },
    },
    //业务逻辑
    actions: {
        myAdd(context){
            //在这里做一些逻辑处理
            context.commit('increment')

        },
        myDel(context){
            context.commit('decrement')
        }
    }

})
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})