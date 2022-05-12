import Vuex from "vuex";
import Vue from "vue";
import app from '@/store/modules/app'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    app
  }
});
export default store;
