export default {
    namespaced: true,
    state: {
        encryptKey : "1234",
        logged_in : false,
        logged_user : {},
        APIheaderObj : {
            "content-type": "application/json",
            "apikey": "FcKdtJs202110",
            "username": "team2"
        }
    },
    mutations: {
      setUser(state, obj){
        state.logged_user = obj
      },
      changeLogged (state, val) {
        state.logged_in = val
      }
    },
    actions: {
        
    }
  }
