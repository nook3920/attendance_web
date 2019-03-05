import http from '../api/http-common'
import router from '../router/'
const actions = {
  signIn({commit}, payload) {
    const cred = {
      user_id: payload.user_id,
      password: payload.password
    }
    http.post(`http://${location.hostname}:3000/api/auth/signin`, cred)
    .then(res => {
      
      const user = JSON.parse(atob(res.data.accessToken.split('.')[1]))
      commit('SET_LOGIN', {
        accessToken: res.data.accessToken,
        auth: res.data.auth,
        user
      })
      localStorage.setItem('token', res.data.accessToken)
      router.push({path: '/'})
      console.log(res)
      
    })
    .catch(err => {
      console.log(err)
    })
  },
  logOut({commit}){
    localStorage.removeItem('token')
    commit('SET_LOGOUT')
  },
  signUp({commit}, payload) {
    const signUpInfo ={
      user_id: payload.user_id,
      email: payload.email,
      name: payload.name,
      password: payload.password,
      role: payload.role
    }
    http.post(`http://${location.hostname}:3000/api/auth/signup`, signUpInfo)
    .then(res => {
      router.push({path: '/login'})
    })
    .catch(err => {
      console.log(err)
    })
  }
}
export default actions