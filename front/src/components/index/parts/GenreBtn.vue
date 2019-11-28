<template>
  <button class="mb-1 mr-1" v-bind:class="{ 'btn-active': chosen, 'btn-inactive': !chosen }" @click="setGenre">{{ genre }}</button>
</template>

<script>
export default {
  name: 'GenreBtn',
  data() {
    return {
      chosen: false
    }
  },
  props: {
    genre: String
  },
  methods: {
    setGenre() {
      this.$store.dispatch('setChosenGenres', this.genre)
      this.chosen = !this.chosen
    }
  }
}
</script>

<style>
.btn-inactive {
  display: inline-block;
  color: white;
  border-color: transparent;
  letter-spacing: -0.0625vw;
  border-radius: 4vh;
  outline: none;
}

.btn-active {
  display: inline-block;
  color: white;
  border-color: transparent;
  background-color: #4d5f72;
  letter-spacing: -0.0625vw;
  border-radius: 4vh;
  outline: none;
}
</style>
