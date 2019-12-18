<template>
    <div>
        <NavBar />
        <div class="container">
          <br><br><br><br><br><br>
          <div class="row">
            <div class="col-md-3">
            </div>

            <div class="col-md-6">
              <form v-on:submit="login_user">
              <h1 style="text-align:center; font-weight:bold">Login</h1>
              <br>
              <label>Email</label>
              <input type="email" class="form-control form-field" v-model="signin_json_data.username" placeholder="Enter your email address" required>
              <br>
              <label>Password</label>
              <input type="password" class="form-control form-field" v-model="signin_json_data.password" placeholder="Enter your password" required>
              <br>
              <button type="button" v-on:click="login_user" class="btn btn-outline-warning" style="width:100%">Login</button>
              </form>
              <br>
              <div style="text-align:center; margin-bottom:0px">
                <span>or</span>
              </div>
              <hr>
              <div style="text-align:center">
                <img src="https://img.icons8.com/ios-filled/50/000000/github.png" 
                        @click="authenticate('github')" style="width: 30px; cursor: pointer"> 
              </div>
            </div>
            
            <div class="col-md-3">
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import VueAxios from "vue-axios";
import axios from "axios";
import NavBar from "./NavBar.vue";
import store from "../stores";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      signin_json_data: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login_user: function() {
      this.$store.dispatch("login_user", this.signin_json_data).then(res => {
        localStorage.setItem("token", res.token),
          this.$router.push({
            path: "/dashboard/"
          });
      });
    },

    authenticate: function(provider) {
      this.$auth
        .authenticate(provider)
        .then(res => {
          localStorage.setItem("token", res.data.token),
            this.$router.push({
              path: "/dashboard/"
            });
        })

        .catch(err => {
          console.log("error");
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage["token"]) {
      this.$router.push({
        path: "/dashboard/"
      });
    } else {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.social-divider {
  width: 80%;
  text-align: center;
  border-bottom: 1px solid #979faf;
  line-height: 0.1em;
  margin: -20px 0 20px;
  margin-left: 10%;
}
</style>

// .then(function(response) {
//           console.log(response.data)
//           window.localStorage.setItem("token", response.data),
//            this.$router.push({
//             path: "/dashboard/"
//           });
//         })