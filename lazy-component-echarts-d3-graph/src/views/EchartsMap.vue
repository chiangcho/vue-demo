<template>
  <div class="Echarts">
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'
import 'echarts/map/js/province/guangdong.js'
import option from './map-option.js'
export default {
  name: 'EchartsMap',
  methods: {
    myEcharts () {
      // this.$echarts.init = this.$echartsinit
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = canvas.height = 100
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.globalAlpha = 0.1
      ctx.font = '20px Microsoft Yahei'
      ctx.translate(50, 50)
      ctx.rotate(-Math.PI / 4)
      ctx.fillText('我是水印', 0, 0)
      option.backgroundColor.image = canvas
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  mounted () {
    this.myEcharts()
  }
}
</script>

<style>
</style>
