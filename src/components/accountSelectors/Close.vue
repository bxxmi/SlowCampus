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
    }
  }
}
</script>

<style lang="scss" scoped>
.close-box {
  display: flex;
  flex-direction: row;

  label {
    display: block;
  }
  select {
    display: block;
  }
  button {
    display: block;
  }
}
</style>
