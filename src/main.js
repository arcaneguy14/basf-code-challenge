import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {wsutil} from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

Vue.config.productionTip = false

new Vue({
  router,
  store: wsutil,
  vuetify,
  render: h => h(App)
}).$mount('#app')