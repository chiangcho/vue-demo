<template>
  <div class="hello">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246)"
      ></el-aside>
      <dag id="id1" barId="bar1" />
      <el-main></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "X6",
  props: {
    msg: String,
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
