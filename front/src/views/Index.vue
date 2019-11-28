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

    <div v-if="isLoggedIn && movies.length" class="px-3 movie-align">
      <!-- 최신작 -->
      <!-- <flickity ref="flickity" :options="flickityOptions">
        <b-container v-for="(i, i_idx) in idx" :key="i_idx" class="bv-example-row">
          <b-row class="text-center">
            <b-col v-for="(movie, moive_idx) in movies.slice(0 + i, 5 + i)" :key="moive_idx">
              <MovieList :movie="movie" />
            </b-col>
      </b-row>-->

      <!-- <b-row class="text-center">
            <b-col v-for="(movie, moive_idx) in movies.slice(5 + i, 10 + i)" :key="moive_idx">
              <MovieList :movie="movie" />
            </b-col>
      </b-row>-->
      <!-- </b-container>
      </flickity>-->
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiperSlide v-for="movie in movies" :key="movie.key">
          <MovieList :movie="movie" />
        </swiperSlide>

        <!-- Optional controls -->
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/index/LoginForm";
import SignupForm from "@/components/index/SignupForm";
import SearchBar from "@/components/index/SearchBar";
import MovieList from "@/components/index/MovieList";
// import Flickity from "vue-flickity";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Index",
  data() {
    return {
      idx: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true
      },
      swiperOption: {
        // direction: "vertical",
        // pagination: {
        //   el: ".swiper-pagination",
        //   type: "bullets"
        slidesPerView: 5,
        spaceBetween: 0,
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    LoginForm,
    SignupForm,
    SearchBar,
    MovieList,
    // Flickity,
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
  height: 500px;
}

.movie-align {
  height: 100vh;
  /* display: flex; */
  /* position: relative; */
  /* flex-direction: column; */
  /* -webkit-box-pack: center; */
  /* justify-content: center; */
}
</style>
