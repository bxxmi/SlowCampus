<template>
  <header>
    <RouterLink to="/">
      <div id="logo">
        <img src="logo.svg" />
        <span> Slow Campus</span>
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
          <img v-if="(this.$store.state.auth.logged_user.profileImg != '')" :src='this.$store.state.auth.logged_user.profileImg' />
          <img v-else src="basic.png" />
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
  padding: 20px 5%;
  border-bottom: 1px solid black;
  height: 10%;
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
    justify-content: space-between;
    width: 350px;
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
      color: $color-blue;
    }
    #favorite{
      color: $color-red;
    }
    #cart:hover{
      color: $color-lightblue;
    }
    #favorite:hover{
      color: $color-pink;
    }
    #mypage{
      img{
        border-radius: 15px;
      }
    }
    #mypage:hover{
      filter: blur(1px);
    }
    .text-button{
      display: inline-block;
      padding: 5px;
      width: 100px;
      
      background-color: $color-blue;
      color: white;
    }
    .text-button:hover{
      border: 1px solid $color-blue;
      background-color: white;
      color: $color-blue;;
    }
  }
}
</style>


