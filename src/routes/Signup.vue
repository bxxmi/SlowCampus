<template>
	<div>
	    <p>e-mail <input id="email" type="email" /></p>
        <br>
	    <p>pw <input id="password" type="password" /></p>
        <br>
	    <p>name <input id="name" type="text" /></p>
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
	    <button v-on:click="signUp">Singup</button>
        <br>
        <p id="result"></p>
	</div>
</template>

<script>

import axios from 'axios';
import CryptoJS from 'crypto-js'

let img_result = ""

export default {
    methods: {
        signUp : async function() {

            //가입할때 최소한의 보안 요구사항이 있음:예)이름과 비번이 같으면 실패
			
			//사용자 입력 획득
			const email = document.getElementById("email").value
			const name = document.getElementById("name").value

			//비밀번호 암호화
            const pw = document.getElementById("password").value
            const key = this.$store.state.token.encrypt_key

            const keyutf = CryptoJS.enc.Utf8.parse(key);
            const iv = CryptoJS.enc.Base64.parse(key);
            const enc = CryptoJS.AES.encrypt(pw, keyutf, { iv: iv });
            const encStr = enc.toString();

 
			//전송
			const { data } = await axios({
				url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
				method: 'POST',
				headers: {
					"content-type": "application/json",
					"apikey": "FcKdtJs202110",
					"username": "pyc"
				},
				data: {
					"email": email,
					"password" : encStr,
					"displayName" : name,
					"profileImgBase64" : img_result ? img_result : null
				}
			}).catch(e => console.log(e.response.data))
			
			console.log(data)
            document.getElementById("result").innerHTML = data 

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
