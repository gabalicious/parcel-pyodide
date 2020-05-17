<template>
  <section>
    <section>
      <b-collapse
        v-on:close="collapse=true"
        v-on:open="collapse=false"
        class="test"
        aria-id="contentIdForA11y1"
      >
        <div :style="{'display': 'none'}" class="box" slot="trigger" slot-scope="props">
          <button id="yolo" size="is-small" class="button is-dark" v-on:click="console.log(Object)">
            <i v-bind:class="props.open ? 'fa-chevron-down' : 'fa-chevron-right'" class="fas"></i>
            <span class="is-white">Block</span>
          </button>
        </div>
        <div class="notification notification-grey">
          <button @click="onPyodideLoad()" size="is-small" class="button is-dark">
            <span>
              <span class="is-white">Run Code</span>
              <b-icon
                v-show="pyodideLoading"
                size="is-small"
                pack="fas"
                icon="sync-alt"
                custom-class="fa-spin"
              ></b-icon>
              <b-icon v-show="!pyodideLoading" size="is-small" pack="far" icon="play-circle"></b-icon>
            </span>
          </button>

          <button
            :style="{'display': 'none'}"
            v-on:click="document.getElementById('yolo').click()"
            size="is-small"
            class="button is-dark"
          >
            <span class="is-white">Close</span>
          </button>
          <div class="content">
            <b-field spellcheck="false" label="Data" label-position>
              <b-input
                maxlength="200"
                type="textarea"
                v-bind:value="this.arguments"
                @blur="onUpdateArguments($event.target.value)"
              ></b-input>
            </b-field>
            <b-field label="Enter your Dependencies">
              <b-taginput
                v-model="pyData.dependencies"
                :data="filteredTags"
                autocomplete
                :allow-new="true"
                :open-on-focus="openOnFocus"
                field="dependency.name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags"
              ></b-taginput>
            </b-field>
            <b-field
              spellcheck="false"
              custom-class="label-test"
              label="Python Code"
              label-position
            >
              <b-input type="textarea" @blur="console.log(pyData.python)" v-model="pyData.python"></b-input>
            </b-field>
            <b-field label="Results">
              <b-input
                v-if="pyData.results"
                v-model="pyData.results"
                type="textarea"
                custom-class="results"
                disabled
              ></b-input>
            </b-field>
          </div>
        </div>
      </b-collapse>
      <b-field v-show="collapse">
        <div class="box">
          <button size="is-small" class="button is-dark">
            <i class="fas fa-caret-right"></i>
          </button>
        </div>
      </b-field>
    </section>
  </section>
</template>

<script>
const data = [
  {
    id: 1,
    dependency: { name: "numpy" }
  },
  {
    id: 2,
    dependency: { name: "pytz" }
  }
];

import Vue from "vue";

export default Vue.component("dependency-input", {
  props: ["pyodideWorker"],
  computed: {
    // data passed from js to python parced for view
    arguments: function() {
      let Argument = { ...this.pyData };
      delete Argument.python;
      delete Argument.dependencies;
      delete Argument.results;
      return JSON.stringify(Argument) || {};
    }
  },
  created: function() {
    // `this` points to the vm instance
    this.pyodideWorker.onmessage = e => {
      const { results, error } = e.data;
      if (results) {
        console.log("pyodideWorker return results: ", results);
        setTimeout(() => {
          this.pyodideLoading = false;
          this.pyData.results = results;
          this.$buefy.toast.open({
            message: "Code Finished Loading.",
            position: "is-bottom",
            type: "is-dark",
            "$toast-box-shadow":
              "0 1px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)"
          });
        }, 100);
      } else if (error) {
        console.log("pyodideWorker error: ", error);
      }
    };
  },
  data() {
    return {
      console,
      document,
      pyodideLoading: false,

      filteredTags: data,
      isSelectOnly: false,
      tags: [],
      openOnFocus: false,
      collapse: false,
      pyData: {
        A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
        python: `import statistics
from js import A_rank
statistics.stdev(A_rank)`,
        dependencies: ["numpy", "pytz"],
        results: null
      }
    };
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = data.filter(option => {
        return (
          option.dependency.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    onUpdateArguments(item) {
      this.pyData = { ...this.pyData, ...JSON.parse(item) };
      console.log("this.pyData", this.pyData);
    },
    onPyodideLoad() {
      this.pyodideLoading = true;
      this.pyodideWorker.postMessage(this.pyData);
    }
  }
});
</script>
<style scoped>
.icon.is-small {
  margin-left: 3px;
  margin-right: 7px;
}
.notification-grey {
  background: lightslategray;
}
.far.fa-play-circle {
  padding-left: 5px;
}
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
strong {
  font-weight: 900;
  font-family: auto;
}
</style>
