<template>
    <div>
        result: <p id="result"></p>
        <button v-on:click="auth">Auth</button>
    </div>
</template>

<script>

import axios from 'axios';

export default {

    methods: {
        auth : async function() {

            const accessToken = this.$store.state.token.data
            
            //전송
			const {data}  = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me ',
				method: 'POST',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "team2",
					Authorization : `Bearer ${accessToken}`,
				}
			})

            document.getElementById("result").innerHTML 
            = 'email: ' + data.email + '<br>' + 'name: '+ data.displayName + '<br>'
            + 'profile: ' + data.profileImg

        },
    },
}

</script>
