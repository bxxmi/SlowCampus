<template>
  <Header/>
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
    <div  v-show="navChoice==='auth'" >
      <MyInfo/>
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
    data() {
        return {
            navChoice: 'auth'
        }
    },
    methods: {
        choiceAuth() {
            this.navChoice = 'auth'
        },
        choiceOrder() {
            this.navChoice = 'order'
        },
        async choiceAccount() {
          await this.$store.dispatch('account/checkBankListCanChoice',{})
          await this.$store.dispatch('account/checkAccountListandBalance',{})
          this.navChoice = 'account'
        }
    }
}
</script>
