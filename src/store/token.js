export default {
  namespaced: true,
  state: {
    accessToken: "",
    encrypt_key : "1234"
  },
  mutations: {
    setAccessToken (state, input) {
      state.accessToken = input
    }
  },
}
