<template>
  <div class="searchBar">
    <input type="text" v-model="content" @keyup.enter="click"> <button @click="click">검색</button>
    <div v-show-slide="featuresOpen" class="features">
      <li>Aliquam lorem</li>
      <li>Praesent porttitor nulla vitae posuere</li>
      <li>Suspendisse nisl elit rhoncus</li>
      <li>Donec mi odio faucibus</li>
      <li>Curabitur suscipit suscipit</li>
    </div>
    <button @click="toggleFeatures" class="toggle-features">{{ featuresOpen ? 'Hide Features' : 'View Features' }}</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      content: "",
      featuresOpen: false
    }
  },
  methods: {
    click() {
      return
    },
    toggleFeatures() {
      this.featuresOpen = !this.featuresOpen
      console.log(this.featuresOpen)
    }
  }
}
</script>

<style>

</style>
