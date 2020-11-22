<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'

export default {
  name: 'Echarts',
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
      // 指定图表的配置项和数据
      var option = {
        backgroundColor: {
          type: 'pattern',
          image: canvas,
          repeat: 'repeat'
        },
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {
              backgroundColor: 'rgba(120,120,120,0)'
            }
          }
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

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
