import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader)
import 'vuetify/dist/vuetify.min.css'
import HTTP from './api/http-common'
import router from './router'
import store from './store'
Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.prototype.$http = HTTP

let token = localStorage.getItem('token') || ''
if(token){
  HTTP.get('/user/verify')
  .then(res => {
    store.commit('setLogin', {
      accessToken: token,
      auth: true,
      user: res.data
    })
  })
  .catch(err => {
    console.log(err)
  })
}


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})