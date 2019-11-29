<template>
  <div id="index">
    <div v-if="loginState === 1">
      <LoginForm class="wallpaper-center text-center" />
    </div>
    <div v-else-if="loginState === 2">
      <SignupForm class="wallpaper-center text-center" />
    </div>
    <div v-else>
      <SearchBar class="wallpaper-center text-center" />
    </div>

    <div v-if="isLoggedIn && movies.length" class="px-3 wallpaper-center">
      <div class="movie-align">
        <!-- 최신작 -->
        <swiper :options="swiperOption">
          <swiperSlide v-for="movie in movies" :key="movie.key">
            <MovieList :movie="movie" />
          </swiperSlide>
        </swiper>
      </div>

      <!-- 추천작 -->
      <!-- <swiper :options="swiperOption">
        <swiperSlide v-for="movie in movies" :key="movie.key">
          <MovieList :movie="movie" />
        </swiperSlide>
      </swiper>-->
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/index/LoginForm";
import SignupForm from "@/components/index/SignupForm";
import SearchBar from "@/components/index/SearchBar";
import MovieList from "@/components/index/MovieList";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Index",
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 0,
        freeMode: true,
        loop: true
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
      }
    };
  },
  components: {
    LoginForm,
    SignupForm,
    SearchBar,
    MovieList,
    swiper,
    swiperSlide
  },
  computed: {
    loginState() {
      return this.$store.state.loginState;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  props: {
    movies: Array
  }
};
</script>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.swiper-container {
  /* height: 500px; */
  height: 100vh;
}

.movie-align {
  height: 100vh;
  /* display: flex; */
  /* position: relative; */
  /* flex-direction: column; */
  /* -webkit-box-pack: center; */
  /* justify-content: center; */
}

/* .swiper-container[data-v-23543608] {
  /* height: 500px; */
  /* height: 100vh; */
/* } */
</style>
