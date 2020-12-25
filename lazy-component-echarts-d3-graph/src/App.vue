<template>
  <div id="app">
    <about />
    <about2 />
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> | <router-link to="/graph">graph</router-link> | <router-link to="/charts">echarts</router-link>| <router-link to="/echartsmap">echartsmap</router-link> |
      <router-link to="/dashboard/Demo/1">看板1</router-link>
      | <router-link to="/config/datasource">数据源管理</router-link> | <router-link to="/config/dataset">数据集管理</router-link> | <router-link to="/config/widget">图表设计</router-link> | <router-link to="/config/board">看板设计</router-link> |
      <router-link to="/config/category">看板分类</router-link>
      | <router-link to="/cboard">cboard</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
// async function loadAll (componentName) {
//   const a = await import(/* webpackChunkName: "about" */ './views/AboutGraphIndex')
//   return a[componentName]
// }
const About2 = () => window.$lazyLoadComponent('About')
export default {
  components: {
    about: () => window.$lazyLoadComponent('About'),
    About2
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: cadetblue;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
