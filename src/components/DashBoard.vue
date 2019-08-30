<template>
    <div>
        <NavBar />    
        <br><br>
        <div class="container">
          <h6>All Series</h6>
                <hr>
                <div class="jumbotron jumbotron-fluid" style="text-align:center; background-color:#f4f4f4; border-radius:10px" v-if="AllSeries.length==0" v-on:click="createSeries">
                  <div class="container">
                    <h4 style="font-weight:560">You Have No Series Yet..  Start By Creating One</h4>
                    <br>
                    <button class="btn btn-dark">Create Series</button>
                  </div>
                </div>
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                <div class="flex-container">
                    
                    <a  class="card series" style="width: 27rem; margin-left:8px; margin-bottom:8px" v-for="series in AllSeries"
                     v-on:click="goToSeries(series.id)" :key=series.id>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-10">
                                    <h4 class="card-title"><b>{{series.title}}</b></h4>
                                </div>
                                <div class="col-md-2">
                                  <h6 v-if="series.is_sent" title="Series sending complete" ><i class='far fa-calendar-check'></i></h6>
                                  <h6 v-if="!series.is_sent" title="Sending in progress"><i class='fas fa-paper-plane'></i></h6>
                                </div>
                            </div>
                            <h6 class="card-subtitle mb-2 text-muted">{{series.no_of_post}} Posts </h6>
                            <p class="card-text">Will Repeat: <b>{{series.to_repeat}}</b></p>
                        </div>
                    </a>
                    <br>
                </div>
                </div>
                <div class="col-md-1"></div>
            </div>
            
        </div>
        <br><br><br>
    </div>
</template>

<script>
import NavBar from "./NavBar";
import store from "../stores";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DashBoard",
  computed: mapGetters(["AllSeries"]),
  components: {
    NavBar
  },
  methods: {
    goToSeries: function(series_id) {
      this.$router.push({
        name: "Series",
        params: { series_id: series_id }
      });
    },
    createSeries: function() {
      this.$router.push({
        path: "/create-series/"
      });
    }
  },
  created() {
    if (!localStorage["token"]) {
      this.$router.push({
        path: "/"
      });
    }

    this.$store.dispatch("getAllSeries").then(res => {
      this.$store.commit("commitAllSeries", res);
    });
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}
.series:hover {
  border-color: coral;
  box-shadow: 5px 4px 10px #ddd;
  cursor: pointer;
}
.series {
  color: black;
  text-decoration: none;
}
</style>
