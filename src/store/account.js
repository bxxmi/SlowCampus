import axios from 'axios'

export default {
  namespaced: true,

  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    async checkBankListCanChoice(input) {
      const { username, Authorization } = input

      const data = await axios({
        //선택 가능한 은행 목록 조회
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
        method: 'get', // GET method
        headers: {
          'Content-Type': 'application/json', // "Content-Type": "application/json"
          apikey: 'FcKdtJs202110',
          username,
          Authorization,
        },
      })

      console.log(data, 'checkBankListCanChoice')
    },

    async ckeckAccountListandBalance(input) {
      const { username, Authorization } = input

      const data = await axios({
        //계좌 목록 및 잔액 조회
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        method: 'get', // GET method
        headers: {
          'Content-Type': 'application/json', // "Content-Type": "application/json"
          apikey: 'FcKdtJs202110',
          username,
          Authorization, // 발행된 액세스 토큰
        },
      })

      console.log(data, 'ckeckAccountListandBalance')
    },

    async connectAccount(input) {
      const {
        username,
        Authorization,
        bankCode,
        accountNumber,
        phoneNumber,
        signature,
      } = input
      const data = await axios({
        //계좌 목록 및 잔액 조회
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        method: 'post', // post method
        headers: {
          'Content-Type': 'application/json', // "Content-Type": "application/json"
          apikey: 'FcKdtJs202110',
          username,
          Authorization, // 발행된 액세스 토큰
        },
        data: {
          bankCode, //KB국민은행으로 임시 설정
          accountNumber, //
          phoneNumber,
          signature,
        },
      })

      console.log(data, 'connectAccount')
    },

    async closeAccount(input) {
      const { username, Authorization, accountId, signature } = input
      const data = await axios({
        //계좌 목록 및 잔액 조회
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
        method: 'delete', // GET method
        headers: {
          'Content-Type': 'application/json', // "Content-Type": "application/json"
          apikey: 'FcKdtJs202110',
          username,
          Authorization
            , // 발행된 액세스 토큰
        },
        data: {
          accountId,
          signature,
        },
      })

      console.log(data,'closeAccout')
    },
  },
}
