export default {
  namespaced: true,
  state: {
    encrypt_key : "1234",
    logged_in : false
  },
  mutations: {
    changeLogged (state, val) {
      state.logged_in = val
    }
  }
}
