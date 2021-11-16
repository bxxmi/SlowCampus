<template>
  <div>
    <MyPageNav /> 
    <Check>계좌확인</Check>
    <Add>계좌추가</Add>
    <Close>계좌해지</Close>
  </div>
</template>

<script>
import Close from '~/components/accountSelectors/Close'
import Check from '~/components/accountSelectors/Check'
import Add from '~/components/accountSelectors/Add'
import MyPageNav from '~/components/myPage/MyPageNav'
import authfunc from '../../store/authfunc'

export default {
  components: {
    Close,
    Check,
    Add,
    MyPageNav
  },
  created() {
    this.loadMyAccount()  
  },
  methods: {
    async loadMyAccount() {
        await this.$store.dispatch('account/checkBankListCanChoice',{
          username: this.$store.state.auth.APIheaderObj.username,
          Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        await this.$store.dispatch('account/checkAccountListandBalance',{
          username: this.$store.state.auth.APIheaderObj.username,
          Authorization :'Bearer '+ authfunc.getCookie('accessToken'),
        })
        this.navChoice = 'account'
      }
  }
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
}
</style>
