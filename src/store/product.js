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
    productInfo: {}
  }),
  getters: {
    // 전체 상품 리스트에서 상세 정보 보기를 위해 뽑아낼 아이디들
    // getProductId(state) {
    //   return state.productList.map(product => product.id)
    // },
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
          'username': 'team2',
          'masterKey': true
        },
        data: {
          'title': product[0].title,
          'price': product[0].price,
          'description': product[0].description,
          'tags': product[0].tags
        }
      })
      commit('addProduct', data)
    },
    // 관리자 API: 제품 수정
    async editProduct(itemId) {
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${itemId}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          'masterKey': 'true'
        },
        data: {
          'price': 2000
        }
      })
      console.log(data)
    },
    // 관리자 API: 전체 제품 조회 (완료)
    async getAllProduct({ commit }) {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          'masterKey': true
        }
      })
      commit('assignState', { allProduct: data })
      console.log(data)
    },
    // 관리자 API: 전체 판매 내역
    async soldProductList() {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          'masterKey': 'true'
        }
      })
      console.log(data)
    },
    // 공용 API: 단일 제품 상세 조회
    async detailProduct({ commit }, itemId) {
      console.log(itemId)
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${itemId}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2'
        }
      })
      commit('assignState', { productInfo: data })
    },
    // 사용자 API : 제품 구매 신청
    async requestOrder(itemId, accountNumber) {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NzI2MzE3LCJleHAiOjE2MzY4MTI3MTcsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.x-gfpmPzEnEKWL2nHq8H_LO32lLsy2rNBLVSSk-oeBI'
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          authorization: `Bearer ${accessToken}`
        },
        data: {
          productId: itemId,
          accountId: accountNumber
        }
      })
      console.log(data)
    },
    // 사용자 API : 구매 취소
    async cancelOrder(itemId) {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NzI2MzE3LCJleHAiOjE2MzY4MTI3MTcsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.x-gfpmPzEnEKWL2nHq8H_LO32lLsy2rNBLVSSk-oeBI'
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          authorization: `Bearer ${accessToken}`
        },
        data: {
          detailId: itemId
        }
      })
      console.log(data)
    },
    // 사용자 API : 구매 확정
    async confirmOrder(itemId) {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NzI2MzE3LCJleHAiOjE2MzY4MTI3MTcsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.x-gfpmPzEnEKWL2nHq8H_LO32lLsy2rNBLVSSk-oeBI'
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          authorization: `Bearer ${accessToken}`
        },
        data: {
          detailId: itemId
        }
      })
      console.log(data)
    },
    // 사용자 API : 사용자가 구매한 제품 전체 내역(구매 취소 내역까지 출력)
    async allBuyInfo() {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NzI2MzE3LCJleHAiOjE2MzY4MTI3MTcsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.x-gfpmPzEnEKWL2nHq8H_LO32lLsy2rNBLVSSk-oeBI'
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          authorization: `Bearer ${accessToken}`
        }
      })
      this.buylists = data
      console.log(this.buylists)
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
          'username': 'team2',
          authorization: `Bearer ${accessToken}`
        },
        data: {
          detailId: itemId
        }
      }) 
      console.log(data)
    }
  }
}
