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
      console.log(this.$store);
      this.$store.dispatch("login_user", this.signin_json_data).then(res => {
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
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
</style>

