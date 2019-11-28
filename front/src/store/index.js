import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  // 상태 (data)
  state: {
    token: null,
    loginState: 0,
    searchMovieResuts: [],
    movieDetail: null,
    user: null,
    findUsers: null,
    chosenGenres: []
  },
  // computed
  getters: {
    isLoggedIn(state) {
      return state.token ? true : false
    },
    options(state) {
      return {
        headers: {
          Authorization: 'JWT ' + state.token
        }
      }
    },
    myEmail(state) {
      return state.token ? jwtDecode(state.token).email : null
    },
    getResult(state) {
      return state.searchMovieResuts.length ? true : false
    },
    getUsers(state) {
      return state.findUsers ? true : false 
    }
  },
  // 상태를 변경하는 함수
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setLoginState(state, loginState) {
      state.loginState = loginState
    },
    setSearchMovieResuts(state, results) {
      state.searchMovieResuts = results
    },
    setMovieDetail(state, movie) {
      state.movieDetail = movie
    },
    setUser(state, userInfo) {
      state.user = userInfo
    },
    setFindUsers(state, findUserInfo) {
      state.findUsers = findUserInfo
    },
    chosenGenreNull(state, genre) {
      state.chosenGenres = genre
    },
    setChosenGenres(state, genre) {
      if (state.chosenGenres.includes(genre)) {
        state.chosenGenres.splice(state.chosenGenres.indexOf(genre), 1)
      } else {
        state.chosenGenres.push(genre)
      }
    }
  },
  // method
  actions: {
    login(context, token) {
      context.commit('setToken', token)
    },
    logout(context) {
      context.commit('setToken', null)
    },
    cancelClick(context, loginState) {
      context.commit('setLoginState', loginState)
    },
    loginClick(context, loginState) {
      context.commit('setLoginState', loginState)
    },
    signupClick(context, loginState) {
      context.commit('setLoginState', loginState)
    },
    searchMovie(context, results) {
      context.commit('setSearchMovieResuts', results)
    },
    goMovieDetail(context, movie) {
      context.commit('setMovieDetail', movie)
    },
    setUser(context, userInfo) {
      context.commit('setUser', userInfo)
    },
    searchUsers(context, searchUsersInfo) {
      context.commit('setFindUsers', searchUsersInfo)
    },
    chosenGenreNull(context, genre) {
      context.commit('chosenGenreNull', genre)
    },
    setChosenGenres(context, genres) {
      context.commit('setChosenGenres', genres)
    }
  },
})
