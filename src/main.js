// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routerConfig from './router'
import VueRouter from 'vue-router';
import VueScroller from 'vue-scroller'
import store from './store'
import vuex from 'vuex'
import animate from 'animate.css'
import VueJsonp from 'vue-jsonp'



//css
import './assets/css/lib/sm-extend.min.css';
import './assets/css/caimao/index.css'
import './assets/css/caimao/base.css'
//js
import './assets/js/lib/zepto.min.js';
import './assets/js/lib/sm-extend.min.js';



Vue.config.productionTip = false
Vue.use(VueScroller)
Vue.use(vuex);
Vue.use(VueRouter);
Vue.use(VueJsonp);
Vue.use(animate);

const router = new VueRouter(routerConfig);



$.config = {
  router: false
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  /*components: { App },
  template: '<App/>',*/
  render: h => h(App)
})
