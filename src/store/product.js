import axios from 'axios'

// 참고) 기존 vue 파일에서 사용한 데이터 목록입니다.
// data() {
//   return {
//     title: '',
//     price: '',
//     description: '',
//     tags: '',
//     show: false,
//     confirmBuy: false,
//     accountNumber: 'i3paQoIb2P34EPwa6cqs',
//     items: [],
//     buylists: []
//   }
// }
export default {
  namespaced: true,
  state: () => ({
    // 등록한 제품들이 담길 배열 데이터
    productList: [],
    // 구매한 제품들이 담길 배열 데이터
    purchasedProductList: []
  }),
  getters: {
    // 전체 상품 리스트에서 뽑아낼 아이디들
    getProductId(state) {
      return state.productList.map(product => product.id)
    },
    // 구매한 제품 리스트에서 뽑아낼 아이디들
    getPurchasedProductId(state) {
      return state.purchasedProductList.map(purchased => purchased.detailId)
    }
  },
  mutations: {
    // assignState(state, payload) {
    //   Object.keys(payload).forEach(key => {
    //     state[key] = payload[key]
    //   })
    // },
    // 관리자 API : 제품 추가
    async addProduct() {
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          'masterKey': 'true'
        },
        data: {
          'title': this.title,
          'price': this.price,
          'description': this.description,
          'tags': this.tags
        }
      })
      console.log(data)
    },
    // 관리자 API: 제품 수정
    async editItem(itemId) {
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
    }
  },
  actions: {
    // 관리자 API: 전체 제품 조회
    async showAllItems() {
      this.show = !this.show
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2',
          'masterKey': 'true'
        }
      })
      this.items = data
      console.log(this.items)
    },
    // 관리자 API: 전체 판매 내역
    async soldItemList() {
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
    async moreInfo(itemId) {
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${itemId}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': 'team2'
        }
      })
      console.log(data)
    },
    // 사용자 API : 제품 구매 신청
    async buyItem(itemId, accountNumber) {
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
      this.confirmBuy = data
      console.log('confirmBuy:' + this.confirmBuy)
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
    async buyItemList() {
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
