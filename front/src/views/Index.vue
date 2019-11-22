<template>
  <div class="index">
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
