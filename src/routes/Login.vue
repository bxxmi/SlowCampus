<template>
  <body>
    <div id="login-top">
      <img src="logo.svg" />
      <p>회원이 아니신가요?<a href="/signup">회원가입 하기</a></p>
    </div>
    <div id="login-submit">
      <div>
        <p>E-mail</p>
        <input
          v-model="email"
          placeholder="이메일을 입력하세요"
          type="email" />
      </div>
      <div>
        <p>password</p>
        <input
          v-model="pw"
          placeholder="비밀번호를 입력하세요"
          type="password" />
      </div>
      <button @click="logIn">
        로그인 하기
      </button>
    </div>
  </body>
</template>

<style lang="scss" scoped>
body{
  #login-top{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    padding: 5px 0;
    margin-top: 10%;
    img{
      width: 70px;
    }
    p{
      margin-top: 15px;
      a{
        text-decoration: none;
        color: $color-pink;
      }
    }
  }
  #login-submit{
    display:flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 0;
    margin-top: 50px;
    margin-bottom: 10%;

    *{
      width: 60%;
      height: 20%;
      font-size: 20px;
      display: inline-block;
    }
    div{
      margin-bottom: 25px;

      *{
        width: 97%;
      }

      p{
        margin: 10px 0;
      }

      input{
        padding: 15px 1%;
        margin: 0 auto;
      }
    }
    button{
      padding: 15px 0;
      background-color: $color-blue;
      color: white;
      border: 1px $color-blue solid;
    }
    button:hover{
      background-color: white;
      color: $color-blue;
      border: 1px $color-blue solid;
    }
  }
}

</style>

<script>
/*
email : test@test.com
pw : testtest
name: test

username: team2
*/

import authfunc from '../store/authfunc'

export default {
	data() {
        return {
            email: '',
            pw : '',
        }
    },
	methods: {
		logIn : async function() {

			//로그인
			const enc_pw = authfunc.encryptPW(this.pw)

			const data_obj = {
                'email': this.email,
                'password' : enc_pw
			}

			await authfunc.loginAPI(data_obj)

		}
	},
}

</script>

