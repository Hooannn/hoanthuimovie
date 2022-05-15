import Vuex from "vuex";
import Vue from "vue";
import app from '@/store/modules/app'
import user from '@/store/modules/user'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    app,
    user
  }
});
export default store;
