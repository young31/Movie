import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  // 상태 (data)
  state: {
    token: null,
    loginState: 0,
    searchMovieResults: null,
    user: null,
    findUsers: null,
    chosenGenres: [],
    nowMovie: null,
    nowUser: null
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
      return state.searchMovieResults ? true : false
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
    setSearchMovieResults(state, results) {
      state.searchMovieResults = results
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
    },
    setNowUser(state, user) {
      state.nowUser = user
    },
    setNowMovie(state, movie) {
      state.nowMovie = movie
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
      context.commit('setSearchMovieResults', results)
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
    },
    setNowUser(context, user) {
      context.commit('setNowUser', user)
    },
    setNowMovie(context, movie) {
      context.commit('setNowMovie', movie)
    }
  },
})
