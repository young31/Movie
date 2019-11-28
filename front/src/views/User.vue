<template>
  <div class="user content-mt content-px">
    <h1>보고싶은 영화</h1>
    {{ user }}
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'User',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    
  },
  // async created() {
  //   // 유저 데이터 불러오기
  //   const SERVER_IP = process.env.VUE_APP_SERVER_IP;
  //   const userResponse = await axios.get(SERVER_IP + `/user/${this.email}`);
  //   this.user = userResponse.data;
  //   console.log(this.user)
  // }
}
</script>

<style>

</style>  
