<template>
  <div class="index">
    <div v-if="loginState === 1">
      <LoginForm />
    </div>
    <div v-else-if="loginState === 2">
      <SignupForm />
    </div>
    <div v-else>
      <SearchBar />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/index/LoginForm'
import SignupForm from '@/components/index/SignupForm'
import SearchBar from '@/components/index/SearchBar'

export default {
  name: 'Index',
  components: {
    LoginForm,
    SignupForm,
    SearchBar
  },
  computed: {
    loginState() {
      return this.$store.state.loginState
    }
  }
}
</script>

<style>

</style>
