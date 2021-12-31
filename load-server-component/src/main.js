import Vue from "vue/dist/vue.esm.js";
import "./mock.js";
import App from "./App.vue";

async function lazyLoadComponent(componentName) {
  const allComps = await import(/* webpackChunkName: "xcom-components" */ "xcom-components");
  return allComps[componentName];
}
  
const HelloWorld = () => lazyLoadComponent("HelloWorld");

Vue.config.productionTip = false;
// Vue.use(xcom)
Vue.component("HelloWorld", HelloWorld);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
