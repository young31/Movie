<template>
  <div v-if="getResult" class="wallpaper-center">
    <div v-if="getMovies.movie_title.length" class="px-3 movie-align">
      <h4>영화명관련</h4>
      <swiper :options="swiperOption">
        <swiperSlide v-for="(movie, moive_idx) in getMovies.movie_title" :key="moive_idx">
          <MovieList :movie="movie" />
        </swiperSlide>
      </swiper>
    </div>

    <div v-if="getMovies.movie_actor.length" class="px-3 movie-align">
      <h4>배우관련</h4>
      <swiper :options="swiperOption">
        <swiperSlide v-for="(movie, moive_idx) in getMovies.movie_actor" :key="moive_idx">
          <MovieList :movie="movie" />
        </swiperSlide>
      </swiper>
    </div>

    <div v-if="getMovies.movie_director.length" class="px-3 movie-align">
      <h4>감독관련</h4>
      <swiper :options="swiperOption">
        <swiperSlide v-for="(movie, moive_idx) in getMovies.movie_director" :key="moive_idx">
          <MovieList :movie="movie" />
        </swiperSlide>
      </swiper>
    </div>

    <div v-if="getMovies.movie_director.length">
      <h4>유저관련</h4>
      <flickity ref="flickity" :options="flickityOptions">
        <b-container v-for="(i, i_idx) in idx.movie_directors" :key="i_idx" class="bv-example-row">
          <b-row class="text-center">
            <b-col
              cols="2"
              v-for="(movie, moive_idx) in getMovies.movie_directors"
              :key="moive_idx"
            >
              <MovieList :movie="movie" />
            </b-col>
          </b-row>
        </b-container>
      </flickity>
    </div>
  </div>
  <div v-else class="wallpaper-center text-center">
    <p>관련 영화가 없습니다.</p>
  </div>
</template>

<script>
import MovieList from "@/components/index/MovieList";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "SearchResult",
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 0,
        freeMode: true,
        loop: true
      }
    };
  },
  components: {
    MovieList,
    swiper,
    swiperSlide
  },
  computed: {
    getMovies() {
      return this.$store.state.searchMovieResults;
    },
    getResult() {
      return this.$store.getters.getResult;
    }
  },
  created() {
    // 검색 결과 유지
    if (this.$session.has("searchMovieResult")) {
      const searchMovieResult = this.$session.get("searchMovieResult");
      this.$store.dispatch("searchMovie", searchMovieResult);
    }
  }
};
</script>

<style>
</style>