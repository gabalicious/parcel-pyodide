import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {},
  mutations: {
    initialiseSelection(state) {
      // initialise local storage selection if not present
      if (!localStorage.getItem("currentSelection")) {
        setLocalStorage("currentSelection", 0);
      }
    },
    //  This method is called when a user adds or removes text from the resume.
    updateLocalYaml(state) {
      // state.count++;
      // pseudocode\
      // 1b. Update Yaml file for changed data
    },
  },
  actions: {
    message({ context, state }, payload) {
      console.log(payload);
      // pyodideWorker.postMessage(this.pyData);
    },
  },
});
