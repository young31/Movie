<template>
  <div class="movie">
    <h1>영화홈</h1>
    <!-- <SearchBar /> -->
    <MovieList />
    <Reviews />
  </div>
</template>

<script>
import MovieList from '@/components/movie/MovieList'
// import SearchBar from '@/components/movie/SearchBar'
import Reviews from '@/components/movie/Reviews'

export default {
  name: 'Movie',
  components: {
    MovieList,
    Reviews,
  }
}
</script>

<style>

</style>
