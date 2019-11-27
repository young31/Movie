<template>
  <div>
    <h3>로그인</h3>
    <!-- id -->
    <b-form-group
      id="loginEmail"
      
      :state="state1"
    >
      <b-form-input id="input-1" @keyup.enter="login" v-model="credentials.email" :state="state1" trim placeholder="이메일 입력"></b-form-input>
    </b-form-group>

    <!-- password -->
    <b-form-group
      id="loginPassword"
      
      :state="state2"
    >
      <b-form-input type="password" id="input-2" @keyup.enter="login" v-model="credentials.password" :state="state2" trim placeholder="비밀번호 입력(8자이상)"></b-form-input>
    </b-form-group>

    <button class="btn btn-dark mr-1" @click="login">로그인</button>
    <button class="btn btn-danger" @click="cancelClick">취소</button>
  </div>
</template>

<script>
import * as Emailvalidator from 'email-validator'
import axios from 'axios'
// import router from '@/router'

export default {
  name: "LoginForm",
  methods: {
    login() {
      if (this.state1 && this.state2) {
        const SERVER_IP = process.env.VUE_APP_SERVER_IP

        axios.post(SERVER_IP + '/user/login', this.credentials)
          .then(response => {
            if (response.data.message !== 'error') {
              this.cancelClick()
              // router.push('/')
            }
            this.$session.start()
            this.$session.set('jwt', response.data.message)
            this.$store.dispatch('login', response.data.message)
            console.log(response.data.message)
          })
          .catch(error =>{
            console.error(error)
          })
      }
    },
    cancelClick() {
      this.$store.dispatch('loginClick', 0)
    }
  },
  computed: {
    // email 
    state1() {
      return Emailvalidator.validate(this.credentials.email);
    },

    // password
    state2() {
      return this.credentials.password.length >= 8 ? true : false;
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
