import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router'
import VShowSlide from 'v-show-slide'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
import VueAnimated from '@codekraft-studio/vue-animated'
import VueAnime from 'vue-animejs';
import store from './store'
// import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"

Vue.use(VueAnime)
Vue.use(VueAnimated)
Vue.use(SequentialEntrance)
Vue.use(BootstrapVue)
Vue.use(VueSession)
Vue.use(VShowSlide)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')