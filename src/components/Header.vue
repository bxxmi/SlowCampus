<template>
  <header>
    <RouterLink to="/">
      <div id="logo">
        <img src="logo.svg" />
        <span class="slogan"> Slow Campus</span>
      </div>
    </RouterLink>
    <div id="buttons">     
      <RouterLink
        id="cart"
        to="/cart">
        <span class="material-icons">shopping_cart</span>
      </RouterLink>

      <template v-if="$store.state.auth.logged_in">
        <button
          id="mypage"
          @click="tomypage">
          <img
            v-if="($store.state.auth.logged_user.profileImg != '')"
            :src="$store.state.auth.logged_user.profileImg" />
          <img
            v-else
            src="basic.png" />
        </button>
        <button
          class="text-button"
          @click="logOut">
          로그아웃
        </button>
      </template>

      <template v-else>
        <button
          id="login"
          class="text-button"
          @click="toLogin">
          로그인
        </button>
        <button
          id="signup"
          class="text-button"
          @click="toSignup">
          회원가입
        </button>
      </template>
    </div>
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
    this.tomypage = ()=>{router.push('/myinfo')}
    this.logOut = ()=>{authfunc.logoutAPI()}
  }
})
</script>

<style lang="scss" scoped>
header {
  position:fixed;
  top:0;
  overflow: hidden;
  z-index: 10;
  background-color: $color-bg;

  padding: 20px 5%;

  height: 5%;
  width: 90%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img{
    width: 40px;
  }

  a{
    text-decoration: none;
  }
  div{
    display: inline-block;
  }
  #logo{
    width: 150px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      color: $color-blue;
      font-weight: $font-weight-bold;
    }
  }
  #buttons{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 300px;
    min-width: 250px;

    > * {
      margin-right: 20px;
    }
    
    button{
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      font-size: 18px;
      cursor: pointer;
      outline: inherit;
    }
    #cart{
      display: flex;
      align-items: center;
      color: $color-blue;
      transition: 0.2s;
    }
    #cart:hover{
      opacity: .7;
    }
    #mypage{
      display: flex;
      align-items: center;

      img{
        width: 24px;
        height: 24px;
        border-radius: 15px;
      }
      transition: 0.2s;
    }
    #mypage:hover{
      opacity: .7;
    }
    .text-button{
      display: inline-block;
      padding: 5px;
      width: 100px;
      border-radius: 4px;
      
      background-color: $color-blue;
      color: white;
      transition: .5s;
    }
    .text-button:hover{
      border: 1px solid $color-blue;
      background-color: white;
      color: $color-blue;;
    }
  }
}
</style>


