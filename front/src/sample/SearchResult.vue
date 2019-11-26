<template>
  <div>
    <h1>제목</h1>
    <MovieList movies_title = movies.movie_title />

    <h1>배우</h1>
    <MovieList movies_actor = movies.movie_actor />

    <h1>감독</h1>
    <MovieList movies_director = movies.movie_director />
  </div>
</template>

<script>
import MovieList from './MovieList'
export default {
  name: "SearchResult",
  component: {
    MovieList
  },
  props: {
    movies
  }
}
</script>

<style>

</style>