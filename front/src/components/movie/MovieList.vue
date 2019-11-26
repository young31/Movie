<template>
  <div>
    <h1>리스트</h1>
    <p v-for="movie in movies" :key="movie.title">
      {{ movie.title }}
    </p>
    <span @click="next">다음으로</span>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: {
      type: Array
    }
  },
  data() {
    return {
      idx: 0
    }
  },
  methods: {
    next() {
      this.idx += 1 // 나중에 최대값 설정해서 돌리기 가능할듯
    }
  }
}
</script>

<style>

</style>
