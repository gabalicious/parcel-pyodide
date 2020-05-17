<template>
  <app-world :pyodide-worker="pyodideWorker"></app-world>
</template>

<script>
import Vue from "vue";
import pyodideWorker from "../pyodideWorker.js";
import AppWorld from "../components/AppWorld.vue";

export default Vue.extend({
  components: {
    child: {
      AppWorld
    }
  },
  data: function() {
    return {
      pyodideWorker
    };
  }
});
</script>

<style scoped>
</style>