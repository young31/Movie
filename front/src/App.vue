<template>
  <div id="app">
    <div>
      <nav id="nav" class="navbar navbar-white bg-white">
        <a class="navbar-brand" href="/">영화추천</a>
        <form class="form-inline">
          <div v-if="isLoggedIn">
            <div @click="goUserPage" class="basic-btn-css mr-1">유저</div>
            <div @click.prevent="logout" class="basic-btn-css mr-1">로그아웃</div>
          </div>
          <div v-else>
            <div @click="loginClick" class="basic-btn-css mr-1">로그인</div>
            <div @click="signupClick" class="basic-btn-css mr-1">회원가입</div>
          </div>
        </form>
      </nav>
    </div>
    <router-view class="fluid-container" :movies="movies" />
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      movies: []
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    getMyEmail() {
      return this.$store.getters.myEmail;
    }
  },
  methods: {
    logout() {
      this.$session.destroy();
      this.$store.dispatch("logout");
      this.loginState = 0;
      router.push("/");
    },
    loginClick() {
      this.$store.dispatch("loginClick", 1);
    },
    signupClick() {
      this.$store.dispatch("loginClick", 2);
    },
    cancelClick() {
      this.$store.dispatch("loginClick", 0);
    },
    goUserPage() {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      axios.get(SERVER_IP + `/user/${this.getMyEmail}`)
        .then(response => {
          this.$store.dispatch('setUser', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
      router.push('/user')
    }
  },
  async created() {
    // 로그인 유지
    if (this.$session.has("jwt")) {
      const token = this.$session.get("jwt");
      this.$store.dispatch("login", token);
    }

    // 영화 데이터 불러오기
    const SERVER_IP = process.env.VUE_APP_SERVER_IP;
    const movieResponse = await axios.get(SERVER_IP + "/api/movies");
    this.movies = movieResponse.data;
    // console.log(this.movies)
  }
};
</script>

<style>
body{
  background-color: #f8f8f8a2 !important;
}

*:focus {
  outline: none;
  background-color: none;
}

*:hover {
  background-color: none;
}

.content-mt {
  margin-top: 8.5vh;
}

.content-px {
  padding: 5vh 12vw;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: white;
  /* margin-top: 60px; */
}

#nav {
  position: fixed;
  top: 0;
  z-index: 500;
  font-size: 14px;
  letter-spacing: -0.4px;
  width: 100%;
  height: 65px;
  padding: 0 4%;
  border-bottom-color: #f0f0f0
}

#nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
a.router-link {
  color: #2c3e50;
}

.wallpaper-center {
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
}

.div-center {
  position: relative;
  /* display: flex; */
  z-index: 100;
  align-items: center;
  justify-content: center;
}
.div-inner-content {
  position: relative;
  display: flex;
  margin-bottom: auto;
  display: inline-block;
  z-index: 100;
  align-items: flex-start;
  /* justify-content: top; */
}

.basic-btn-css {
  display: inline-flex;
  background-color: #2c3e50;
  color: aliceblue;
  letter-spacing: -0.0625vw;
  line-height: 4vh;
  height: 4vh;
  width: 10vh;
  border: 0;
  outline: 0;
  border-radius: 3vw;
  justify-content: center;
}

.basic-btn-css:hover {
  cursor: pointer;
}

.btn-inactive {
  display: inline-block;
  color: white;
  border-color: transparent;
  letter-spacing: -0.0625vw;
  border-radius: 4vh;
  outline: none;
}

.btn-active {
  display: inline-block;
  color: white;
  border-color: transparent;
  background-color: #4d5f72;
  letter-spacing: -0.0625vw;
  border-radius: 4vh;
  outline: none;
}
</style>
