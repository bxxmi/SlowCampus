<template>
	<div>
			<p>email <input id="email" type="email"></p>
			<br>
			<p>password <input id="password" type="password"></p>
			<br>
			<p>AccessToken : {{ getAccesstoken }}</p>
			<br>
			<button v-on:click="logIn">Login</button>

	</div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js'

export default {
  computed: {
    getAccesstoken() {
      return this.$store.state.token.accessToken
    }
  },
	methods: {
		logIn : async function() {
			//로그인시 발급된 토큰은 24시간후 만료
			//사용자 입력 획득
			const email = document.getElementById("email").value
			const pw = document.getElementById("password").value

			const key = this.$store.state.token.encrypt_key
			
			const keyutf = CryptoJS.enc.Utf8.parse(key);
            const iv = CryptoJS.enc.Base64.parse(key);
            const enc = CryptoJS.AES.encrypt(pw, keyutf, { iv: iv });
            const encStr = enc.toString();

			console.log(key, email, encStr);
			
			//전송
			const { data } = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
				method: 'POST',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "pyc"
				},
				data: {
					"email": email,
					"password" : encStr,
				}
			}).catch(e => console.log(e.response.data))

			this.setToken(data.accessToken)
		},
		setToken : function(input){
      this.$store.commit('token/setAccessToken',input)
  	}
	},
}

</script>

