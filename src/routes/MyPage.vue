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

export default {
    components: {
        Header,
        MyInfo,
        MyOrder,
        MyAccount,
    },
    async choiceOrder() {
      await this.$store.dispatch('product/allBuyInfo')
      this.navChoice = 'order'
    },
    async choiceAccount() {
      await this.$store.dispatch('account/checkBankListCanChoice',{
        username: 'team2', //username 변수로 할당하는 코드 필요
        Authorization :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2ODkwMjE1LCJleHAiOjE2MzY5NzY2MTUsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.Z90KRCeEVzuS0KwFDkPeVpwSi0orCn1fe7-zCcqbpTc', //액세스 토큰 변수로 할당하는 코드 필요
      })
      await this.$store.dispatch('account/checkAccountListandBalance',{
        username: 'team2', //username 변수로 할당하는 코드 필요
        Authorization :'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFEM2M0dnp3RXByS2hrOExtWU9GIiwiaWF0IjoxNjM2ODkwMjE1LCJleHAiOjE2MzY5NzY2MTUsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.Z90KRCeEVzuS0KwFDkPeVpwSi0orCn1fe7-zCcqbpTc', //액세스 토큰 변수로 할당하는 코드 필요
      })
      this.navChoice = 'account'
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

