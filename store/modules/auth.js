const namespaced = true

const state = () => ({
  loggedIn: false,
  user: null
})

const getters = {
  user: state => state.user,
  isAuthenticated: state => state.loggedIn
}

const mutations = {
  setUser (state, newUser) {
    state.user = newUser
  }
}

const actions = {
  register ({ commit, dispatch }, user) {
    console.log('auth/register', user)
    return this.$axios.post('/auth/register', user)
      .then(res => {
        console.log('auth/register post success', res)
      })
      .catch(err => {
        console.error('Error creating user.', err)
      })
  },

  login ({ commit }, user) {
    console.log('auth/login user', user)
    return this.$auth.loginWith('local', {
      data: user
    })
    .then(res => {
      console.log('user', res)
      commit('setUser', user)
      return res
    })
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}