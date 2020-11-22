<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <button @click="switchAsyncComponent" >切换异步组件</button>
    <async-example v-if="showAsync"></async-example>
    <button @click="getCourses" >请求后台数据</button>
  </div>
</template>

<script>

import Vue from 'vue/dist/vue.esm.js'
import $http from './http'
import {getCourses} from './api/courses'

export default {
  name: 'app',
  data: function(){
    return {
      showAsync: false,
      test:""
    }
  },
  methods:{
    switchAsyncComponent:function() {
      if(!this.showAsync){
      $http({
        method: 'get',
        url: '/test2.json'
      }).then((res)=>{
        this.test = res
        Vue.component('async-example',function (resolve) {
          debugger
            // 向 `resolve` 回调传递组件定义
            
            resolve(res)
          
        })
        this.showAsync = !this.showAsync
      })
      } else {
        this.showAsync = !this.showAsync
      }
      
    },
    getCourses:function() {
      getCourses().then((res)=>{
        console.log(res.result)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
