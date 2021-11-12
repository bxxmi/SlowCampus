<template>
	<div>
			<p>email <input id="email" type="email"></p>
			<br>
			<p>password <input id="password" type="password"></p>
			<br>
			<p id="result"></p>
			<button v-on:click="logIn">Login</button>

	</div>
</template>

<script>
/*
email : pyc3@pyc3.com
pw : pyc3pyc3
name: pyc3
*/

import axios from 'axios';
import CryptoJS from 'crypto-js'

export default {
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

			try {
				//전송
				const {
					data
				} = await axios({
					url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
					method: 'POST',
					headers: {
						"content-type": "application/json",
						"apikey": "FcKdtJs202110",
						"username": "pyc"
					},
					data: {
						"email": email,
						"password": encStr,
					}
				})

				this.setCookie('accessToken', data.accessToken, 1)
				document.getElementById("result").innerHTML = "Logged In!"

			} catch (error) {
				alert('Error: ' + error.response.data)
			}
			
		},
		setCookie: function(c_name, c_value, ex_day){
			const date = new Date()
			//1day 단위
			date.setTime(date.getTime() + (ex_day*24*60*60*1000))
			let expires = "expires="+ date.toUTCString()
			document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
		}
	},
}

</script>

