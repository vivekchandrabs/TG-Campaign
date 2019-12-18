import axios from "axios"
// var SITE_PREFIX = "http://127.0.0.1:8000/bot"
// var LOGIN_SITE_PREFIX = "http://127.0.0.1:8000/api-token-auth/"

var SITE_PREFIX = "https://tg-camp.herokuapp.com/bot"
var LOGIN_SITE_PREFIX = "https://tg-camp.herokuapp.com/api-token-auth/"

const state = {
    AllSeries : [],
    Series: {},
    AllMessages: []
}

const getters = {
    AllSeries: state => state.AllSeries,
    Series: state => state.Series,
    AllMessages: state => state.AllMessages
}

const actions = {
    login_user: (store, signin_json_data) => new Promise((resolve, reject) =>{
        axios.post(LOGIN_SITE_PREFIX, signin_json_data)
        .then(res => resolve(res.data))
        .catch(err => console.log(err))
    }),
     signup_user: (store, signup_json_data) => new Promise((resolve, reject) => {
         axios.post(SITE_PREFIX+"/signup/", signup_json_data)
         .then(res => resolve(res.data))
         .catch(err => console.log(err))
     }),
     getAllSeries: (store) => new Promise((resolve, reject) => {
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
         axios.get(SITE_PREFIX+"/series/", auth)
         .then(res => resolve(res.data))
         .catch(err => reject(err))
     }),

     createNewSeries: (store, json_data) => new Promise((resolve, reject) => {
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
          axios.post(SITE_PREFIX+"/series/", json_data, auth)
         .then(res => resolve(res.data))
         .catch(err => reject(err))
     }),

     fetchSeries: (store, series_id) => new Promise((resolve, reject) => {
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
          axios.get(SITE_PREFIX+"/series/"+series_id+"/", auth)
          .then(res => resolve(res.data))
          .catch(err => reject(err))
     }),

     editPeriodicSchedule: (store, json_data) => new Promise((resolve, reject) => {
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
          axios.patch(SITE_PREFIX+"/series/"+json_data["series_id"]+"/", {
              "periodic_schedule":json_data["periodic_schedule"]
          }, auth)
          .then(res => resolve(res.data))
          .catch(err => reject(err))
     }),

     editInterval: (store, json_data) => new Promise((resolve, reject) =>{
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
          axios.patch(SITE_PREFIX+"/series/"+json_data["series_id"]+"/", {
            "interval":json_data["interval"]
        }, auth)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
     }),

     editPost: (store, json_data) => new Promise((resolve, reject) => {
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
          axios.patch(SITE_PREFIX+"/post/"+json_data["id"]+"/", json_data, auth)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
     }),

     createNewPost: (store, json_data) => new Promise((resolve, reject) => {
        const auth = {
            headers: {
              Authorization: "Token " + window.localStorage["token"]
            }
          };
          axios.post(SITE_PREFIX+"/post/", {
              "post":json_data
          }, auth)
          .then(res => resolve(res.data))
          .catch(err => reject(err))
          // var series = state.AllSeries
          // console.log(series)
          // var filtered_series = series.filter(series => series.id == json_data["series_id"])[0]
          // var item_index = series.indexOf(filtered_series)
          // console.log(item_index)
          // console.log("here")
          // series[item_index].no_of_post += 1
          // console.log(series[item_index])
     }),

     editSeries: (store, json_data) => new Promise((resolve, reject) => {
        axios.defaults.headers.common["Authorization"] = "Token " + window.localStorage["token"]
        console.log(json_data)
        axios.patch(SITE_PREFIX+`/series/${json_data["series"]["series_id"]}/`, json_data)}),


     deletePost: (store, json_data) => new Promise((resolve, reject) => {
          axios.defaults.headers.common["Authorization"] = "Token " + window.localStorage["token"]
          axios.delete(SITE_PREFIX+`/post/${json_data["post_id"]}/?series_id=${json_data["series_id"]}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
            // var series = state.AllSeries
            // console.log(series)
            // var filtered_series = series.filter(series => series.id == json_data["series_id"])[0]
            // var item_index = series.indexOf(filtered_series)
            // console.log(item_index)
            // series[item_index].no_of_post -= 1
            // console.log(series[item_index])
     }),
     
     sendMessage: (store, json_data) => new Promise((resolve, reject) => {
        axios.defaults.headers.common["Authorization"] = "Token " + window.localStorage["token"]
        console.log(json_data)
        axios.post(SITE_PREFIX+"/custom-message/", json_data)
        .then(res => console.log("sent"))
    }),

    changeSeriesStatus :(store, json_data) => new Promise((resolve, reject) => {
        axios.defaults.headers.common["Authorization"] = "Token " + window.localStorage["token"]
        axios.patch(SITE_PREFIX+`/series/${json_data["series_id"]}/`, json_data)
        .then(res => console.log("sent"))
    }),

    fetchAllMessages: (store, series_id) => new Promise((resolve, reject) => {
      axios.defaults.headers.common["Authorization"] = "Token " + window.localStorage["token"]
      axios.get(SITE_PREFIX+`/custom-message/?series_id=${series_id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })
    
}

const mutations = {
    commitAllSeries : (state, all_series_data) => (state.AllSeries = all_series_data),
    commitSeries: (state, series) => (state.Series = series),
    commitAllMessages: (state, allMessages) => (state.AllMessages = allMessages)
}

export default {
    state,
    getters,
    actions,
    mutations
};