<template>
  <div class="content-mt content-px div-center">
    <div class="movie-head">
      <img :src="getMovie.posterUrl" :alt="getMovie.title" class="thumbnail" />
      <div class="div-inner-content">
        <div class="movieTitle">{{ getMovie.title }}</div>
        <div class="movieOpenDt">{{ getMovie.openDt }}</div>
        <div class="movieRunningTime">{{ getMovie.runningTime }}</div>
        <div class="movieScore">{{ getMovie.score }}</div>
        <div class="movieGenre">
          <span v-for="genre in getMovie.genres" :key="genre.key" class="mr-2">{{ genre }}</span>
        </div>
        <button
          v-bind:class="{ 'btn-active': wishMovie, 'btn-inactive': !wishMovie }"
          @click="addToWishList"
        >보고싶어요</button>
        <star-rating
          v-bind:increment="0.5"
          v-bind:max-rating="5"
          v-bind:star-size="30"
          :show-rating="false"
          @rating-selected="setRating"
          v-model="rating"
        ></star-rating>
      </div>
    </div>

    <div class="movie-body mt-5">
      <div
        class="div-inner-content mx-3"
        v-for="director in getMovie.directors"
        :key="director.key"
      >
        <img class="actor-image rounded-circle" :src="director.img" :alt="director.name" />
        <div class="actor-name">{{ director.name }}</div>
      </div>
      <div class="div-inner-content mx-3" v-for="actor in getMovie.actors" :key="actor.key">
        <img class="actor-image rounded-circle" :src="actor.img" :alt="actor.name" />
        <!-- <div class="actor-image" v-bind:style="{ backgroundImage: 'url(' + actor.img + ')' }"></div> -->
        <!-- <p>{{ actor.img }}</p> -->
        <div class="actor-name">{{ actor.name }}</div>
      </div>
    </div>

    <div class="movie-body mt-5">
      <!-- <video :src="getMovie.preview"></video> -->
      <h5>{{ getMovie.description }}</h5>
    </div>

    <h1>reviews</h1>
    <b-form-input
      type="text"
      size="sm"
      class="mr-sm-2"
      placeholder="review"
      v-model="review_info.content"
      @keydown.enter="createReview"
    ></b-form-input>
    <div v-for="review in reviews" :key="review.user ">
      <span>{{ review.user }}</span>
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";
export default {
  name: "Movie",
  components: {
    StarRating
  },
  data() {
    return {
      review_info: {
        email: "",
        userId: "",
        content: ""
      },
      reviews: [],
      wishMovie: false,
      rating: 0
    };
  },
  methods: {
    setUser() {
      return this.$store.dispatch("setUser", this.myEmail);
    },
    createReview() {
      this.review_info.email = this.myEmail;
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      axios
        .post(
          SERVER_IP + `/api/movies/${this.getMovie.index}/review`,
          this.review_info
        )
        .then(() => {
          this.reviews.push(this.review_info);
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToWishList() {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      axios
        .post(SERVER_IP + `/api/movies/${this.getMovie.index}/like`, {
          email: this.review_info.email
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      this.wishMovie = !this.wishMovie;
    },
    setRating() {
      // this.rating = rating;
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      axios
        .post(SERVER_IP + `/api/movies/${this.getMovie.index}/rate`, {
          email: this.review_info.email, rate: this.rating
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },

  computed: {
    getMovie() {
      return this.$store.state.movieDetail;
    },
    myEmail() {
      return this.$store.getters.myEmail;
    }
  },

  async created() {
    if (this.getMovie.reviews.length) {
      this.reviews = this.getMovie.reviews;
    }

    const SERVER_IP = process.env.VUE_APP_SERVER_IP;
    await axios
      .get(SERVER_IP + `/user/${this.myEmail}`)
      .then(response => {
        console.log(response.data);
        this.review_info.userId = response.data.userId;
        this.review_info.email = response.data.email;
        if (response.data.like_movies.includes(this.getMovie.index)) {
          this.wishMovie = true;
        }
        response.data.rate.forEach(function(item) {
          if (item.index === this.getMovie.index) {
            this.rating = item.rate;
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

<style>
.thumbnail {
  /* display: inline-block; */
  max-width: 14vw;
  border-radius: 0.5vw;
}
.actor-image {
  display: flex;
  align-items: center;
  justify-content: center;
  /* max-width: 50px;
  max-width: 50px; */
  margin: 0 auto;
  background-position: center;
}
.actor-name {
  text-align: center;
}
</style>
