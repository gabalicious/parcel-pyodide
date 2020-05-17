<template>
  <div class="hero-head">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <h3 class="is-size-3">
              Py
              <i class="fab fa-python python-color"></i>
              Notebook
            </h3>
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item is-active">Home</a>
            <a @click="onComingSoon()" class="navbar-item">Notebook</a>
            <a @click="onComingSoon()" class="navbar-item">Docs</a>
            <span class="navbar-item">
              <a @click="onComingSoon()" class="button is-primary is-inverted">
                <span class="icon">
                  <i class="fas fa-sign-in-alt"></i>
                </span>
                <span>Log In</span>
              </a>
            </span>
            <span class="navbar-item">
              <a @click="onComingSoon()" class="button is-primary is-inverted">
                <span class="icon">
                  <i class="fas fa-star-of-life"></i>
                </span>
                <span>Sign Up</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("hero-head", {
  methods: {
    onComingSoon() {
      this.$buefy.snackbar.open({
        duration: 2000,
        message: "Coming soon!",
        type: "is-secondary",
        position: "is-top-left",
        queue: true
      });
    }
  }
});
</script>
<style scoped>
.python-color {
  --text-color: #82c91e;
  color: var(--text-color);
}
</style>
