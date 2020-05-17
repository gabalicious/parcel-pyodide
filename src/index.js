import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store";
import router from "./router";

Vue.use(Vuex);
Vue.use(Buefy, { defaultIconPack: "fas", defaultContainerElement: "#content" });
new Vue({
  el: "#app",
  store,
  beforeCreate() {},
  render: (h) => h(App),
  router,
});

global.self.addEventListener("load", function() {
  intialLoad();
});
function intialLoad() {
  console.log("init ran");
}
