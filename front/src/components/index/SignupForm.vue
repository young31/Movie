<template>
  <div class="search-bar">
    <h3>회원가입</h3>
    <!-- email -->
    <b-form-group id="signupEmail" :state="state1">
      <b-form-input
        @keyup.enter="signup"
        v-model="credentials.email"
        :state="state1"
        trim
        placeholder="이메일 입력"
      ></b-form-input>
    </b-form-group>

    <!-- userId -->
    <b-form-group id="signupUserId" :state="state2">
      <b-form-input
        @keyup.enter="signup"
        v-model="credentials.userId"
        :state="state2"
        trim
        placeholder="유저명 입력"
      ></b-form-input>
    </b-form-group>

    <!-- password -->
    <b-form-group id="signupPassword" :state="state3">
      <b-form-input
        @keyup.enter="signup"
        type="password"
        v-model="credentials.password"
        :state="state3"
        trim
        placeholder="비밀번호 입력(8자이상)"
      ></b-form-input>
    </b-form-group>

    <!-- password confirm-->
    <b-form-group id="singupPasswordConfrim" :state="state4">
      <b-form-input
        @keyup.enter="signup"
        type="password"
        v-model="credentials.passwordConfirm"
        :state="state4"
        trim
        placeholder="비밀번호 확인"
      ></b-form-input>
    </b-form-group>
    <div>
      <div class="basic-btn-css mr-1" @click="signup">회원가입</div>
      <div class="basic-btn-css" @click="cancelClick">취소</div>
    </div>
  </div>
</template>

<script>
import * as Emailvalidator from "email-validator";
import axios from "axios";
// import router from '@/router'

export default {
  name: "SignupForm",
  methods: {
    signup() {
      if (this.state1 && this.state2 && this.state3 && this.state4) {
        const SERVER_IP = process.env.VUE_APP_SERVER_IP;

        axios
          .post(SERVER_IP + "/user/signup", this.credentials)
          .then(response => {
            if (response.data.message !== "error") {
              this.cancelClick();
              // router.push('/')
            }
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    cancelClick() {
      this.$store.dispatch("loginClick", 0);
    }
  },
  computed: {
    // email
    state1() {
      if ( this.credentials.email === "" ) {
        return null
      } else {
        return Emailvalidator.validate(this.credentials.email);
      }
    },

    // userId
    state2() {
      if ( this.credentials.userId === "" ) {
        return null
      } else {
        return this.credentials.userId.length >= 2 ? true : false;
      }
    },

    // password
    state3() {
      if ( this.credentials.password === "" ) {
        return null
      } else {
        return this.credentials.password.length >= 8 ? true : false;
      }
    },

    // password confirm
    state4() {
      if ( this.credentials.passwordConfirm === "" ) {
        return null
      } else {
        return this.credentials.password === this.credentials.passwordConfirm
        ? true
        : false;
      }
      
    }
  },
  data() {
    return {
      credentials: {
        email: "",
        userId: "",
        password: "",
        passwordConfirm: ""
      }
    };
  }
};
</script>

<style>
</style>
