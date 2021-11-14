<template>
	<h1>로그인하기</h1>
	<br>
	<div>
		<div>
			email <input id="email" type="email" v-model="email">
		</div>
		<div>
			password <input id="password" type="password" v-model="pw">
		</div>
		<br>
		<button v-on:click="logIn">Login</button>
	</div>
</template>

<script>
/*
email : test@test.com
pw : testtest
name: test

username: team2
*/

import authfunc from './authfunc'

export default {
	data() {
        return {
            email: "",
            pw : "",
        };
    },
	methods: {
		logIn : async function() {

			//로그인
			const enc_pw = authfunc.encryptPW(this.pw)

			const data_obj = {
                "email": this.email,
                "password" : enc_pw
			}

			await authfunc.loginAPI(data_obj)

		}
	},
}

</script>

