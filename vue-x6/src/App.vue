<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "./components/layout";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0px;
  overflow: hidden;
}

html,
body,
#app,
.hello,
.el-container,
.el-main {
  height: 100%;
}
</style>
