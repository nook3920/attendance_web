import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import ImageUploader from 'vue-image-upload-resize'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ImageUploader)
Vue.use(ElementUI, { locale })
import 'vuetify/dist/vuetify.min.css'
import HTTP from './api/http-common'
import router from './router'
import store from './store'
const configV = {
  fieldsBagName: 'fieldss'
}
Vue.use(VeeValidate, configV)
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