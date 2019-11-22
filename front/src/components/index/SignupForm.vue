<template>
  <div>
    <h3>회원가입</h3>
    <!-- id -->
    <b-form-group
      id="idForm"
      label-cols-sm="4"
      label-cols-lg="3"
      label="아이디"
      label-for="input-1"
      
      :valid-feedback="validFeedback1"
      :state="state1"
    >
    <!-- :invalid-feedback="invalidFeedback1" -->
      <b-form-input id="input-1" v-model="userId" :state="state1" trim placeholder="아이디는 4자 이상 입력해주세요."></b-form-input>
    </b-form-group>

    <!-- password -->
    <b-form-group
      id="passwordForm"
      label-cols-sm="4"
      label-cols-lg="3"
      label="비밀번호"
      label-for="input-2"
      
      :valid-feedback="validFeedback2"
      :state="state2"
    >
    <!-- :invalid-feedback="invalidFeedback2" -->
      <b-form-input type="password" id="input-2" v-model="password" :state="state2" trim placeholder="비밀번호는 8자 이상 입력해주세요."></b-form-input>
    </b-form-group>

    <button class="btn btn-dark">회원가입</button>
  </div>
</template>

<script>
export default {
  name: 'SignupForm'
}
</script>

<style>

</style>
