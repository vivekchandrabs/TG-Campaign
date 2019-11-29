<template>
    <div>
        <button class="btn btn-outline-warning custom-button" data-toggle="modal" data-target=".bd-modal-lg">See All Messages</button>

        <div class="modal fade bd-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">All Custom Messenger</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                 <div class="modal-body">
                     <div v-if="AllMessages.length==0">
                        <h6 style="text-align:center">You Have Not Sent Any Custom Messages</h6>
                     </div>
                     <div class="allMessages" v-for="message in AllMessages" :key="message.id">
                        <h5 class="allMessageTitle">{{message.title}}</h5>           
                        <label class="allMessageTime">{{message.sent_time| formatDate}}</label>           
                         <hr>
                         <h6 class="allMessageContent" v-html="message.content"></h6>
                     </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../stores"
import { mapActions, mapGetters } from "vuex";
export default {
    name: "AllCustomMessages",
    computed: mapGetters(["AllMessages"]),
    created(){
        var series_id = this.$route.params.series_id;
        this.$store.dispatch("fetchAllMessages", series_id)
        .then(res => {
            this.$store.commit("commitAllMessages", res)
        })
    }
};
</script>

<style scoped>
.custom-button:hover {
  color: #ffffff;
}

.custom-button {
  padding-left: 61px;
  padding-right: 61px;
  color: #f0932b;
  font-weight: 800;
  font-size: 13px;
}

.allMessages{
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    margin-bottom:  10px;
}

.allMessageTitle{
    color: #5c5c5c;
    font-weight: 900;
    padding-left: 10px;
    display: inline;
    
}

.allMessageTime{
    display: inline;
    float: right;
    color: gray;
    font-size: 16px;
}
.allMessageContent{
    text-align: justify;
    padding-left: 10px
}



</style>
