// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import VueAxios from 'vue-axios'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import qs from 'qs'
Vue.prototype.$qs = qs;
Vue.use(VueAxios,axios);
Vue.use(XLSX,FileSaver);
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



