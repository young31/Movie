<template>
  <div class="index">
    <LoginForm/>
    <SignupForm/>
    <SearchBar />
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
  }
}
</script>

<style>

</style>
