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

            const accessToken = this.$store.state.token.accessToken
            
            //전송
			const { data } = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
				method: 'POST',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "pyc",
					Authorization : `Bearer ${accessToken}`,
				}
			})
			
			console.log(data)

            document.getElementById("result").innerHTML = data 
        },
    },
}

</script>
