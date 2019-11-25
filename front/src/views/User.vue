<template>
  <div class="user">
    <h1>유저정보</h1>
    <button @click="inc">click</button>
    <transition-group   name="bounce"
      enter-active-class="bounceInLeft"
      leave-active-class="bounceOutRight">
      <!-- <div v-for="n in name" :key="n">  -->
        <p v-if="n % 3 === next"> 
          {{n}}, {{ next }}
        </p>
      <!-- </div> -->
    </transition-group>

  </div>
</template>

<script>
// import { animateOnScroll } from "mdbvue";
export default {
  name: 'User',
  data() {
    return {
      name: [1,2,3,4,5,6,7,8,9,10],
      next: 0
    }
  },
  methods: {
    inc(){
      this.next = (this.next+1) % 3
    },
    enter(el) {
      el.style.opacity = 30
    } 
  }
}
</script>

<style>
/* @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1" */
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" */
/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"> */
  .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>  
