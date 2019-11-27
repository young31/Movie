<template>
  <div>
    <p>userId: {{ user.userId }}</p>
    <p>email: {{ user.email }}</p>
    <p>password: blank</p> <!-- 마스킹이나 블랭크 -->
    <hr><hr>

    <h1>찜한 목록</h1>
    <MovieList movie="user"/> <!-- 유저정보에 영화 전체를 저장해서 이쪽에서 간편하게 할지/ 가지고 있는 목록 정보 따는 쿼리문을 딸지 -->

    <input type="text" v-model="user.u">  <!-- 되는지 모르지만 이런 식으로 입력 받을 수 있게 -->
   
    <button @click="update">변경하기</button>
    <button @click="remove">탈퇴하기</button>

    <!-- 회원가입 폼 참조 -->
  </div>
</template>

<script>
import MovieList from './MovieList'
export default {
  name: "UserDetail",
  component: {
    MovieList
  },
  props: { // vuex쓰면 수정
    user
  },
  methods: {
    update() {
      const target = this.user.email
      axios.put(`/${target}`, user)
    },
    remove() {
      const target = this.user.email
      axios.delete(`/${target}`)
    }
  }
}
</script>

<style>

</style>