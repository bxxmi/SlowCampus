import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import product from './product'
import account from './account'
import auth from './auth'

export default createStore({
  modules: {
    product,
    account,
    auth
  },
  plugins: [
    createPersistedstate({
      paths: [
        'product'
      ]
    })
  ]
})
