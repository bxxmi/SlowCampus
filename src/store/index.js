import { createStore } from 'vuex'
import product from './product'
import account from './account'

export default createStore({
  modules: {
    product,
    account,
  },
})
