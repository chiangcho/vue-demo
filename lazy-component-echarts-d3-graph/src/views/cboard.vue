<template>
  <div class="cboard">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world />
  </div>
</template>

<script>
// @ is an alias to /src
const HelloWorld = () => import('@/components/HelloWorld.vue')

export default {
  name: 'Cboard',
  components: {
    // HelloWorld
  },
  created () {
    if (!this.$options.components['hello-world']) {
      this.$options.components['hello-world'] = HelloWorld
    }
  }
}
</script>
