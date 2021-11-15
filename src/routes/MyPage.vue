<template>
  <Header />
  <nav class="my-page-nav">
    <button
      type="button"
      @click="choiceAuth">
      정보 수정
    </button>
    <button
      type="button"
      @click="choiceOrder">
      주문 내역
    </button>
    <button
      type="button"
      @click="choiceAccount">
      계좌
    </button>
  </nav>

  <div class="my-page-display">
    <div v-show="navChoice==='auth'">
      <MyInfo />
    </div>
    <MyOrder v-show="navChoice==='order'" />
    <MyAccount v-show="navChoice==='account'" />
  </div>
</template>

<script>
import MyOrder from '~/components/MyOrder'
import MyAccount from '~/components/MyAccount'
import Header from '~/components/Header'
import MyInfo from '~/components/MyInfo'

import store from '~/store/'
import authfunc from '~/store/authfunc.js'

export default {
    components: {
        Header,
        MyInfo,
        MyOrder,
        MyAccount,
    },
    data() {
        return {
            navChoice: 'auth'
        }
    },
    methods: {
      async choiceAuth() {
            this.navChoice = 'auth'
        },
      async choiceOrder() {
        await this.$store.dispatch('product/allBuyInfo',{
          username: store.state.auth.APIheaderObj.username,
          authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        this.navChoice = 'order'
      },
      async choiceAccount() {
        await this.$store.dispatch('account/checkBankListCanChoice',{
          username: store.state.auth.APIheaderObj.username,
          Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        await this.$store.dispatch('account/checkAccountListandBalance',{
          username: store.state.auth.APIheaderObj.username,
          Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        this.navChoice = 'account'
      }  
    } 
}
</script>

<style lang="scss" scoped>
@media screen and (min-width:769px) { //ipad 이후 디바이스 사이즈
  .my-page {
    display: flex;
    flex-direction: row;

    &-nav {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

