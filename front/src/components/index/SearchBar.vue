<template>
  <div class="searchBar container" style="text-align: center">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="영화, 배우, 감독, 유저를 검색하세요."
        v-model="searchInfo.keyword"
        @keyup.enter="click"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">검색</button>
      </div>
    </div>
    <div v-show-slide="featuresOpen" class="features">
      <!-- 장르 -->
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
      <!-- 개봉연도 -->
      <input v-model="searchInfo.openDt.from" type="date" /> -
      <input v-model="searchInfo.openDt.to" type="date" />
      <!-- 평점 -->
      <input v-model="searchInfo.rating" type="number" />
    </div>
    <button
      @click="toggleFeatures"
      class="toggle-features btn btn-light mb-5"
    >{{ featuresOpen ? '접어두기' : '상세보기' }}</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "SearchBar",
  components: {},
  data() {
    return {
      searchInfo: {
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
      this.searchInfo.genres = new_genres;
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      // console.log(this.searchInfo)
      // 영화 검색
      axios
        .post(SERVER_IP + "/api/movies/search", this.searchInfo)
        .then(response => {
          console.log(response.data.result);
          this.$store.dispatch("searchMovie", response.data.result);
          router.push("/result");
        })
        .catch(error => {
          console.error(error);
        });

      // 유저검색
    },
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen;
    }
  }
};
</script>

<style>
</style>
