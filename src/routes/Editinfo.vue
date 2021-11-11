<template>
    <p>old pw <input id="old_pw" type="password" /></p>
    <br>
    <p>new pw <input id="new_pw" type="password" /></p>
    <br>
    <p>new name <input id="name" type="text" /></p>
    <br>
    <p>profile(1mb 이하의 파일만 가능) 
        <input id="profile" type="file" @change="imgCheck"/>
    </p>
    <br>
	<div>
        <p>size : <span id="size">0</span>kb </p>
	    <img id="preview" src="" />
	</div>
    <br>
	    <button v-on:click="editInfo">Eidt Info</button>
    <br>
    <p id="result"></p>
</template>

<script>

import axios from 'axios';
import CryptoJS from 'crypto-js'

let img_result = ""

export default {
    methods: {
        editInfo : async function() {

            let obj = {}

            //name
			const name = document.getElementById("name").value

            if(name) obj['displayName'] = name 

			//password
            const old_pw = document.getElementById("old_pw").value
            const new_pw = document.getElementById("new_pw").value

            if(old_pw && new_pw){
                if(old_pw != new_pw){
                    const key = this.$store.state.token.encrypt_key
                    const keyutf = CryptoJS.enc.Utf8.parse(key);
                    const iv = CryptoJS.enc.Base64.parse(key);

                    const old_enc = CryptoJS.AES.encrypt(old_pw, keyutf, { iv: iv });
                    const old_encStr = old_enc.toString();

                    const new_enc = CryptoJS.AES.encrypt(new_pw, keyutf, { iv: iv });
                    const new_encStr = new_enc.toString();

                    obj['oldPassword'] = old_encStr
                    obj['newPassword'] = new_encStr
                }
            }

            //img
            if(img_result) obj['profileImgBase64'] = img_result 

            const accessToken = this.$store.state.token.accessToken

			//전송
			const { data } = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
				method: 'PUT',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "pyc",
                    Authorization : `Bearer ${accessToken}`,
				},
				data: obj
			}).catch(e => console.log(e.response.data))
			
			console.log(data)
            document.getElementById("result").innerHTML = 'email: ' + data.email + '<br>' + 'name: '+ data.displayName + '<br>'
            + 'profile: ' + data.profileImg 

        },
        imgCheck : function (event) {

            const selectedFile = event.target.files[0];
            const reader = new FileReader();

            const imgtag = document.getElementById("preview");
            imgtag.title = selectedFile.name;
            
            //to64base
            reader.readAsDataURL(selectedFile);

            reader.onload = function (event) {

                //1MB이하 검사
                img_result = reader.result
                const length = img_result.length
                const lastOf64 = img_result.slice(-2) == '==' ? 2 : 1
                const size_byte = (length * (3/4))-lastOf64
                const size = (size_byte/1024).toFixed(2)

                if(size > 1024){
                    alert('over 1MB')

                    document.getElementById("profile").value = ""
                }
                else{
                    imgtag.src = event.target.result
                    document.getElementById("size").innerHTML = size
                }
            };

        }
    },
}

</script>
