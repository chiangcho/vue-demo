<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="add">3+2=?</button>
    <input id="abc" />
    <button @click="load">加载异步组件</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
  </div>
</template>

<script>
const calc = () => import("../utils/calc");

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    async add() {
      let add1 = await calc();
      console.log(add1.addNum);
      alert(add1.addNum(2, 3));
      $("#abc").val(add1.addNum(2, 3));
    },
    async load() {
      import("./page1");
    }
  }
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
