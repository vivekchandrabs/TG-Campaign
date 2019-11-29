<template>
    <div>
        <button class="btn btn-outline-warning custom-button" data-target="#customMessageModal" data-toggle="modal" >Send Custom Messages</button>

        <div class="modal fade " tabindex="-1" role="dialog" id="customMessageModal">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Custom Messenger</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <label>Title</label>
                    <input type="text" v-model="message.title" class="form-control">
                    <br>
                    <label>Content</label>
                    <vue-editor  v-model="message.content" ref="markdownEditor" :editorToolbar="customToolbar"></vue-editor >
                </div>
                <div class="modal-footer">
                      <button type="button" class="btn btn-sm btn-success" data-dismiss="modal" v-on:click="sendmessage"><i class="fas fa-arrow-right"></i> Send Message</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "CustomMessenger",
  props: ["groupid", "apikey"],
  components: {
    VueEditor
  },
  data() {
    return {
      customToolbar: [["bold", "italic"], ["code-block"], ["link"], ["clean"]],
      message: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    sendmessage: function() {
      var series_id = this.$route.params.series_id;
      this.$store.dispatch("sendMessage", {
        title: this.message.title,
        content: this.message.content,
        chat_id: this.groupid,
        api_key: this.apikey,
        series_id: series_id
      });
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/simplemde/dist/simplemde.min.css";

.custom-button:hover {
  color: #ffffff;
}

.custom-button {
  padding-left: 40px;
  padding-right: 40px;
  color: #f0932b;
  font-weight: 800;
  font-size: 13px;
}
</style>

