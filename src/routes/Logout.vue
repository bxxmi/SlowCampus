<template>
    <div>
        result : <p id="result"></p>
	    <button v-on:click="logOut">Logout</button>
	</div>
</template>

<script>

import axios from 'axios';

export default {

    methods: {
        logOut : async function() {

            const accessToken = this.getCookie('accessToken')
            
			try {
				//전송
				const {
					data
				} = await axios({
					url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
					method: 'POST',
					headers: {
						"content-type": "application/json",
						"apikey": "FcKdtJs202110",
						"username": "pyc",
						Authorization: `Bearer ${accessToken}`,
					}
				})

				document.getElementById("result").innerHTML = data

				//쿠키 값 삭제
				this.setCookie('accessToken',"",1)
				this.$store.commit('token/changeLogged', false)
				this.$router.push('/')
			} catch (error) {
				alert('Error: ' + error.response.data)
			}

        },
		getCookie: function(c_name){
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
