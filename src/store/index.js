import Vue from 'vue'
import Vuex from 'vuex'
import http from '../api/http-common'
import router from '../router';
import EventBus from '../eventBus'
// import actions from './actions'
// import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isAuth: false,
  user: {
    _id: null,
    user_id: null,
    name: null,
    email: null,
    role: '',
    gender: null
  },
  accessToken: null
}

const mutations = {
  setLogin(state, payload) {
    
    state.isAuth = payload.auth
    state.user = payload.user
    state.user.name = payload.name
    state.accessToken = payload.accessToken
    // console.log('user::::', state.user)
  },
  setLogout(state) {
    state.isAuth = false
    state.user._id = ''
    state.user.user_id = ''
    state.user.name = ''
    state.user.gender = ''
    state.user.role = ''
    localStorage.removeItem('token')
    router.push({path: '/login'})
  }
}

const actions = {
  noti(context, payload) {
    EventBus.$emit('NOTI', payload)
  },
  signUp({ commit, dispatch }, payload) {
    http.post('/user',{...payload})
    .then(res => {
      dispatch('noti', {
        message: 'signup success',
        color: 'success'
      })
      router.push('/login')
    })
    .catch(err => {
      dispatch('noti', {
        message: err.response.data.message,
        color: 'error'
      })
      console.log(err.response.data.message)
    })
  },
  signIn({commit, dispatch}, payload) {
    http.post('/user/login', {...payload})
    .then(res => {
      console.log(res.data)
      const user = JSON.parse(atob(res.data.accessToken.split('.')[1]))
      localStorage.setItem('token', res.data.accessToken)
      commit('setLogin', {
        accessToken: res.data.accessToken,
        auth: res.data.auth,
        user,
        name: res.data.name
      })
      dispatch('noti', {
        message: `Welcome ${user.name}`,
        color: 'info'
      })
      router.push({path: '/'})
      console.log(res)
    })
    .catch(err => {
      dispatch('noti', {
        message: `Wrong UserId or Password`,
        color: 'error'
      })
      console.log(err)
    })
  },
  logOut({commit, dispatch}){
    if(localStorage.getItem('token')){
      dispatch('noti', {
        message: `Bye ${state.user.name}`,
        color: 'info'
      })
      commit('setLogout')
    }
  }
  
}


const getters =  {
  getAuth: state => state.isAuth,
  getName: state => state.user.name,
  getUser: state => state.user,
  getRole: state => state.user.role
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})