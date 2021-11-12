<template>
  <header>
    <RouterLink to="/">
      Home.
    </RouterLink>
    <template v-if="this.$store.state.token.logged_in">
      <RouterLink to="/auth">
        Auth.
      </RouterLink>
      <RouterLink to="/logout">
        Logout.
      </RouterLink>
      <RouterLink to="/editinfo">
        Editinfo.
      </RouterLink>
    </template>
    <template v-else>
      <RouterLink to="/signup">
        Signup.
      </RouterLink>
      <RouterLink to="/login">
        Login.
      </RouterLink>
    </template>
  </header>
</template>


<script>
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default({
  setup() {
    // 로그인 여부 체크
    // 쿠키의 유무
    function getCookie(c_name){
			let name = c_name + "=";
  			let decodedCookie = decodeURIComponent(document.cookie);
			let cookie_array = decodedCookie.split(';');
			for(let i = 0; i <cookie_array.length; i++) {
				let c = cookie_array[i];
				while (c.charAt(0) == ' ') {
				c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
				}
			}
			return "";
		}

    const accessToken = getCookie('accessToken')
    const store = useStore();

    if(accessToken){
      //Auth
      onMounted(
        async () => {
        console.log(store.state.token.logged_in)

        try {
          const {
            data
          } = await axios({
            url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me ',
            method: 'POST',
            headers: {
              "content-type": "application/json",
              "apikey": "FcKdtJs202110",
              "username": "pyc",
              Authorization: `Bearer ${accessToken}`,
            }
          })
          data
            ?store.commit('token/changeLogged', true)
            :store.commit('token/changeLogged', false)
          
        } catch (error) {
          console.log('Error: ' + error.response.data)
        }
      })
    }else{
      store.commit('token/changeLogged', false)
    }
    return
  },
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
