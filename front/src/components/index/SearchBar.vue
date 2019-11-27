<template>
  <div class="searchBar">
    <b-form-input type="text" size="sm" class="mr-sm-2" placeholder="Search" v-model="search_info.keyword" @keyup.enter="click"></b-form-input>
    <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="click">검색</b-button>
    <div v-show-slide="featuresOpen" class="features">
      <b-form-checkbox
        v-for="(genre, idx) in genres"
        :key="idx"
        v-model="genre.contained"
        size="sm"
        name="check-button"
        button
        button-variant="info"
      >{{ genre.name }}</b-form-checkbox>
      <br />
      <input type="date" /> -
      <input type="date" />
    </div>
    <button
      @click="toggleFeatures"
      class="toggle-features"
    >{{ featuresOpen ? 'Hide Features' : 'View Features' }}</button>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router';

export default {
  name: "SearchBar",
  components: {},
  data() {
    return {
      search_info: {
        keyword: "",
        genres: [],
        rating: 0,
        openDt: {
          from: "1900-01-01",
          to: new Date()
        }
      },
      genres: [
        { name: "가족", contained: false },
        { name: "모험", contained: false },
        { name: "뮤지컬", contained: false },
        { name: "애니메이션", contained: false },
        { name: "코미디", contained: false },
        { name: "판타지", contained: false }
      ],
      featuresOpen: false
    };
  },
  methods: {
    click() {
      const new_genres = this.genres.filter(genre => {
        return genre.contained;
      });
      this.search_info.genres = new_genres;
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      console.log(this.search_info)
      axios.post(SERVER_IP + "/api/movies/search", this.search_info)
        .then(response => {
          console.log(response.data.result);
          this.$store.dispatch('searchMovie', response.data.result)
          router.push('/result')
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen;
    }
  }
};
</script>

<style>
</style>
