<template>
<div>
    <NavBar />
    <br><br>
    <div class="container">
        <div class="row">
                <div class="col-md-8">
                    <div class="series_info">
                        <h3 ><b>Edit Series</b> </h3>
                        <br>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Title:</h6>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="series_title" placeholder="Enter series title">
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Group ID:</h6>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="group_id" placeholder="Enter Group ID">
                            </div>
                        </div>              
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>API Key:</h6>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="api_key" placeholder="Enter Bot api key">
                            </div>
                        </div>              
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Period:</h6>
                            </div>
                            <div class="col-md-8">
                            <button class="btn btn-outline-dark custom-button" data-target="#createPeriod" data-toggle="modal" style="width:100%"> <i class="far fa-calendar-alt"></i> Edit Your Periodicity</button>
                                <br>
                            </div>
                        </div>
                        <br>                        
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Will Repeat:</h6>
                            </div>
                            <div class="col-md-8">
                                <h6 style="font-weight:550; text-transform: capitalize">{{to_display}}</h6>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Status</h6>
                            </div>
                            <div class="col-md-8">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" class="custom-control-input custom-switch" v-on:change="changeStatus" id="customSwitch1" :checked="enabled">
                                    <label class="custom-control-label" v-if="enabled" for="customSwitch1" style="font-weight:bold">Enabled</label>
                                    <label class="custom-control-label" v-if="!enabled" for="customSwitch1" style="font-weight:bold">Disabled</label>
                                </div>
                            </div>
                        </div>
                        <br>
                        <button class="btn btn-success custom-button" style="float:right; display:inline" v-on:click="editSeries">Save</button>
                    </div>
                    <br>
                    <div style="float:left">
                            <button class="btn btn-secondary custom-button" data-target="#createNewPost" data-toggle="modal"> <i class="fas fa-plus-circle"></i>  Add Posts</button>
                    </div>
                    <br><br><br>
                    <div class="card post-card" v-for="post in posts" :key="post.id">
                        <div class="card-body" >
                            <img src="../images/edit.png" alt="edit" class="post_edit_icon" v-on:click="editpost(post.id)" data-target="#createNewPost" data-toggle="modal"/>
                            <i class="fa fa-check" aria-hidden="true" v-if="post.is_sent" style="color:green;font-size:22px"></i>
                            <h6  class="posttitle"><i>{{post.title}}</i></h6>
                            <hr>
                            <br>
                            <h6 class="postcontent" v-html="post.content"></h6>                            
                            <img src="../images/delete.png" alt="edit" class="post_delete_icon" v-on:click="deletepost(post.id)"/>
                        </div>
                    </div>
                    <br><br>
                </div>
            <div class="col-md-4">
              <CustomMessenger v-bind:groupid="group_id" v-bind:apikey="api_key" v-if="loading" style="display:inline"/>
              <br><br>
              <AllMessages v-bind:groupid="group_id" v-bind:apikey="api_key" v-if="loading" style="display:inline" />
            </div>
        </div>        
    </div>   

    <!-- modal -->
    <!-- Create Period -->
        <div class="modal fade" id="createPeriod" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Your Time Schedule</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Period:</label>
                    <select class="form-control" @change="recordPeriodicSchedule($event)">
                        <option value="daily">Daily</option>
                        <option value="wednesday">Every Wednesday</option>
                        <option value="saturdays">Every Weekends</option>
                        <option value="mon_to_fri">Monday To Friday</option>
                    </select>
                    <br>
                    <div style="float:left">
                        <a href="#createInterval" data-toggle="modal" data-dismiss="modal">Configure Custom Schedule</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-success"  v-on:click="EditPeriod" data-dismiss="modal">Add Period</button>
                </div>
                </div>
            </div>
         </div>

          <!--  interval modal -->
         <div class="modal fade" id="createInterval" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Your Time Schedule</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Every:</label>
                    <input type="number" class="form-control" placeholder="Enter the Period" v-model="every">
                    <br>
                    <label>Period:</label>
                    <select class="form-control" @change="recordInterval($event)">
                        <option value="days" selected>Days</option>
                        <option value="seconds">Seconds</option>
                        <option value="hours">Hours</option>
                        <option value="minutes">Minutes</option>
                        <option value="microseconds">MicroSeconds</option>
                    </select>
                    <br>
                    <div style="float:left">
                        <a href="#createPeriod" data-toggle="modal" data-dismiss="modal">Configure Periodic Schedule</a>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="editInterval">Add Period</button>
                </div>
                </div>
            </div>
         </div>

          <!-- new Posts -->
         <div class="modal fade" id="createNewPost" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create Your New Post</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Title:</label>
                    <input type="text" class="form-control" placeholder="Enter title of the Post" v-model="newPost.title" required>
                    <br>
                    <label>Post Content</label>
                    <vue-editor placeholder="Enter Content here....." v-model="newPost.content" :editorToolbar="customToolbar"></vue-editor>
                </div>
                <div class="modal-footer" >
                    <button type="button" class="btn btn-sm btn-success"  v-on:click="createNewPost(newPost.post_id)" data-dismiss="modal" aria-label="Close"
                    >Add Post</button>
                </div>
                </div>
            </div>
            
         </div> 

</div>
    
</template>

