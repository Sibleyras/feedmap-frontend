// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

module.exports = (httpcommon) => {
  const Vue = require('vue').default
  const Vuex = require('vuex').default
  const createPersistedState = require('vuex-persistedstate').default
  const auth = require('./modules/auth.js')(httpcommon['api'])
  const info = require('./modules/info.js')(httpcommon)

  // Load Vuex
  Vue.use(Vuex)
  // Create store
  return new Vuex.Store({
    modules: {
      auth,
      info,
    },
    plugins: [createPersistedState()],
  })
}
