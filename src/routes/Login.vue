<template>
	<div>
			<p>email <input id="email" type="email"></p>
			<p>password <input id="password" type="password"></p>
			<p>AccessToken : {{ getAccesstoken }}</p>
			<button v-on:click="logIn">Login</button>

	</div>
</template>

<script>

import axios from 'axios';

export default {
  computed: {
    getAccesstoken() {
      return this.$store.state.token.data
    }
  },
	methods: {
		logIn : async function() {
			//사용자 입력 획득
			const email = document.getElementById("email").value
			const pw = document.getElementById("password").value

			console.log(email, pw);
			
			//전송
			const { data } = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
				method: 'POST',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "team2"
				},
				data: {
					"email": email,
					"password" : pw,
				}
			})

			this.setAccesstoken(data.accessToken)
		},
		setAccesstoken : function(input){
      this.$store.commit('token/set',input)
  	}
	},
}

</script>

