<template>
  <div class="searchBar">
    <input type="text" v-model="content" @keyup.enter="click"> <button @click="click">검색</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      content: ""
    }
  },
  method: {
    click() {
      
    }
  }
}
</script>

<style>

</style>
