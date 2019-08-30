<template>
    <div>
        <NavBar />
        <div class="container">
          <br><br><br><br><br>
          <div class="row">
            <div class="col-md-3">
            </div>

            <div class="col-md-6">
              <form v-on:submit="signup_user">
              <h1 style="text-align:center; font-weight:bold">SignUp</h1>
              <br>
              <label>Email</label>
              <input type="text" class="form-control form-field" v-model="signup_json_data.username" placeholder="Enter your email address" required>
              <br>
              <label>Username</label>
              <input type="text" class="form-control form-field" v-model="signup_json_data.email" placeholder="Enter your username" required>
              <br>
              <label>Password</label>
              <input type="password" class="form-control form-field" v-model="signup_json_data.password" placeholder="Enter your password" required>
              <br>
              <button type="button" v-on:click="signup_user" class="btn btn-outline-warning" style="width:100%">SignUp</button>
              </form>
            </div>

            <div class="col-md-3">
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import store from "../stores";
export default {
  name: "SignUp",
  components: {
    NavBar
  },
  data() {
    return {
      signup_json_data: {
        username: "",
        password: "",
        email: ""
      }
    };
  },
  methods: {
    signup_user: function() {
      this.$store.dispatch("signup_user", this.signup_json_data).then(res => {
        localStorage.setItem("token", res.token),
          this.$router.push({
            path: "/dashboard/"
          });
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
        path: "/signup/"
      });
    }
  }
};
</script>

<style scoped>
</style>