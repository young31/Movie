<template>
  <div class="index">
    <h1>홈</h1>
    <LoginForm/>
    <SignupForm/>
  </div>
</template>

<script>
import LoginForm from '@/components/index/LoginForm'
import SignupForm from '@/components/index/SignupForm'

export default {
  name: 'Index',
  components: {
    LoginForm,
    SignupForm
  }
}
</script>

<style>

</style>
