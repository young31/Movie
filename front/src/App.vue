<template>
  <div id="app">
    <div>
      <b-navbar id="nav" toggleable="lg" type="light" variant="transparent">
        <b-navbar-brand href="/">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form v-if="isLoggedIn">
              <b-button class="mr-1" href="/user" right>유저</b-button>
              <b-button @click.prevent="logout" class="mr-1" right>로그아웃</b-button>
            </b-nav-form>
            <b-nav-form v-else>
              <b-button @click="loginClick" class="mr-1" right>로그인</b-button>
              <b-button @click="signupClick" class="mr-1" right>회원가입</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="container">
      <router-view :movies="movies" />
    </div>
  </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'

export default {
  name: "app",
  data() {
    return {
      movies: []
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.$session.destroy()
      this.$store.dispatch('logout')
      this.loginState = 0
      router.push('/')
    },
    loginClick() {
      this.$store.dispatch('loginClick', 1)
    },
    signupClick() {
      this.$store.dispatch('loginClick', 2)
    },
    cancelClick() {
      this.$store.dispatch('loginClick', 0)
    }
  },
  async created() {
    // 로그인 유지
    if (this.$session.has("jwt")) {
      const token = this.$session.get("jwt");
      this.$store.dispatch("login", token);
    }
    
    // 영화 데이터 불러오기
    const SERVER_IP = process.env.VUE_APP_SERVER_IP
    const movieResponse = await axios.get(SERVER_IP + '/api/movies')
    this.movies = movieResponse.data
    console.log(this.movies)

  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

/* #nav {
  padding: 30px;
} */

#nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
a.router-link {
  color:#2c3e50
}
</style>
