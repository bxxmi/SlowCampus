import axios from 'axios'

export default {
  namespaced: true,

  state: () => ({
    bankListCanChoice: [],
    accountListandBalance: {},
    message:''
  }),
  getters: {
    myAccountsNameIdNumberInfo(state) {
      return state.accountListandBalance.accounts && state.accountListandBalance.accounts.reduce((acc,el) => {
        return [...acc, {name:el.bankName, id:el.id, accountNumber:el.accountNumber}]
      },[])
    }, //&&조건을 넣어줘야 undefined에 reduce실행하고 있다는 에러 발생 안함
    unconnectedBanksInfo(state) {
      return state.bankListCanChoice && state.bankListCanChoice.filter(bank => !bank.disabled)
    },
  },
  mutations: {
    setState(state,payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async checkBankListCanChoice({commit},input) {
      const { username, Authorization } = input

      commit('setState',{
        bankListCanChoice: [],
      })

      try {
        const { data } = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks',
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'FcKdtJs202110',
            username: 'team2',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2ODkwMjE1LCJleHAiOjE2MzY5NzY2MTUsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.Z90KRCeEVzuS0KwFDkPeVpwSi0orCn1fe7-zCcqbpTc',
          },
        })

        commit('setState',{
          bankListCanChoice: data,
        })
      } catch(e) {
        commit('setState',{
          message: e.message
        })
      }
    },

    async checkAccountListandBalance({commit},input) {
      const { username, Authorization } = input

      commit('setState',{
        accountListandBalance: {}
      })

      try {
        const { data } = await axios({
          //계좌 목록 및 잔액 조회
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
          method: 'get', // GET method
          headers: {
            'Content-Type': 'application/json', // "Content-Type": "application/json"
            apikey: 'FcKdtJs202110',
            username: 'team2',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2ODkwMjE1LCJleHAiOjE2MzY5NzY2MTUsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.Z90KRCeEVzuS0KwFDkPeVpwSi0orCn1fe7-zCcqbpTc', // 발행된 액세스 토큰
          },
        })

        commit('setState',{
          accountListandBalance: data
        })
      }catch (e){
        commit('setState',{
          message: e.message
        })
      }
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
