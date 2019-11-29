import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./stores"
import moment from 'moment'

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY: hh:mm')
  }
});


new Vue({

  store,
  router,
  render: h => h(App),
}).$mount('#app')
