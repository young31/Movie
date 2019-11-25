<template>
  <div>
    <h1>reviews</h1>
    <input type="text" @keydown:enter="create_review"> <!-- v-model="review.rating" -->
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
  // props: {
  //   reviews: {
  //     type: Array
  //   }
  // },
  methods: {
    create_review() {
      const SERVER_IP = process.env.VUE_APP_SERVER_IP
      axios.post(SERVER_IP + '/api/movies', {
        // options
      })
    }
  },
  data() {
    return {
      reviews: [
        {
          user: "aaa",
          content: "재미져요",
          rating: 10
        },
        {
          user: "bbb",
          content: "재미져요",
          rating: 5
        },
        {
          user: "ccc",
          content: "재미져요",
          rating: 3
        }
      ]
    }
  }
}
</script>

<style>

</style>