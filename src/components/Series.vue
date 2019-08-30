<template>
    <div>
        <NavBar />
        <div class="container">
            <br><br>
          <div class="row">
           <div class="col-md-2"></div>            
            <div class="col-md-8">
            <div class="series_info">
                <h3><b>Create New Series</b> </h3>
                <br>
                <br>
                <div class="row">
                    <div class="col-md-4">
                        <h6 >Title:</h6>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="title" placeholder="Enter series title">
                    </div>
                </div>
                <br>

                 <div class="row">
                    <div class="col-md-4">
                        <h6 >Group ID:</h6>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="group_id" placeholder="Enter Group ID">
                    </div>
                </div>              
                <br>

                <div class="row">
                    <div class="col-md-4">
                        <h6 >API Key:</h6>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="api_key" placeholder="Enter Bot api key">
                    </div>
                </div>              
                <br>

                <div class="row">
                    <div class="col-md-4">
                        <h6 >Period:</h6>
                    </div>
                    <div class="col-md-8">
                        <button class="btn btn-outline-dark custom-button" data-target="#createPeriod" data-toggle="modal" style="width:100%"><i class="far fa-calendar-alt"></i> Select Your Period</button>
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
            </div>
            <br>
            <div style="float:left">
                <button class="btn btn-secondary custom-button" data-target="#createNewPost" data-toggle="modal"><i class="fas fa-plus-circle"></i>  Add Posts</button>
                </div>
            <div style="float:right">
                <button v-on:click="createNewSeries" class="btn btn-success custom-button" ><i class="fas fa-bullhorn"></i> Publish</button>
            </div>
            <br>
            <br>

            <div class="card post-card" v-for="post in posts" :key="post.post_id">
                <div class="card-body" >
                    <img src="../images/edit.png" alt="edit" class="post_edit_icon" v-on:click="editpost(post.post_id)" data-target="#createNewPost" data-toggle="modal"/>
                    <h4  class="posttitle">{{post.title}}</h4>
                    <hr>
                    <br>
                    <div class="postcontent" v-html="post.content"></div>                            
                    <img src="../images/delete.png" alt="edit" class="post_delete_icon" v-on:click="deletepost(post.post_id)" />
                </div>
             </div>
            </div>
            <div class="col-md-2"></div>
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
                        <option value="daily">Daliy</option>
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
                    <button type="button" class="btn btn-sm btn-success" v-on:click="createPeriod" data-dismiss="modal">Add Period</button>
                </div>
                </div>
            </div>
         </div>

         <!-- interval modal -->
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
                        <option value="days">Days</option>
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
                    <button type="button" class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="createInterval">Add Period</button>
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
                    <label>Post Content:</label>
                    <vue-simplemde  v-model="newPost.content" ref="markdownEditor" required />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-success"  v-on:click="createNewPost(newPost.post_id)" data-dismiss="modal"
                    >Add Post</button>
                </div>
                </div>
            </div>
         </div>

    </div>
</template>

<script>
import VueSimplemde from "vue-simplemde";
import NavBar from "./NavBar.vue";
export default {
  name: "Series",
  components: {
    VueSimplemde,
    NavBar
  },
  data() {
    return {
      title: "",
      periodic_schedule_period: "daily",
      to_display: "None",

      every: "1",
      period: "days",

      group_id: "",
      api_key: "",

      post_id: 1,

      interval: {},
      periodic_schedule: {},

      newPost: {
        post_id: "",
        title: "",
        content: ""
      },
      posts: []
    };
  },
  methods: {
    recordPeriodicSchedule: function(event) {
      this.periodic_schedule_period = event.target.value;
    },
    recordInterval: function(event) {
      this.period = event.target.value;
      console.log(this.period);
    },
    createInterval: function() {
      this.periodic_schedule = {};
      this.interval = {
        every: this.every,
        period: this.period
      };
      this.to_display = "Every " + this.every + " " + this.period;
    },
    createPeriod: function() {
      this.interval = {};
      this.periodic_schedule = this.periodic_schedule_period;
      this.to_display = this.periodic_schedule_period;
    },
    createNewPost: function(post_id) {
      if (post_id) {
        var posts = this.posts;
        var filtered_post = posts.filter(posts => posts.post_id == post_id);
        var item_index = posts.indexOf(filtered_post[0]);

        filtered_post[0].title = this.newPost.title;
        filtered_post[0].content = this.newPost.content;

        this.posts[item_index] = filtered_post[0];
      } else {
        this.posts.push({
          post_id: this.post_id,
          title: this.newPost.title,
          content: this.newPost.content
        });
        this.post_id = this.post_id + 1;
      }

      this.newPost.post_id = "";
      this.newPost.title = "";
      this.newPost.content = "";
    },
    editpost: function(post_id) {
      var posts = this.posts;
      var filtered_post = posts.filter(posts => posts.post_id == post_id);
      console.log(filtered_post[0].title);
      this.newPost.post_id = post_id;
      this.newPost.title = filtered_post[0].title;
      this.newPost.content = filtered_post[0].content;
    },
    deletepost(post_id) {
      var posts = this.posts;
      var filtered_post = posts.filter(posts => posts.post_id == post_id);
      var item_index = posts.indexOf(filtered_post[0]);
      this.posts.splice(item_index, 1);
      this.post_id = this.post_id - 1;
    },
    createNewSeries() {
      var json_data = {};
      json_data["title"] = this.title;
      json_data["posts"] = this.posts;
      json_data["interval"] = this.interval;
      json_data["periodic_schedule"] = this.periodic_schedule;
      json_data["group_id"] = this.group_id;
      json_data["api_key"] = this.api_key;
      console.log(json_data);

      this.$store
        .dispatch("createNewSeries", json_data)
        .then(res => console.log(res.data));
      this.$router.push({
        path: "/dashboard/"
      });
    }
  },

  created() {
    if (!localStorage["token"]) {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style >
@import "../../node_modules/simplemde/dist/simplemde.min.css";
.series_info {
  border: 1px solid #eee;
  box-shadow: 2px 2px 10px #ddd;
  border-radius: 5px;
  padding: 50px;
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

.postcontent {
  padding-left: 10px;
  font-weight: 450;
  text-align: justify;
  padding-right: 40px;
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
  padding: 20px;
  border-radius: 5px;
}
</style>