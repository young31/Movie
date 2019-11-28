<template>
  <div class="div-center search-bar">
    <div class="input-group mb-3 bg-white input-bar">
      <input
        type="text"
        class="form-control"
        placeholder="영화, 배우, 감독, 유저를 검색하세요."
        v-model="searchInfo.keyword"
        @keyup.enter="click"
      />
      <!-- <div class="input-group-append">
        <button @click="click" class="btn btn-outline-transparent">검색</button>
      </div> -->
    </div>
    <div v-show-slide="featuresOpen" class="div-center detail-search mb-3">
      <!-- 장르 -->
      <genreBtn v-for="(genre, idx) in genres" :key="idx" :genre="genre" />

      <!-- 개봉연도 -->
      <div class="my-3">
        <input v-model="searchInfo.openDt.from" type="date" /> -
        <input v-model="searchInfo.openDt.to" type="date" />
      </div>

      <!-- 평점 -->
      <input v-model="searchInfo.rating" type="number" />
    </div>
    <button
      @click="toggleFeatures"
      class="toggle-features search-btn-css mb-5"
    >{{ featuresOpen ? '접어두기' : '상세보기' }}</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import genreBtn from "@/components/index/parts/GenreBtn";

export default {
  name: "SearchBar",
  components: {
    genreBtn
  },
  data() {
    return {
      searchInfo: {
        keyword: "",
        genres: this.chosenGenres,
        rating: 0,
        openDt: {
          from: "1900-01-01",
          to: new Date()
        }
      },
      genres: [
        // { name: "가족", contained: false },
        // { name: "모험", contained: false },
        // { name: "뮤지컬", contained: false },
        // { name: "애니메이션", contained: false },
        // { name: "코미디", contained: false },
        // { name: "판타지", contained: false }
        "가족",
        "모험",
        "뮤지컬",
        "애니메이션",
        "코미디",
        "판타지",
        "SF",
        "서부",
        "액션",
        "범죄",
        "스릴러",
        "공포",
        "멜로/로맨스",
        "드라마",
        "전쟁",
        "미스터리",
        "미국",
        "한국",
        "홍콩",
        "느와르",
        "영국",
        "TV영화",
        "스페인",
        "대만",
        "에로",
        "일본",
        "다큐멘터리"
      ],
      featuresOpen: false
    };
  },
  methods: {
    click() {
      // const new_genres = this.genres.filter(genre => {
      //   return genre.contained;
      // });
      // this.searchInfo.genres = new_genres;
      const SERVER_IP = process.env.VUE_APP_SERVER_IP;
      // console.log(this.searchInfo)
      // 영화 검색
      axios
        .post(SERVER_IP + "/api/movies/search", this.searchInfo)
        .then(response => {
          console.log(response.data.result);
          this.$store.dispatch("searchMovie", response.data.result);
          this.$store.dispatch("chosenGenreNull", []);
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
  },
  computed: {
    chosenGenres() {
      return this.$store.state.chosenGenres;
    }
  }
};
</script>

<style>
.search-bar {
  max-width: 650px;
  margin: 0 auto;
}

.input-bar {
  box-shadow: 0 3px 10px 0 rgba(0,0,0,0.1), 0 1px 4px 0 rgba(0,0,0,0.35);
  border-radius: 0.45vw;
}

.detail-search {
  /* background-color: white; */
  padding: 2vh;
  border-radius: 0.35vw;
  /* border: 0.5px solid #ced4da; */
}
.search-btn-css {
  display: flex;
  background-color: #2c3e50;
  color: aliceblue;
  letter-spacing: -0.0625vw;
  line-height: 4vh;
  height: 4vh;
  width: 10vh;
  border: 0;
  outline: 0;
  border-radius: 3vw;
  justify-content: center;
}
</style>
