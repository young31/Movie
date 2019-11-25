<template>
  <div>
    <h3>로그인</h3>
    <!-- id -->
    <b-form-group
      id="loginEmail"
      
      :valid-feedback="validFeedback1"
      :state="state1"
    >
    <!-- label-cols-sm="4"
    label-cols-lg="3"
    label="아이디"
    label-for="input-1" -->
    <!-- :invalid-feedback="invalidFeedback1" -->
      <b-form-input id="input-1" @keyup.enter="login" v-model="credentials.email" :state="state1" trim placeholder="이메일 입력"></b-form-input>
    </b-form-group>

    <!-- password -->
    <b-form-group
      id="loginPassword"
      
      :valid-feedback="validFeedback2"
      :state="state2"
    >
    <!-- label-cols-sm="4"
    label-cols-lg="3"
    label="비밀번호"
    label-for="input-2" -->
    <!-- :invalid-feedback="invalidFeedback2" -->
      <b-form-input type="password" id="input-2" @keyup.enter="login" v-model="credentials.password" :state="state2" trim placeholder="비밀번호 입력(8자이상)"></b-form-input>
    </b-form-group>

    <button class="btn btn-dark" @click="login">로그인</button>
  </div>
</template>

<script>
import * as Emailvalidator from 'email-validator'
import axios from 'axios'
import router from '@/router'

export default {
  name: "LoginForm",
  methods: {
    login() {
      if (this.state1 && this.state2) {
        const SERVER_IP = process.env.VUE_APP_SERVER_IP

        axios.post(SERVER_IP + '/user/login', this.credentials)
          .then(response => {
            // this.$session.start()
            // this.$session.set('jwt', response.data.token)
            console.log(response)
            router.push('/movie')
          })
          .catch(error =>{
            console.error(error)
          })
      }
    }
  },
  computed: {
    // email 
    state1() {
      return Emailvalidator.validate(this.credentials.email);
    },
    // invalidFeedback1() {
    //   if (this.userId.length > 4) {
    //     return "";
    //   } else if (this.userId.length > 0) {
    //     return "아이디는 4자 이상이어야 합니다.";
    //   } else {
    //     return "";
    //   }
    // },
    validFeedback1() {
      return this.state === true ? "가능합니다." : "";
    },

    // password
    state2() {
      return this.credentials.password.length >= 8 ? true : false;
    },
    // invalidFeedback2() {
    //   if (this.password.length > 8) {
    //     return "";
    //   } else if (this.password.length > 0) {
    //     return "비밀번호는 8자 이상이어야 합니다.";
    //   } else {
    //     return "";
    //   }
    // },
    validFeedback2() {
      return this.state === true ? "가능합니다." : "";
    }
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style>
</style>
