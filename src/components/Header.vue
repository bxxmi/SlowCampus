<template>
  <header>
    <RouterLink to="/">
      <!--나중에 이미지로 대체-->
      Slow Campus
    </RouterLink>
    <button>
      <span class="material-icons">shopping_cart</span>
    </button>
    <button>
      <span class="material-icons">favorite</span>
    </button>

    <template v-if="$store.state.auth.logged_in">
      <button @click="toEditinfo">
        <span class="material-icons">account_circle</span>
      </button>
      <button @click="logOut">
        로그아웃
      </button>
    </template>

    <template v-else>
      <button @click="toLogin">
        로그인
      </button>
      <button @click="toSignup">
        회원가입
      </button>
    </template>
  </header>
</template>


<script>
import { onMounted } from '@vue/runtime-core'
import authfunc from '../store/authfunc'
import store from '../store'
import router from '../routes'

export default({
  setup() {
    const accessToken = authfunc.getCookie('accessToken')

    // 로그인 여부 체크
    if(accessToken){
      onMounted(
        async () => {
        const logged = authfunc.authAPI()

        logged 
        ?store.commit('auth/changeLogged', true)
        :store.commit('auth/changeLogged', false)
      })
    }else{
      store.commit('auth/changeLogged', false)
    }

    return
  },
  created(){
    this.toSignup = ()=>{router.push('/signup')}
    this.toLogin = ()=>{router.push('/login')}
    this.toEditinfo = ()=>{router.push('/mypage')}
    this.logOut = ()=>{authfunc.logoutAPI()}
  }
})
</script>


<style lang="scss" scoped>
header {
  padding: 20px 20px;
  border-bottom: 1px solid $color-primary;
  a {
    margin-right: 10px;
    line-height: 1;
  }
}
</style>