<script>
import { VueEditor } from "vue2-editor";
import NavBar from "./NavBar.vue";
import store from "../stores";
import CustomMessenger from "./CustomMessenger.vue";
import AllMessages from "./AllMessages"
export default {
  name: "EditSeries",
  components: {
    NavBar,
    CustomMessenger,
    VueEditor,
    AllMessages
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic"],
        ["code-block"],
        ["link"],
        ["clean"]
      ],
      periodic_schedule_period: "daily",
      to_display: "",

      every: "1",
      period: "days",

      enabled: false,

      series_id: "",

      series_title: "",
      no_of_posts: "",
      is_sent: false,
      to_repeat: "",
      posts: [],
      interval: {},
      periodic_task: {},
      group_id: "",
      api_key: "",

      periodic_schedule: {},
      interval: {},

      newPost: {
        post_id: "",
        title: "",
        content: ""
      },
      loading: false
    };
  },

  methods: {
    recordPeriodicSchedule: function(event) {
      this.periodic_schedule_period = event.target.value;
    },
    recordInterval: function(event) {
      this.period = event.target.value;
    },
    EditPeriod: function() {
      this.interval = {};
      this.periodic_schedule = this.periodic_schedule_period;
      this.to_display = this.periodic_schedule_period;
      this.$store
        .dispatch("editPeriodicSchedule", {
          series_id: this.series_id,
          periodic_schedule: this.periodic_schedule
        })
        .then(res => console.log(res));
    },

    editInterval: function() {
      this.periodic_schedule = {};
      this.interval = {
        every: this.every,
        period: this.period
      };

      this.$store.dispatch("editInterval", {
        series_id: this.series_id,
        interval: this.interval
      });
      this.to_display = "Every " + this.every + " " + this.period;
    },

    createNewPost: function(post_id) {
      if (post_id) {
        var posts = this.posts;
        var filtered_post = posts.filter(posts => posts.id == post_id);
        var item_index = posts.indexOf(filtered_post[0]);

        filtered_post[0].title = this.newPost.title;
        filtered_post[0].content = this.newPost.content;

        this.posts[item_index] = filtered_post[0];

        this.$store.dispatch("editPost", filtered_post[0]);
      } else {
        this.post_id = this.post_id + 1;
        this.$store
          .dispatch("createNewPost", {
            series_id: this.series_id,
            title: this.newPost.title,
            content: this.newPost.content
          })
          .then(res => this.posts.push(res));
      }

      this.newPost.post_id = "";
      this.newPost.title = "";
      this.newPost.content = "";
    },

    editpost: function(post_id) {
      var posts = this.posts;
      var filtered_post = posts.filter(posts => posts.id == post_id);
      this.newPost.post_id = post_id;
      this.newPost.title = filtered_post[0].title;
      this.newPost.content = filtered_post[0].content;
    },
    deletepost: function(post_id) {
      var posts = this.posts;
      var filtered_post = posts.filter(posts => posts.id == post_id);
      var item_index = posts.indexOf(filtered_post[0]);
      this.posts.splice(item_index, 1);
      this.post_id = this.post_id - 1;

      this.$store.dispatch("deletePost", {
        post_id: post_id,
        series_id: this.series_id
      });
    },
    editSeries: function() {
      var series = {};
      series["title"] = this.series_title;
      series["group_id"] = this.group_id;
      series["series_id"] = this.series_id;
      series["api_key"] = this.api_key;

      this.$store.dispatch("editSeries", { series: series });
    },
    changeStatus: function(event) {
      this.enabled = !this.enabled;
      this.$store.dispatch("changeSeriesStatus", {
        periodic_task: this.enabled,
        series_id: this.series_id
      });
    }
  },
  created() {
    if (!localStorage["token"]) {
      this.$router.push({
        path: "/"
      });
    }
    this.series_id = this.$route.params.series_id;
    this.$store.dispatch("fetchSeries", this.series_id).then(res => {
      this.$store.commit("commitSeries", res), (this.series_title = res.title);
      this.no_of_posts = res.no_of_post;
      this.is_sent = res.is_sent;
      this.to_repeat = res.to_repeat;
      this.posts = res.posts;
      this.group_id = res.group_id;
      this.api_key = res.api_key;
      this.to_display = res.to_repeat;
      this.loading = true;
      this.enabled = res.periodic_task.enabled;
    });
  }
};
</script>

<style>
@import "../../node_modules/simplemde/dist/simplemde.min.css";

.series_info {
  border: 1px solid #eee;
  box-shadow: 2px 2px 10px #ddd;
  border-radius: 5px;
  padding: 50px;
}

.postcontent {
  text-align: justify;
}

.postcontent pre{
  background-color: black;
  border-radius: 5px;
  padding: 8px;
  color:chocolate;
}

.posttitle {
  padding-left: 10px;
  color: #5c5c5c;
  font-weight: 900;
  display: inline;
}

.post_is_sent {
  width: 20px;
  display: inline;
  padding-bottom: 10px;
}

.post_edit_icon {
  float: right;
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.post_delete_icon {
  float: right;
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.post-card {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
}

.custom-button:hover {
  color: #ffffff;
}

.custom-button {
  padding-left: 40px;
  padding-right: 40px;
  font-weight: 800;
  font-size: 13px;
}

.custom-switch {
  width: 100px;
  height: 34px;
}
</style>
