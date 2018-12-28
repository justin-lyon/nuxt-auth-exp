export default ({ store, redirect }) => {
  if(!store.state.getters.auth.isAuthenticated) {
    return redirect('/login')
  }
}