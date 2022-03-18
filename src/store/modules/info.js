//store/modules/info.js
module.exports = (httpcommon) => {
  const Info = require('@/class/Info.js')
  const http = httpcommon['api']

  const state = {
    targetinfo: null, // Info currently selected.
    markersURL: null, // Icons name and associated URLs.
    rawinfolist: [], // Raw infos as gottent from the api server.
    retrieveTime: null, // The last time the info were retrieved from the api server.
    lastndays: 30, // retrieve information of the last <lastndays> days.
  }
  const getters = {
    targetinfo: (state) => state.targetinfo,
    markersURL: (state) => state.markersURL,
    infolist: (state) => state.rawinfolist.map((i) => new Info(i, state.markersURL)),
    retrieveTime: (state) => state.retrieveTime,
  }
  const actions = {
    // Ret
    async retrieveMarkersURL({ commit }) {
      let res = await http.get('/markers')
      commit('setMarkersURL', res.data)
    },
    // Delete and rebuild the list of informations.
    retrieveInfos({ commit, dispatch, state }) {
      let nbparts = 2
      let parts = 0
      let rawinfos

      this.lancement = function(start) {
        if (!start) return
        commit('initInfos')
        for (let i of rawinfos) {
          commit('pushInfo', i)
        }
        commit('updtRetrieveTime')
      }
      try {
        http.get('/infos/days/' + state.lastndays).then((response) => {
          rawinfos = response.data
          this.lancement(++parts >= nbparts, this)
        })
        dispatch('retrieveMarkersURL').then((response) => {
          this.lancement(++parts >= nbparts, this)
        })
      } catch (err) {
        alert(err)
        console.log(err)
      }
    },
  }
  const mutations = {
    setTarget(state, info) {
      state.targetinfo = info
    },
    setMarkersURL(state, mURL) {
      for (var marker in mURL) {
        mURL[marker] = httpcommon['maker_URL'] + mURL[marker]
      }
      state.markersURL = mURL
    },
    updtRetrieveTime(state) {
      state.retrieveTime = new Date()
    },
    initInfos(state) {
      state.rawinfolist = []
    },
    pushInfo(state, info) {
      state.rawinfolist.push(info)
    },
  }
  return {
    state,
    getters,
    actions,
    mutations,
  }
}
