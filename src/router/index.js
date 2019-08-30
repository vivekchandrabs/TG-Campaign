import Vue from 'vue'
import Router from 'vue-router'
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import DashBoard from "../components/DashBoard.vue"
import Series from "../components/Series.vue"
import EditSeries from "../components/EditSeries.vue"
import Logout from "../components/Logout.vue"

Vue.use(Router)

export default new Router({
    mode:"history",
    routes: [
    {
        path: '/',
        name: 'Signin',
        component: SignIn
      },
      {
        path: '/signup/',
        name: 'Signup',
        component: SignUp
      },
      {
        path: "/dashboard/",
        name: 'DashBoard',
        component: DashBoard
      },
      {
        path: "/create-series/",
        name: 'Create-Series',
        component: Series
      },
      {
        path: "/series/:series_id",
        name: 'Series',
        component: EditSeries
      },
      {
        path: "/logout/",
        name: "Logout",
        component: Logout
      }
    ]
})