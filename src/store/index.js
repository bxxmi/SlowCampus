import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import product from './product'
import account from './account'

export default createStore({
  modules: {
    product,
    account,
  },
  plugins: [
    createPersistedstate({
      paths: [
        'product'
      ]
    })
  ]
})
