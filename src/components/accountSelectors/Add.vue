<template>
  <div class="add-box">
    <div class="account-select-box">
      <label for="accountCheck">
        <slot></slot>
      </label>
      <select
        id="accountAdd"
        v-model="bankCode"
        name="selectedAccount"
        @change="clearAccountNumber">
        <option value="">
          연결할 은행을 선택하세요.
        </option>
        <option
          v-for="info in unconnectedBanksInfo"
          :key="info.name"
          :value="info.code">
          {{ info.name }}
        </option>
      </select>
    </div>
    <div
      v-show="bankCode !== ''" 
      class="account-text-box">
      <input
        v-model="accountNumber"
        type="text"
        placeholder="계좌번호 (-를 제외하고 입력해주세요.)" 
        @keyup="getAccountMask(accountNumber)" />
      <input
        v-model="phoneNumber"
        type="text"
        placeholder="핸드폰번호 (-를 제외하고 입력해주세요.)"
        @keyup="getPhoneMask(phoneNumber)" />
      <div class="submit-box">
        <label for="signature">이용 약관에 동의합니까?</label>
        <input
          id="signature"
          v-model="signature"
          type="checkbox"
          name="signature" />
        <button
          type="button"
          @click="submitAccountAdd">
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import store from '~/store/'
import authfunc from '~/store/authfunc.js'

export default {
  data() {
    return {
      bankCode: '',
      accountNumber: null,
      phoneNumber: null,
      signature: false,
    }
  },
  computed: {
    unconnectedBanksInfo() {
      return this.$store.getters['account/unconnectedBanksInfo']
    },
    bankCodeAndDigitsPair() {
      return this.$store.getters['account/bankCodeAndDigitsPair']
    },
  },
  methods: {
    clearAccountNumber() {
      this.accountNumber = null
    },
    getAccountMask(accountNumber) {
      if(!accountNumber) return accountNumber
      accountNumber = accountNumber.replace(/[^0-9]/g,'')

      const digits = [...this.bankCodeAndDigitsPair[this.bankCode]]

      let res = ''
      let interval = 0
      
      for(let i = 0 ; i < digits.length ; i++){
        if(i === digits.length - 1){
          res += accountNumber.substr(interval,digits[i])
          break
        }

        res += accountNumber.substr(interval,digits[i])
        
        if(accountNumber.length > interval+digits[i]){
          res += '-'
        }
        
        interval += digits[i]
      }

      this.accountNumber = res
    },
    getPhoneMask(phoneNumber) {
      if(!phoneNumber) return phoneNumber
      phoneNumber = phoneNumber.replace(/[^0-9]/g,'')

      let res = ''
      if(phoneNumber.length < 4){
        res = phoneNumber
      }else {
        if(phoneNumber.length < 8){
          res = phoneNumber.substr(0,3) + '-' + phoneNumber.substr(3,4)
        }else {
          res = phoneNumber.substr(0,3) + '-' + phoneNumber.substr(3,4) + '-' + phoneNumber.substr(7,4)
        }
      }

      this.phoneNumber = res
    },
    submitAccountAdd() {
      this.$store.dispatch('account/connectAccount',{
        username: store.state.auth.APIheaderObj.username,
        Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        bankCode: this.bankCode,
        accountNumber: this.accountNumber.replace(/[-]/g,''),
        phoneNumber: this.phoneNumber.replace(/-/g,''),
        signature: this.signature,
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.add-box {
  display: flex;
  flex-direction: column;

  .account-select-box {
    display: flex;
    flex-direction: row;
  }

  .account-text-box {
    display: flex;
    flex-direction: column;
  }
}
.submit-box {
  display: flex;
}
</style>
