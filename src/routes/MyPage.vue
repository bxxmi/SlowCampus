<template>
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
    <MyAuth v-show="navChoice==='auth'" />
    <MyOrder v-show="navChoice==='order'" />
    <MyAccount v-show="navChoice==='account'" />
  </div>
</template>

<script>
import MyAuth from '~/components/MyAuth'
import MyOrder from '~/components/MyOrder'
import MyAccount from '~/components/MyAccount'

export default {
  components: {
    MyAuth,
    MyOrder,
    MyAccount
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
