import firebase from 'firebase'

const auth = {
  namespaced: true,
  state: {
    user: {
      init: false,
      auth: false
    }
  },
  getters: {
    init: state => state.user.init,
    user: state => state.user
  },
  mutations: {
    set(state, payload) {
      state.user = payload
    },
    unset(state) {
      state.user = {
        init: true,
        auth: false
      }
    }
  },
  actions: {
    init({ commit }) {
      // 状態が変わった時の処理を登録
      firebase.auth().onAuthStateChanged(user => {
        console.log('onAuthStateChanged callback')
        if (user) {
          const profile = {
            init: true,
            auth: true,
            uid: user.uid,
            email: user.email
          }
          commit('set', profile)
        } else {
          commit('unset')
        }
      })
    }
  }
}

export default auth