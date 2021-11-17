import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    // 전체 제품 리스트
    allProduct: [],
    // 등록한 제품이 담길 배열 데이터
    productList: [],
    // 구매한 제품들이 담길 배열 데이터
    purchasedProductList: [],
    // 제품 상세 정보가 담길 객체 데이터
    productInfo: {},
    //구매할 제품의 정보가 담길 객체 데이터
    productToOrderInfo: {
      title: '',
      image: '',
      id: '',
      price: 0
    },
    cart: [],
    //에러 메시지 저장
    message: '',
  }),
  getters: {
    // 구매한 제품 리스트에서 뽑아낼 아이디들
    getPurchasedProductId(state) {
      return state.purchasedProductList.map(purchased => purchased.detailId)
    }
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    addProduct(state, data) {
      state.productList.push(data)
    },
    setProductToOrderInfo(state, data) {
      const { title, image, id, price } = data
      state.productToOrderInfo.title = title
      state.productToOrderInfo.image = image
      state.productToOrderInfo.id = id
      state.productToOrderInfo.price = price
    },
    resetProductToOrderInfo(state) {
      state.productToOrderInfo.title = ''
      state.productToOrderInfo.image = ''
      state.productToOrderInfo.id = ''
      state.productToOrderInfo.price = 0
    },
    canclePurchasedProduct(state,detailId) {
      const idx = state.purchasedProductList.findIndex(item => item.detailId === detailId)
      state.purchasedProductList[idx].isCanceled = true
    },
    confirmPurchasedProduct(state,detailId) {
      const idx = state.purchasedProductList.findIndex(item => item.detailId === detailId)
      state.purchasedProductList[idx].done = true
    },
    addCart(state,item) {
      state.cart.push(item)
    },
    removeCart(state,id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    resetCart(state) {
      state.cart = []
    }
  },
  actions: {
     // 관리자 API : 제품 추가 (완료)
     async addProduct({ commit }, product) {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2',
          'masterKey': true
        },
        data: {
          'title': product[0].title,
          'price': product[0].price,
          'description': product[0].description,
          'tags': product[0].tags,
          'thumbnailBase64': product[0].thumbnailBase64,
          'photoBase64': product[0].photoBase64
        }
      })
      commit('addProduct', data)
      alert('제품 추가 완료')
    },
    // 관리자 API: 제품 수정
    async editProduct(itemId) {
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${itemId}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2',
          'masterKey': 'true'
        },
        data: {
          'price': 2000
        }
      })
    },
    // 관리자 API: 전체 제품 조회 (완료)
    async getAllProduct({ commit }) {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2',
          'masterKey': true
        }
      })
      commit('assignState', { allProduct: data })
    },
    // 관리자 API: 전체 판매 내역
    async soldProductList() {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2',
          'masterKey': 'true'
        }
      })
    },
    // 공용 API: 단일 제품 상세 조회 (완료)
    async detailProduct({ commit }, itemId) {
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${itemId.id}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2'
        }
      })
      commit('assignState', { productInfo: data })
    },
    // 사용자 API: 제품 검색 - 키워드 (완료) 
    async searchProduct({ commit }, payload) {
      const { productName } = payload
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2'
        }
      })
      const result = data.filter(name => name.title.includes(productName))
      if (Object.keys(result).length === 0) {
        alert('검색하신 강의는 존재하지 않습니다. 😭')
        return
      }
      commit('assignState', { allProduct: result})
    },
    // 사용자 API: 제품 검색 - 태그 (완료) 
    async searchTag({ commit }, payload) {
      const { tagName } = payload
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2'
        }
      })
      const result = data.filter(name => name.tags === tagName)
      commit('assignState', { allProduct: result })
    },
    // 사용자 API : 제품 구매 신청
    async requestOrder({ commit },input) {
      const { username, authorization, productId, accountId } = input
  
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          username,
          authorization
        },
        data: {
          productId,
          accountId
        }
      })
    },
    // 사용자 API : 구매 취소
    async cancelOrder({ commit }, input) {
      const { username,authorization,detailId } = input

      try {
        const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel',
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202110',
            username,
            authorization
          },
          data: {
            detailId
          }
        })

        if(data){
          commit('canclePurchasedProduct',detailId)
        }
      } catch (e) {
        commit('assignState',{
          message: e.message
        })
      }
    },
    // 사용자 API : 구매 확정
    async confirmOrder({ commit }, input) {
      const { username,authorization,detailId } = input

      try {
        const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok',
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202110',
            username,
            authorization
          },
          data: {
            detailId
          }
        })

        if(data){
          commit('canclePurchasedProduct',detailId)
        }
      } catch (e) {
        commit('assignState',{
          message: e.message
        })
      }
    },
    // 사용자 API : 사용자가 구매한 제품 전체 내역(구매 취소 내역까지 출력)
    async allBuyInfo({ commit }, input) {
      const { username , authorization } = input

      commit('assignState',{
        purchasedProductList: []
      })

      try {
        const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details',
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'apikey': 'FcKdtJs202110',
            username,
            authorization
          }
        })
  
        commit('assignState',{
          purchasedProductList: data
        })
      } catch (e) {
        commit('assignState',{
          message: e.message
        })
      }
    },
    // 사용자 API : 단일 제품 구매 정보 상세 보기 
    async detailBuyInfo(itemId) {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NzI2MzE3LCJleHAiOjE2MzY4MTI3MTcsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.x-gfpmPzEnEKWL2nHq8H_LO32lLsy2rNBLVSSk-oeBI'
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'adminteam2',
          authorization: `Bearer ${accessToken}`
        },
        data: {
          detailId: itemId
        }
      }) 
    }
  }
}
