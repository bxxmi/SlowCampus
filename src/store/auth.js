export default {
    namespaced: true,
    state: {
        encryptKey : "1234",
        APIheaderObj : {
            "content-type": "application/json",
            "apikey": "FcKdtJs202110",
            "username": "team2"
        },
        //변화되는 내용
        logged_in : false,
        logged_user : {},
        range : 5
    },
    mutations: {
      setUser(state, obj){
        state.logged_user = obj
      },
      changeLogged (state, val) {
        state.logged_in = val
      },
      setRange(state){
        state.range += 2
      }
    }
  }
