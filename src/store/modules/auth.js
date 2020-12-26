//store/modules/auth.js

module.exports = (http) => {
  const state = {
    user: null,
    editmode: true,
  }
  const getters = {
    isAuthenticated: (state) => !!state.user,
    editmode: (state) => !!state.user && state.user.editor && state.editmode,
    StateUser: (state) => state.user,
    superadmin: (state) => !!state.user && state.user.superadmin,
  }
  const actions = {
    async retrieveUser({ commit, dispatch }) {
      try {
        let res = await http.get('/user')
        commit('setUser', res.data)
      } catch (err) {
        dispatch('LogOut')
      }
    },
    async LogIn({ dispatch }, form) {
      let res = await http.post('login', form)
      if (res.data === 'success') {
        return ''
      } else return res.data
    },
    async LogOut({ commit }) {
      let res = await http.get('logout')
      if (res.data === 'success') {
        commit('LogOut')
        return ''
      } else return res.data
    },
  }
  const mutations = {
    switchEditMode(state) {
      state.editmode = !state.editmode
    },
    setUser(state, user) {
      state.user = user
    },
    LogOut(state) {
      state.user = null
    },
  }
  return {
    state,
    getters,
    actions,
    mutations,
  }
}
