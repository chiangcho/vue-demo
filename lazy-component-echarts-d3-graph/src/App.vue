<template>
  <div id="app">
    <about />
    <about2 />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/graph">graph</router-link> |
      <router-link to="/charts">echarts</router-link>
    </div>
    <router-view/>
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
  text-align: center;
  color: #2c3e50;
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
