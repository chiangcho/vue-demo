<template>
  <div>abc</div>
</template>

<script>
import(/* webpackChunkName: "a" */ "./a");
import(/* webpackChunkName: "b" */ "./b");
import(/* webpackChunkName: "c" */ "./c");
export default {
  name: "page1"
};
</script>

<style>
</style>