import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import nanobar from './plugins/nanobar'
import { ToastPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)
Vue.use(ToastPlugin)
Vue.config.productionTip = false
new Vue({
  nanobar,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
