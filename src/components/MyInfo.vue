<template>
    <h1>유저정보</h1>
    <br>
    <div>
        <p>enail : {{store.logged_user.email}}</p>
        <p>name : {{store.logged_user.displayName}}</p>
        <p>profile</p>
        <img :src="store.logged_user.profileImg ?store.logged_user.profileImg : 'basic.png'">
    </div>
    <br>
    <h1>정보 수정하기</h1>
	<div>
        <br>
	    <div>
            기존 비밀번호<input id="password" type="password" v-model="old_pw"/>
        </div>
        <div>
            새로운 비밀번호(8자 이상) <input id="passwordCheck" type="password" v-model="new_pw"/>
            <span class="material-icons">
                {{ (pw_valid=pwCheck(new_pw)&&(old_pw != new_pw) ) 
                ? "check" :"warning"}}
            </span>
        </div>
        <br>
	    <div>
            새로운 이름(4자 이상)<input id="name" type="text" v-model="name"/>
            <span class="material-icons">
                {{ (name_valid=nameCheck(name)&&(name != store.logged_user.displayName)) ? "check" :"warning"}}
            </span>
        </div>
        <br>
	    <div>새로운 프로필(1mb 이하의 파일만 가능) 
            <input id="profile" value="" type="file" v-on:change="imgCheck" />
        </div>
        <br>
	    <div>
            <p>size : 
                <span id="size">{{this.img_obj.size}}</span>kb 
            </p>
	        <img id="preview"
            :src="this.img_obj.url ? this.img_obj.url: 'basic.png'" />
	    </div>
        <br>
	    <button v-on:click="editInfo">정보 수정하기</button>
	</div>
</template>

<script>

import authfunc from '../store/authfunc'

export default {
    data() {
        return {
            //사용자 입력
            old_pw : "",
            new_pw : "",
            name : "",
            img_obj : {url:null,size:0},
            //valid 검사
            pw_valid : false,
            name_valid : false,
            store : this.$store.state.auth
        };
    },
    created(){
        this.nameCheck = authfunc.nameValidation
        this.pwCheck = authfunc.pwValidation
        this.imgCheck = function(event){
            authfunc.imgCheck(event, this)
        }
    },
    methods: {
        editInfo : async function() {
            //dataobj 생성 및 validation
            const data_obj = {}
            //pw
            //암호화
            if(this.new_pw){
                const enc_newpw = authfunc.encryptPW(this.new_pw)
                const enc_oldpw = authfunc.encryptPW(this.old_pw)
                if(this.pw_valid){
                    data_obj['newPassword'] = enc_newpw;
                    data_obj['oldPassword'] = enc_oldpw;
                }
                else
                    alert('invalid pw')
            }
            //name
            if(this.name){
                this.name_valid 
                ? data_obj['displayName']=this.name
                : alert('invalid name')
            }
            //profile
            if(this.img_obj.url){ 
                data_obj['profileImgBase64']=this.img_obj.url
            }

            authfunc.editInfoAPI(data_obj)

            this.old_pw, this.new_pw, this.name = ""
            this.img_obj = {url:null,size:0}
        }
    },
}

</script>
