<template>
  <div class="movie">
    <h1>영화홈</h1>
    <h2>{{ getMovie.title }}</h2>
    <Reviews />
  </div>
</template>

<script>
import Reviews from '@/components/movie/Reviews'

export default {
  name: 'Movie',
  components: {
    Reviews,
  },
  computed: {
    getMovie() {
      return this.$store.state.movieDetail;
    },
  }
}
</script>

<style>

</style>
