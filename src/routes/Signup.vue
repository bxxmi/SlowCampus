<template>
  <body>
    <div id="signup-top">
      <img src="logo.svg" />
      <p>이미 회원이신가요?<a href="/login">로그인하기</a></p>
    </div>

    <div id="signup-submit">
      <div class="input">
        <p>E-mail</p>
        <input
          v-model="email"
          type="email"
          placeholder="email을 입력하세요." />
        <div v-if="email != ''">
          <span
            v-if="(email_valid = emailCheck(email))"
            class="material-icons">check</span>
          <p v-else>
            <span class="material-icons">warning</span> 올바른 이메일을 입력하세요.
          </p>
        </div>
      </div>

      <div class="input">
        <p>password</p>
        <input
          v-model="pw"
          type="password"
          placeholder="비밀번호를 입력하세요." />
        <div v-if="pw != ''">
          <span
            v-if="(pw_valid=pwCheck(pw))"
            class="material-icons">check</span>
          <p v-else>
            <span class="material-icons">warning</span> 8자리 이상의 영어와 숫자, 그리고 특수문자로 이루어진 비밀번호를 입력하세요.
          </p>
        </div>
      </div>

      <div class="input">
        <p>password 확인</p>
        <input
          v-model="pw_ck"
          type="password"
          placeholder="이전과 동일한 비밀번호를 입력하세요." />
        <div v-if="pw_ck != ''">
          <span
            v-if="(pw_ck_valid = pw == pw_ck)"
            class="material-icons">check</span>
          <p v-else>
            <span class="material-icons">warning</span> 동일한 비밀번호를 입력하세요
          </p>
        </div>
      </div>

      <div class="input">
        <p>name</p>
        <input
          v-model="name"
          type="password"
          placeholder="사용할 이름을 입력하세요." />
        <div v-if="name != ''">
          <span
            v-if="(name_valid=nameCheck(name))"
            class="material-icons">check</span>
          <p v-else>
            <span class="material-icons">warning</span> 4자리 이상의 올바른 이름을 입력하세요
          </p>
        </div>
      </div>

      <p>profile</p>
      <div id="profile">
        <div id="input">
          <input
            id="file"
            value=""
            type="file"
            @change="imgCheck" />
          <div>
            <span><img :src="img_obj.url ? img_obj.url: 'basic.png'" /></span>
            <span> 파일 크기 : {{ img_obj.size }}kb</span>
          </div>
        </div>
        <p v-if="img_obj.size > 1024">
          <span class="material-icons">warning</span> 1mb 이하의 파일만 가능합니다
        </p>
      </div>

      <button @click="signUp">
        Singup
      </button>
    </div>
  </body>
</template>

<script>
import authfunc from '../store/authfunc'
import router from '../routes'

export default {
  data() {
    return {
      //입력 저장용 data
      email: '',
      pw : '',
      pw_ck : '',
      name : '',
      img_obj : {url:'', size:0},
      //valid용 data
      email_valid : false,
      pw_valid : false,
      pw_ck_valid : false,
      name_valid : false,
    }
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
    const enc_pw = authfunc.encryptPW(this.pw.trim())

    //data 객체 생성
    const data_obj = {
      'email': this.email.trim(),
      'password' : enc_pw,
      'displayName' : this.name.trim(),
    }
    if(this.img_obj.url != ''){
      data_obj['profileImgBase64'] = this.img_obj.url
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

<style lang="scss" scoped>
body{
  #signup-top{
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
  #signup-submit{
    display:flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 0;
    margin-top: 50px;
    margin-bottom: 10%;

    *{
      width: 60%;
      height: 20%;
      font-size: 18px;
    }

    .input{
      margin-bottom: 25px;
      *{
        width: 98%;
        margin: 5px 0;
      }
      input{
        padding: 15px 1%;
        margin: 0 auto;
      }
      div{
        p{
          color: $color-danger;
        }
      }
      span{
        display: inline;
      }
    }

    #profile{
      height: 20%;
      margin-bottom: 15px;
      
      #input{
        width: 100%;
        display: flex;
        align-items: center;
        div{
          span{
            vertical-align: middle;
          }
          img{
            width: 20%;
          }
        }
      }

      p{
        color: red;
        *{
          display: inline;
        }
      }
    }

    button{
      padding: 15px 0;
      background-color: $color-blue;
      color: white;
      border: 1px $color-blue solid;
      transition: .5s;
    }
    button:hover{
      background-color: white;
      color: $color-blue;
      border: 1px $color-blue solid;
    }
  }
}
</style>
