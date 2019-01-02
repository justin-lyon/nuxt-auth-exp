const namespaced = true

const state = () => ({
  isDarkTheme: true
})

const getters = {
  isDarkTheme: state => state.isDarkTheme
}

const mutations = {
  toggleTheme (state) {
    state.isDarkTheme = !state.isDarkTheme
  }
}

const actions = {
  changeTheme({ commit }) {
    commit('toggleTheme')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}