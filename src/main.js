import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import httpcommon from './http/http-common'
import httpconfig from './http/http-config'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.prototype.$http = httpcommon['api'] // The axios object to make request to the backend API.

Vue.config.productionTip = false

const store = require('./store/index.js')(httpcommon)

new Vue({
  store: store,
  router,
  render: h => h(App),
}).$mount('#app')
