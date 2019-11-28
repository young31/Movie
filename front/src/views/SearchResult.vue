<template>
  <div v-if="getResult" class="wallpaper-center">
    <h2>검색 결과</h2>
    <br />
    <div v-if="getMovies.movie_title.length">
      <h4>영화명</h4>
      <flickity ref="flickity" :options="flickityOptions">
        <b-container v-for="(i, i_idx) in idx.movie_title" :key="i_idx" class="bv-example-row">
          <b-row class="text-center">
            <b-col cols="2" v-for="(movie, moive_idx) in getMovies.movie_title" :key="moive_idx">
              <MovieList :movie="movie" />
            </b-col>
          </b-row>
        </b-container>
      </flickity>
    </div>

    
    <div v-if="getMovies.movie_actors.length">
      <h4>배우</h4>
      <flickity ref="flickity" :options="flickityOptions">
        <b-container v-for="(i, i_idx) in idx.movie_actors" :key="i_idx" class="bv-example-row">
          <b-row class="text-center">
            <b-col cols="2" v-for="(movie, moive_idx) in getMovies.movie_actors" :key="moive_idx">
              <MovieList :movie="movie" />
            </b-col>
          </b-row>
        </b-container>
      </flickity>
    </div>

    
    <div v-if="getMovies.movie_directors.length">
      <h4>감독</h4>
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


    <div v-if="getMovies.movie_directors.length">
      <h4>유저</h4>
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
import Flickity from "vue-flickity";

export default {
  name: "SearchResult",
  data() {
    return {
      idx: {
        movie_title: [],
        movie_actors: [],
        movie_directors: []
      },
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true
      }
    };
  },
  components: {
    MovieList,
    Flickity
  },
  methods: {
    make_idx() {
      for (
        let ii = 0;
        ii <
        parseInt(this.getMovies.movie_title.length / 6) +
          Math.ceil((this.getMovies.movie_title.length % 6) / 6);
        ii++
      ) {
        this.idx.movie_title.push(6 * ii);
      }
      for (
        let ii = 0;
        ii <
        parseInt(this.getMovies.movie_actors.length / 6) +
          Math.ceil((this.getMovies.movie_actors.length % 6) / 6);
        ii++
      ) {
        this.idx.movie_actors.push(6 * ii);
      }
      for (
        let ii = 0;
        ii <
        parseInt(this.getMovies.movie_directors.length / 6) +
          Math.ceil((this.getMovies.movie_directors.length % 6) / 6);
        ii++
      ) {
        this.idx.movie_directors.push(6 * ii);
      }
    }
  },
  computed: {
    getMovies() {
      return this.$store.state.searchMovieResuts;
    },
    getResult() {
      return this.$store.getters.getResult;
    }
  },
  created() {
    this.make_idx();
  }
};
</script>

<style>
</style>