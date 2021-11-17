<template>
  <div class="top">
    <MyPageNav /> 
    <div
      class="myinfo-area">
      <div id="current-user">
        <div id="profile-container"> 
          <img :src="store.logged_user.profileImg ?store.logged_user.profileImg : 'basic.png'" />
        </div>
        <div>
          <p>E-mail : {{ store.logged_user.email }}</p>
          <br />
          <p>name : {{ store.logged_user.displayName }}</p>
        </div>
      </div>
  
      <div id="edit-submit">
        <div class="input">
          <p>기존 password</p>
          <input
            id="password"
            v-model="old_pw"
            type="password" />
          <div v-if="new_pw != ''">
            <span
              v-if="old_pw != ''"
              class="material-icons">check</span>
            <p v-else>
              <span class="material-icons">warning</span> 비밀번호를 입력하세요.
            </p>
          </div>
        </div>

        <div class="input">
          <p>새로운 password</p>
          <input
            id="passwordCheck"
            v-model="new_pw"
            type="password" />

          <div v-if="new_pw != ''">
            <span
              v-if="(pw_valid=pwCheck(new_pw)&&(old_pw != new_pw))"
              class="material-icons">check</span>
            <p v-else>
              <span class="material-icons">warning</span> 기존 비밀번와 동일하거나 부적절한 양식입니다.
            </p>
          </div>
        </div>

        <div class="input">
          <p>새로운 name</p>
          <input
            id="name"
            v-model="name"
            type="text" />

          <div v-if="name != ''">
            <span
              v-if="(name_valid=nameCheck(name)&&(name != store.logged_user.displayName))"
              class="material-icons">check</span>
            <p v-else>
              <span class="material-icons">warning</span> 기존 이름과 동일하거나 부적절한 양식입니다.
            </p>
          </div>
        </div>

        <p>새로운 profile</p>
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

        <button @click="editInfo">
          정보 수정하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import authfunc from '../../store/authfunc'
import MyPageNav from '~/components/myPage/MyPageNav'

export default {
    components: {
      MyPageNav
    },
    data() {
        return {
            //사용자 입력
            old_pw : '',
            new_pw : '',
            name : '',
            img_obj : {url:null,size:0},
            //valid 검사
            pw_valid : false,
            name_valid : false,
            store : this.$store.state.auth
        }
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
                    data_obj['newPassword'] = enc_newpw
                    data_obj['oldPassword'] = enc_oldpw
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

            this.old_pw, this.new_pw, this.name = ''
            this.img_obj = {url:null,size:0}
        }
    },
}
</script>

<style lang="scss" scoped>
.myinfo-area {
  width: 100%;
  #current-user{
    width: 400px;
    min-width: 300px;
    height: 120px;
    margin: 30px auto;
    padding: 10px 5%;

    background-color: #E1EEEF;
    border-radius: 15px;

    display: flex;
    align-items: center;
  
    #profile-container{
      margin-right: 20%;
      img{
        width: 100px;
        border-radius: 10px;
      }
    } 
  }

  #edit-submit{
    display:flex;
    flex-direction: column;
    align-items: center;

    padding: 30px 0;
    margin-top: 20px;
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
      transition: 1s;
    }
    button:hover{
      background-color: white;
      color: $color-blue;
      border: 1px $color-blue solid;
    }
  }
}
</style>
