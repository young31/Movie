<template>
  <div>
    <h1>리스트</h1>
    <p v-for="movie in movies" :key="movie.title">
      {{ movie.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movie: {
      type: Array
    }
  }
}
</script>

<style>

</style>
