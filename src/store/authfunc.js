import store from '.'
import CryptoJS from 'crypto-js'
import axios from 'axios';
import router from '../routes'

export default{
    //[API]: 로그인, 로그아웃, 회원가입, 정보수정, 정보확인(auth)

    //회원가입
    async signUpAPI(data_obj){
        try {
            //전송
            const { data } = await axios({
                url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
                method: 'POST',
                headers: store.state.auth.APIheaderObj,
                data: data_obj
            })
            return data 
            
        } catch (error) {
            alert('Error: ' + error.response.data)
            return null
        }
    },
    //로그인
    async loginAPI(data_obj){
        try {
            const {
                data
            } = await axios({
                url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
                method: 'POST',
                headers: store.state.auth.APIheaderObj,
                data: data_obj
            })
            //토큰을 가지는 쿠키 설정
            this.setCookie('accessToken', data.accessToken, 1)

            //store 정보 업데이트
            store.commit('auth/changeLogged', true)
            store.commit('auth/setUser', data.user)

            alert('로그인 되었습니다.')

            //home으로 이동
            router.push('/')
        } catch (error) {
            alert('Error: ' + error.response.data)
        }
    },
    //로그아웃
    async logoutAPI(){
        const token = this.getCookie('accessToken')

        const header = Object.assign(
            store.state.auth.APIheaderObj,
            {Authorization: `Bearer ${token}`}
        )
        try {
            //전송
            const {
                data
            } = await axios({
                url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
                method: 'POST',
                headers: header
            })

            //쿠키
            this.setCookie('accessToken',"",1)

            //flag
            store.commit('auth/changeLogged', false)

            //유저 정보
            store.commit('auth/setUser', {})

            alert('로그아웃 되었습니다')
            
            //home으로 이동
            router.push('/')
        } catch (error) {
            alert('Error: ' + error.response.data)
        }
    },
    //인증 정보 확인
    async authAPI(){
        const token = this.getCookie('accessToken')

        const header = Object.assign(
            store.state.auth.APIheaderObj,
            {Authorization: `Bearer ${token}`}
        )

        try {
            //전송
            const {
                data
            } = await axios({
                url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me ',
                method: 'POST',
                headers: header
            })

            //현재 유저 정보
            store.commit('auth/setUser', data)

            return data ? true : false

        } catch (error) {
            alert('Error: ' + error.response.data)
        }
    },
    //정보 수정
    async editInfoAPI(data_obj){

        const token = this.getCookie('accessToken')

        const header = Object.assign(
            store.state.auth.APIheaderObj,
            {Authorization: `Bearer ${token}`}
        )

        try {
            const {
                data
            } = await axios({
                url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
                method: 'PUT',
                headers: header,
                data: data_obj
            })

            store.commit('auth/setUser', data)
            alert('정보 수정을 완료했습니다!')
        
        } catch (error) {
            alert('Error: ' + error.response.data)
        }

    },

    //[Validation]: 이메일, 비밀번호, 이름, 프로필사진을 검증
    //이미지의 크기 검사 및 변환
    imgCheck(event, vm){
        //기능 : 프로필 이미지 크기검사와 64base로 변환
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        //64base로 변환
        reader.readAsDataURL(selectedFile);

        reader.onload = function (event) {
            //1MB이하인지 검사
            const img_result = reader.result
            const length = img_result.length
            const lastOf64 = img_result.slice(-2) == '==' ? 2 : 1
            const size_byte = (length * (3/4))-lastOf64
            const size = (size_byte/1024).toFixed(2)

            if(size > 1024){
                alert('over 1MB')

                const result = {
                    url : "",
                    size : 0
                }

                Object.assign(vm.img_obj, result)
            }
            else{
                const result = {
                    url : event.target.result,
                    size : size
                }

                Object.assign(vm.img_obj, result)
            }
        };
    },
    //이메일 체크
    emailValidation(data){
        const trimData = data.trim()
        const emaileRegular = /\S+@\S+\.\S+/

        return emaileRegular.test(trimData)
    },
    //비밀번호 체크
    pwValidation(data){

        const trimData = data.trim()
        const pwRegular = /^[a-zA-Z0-9!@#$%^&*()?_~]{8,20}$/

        //8자 이상
        return pwRegular.test(trimData)
    },
    //이름 체크
    nameValidation(data){
        const trimData = data.trim()
        const nameRegular = /^[a-zA-Z0-9!@#$%^&*()?_~]{4,20}$/

        //20자 이하
        return nameRegular.test(trimData)
    },

    //[기타 기능] : 비밀번호 암호화, 쿠키 수정, 쿠키 가져오기
    //암호화
    encryptPW(org_pw){
        //기능 : 주어진 비밀번호를 AES로 암호화
        const key = store.state.auth.encryptKey
        const keyutf = CryptoJS.enc.Utf8.parse(key)
        const iv = CryptoJS.enc.Base64.parse(key)
        const enc = CryptoJS.AES.encrypt(org_pw, keyutf, { iv: iv })

        return enc.toString()
    },
    //쿠키 설정 및 생성
    setCookie(c_name, c_value, ex_day){
        const date = new Date()
        //하루 단위
        date.setTime(date.getTime() + (ex_day*24*60*60*1000))
        let expires = "expires="+ date.toUTCString()
        document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
    },
    //쿠키 정보 가져오기
    getCookie (c_name){
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
    },
    
}
