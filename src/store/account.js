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
          username: 'team2',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NjE5MjYwLCJleHAiOjE2MzY3MDU2NjAsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.9zshV1fKrAqRDJ9q9r9-y2iM8ctiqwHWj8z7Cs3sJwA', // 발행된 액세스 토큰
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
          username: 'team2',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NjE5MjYwLCJleHAiOjE2MzY3MDU2NjAsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.9zshV1fKrAqRDJ9q9r9-y2iM8ctiqwHWj8z7Cs3sJwA', // 발행된 액세스 토큰
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
          username: 'team2',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NjE5MjYwLCJleHAiOjE2MzY3MDU2NjAsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.9zshV1fKrAqRDJ9q9r9-y2iM8ctiqwHWj8z7Cs3sJwA', // 발행된 액세스 토큰
        },
        data: {
          bankCode: '088', //KB국민은행으로 임시 설정
          accountNumber: '111222333333', //
          phoneNumber: '01012345678',
          signature: true,
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
          username: 'team2',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2NjE5MjYwLCJleHAiOjE2MzY3MDU2NjAsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.9zshV1fKrAqRDJ9q9r9-y2iM8ctiqwHWj8z7Cs3sJwA', // 발행된 액세스 토큰
        },
        data: {
          accountId: 'bxWpUcZxAFFB2ZBwnelu',
          signature: true,
        },
      })

      console.log(data,'closeAccout')
    },
  },
}
