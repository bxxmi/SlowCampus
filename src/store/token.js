export default {
  namespaced: true,
  state: {
    data: ""
  },
  mutations: {
    set (state, input) {
      state.data = input
    }
  },
}
