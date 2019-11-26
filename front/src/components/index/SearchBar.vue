<template>
  <div class="searchBar">
    <input type="text" v-model="search_info.keyword" @keyup.enter="click" />
    <button @click="click">검색</button>
    <div v-show-slide="featuresOpen" class="features">
      <b-form-checkbox v-for="(genre, idx) in genres" :key="idx" v-model="genre.contained" 
      size="sm" name="check-button" button button-variant="info">
        {{ genre.name }}
      </b-form-checkbox>
      <br>
      <input type="date"> - <input type="date">
    </div>
    <button
      @click="toggleFeatures"
      class="toggle-features"
    >{{ featuresOpen ? 'Hide Features' : 'View Features' }}</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchBar',
  components: {
    
  },
  data() {
    return {
      search_info: {
        keyword: "",
        genres: [],
        rating: 0,
        openDt: {
          from: '1900-01-01',
          to: new Date()
        }
      },
      genres: [
        { name: "가족", contained: false },
        { name: "모험", contained: false },
        { name: "뮤지컬", contained: false },
        { name: "애니메이션", contained: false },
        { name: "코미디", contained: false },
        { name: "판타지", contained: false },
      ],
      featuresOpen: false
    }
  },
  methods: {
    click() {
      const new_genres = this.genres.filter(genre => {
        return genre.contained
      })
      this.search_info.genres = new_genres

      const SERVER_IP = process.env.VUE_APP_SERVER_IP

      axios.post(SERVER_IP + '/api/movie/search', this.search_info)
        .then(response => {
          console.log(response)
        })
        .catch(error =>{
          console.error(error)
        })
    },
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen
    }
  },
  async mounted() {
  //   const SERVER_IP = precess.env.VUE_APP_SERVER_IP

  //   axios.get(SERVER_IP + '/api/genre')
 
  }
}
</script>

<style>
</style>
