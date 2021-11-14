<template>
    <h1>회원가입하기</h1>
    <br>
	<div>
	    <div>
            e-mail <input id="email" type="email" v-model="email"/>
            <span class="material-icons">
                {{ (email_valid = emailCheck(email)) ? "check" :"warning"}}
            </span>
        </div>
        <br>
	    <div>
            pw(8자 이상)<input id="password" type="password" v-model="pw"/>
            <span class="material-icons">
                {{ (pw_valid=pwCheck(pw)) ? "check" :"warning"}}
            </span>
        </div>
        <div>
            pw 체크 <input id="passwordCheck" type="password" v-model="pw_ck"/>
            <span v-if="!pw" class="material-icons">warning</span>
            <span v-else class="material-icons">
                {{ (pw_ck_valid = pw == pw_ck) ? "check" :"warning"}}
            </span>
        </div>
        <br>
	    <div>
            name(4자 이상)<input id="name" type="text" v-model="name"/>
            <span class="material-icons">
                {{ (name_valid=nameCheck(name)) ? "check" :"warning"}}
            </span>
        </div>
        <br>
	    <div>profile(1mb 이하의 파일만 가능) 
            <input id="profile" value="" type="file" v-on:change="imgCheck" />
        </div>
        <br>
	    <div>
            <div>size : 
                <span id="size">{{this.img_obj.size}}</span>kb
            </div>
	        <img id="preview"
            :src="this.img_obj.url ? this.img_obj.url: 'basic.png'" />	    
        </div>
        <br>
	    <button v-on:click="signUp">Singup</button>
	</div>
</template>

<script>
import authfunc from './authfunc'

export default {
    data() {
        return {
            //입력 저장용 data
            email: "",
            pw : "",
            pw_ck : "",
            name : "",
            img_obj : {url:null, size:0},
            //valid용 data
            email_valid : false,
            pw_valid : false,
            pw_ck_valid : false,
            name_valid : false,
        };
    },
    created(){
        this.imgCheck = function(event){
            authfunc.imgCheck(event, this)
        }
        this.emailCheck = authfunc.emailValidation
        this.nameCheck = authfunc.nameValidation
        this.pwCheck = authfunc.pwValidation
    },
    methods: {
        signUp : async function() {
            //validation check
            const valid_result = this.email_valid 
            && this.pw_valid
            && this.name_valid
            && this.pw_ck_valid

            if(!valid_result){
                alert('Invalid input!')
                return
            }

            //비밀번호 암호화
            const enc_pw = authfunc.encryptPW(this.pw)

            //data 객체 생성
            const data_obj = {
                "email": this.email,
                "password" : enc_pw,
                "displayName" : this.name,
                "profileImgBase64" : this.img_obj.url
            }

            //API 호출
            const result = await authfunc.signUpAPI(data_obj)

            if(result){
                alert('회원가입 되었습니다')
                router.push('/login')
            }else{
                alert('회원가입 실패...')
            }
        },
    },
}

</script>
