const namespaced = true

/* state injected by @nuxtjs/auth
const state = () => ({
  loggedIn: false,
  user: null
})
*/

const getters = {
  user: state => state.user,
  isAuthenticated: state => state.loggedIn
}

const mutations = {}

const actions = {
  register ({ dispatch }, user) {
    console.log('auth/register', user)
    return this.$axios.post('/auth/register', user)
      .then(res => {
        dispatch('login', user)
      })
  },

  login ({ commit }, user) {
    console.log('auth/login user', user)
    return this.$auth.loginWith('local', {
      data: user
    })
    .then(() => {
      console.log('success, logged in')
      this.$router.push('/inspire')
    })
    .catch(err => {
      console.error('Error during login: ', err.message)
    })
  }
}

export default {
  namespaced,
  getters,
  mutations,
  actions
}