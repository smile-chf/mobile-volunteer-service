import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/static/css/cssreset.css'
Vue.config.productionTip = false
Vue.use(Vant);


import dayjs from "dayjs";
Vue.prototype.$d = dayjs
// 导入 dayjs 的语言包
// import "dayjs/locale/zh-cn";
// dayjs.locale('zh-cn')

Vue.prototype.$d = dayjs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.$url="http://www.ahshequ.cn/hfcx_csp/entrance/index"