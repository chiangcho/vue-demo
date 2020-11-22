/* eslint-disable */
<template>
  <div id="graph" class="graph-wrapper"></div>
</template>

<script>
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'

/**
 * rankdir: 图表展示方向，TB:自上向下，LR:从左到右，BT:自下向上，RL:从右到左，默认：TB
 * spacing: 自动计算graph 的 wrapper时，wrapper到graph的距离
 */
export default {
  name: 'Graph',
  props: {
    data: Object,
    width: { type: Number, default: 1000 },
    minHeight: { type: Number, default: 800 },
    rankdir: String,
    spacing: { type: Number, default: 80 }
  },
  data () {
    return {}
  },
  mounted () {
    // 获取D3
    var g = new dagreD3.graphlib.Graph().setGraph({ rankdir: this.rankdir })
    // 添加节点
    this.data.nodes.forEach((item, index) => {
      item.rx = item.ry = 5 // 圆角
      g.setNode(item.id, item)
      // 节点颜色 fill指节点背景色，stroke指节点描边颜色
      //   g.node(item.id).style = 'fill:' + 'green' + ';stroke: green;'
      g.node(item.id).class = item.class
    })
    // 链接关系
    this.data.edges.forEach((item) => {
      g.setEdge(item.from, item.to, {
        // 连线上的条件字
        label: item.label,
        // 箭头颜色
        arrowheadStyle: 'fill: rgb(189,198,209);stroke: rgb(189,198,209);',
        // 箭头形状（vee表示箭头是尖的，默认是平的）
        arrowhead: 'vee'
      })
    })

    // 绘制图形(此处和darg中的不同)
    var graphWrapper = d3
      .select('#graph')
    var svg = graphWrapper
      .append('svg')
      .attr('width', this.width)
    var inner = svg.append('g')
    // 缩放
    var zoom = d3.zoom().on('zoom', function () {
      inner.attr('transform', d3.event.transform)
    })
    svg.call(zoom)
    var render = dagreD3.render()
    render(inner, g)
    let code
    inner
      .selectAll('g.node')
      .on('click', (e) => {
        // 点击事件
        code = this.data.nodes.filter((item) => {
          return item.id === e
        })
        this.$emit('nodeClick', code[0])
      })
      .on('mouseover', (e) => {
        // 鼠标经过事件
        const curNode = g.node(e)
        this.$emit('nodeMouseover', curNode)
      })
    // 初始化缩放比例
    var initialScale = 1
    // 设置宽高
    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate((svg.attr('width') - g.graph().width * initialScale) / 2, this.spacing)
        .scale(initialScale)
    )
    let gheight = g.graph().height * initialScale + this.spacing * 2
    if (this.minHeight) {
      gheight = this.minHeight > gheight ? this.minHeight : gheight
    }
    svg.attr('height', gheight)
    graphWrapper.attr('style', 'height:' + gheight + 'px;width:' + this.width + 'px')
  }
}
</script>

<style>
svg {
  font-size: 14px;
}

.graph-wrapper .node rect {
  stroke: rgb(24, 144, 255);
  fill: rgb(232, 248, 255);
  color: rgb(81, 87, 89);
}

.graph-wrapper .node {
    cursor: pointer;
}

.graph-wrapper .edgePath path {
  stroke: rgb(159, 158, 159);
  fill: rgb(159, 158, 159);
  stroke-width: 1.5px;
}

.graph-wrapper .node rect{
    height: 40px;
}

.graph-wrapper .node-error rect{
    fill:#ff4d4f;
    stroke: #ff4d4f;
}

.graph-wrapper .node-error text{
    fill:#fff
}

.graph-wrapper .node-warning rect{
    fill:rgb(255,243,234);
    stroke: rgb(255,191,101);
}

.graph-wrapper .node-success rect{
    fill:#42b983;
    stroke: #42b983;
}

.graph-wrapper .node-success text{
    fill:#fff
}
.graph-wrapper {
    background-image: url(./tile.png);
    background-repeat: repeat;
    background-size: 30px 30px;
    background-color: #FBFBFB;
}
</style>
