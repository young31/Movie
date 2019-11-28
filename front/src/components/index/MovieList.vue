<template>
  <!-- <div> -->
  <!-- <card
      :img-src="movie.posterUrl"
      :img-alt="movie.title"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-3 border-transparent"
      @click="goDetailView"
    >
  </card>-->
  <!-- <img
      src="https://movie-phinf.pstatic.net/20191121_221/1574298335357mqgLk_JPEG/movie_image.jpg"
      :alt="movie.title"
      style="max-width: 20rem;"
      class="mb-3"
      @click="goDetailView"
    />
  <p>{{ movie.title }}</p>-->
  <!-- </div> -->
  <div class="movie-image" v-bind:style="{ backgroundImage: 'url(' + movie.posterUrl + ')' }">
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
      this.$store.dispatch("goMovieDetail", this.movie);
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
  width: 17vw !important;
  height: 55vh !important;
  background-color: rgba(255, 255, 255, 0.7) !important;
  background-position: center;
  background-repeat: no-repeat !important;
  background-blend-mode: overlay !important;
  background-size: cover !important;
}
/* .movie-image:hover {
  background-blend-mode: none !important;
} */
</style>
