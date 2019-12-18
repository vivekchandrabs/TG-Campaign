import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./stores"
import moment from 'moment'

import VueAuthenticate from 'vue-authenticate'
// import VueSocialauth from 'vue-social-auth'
import VueResource from 'vue-resource'
import VueAxios from 'vue-axios'
import axios from 'axios';

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY: hh:mm')
  }
});

var FRONTEND_SITE_PREFIX = "https://tg-campaign.herokuapp.com"
var BACKEND_SITE_PREFIX = "https://tg-camp.herokuapp.com"

// var FRONTEND_SITE_PREFIX = "http://localhost:8081"
// var BACKEND_SITE_PREFIX = "http://localhost:8000"


Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  tokenPath: 'token',
  baseUrl: `${BACKEND_SITE_PREFIX}`,
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: `${FRONTEND_SITE_PREFIX}/`,
      url: `${BACKEND_SITE_PREFIX}/api/login/social/token/google-oauth2/`
    },
    github: {
      clientId: process.env.VUE_APP_GITHUB,
      redirectUri: `${FRONTEND_SITE_PREFIX}`,
      url: `${BACKEND_SITE_PREFIX}/api/login/social/token/github/`
    }
  }
});

new Vue({

  store,
  router,
  render: h => h(App),
}).$mount('#app')


