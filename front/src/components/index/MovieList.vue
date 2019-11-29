<template>
  <div @click="goDetailView" class="movie-image" v-bind:style="{ backgroundImage: 'url(' + movie.posterUrl + ')' }">
    <div class="content">
      <!-- <h1 class="title">{{ movie.title }}</h1> -->
      <p class="duration">{{ movie.runningTime }}min</p>
    </div>
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
      this.$session.start()
      this.$session.set('nowMovie', this.movie)
      this.$store.dispatch("setNowMovie", this.movie);
      router.push("/movie");
    }
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.movie-image {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-end !important;
  text-align: left !important;
  padding: 10px !important;
  width: 15.5vw !important;
  height: 23vw !important;
  background-color: rgba(255, 255, 255, 0.7) !important;
  background-position: center;
  background-repeat: no-repeat !important;
  /* background-blend-mode: overlay !important; */
  background-size: cover !important;
}
/* .movie-image:hover {
  background-blend-mode: none !important;
} */
.duration {
  text-align: center;
}
</style>
