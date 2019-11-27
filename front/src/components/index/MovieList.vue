<template>
  <div>
    <b-card
      :title="movie.title"
      img-src="https://movie-phinf.pstatic.net/20191121_221/1574298335357mqgLk_JPEG/movie_image.jpg"
      :img-alt="movie.title"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-3"
      @click="goDetailView"
    >
      <!-- <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</b-card-text> -->

      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: "MovieList",
  props: {
    movie: Object
  },
  methods: {
    goDetailView() {
      this.$store.dispatch('goMovieDetail', this.movie)
      router.push('/movie')
    }
  }
};
</script>

<style>
</style>
