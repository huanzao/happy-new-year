// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] ='Bearer '+localStorage.token;

import VueAxios from 'vue-axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import qs from 'qs'
import Vuex from 'vuex'


Vue.prototype.$qs = qs;
Vue.use(VueAxios, axios);
Vue.use(XLSX, FileSaver);
Vue.use(ElementUI)
Vue.use(Vuex)
const store = new Vuex.Store({
    //全局状态
    state: {
        count: 0,
        user:'789qwer',
        token:'',
        search_arr:[],
        search_time:'',

        cc_arr:[],
        cc_time:'',

        wt_arr:[],
        wt_time:'',

        cj_arr:[],
        cj_time:'',

        cx_arr:[],
        cx_time:''
    },
    //对state做一些包装处理
    getters: {
        myCount(state){
            return `vuex count is ${state.count}`
        },
    },
    //只能通过mutations修改state的属性
    mutations: {
        time_fun(state,params){
            console.log(params)
            if(params.type==='ss'){
                console.log('bbbbb',params.time)
                state.search_time=params.time
            }else if(params.type==='cc'){
                state.cc_time=params.time
            }else if(params.type==='wt'){
                state.wt_time=params.time
            }else if(params.type==='cj'){
                state.cj_time=params.time
            }else if(params.type==='cx'){
                state.cx_time=params.time
            }
        },
        clear_state(state){
            state.search_arr=[]
            state.search_time=''
            state.cc_arr=[]
            state.cc_time=''
            state.wt_arr=[]
            state.wt_time=''
            state.cj_arr=[]
            state.cj_time=''
            state.cx_arr=[]
            state.cx_time=''
        },
        search_fun(state,arr){
            state.search_arr=arr
            console.log('vuex1111--------',state.search_arr)
        },
        cc_fun(state,arr){
            state.cc_arr=arr
            console.log('vuex2222--------',state.cc_arr)
        },
        wt_fun(state,arr){
            state.wt_arr=arr
            console.log('vuex3333--------',state.wt_arr)
        },
        cj_fun(state,arr){
            state.cj_arr=arr
            console.log('vuex4444--------',state.cj_arr)
        },
        cx_fun(state,arr){
            state.cx_arr=arr
            console.log('vuex5555--------',state.cx_arr)
        },
        tokenfun(state,text) {
            state.token='Bearer '+text
        },
        userfun(state,username){
            state.user=username
        },
        increment(state) {
            state.count += 1
        },
        decrement(state) {
            state.count -= 1
        }
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