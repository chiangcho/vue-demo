import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  mounted() {
    import(/* webpackChunkName: "lodash" */ "lodash");
  },
}).$mount("#app");
