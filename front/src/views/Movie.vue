<template>
  <div class="movie">
    <h1>영화홈</h1>
    <SearchBar />
    <MovieList />

  </div>
</template>

<script>
import MovieList from '@/components/movie/MovieList'
import SearchBar from '@/components/movie/SearchBar'

export default {
  name: 'Movie',
  components: {
    MovieList,
    SearchBar
  }
}
</script>

<style>

</style>
