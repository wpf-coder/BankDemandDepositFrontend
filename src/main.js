import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import echarts from 'echarts'




Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(qs)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$store = store
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts

moment.locale('zh-cn');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
