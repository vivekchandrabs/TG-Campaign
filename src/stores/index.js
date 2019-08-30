import Vue from 'vue'
import Vuex from "vuex";
import SpeckbitBot from "./modules/SpeckbitBot"

Vue.use(Vuex);

export default new Vuex.Store({

    modules:{
        SpeckbitBot
    }
  
})