import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import  newlist_store from './components/news.js'

export default new vuex.Store({
  modules:{
    newlist_store
  }
})
