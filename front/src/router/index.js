import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Movie from '@/views/Movie'
import SearchResult from '@/views/SearchResult'
import User from '@/views/User'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/movie',
    name: 'movie',
    component: Movie
  },
  {
    path: '/result',
    name: 'result',
    component: SearchResult
  },
  {
    path: '/user',
    name: 'user',
    component: User
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
