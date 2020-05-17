<template v-slot:one="{ msg }">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">Notebook and more</h1>
      <h2 class="subtitle">Pipe your Python code into javascript and visuals</h2>
      <div class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-one-third">
            <slot></slot>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("hero-body", {});
</script>
<style scoped>
label.label {
  text-align: left;
  /* color: white; */
}
section {
  text-align: left;
}
.box {
  background: black;
  padding: 1px;
}
.label-test {
  color: black;
  display: none;
}
</style>
