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
    bankCodeAndDigitsPair(state) {
      return state.bankListCanChoice && state.bankListCanChoice.filter(bank => !bank.disabled).reduce((acc,el) => ({
        ...acc, [el.code]:el.digits
      }),{})
    },
  },
  mutations: {
    setState(state,payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    addAccount(state,payload) {
      state.accountListandBalance.accounts.push(payload)
    },
    removeAccount(state,payload) {
      const idx = state.accountListandBalance.accounts.findIndex(el => el.id === payload)
      delete state.accountListandBalance.accounts[idx]
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
            username,
            Authorization,
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
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
          method: 'get',
          headers: {
            'Content-Type': 'application/json', 
            apikey: 'FcKdtJs202110',
            username,
            Authorization, 
          },
        })

        commit('setState',{
          accountListandBalance: data
        })
      } catch (e){
        commit('setState',{
          message: e.message
        })
      }
    },

    async connectAccount({ commit },input) {
      const {
        username,
        Authorization,
        bankCode,
        accountNumber,
        phoneNumber,
        signature,
      } = input

      try {
        const { data } = await axios({
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

        commit('addAccount',{
          data
        })
        alert('계좌 추가가 완료되었습니다.')
      } catch (e) {
        alert('비정상적인 시도입니다.')
      } finally {
        location.reload()
      }
    },

    async closeAccount({ commit },input) {
      const { username, Authorization, accountId, signature } = input

      try {
        const data = await axios({
          url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
          method: 'delete', 
          headers: {
            'Content-Type': 'application/json',
            apikey: 'FcKdtJs202110',
            username,
            Authorization
              , 
          },
          data: {
            accountId,
            signature,
          },
        })
  
        if(data){
          commit('removeAccount', accountId)
          alert('정상적으로 계좌가 해지되었습니다.')
        } else {
          alert('비정상적인 시도입니다.')
        }
      } catch(e) {
        alert('비정상적인 시도입니다.')
      } finally {
        location.reload()
      }
    }  
  },
}
