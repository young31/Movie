<template>
  <div>
    <h1>reviews</h1>
    <b-form-input type="text" size="sm" class="mr-sm-2" placeholder="review" v-model="review_info.content" @keyup.enter="create_review"></b-form-input>
    <div v-for="review in reviews" :key="review.user ">
      <span>{{ review.user }} // {{ review.rating }}</span>
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Reviews",
  data() {
    return {
      review_info: {
        email: '',
        rate: null,
        content: ''
      }
    }
  },
  methods: {
    create_review() {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP
      axios.post(SERVER_IP + `/api/movies/${this.getMovie.index}/review`, {
        // options
      })
    }
  },
  computed: {
    getMovie() {
      return this.$store.state.movieDetail;
    },
  }
  
}
</script>

<style>

</style>