<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" >
            <div class="container">
                <a class="navbar-brand" v-on:click="dashboard">
                    <img src="https://speckbitx4-web.s3.ap-south-1.amazonaws.com/static/vue/img/logo.971e9f54.svg" >
                </a>
                <ul class="navbar-nav mr-auto"></ul>               
                        <router-link class="nav-item nav-link" :to="{name: 'Signup'}" v-if="!is_authenticated">Signup</router-link>
                        <router-link class="nav-item nav-link" :to="{name: 'Signin'}" v-if="!is_authenticated">Login</router-link>
                        <router-link class="nav-item nav-link" :to="{name: 'DashBoard'}" v-if="is_authenticated">Dashboard</router-link>
                        <router-link class="nav-item nav-link" :to="{name: 'Create-Series'}" v-if="is_authenticated">Create Series</router-link>
                       <router-link class="nav-item nav-link" :to="{name: 'Logout'}" v-if="is_authenticated">Logout</router-link>

            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: "NaveBar",

  data() {
    return {
      is_authenticated: false
    };
  },
  methods: {
    logout: function() {
      (this.is_authenticated = false), localStorage.removeItem("token");
      window.location.href("/");
    },
    createSeries: function() {
      this.$router.push({
        path: "/create-series/"
      });
    },
    dashboard: function() {
      this.$router.push({
        path: "/dashboard/"
      });
    },
    login: function() {
      this.$router.push({
        path: "/"
      });
    },
    signup: function() {
      this.$router.push({
        path: "/signup/"
      });
    }
  },
  created() {
    if (localStorage["token"]) {
      this.is_authenticated = true;
    } else {
      this.is_authenticated = false;
    }
  }
};
</script>

<style scoped>
nav {
  border-top: 5px solid #fa5146;
  box-shadow: 10px 0 2px #ddd;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
}
</style>