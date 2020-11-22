<template>
  <Graph :data="data"  @nodeClick='nodeclick'>
  </Graph>
</template>

<script>
// @ is an alias to /src
import Graph from './Graph.vue'

export default {
  name: 'JobDefination',
  components: {
    Graph
  },
  data () {
    return {
      data: {
        nodes: [
          {
            id: '1',
            label: 'job.step1',
            class: 'node-success'
          },
          {
            id: '2',
            label: 'job.step2',
            class: 'node-error'
          },
          {
            id: '3',
            label: 'job.step3',
            class: 'node-warning'
          },
          {
            id: '4',
            label: 'job.step4'
          },
          {
            id: '5',
            label: 'job.step5'
          }
        ],
        edges: [
          {
            from: '1',
            to: '2',
            label: '保存'
          },
          {
            from: '1',
            to: '3',
            label: '提交'
          },
          {
            from: '3',
            to: '4',
            label: '同意'
          },
          {
            from: '3',
            to: '2',
            label: '拒绝'
          },
          {
            from: '4',
            to: '5',
            label: '同意'
          },
          {
            from: '4',
            to: '2',
            label: '拒绝'
          },
          {
            from: '2',
            to: '2',
            label: '保存'
          },
          {
            from: '2',
            to: '3',
            label: '提交'
          }
        ]
      }
    }
  },
  methods: {
    nodeclick: function (item) {
      alert(JSON.stringify(item))
    }
  }
}
</script>
<style>

</style>
