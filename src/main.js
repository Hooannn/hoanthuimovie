import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import nanobar from './plugins/nanobar'
import { rtdbPlugin as VueFire } from 'vuefire'
import { ToastPlugin } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import VueEllipseProgress from 'vue-ellipse-progress';
Vue.use(VueEllipseProgress);
Vue.use(ModalPlugin)
Vue.use(ToastPlugin)
Vue.use(VueFire)
Vue.config.productionTip = false
new Vue({
  nanobar,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
