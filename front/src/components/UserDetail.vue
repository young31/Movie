<template>
  <div>
    <h2>내 정보</h2>
    <p>{{ user.userId }}</p>
    <p>{{ user.email }}</p>
    <!-- <p></p>  password masking-->
    <p>좋아하는 영화</p>
    <p v-for="like in user.like_movies" :key="like">
      {{ like }}
    </p>

    <p>남긴 리뷰</p>
    <p v-for="review in user.reviews" :key="review">
      {{ review }}
    </p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'UserDetail',
  props: { // 아니면 axios로 + data
    
  },
  data() {
    return {
      user: {
        userId: "123",
        email: "aaa",
        like_movies: [
          "q", "w", "e"
        ],
        reviews: [
          "z", "x", "c"
        ]
      }
    }
  }
}
</script>

<style>

</style>