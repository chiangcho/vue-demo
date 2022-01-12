<template>
  <div id="app">
    <div class="card">
      <div class="header">
        <div class="title">加载外部组件</div>
      </div>
      <div class="card-content">
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </div>
    </div>
    <div class="card">
      <div class="header">
        <div class="title">加载服务端组件</div>
      </div>
      <div class="card-content">
        <button @click="switchAsyncComponent">
          {{ showAsync ? "显示服务端组件" : "隐藏服务端组件" }}
        </button>
        <async-example v-if="showAsync"></async-example>
      </div>
    </div>
    <div class="card">
      <div class="header">
        <div class="title" style="color: red">加载服务端组件</div>
      </div>
      <div class="card-content">
        <button @click="getCourses">请求后台数据例子</button>
      </div>
    </div>
    <div class="card">
      <div class="header">
        <div class="title">导出为word</div>
      </div>
      <div class="card-content">
        <button @click="exportWord">导出word</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";
import $http from "./http";
import { getCourses } from "./api/courses";

export default {
  name: "app",
  data: function() {
    return {
      showAsync: false,
      test: ""
    };
  },
  methods: {
    switchAsyncComponent: function() {
      if (!this.showAsync) {
        $http({
          method: "get",
          url: "/test2.json"
        }).then(res => {
          this.test = res;
          Vue.component("async-example", function(resolve) {
            debugger;
            // 向 `resolve` 回调传递组件定义

            resolve(res);
          });
          this.showAsync = !this.showAsync;
        });
      } else {
        this.showAsync = !this.showAsync;
      }
    },
    getCourses: function() {
      getCourses().then(res => {
        console.log(res.result);
      });
    },
    exportWord() {
      var content = document.getElementById("app").innerHTML;
      var styles = document.getElementsByTagName("style");
      let stylecss = "";
      console.log(styles);
      for (const style of styles) {
        stylecss = stylecss + style.outerHTML;
      }
      let html = `<!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    <title>word</title>

                    ${stylecss}


                </head>
                <body>
                    <div class="resume_preview_page" style="margin:0 auto;width:1200px">
                    ${content}
                    </div>
                </body>
                </html>`;
      console.log(html);
      var converted = window.htmlDocx.asBlob(html, { orientation: true });
      window.saveAs(converted, "test.docx");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card .header .title {
  color: #fff;
}
.card {
  background-color: #fff;
  -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  max-width: 100%;
  position: relative;
  margin-top: 20px;
}

.card .header {
  padding: 0.75rem;
  background-color: #42d3a5;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.card-content {
  background-color: transparent;
  padding: 1.5rem;
}
</style>
