<template>
    <div>
        result: <p id="result"></p>
		<br>
		<p>AccessToken : {{ getAccesstoken }}</p>
        <button v-on:click="auth">Auth</button>
    </div>
</template>

<script>

import axios from 'axios';

export default {
	data: function (){
		return {
			getAccesstoken : this.getCookie('accessToken')
		}
	},
    methods: {
        auth : async function() {

            const accessToken = this.getCookie('accessToken')

            //전송
			const {data}  = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me ',
				method: 'POST',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "pyc",
					Authorization : `Bearer ${accessToken}`,
				}
			}).catch(e => alert('error: ' + e.response.data))

            document.getElementById("result").innerHTML 
            = 'email: ' + data.email + '<br>' + 'name: '+ data.displayName + '<br>'
            + 'profile: ' + data.profileImg

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
		}
    },
}

</script>
