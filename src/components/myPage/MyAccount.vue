<template>
  <div class="top">
    <MyPageNav />
    <div class="account-area">
      <Check>계좌확인</Check>
      <Add>계좌추가</Add>
      <Close>계좌해지</Close>
    </div>
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
.top{
  display:flex;
  border: 1px solid $color-secondary;
  border-radius: 15px;
  box-shadow: 0 1px 5px rgba(0 0 0 / 50%);
  width: 90%;
  padding: 5% 0;
  margin: 50px auto;
  .account-area {
    width: 60%;
    font-size: 18px;
    margin-left: 100px;
  }
}
</style>
