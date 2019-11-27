<template>
  <div>
    <b-card
      img-src="https://movie-phinf.pstatic.net/20191121_221/1574298335357mqgLk_JPEG/movie_image.jpg"
      :img-alt="movie.title"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-3"
      @click="goDetailView"
    >
      <b-card-text>{{ movie.title }}</b-card-text>
    </b-card>
    <!-- <img
      src="https://movie-phinf.pstatic.net/20191121_221/1574298335357mqgLk_JPEG/movie_image.jpg"
      :alt="movie.title"
      style="max-width: 20rem;"
      class="mb-3"
      @click="goDetailView"
    />
    <p>{{ movie.title }}</p> -->
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "MovieList",
  props: {
    movie: Object
  },
  methods: {
    goDetailView() {
      this.$store.dispatch("goMovieDetail", this.movie);
      router.push("/movie");
    }
  }
};
</script>

<style>
</style>
