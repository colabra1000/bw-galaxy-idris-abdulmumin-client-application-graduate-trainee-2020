import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bootstrap'
import BootstrapVue from 'bootstrap-vue'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(BootstrapVue)
Vue.use(VueJwtDecode)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
