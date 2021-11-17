<template>
  <div class="close-box">
    <label for="accountCheck">
      <slot></slot>
    </label>
    <select
      id="accountCheck"
      v-model="myAccountId"
      name="myAccount">
      <option value="">
        해지할 계좌를 선택해주세요.
      </option>
      <option
        v-for="info in myAccountsNameIdNumberInfo"
        :key="info.name"
        :value="info.id">
        {{ info.name }} {{ info.accountNumber }}
      </option>
    </select>
    <button
      type="button"
      @click="closeAccount">
      확인
    </button>
  </div>
</template>

<script>

import store from '~/store/'
import authfunc from '~/store/authfunc.js'

export default {
  data() {
    return {
      myAccountId:'',
      signature: false
    }   
  },
  computed: {
    myAccountsNameIdNumberInfo() {
      return this.$store.getters['account/myAccountsNameIdNumberInfo']
    },
  },
  methods: {
    closeAccount() {
      this.signature = true

      this.$store.dispatch('account/closeAccount',{
        username: store.state.auth.APIheaderObj.username,
        Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        accountId:this.myAccountId, 
        signature: this.signature
      })
      
      this.signature = false
    }
  }
}
</script>

<style lang="scss" scoped>
.close-box {
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
  label {
    line-height: 40px;
    margin-right: 100px;
    }
    select {
    width: 400px;
    height: 40px;
    font-size: 16px;
    margin-right: 15px;
    padding: 0 10px;
    }
  button {
    display: block;
    width: 60px;
    font-size: 18px;
    cursor: pointer;
    background-color: #0D6EFD;
    border: none;
    color: white;
    border-radius: 5px;
  }
}
</style>
