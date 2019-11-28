<template>
  <div class="content-mt div-center">
    <div class="movie-head">
      <img
        src="https://movie-phinf.pstatic.net/20191121_221/1574298335357mqgLk_JPEG/movie_image.jpg"
        :alt="getMovie.title"
        class="thumbnail"
      />
      <div class="movieTitle">{{ getMovie.title }}</div>
    </div>
    <h1>영화홈</h1>
    <h2>{{ getMovie.title }}</h2>
    <!-- <h5>{{ getMovie.posterUrl }}</h5> -->

    <h5>{{ getMovie.runningTime }}</h5>
    <h5>{{ getMovie.openDt }}</h5>
    <h5>{{ getMovie.genres }}</h5>
    <h5>{{ getMovie.actors }}</h5>
    <h5>{{ getMovie.directors }}</h5>
    <h5>{{ getMovie.like_users }}</h5>
    <h5>{{ getMovie.score }}</h5>
    <h5>{{ getMovie.preview }}</h5>
    <h5>{{ getMovie.description }}</h5>

    <h1>reviews</h1>
    <b-form-input
      type="text"
      size="sm"
      class="mr-sm-2"
      placeholder="review"
      v-model="review_info.content"
      @keyup.enter="create_review"
    ></b-form-input>
    <div v-for="review in getMovie.reviews" :key="review.user ">
      <span>{{ review.user }} // {{ review.rating }}</span>
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Movie",
  components: {},
  data() {
    return {
      review_info: {
        email: this.myEmail,
        rate: null,
        content: ""
      }
    };
  },
  methods: {
    create_review() {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      axios.post(SERVER_IP + `/api/movies/${this.getMovie.index}/review`, {
        // options
      });
    }
  },
  computed: {
    getMovie() {
      return this.$store.state.movieDetail;
    },
    getUser() {
      return this.$store.state.user;
    },
    myEmail() {
      return this.$store.getters.myEmail;
    }
  }
};
</script>

<style>
.thumbnail {
  /* display: inline-block; */
  max-width: 16vw;
  border-radius: 0.5vw;
}
</style>
