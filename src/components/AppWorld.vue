
<template>
  <section class="hero is-primary">
    <!-- Hero head: will stick at the top -->
    <hero-head></hero-head>

    <!-- Hero content: will be in the middle -->
    <hero-body>
      <dependency-input :pyodide-worker="pyodideWorker"></dependency-input>
    </hero-body>
  </section>
</template>

<script>
import Vue from "vue";
import DependencyInput from "./DependencyInput.vue";
import HeroHead from "./HeroHead.vue";
import HeroBody from "./HeroBody.vue";

export default Vue.component("app-world", {
  mounted() {},
  data: function() {
    return {};
  },
  components: {
    DependencyInput,
    HeroHead,
    HeroBody
  },
  props: ["pyodideWorker"]
});
</script>

<style scoped>
</style>