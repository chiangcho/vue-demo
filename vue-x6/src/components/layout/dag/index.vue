<template>
  <el-container>
    <el-aside>
      <div
        :id="barId"
        style="width: 300px; height: 100vh; position: relative"
      ></div>
    </el-aside>
    <el-main class="x6-pannel">
      <div class="canvasToolbar">
        <div class="x6-toolbar x6-toolbar-hover-effect">
          <div class="x6-toolbar-content">
            <div class="x6-toolbar-content-inner">
              <div class="x6-toolbar-group">
                <div class="x6-toolbar-item" @click="exportPng">
                  <i class="el-icon-download x6-toolbar-item-icon" />
                </div>
                <div class="x6-toolbar-item" @click="centerContent">
                  <i class="el-icon-rank x6-toolbar-item-icon" />
                </div>
                <div class="x6-toolbar-item" @click="getJSONData">
                  <i class="el-icon-copy-document x6-toolbar-item-icon" />
                </div>
              </div>
              <div class="x6-toolbar-group">
                <div class="x6-toolbar-item" @click="runHandle">
                  <i class="el-icon-video-play x6-toolbar-item-icon" />
                </div>
                <div class="x6-toolbar-item" @click="stopHandle">
                  <i class="el-icon-video-pause x6-toolbar-item-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="dagContainer" class="dagContainer">
        <div :id="id"></div>
        <div class="app-minimap" id="minimapId" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { Graph, Addon, Shape, DataUri } from "@antv/x6";
import "@antv/x6-vue-shape";
import insertCss from "insert-css";
import { DagEdge } from "../../../config/custom-edge";
import BaseShape from "../../../config/custom-node/BaseShape.vue";
export default {
  name: "Dag",
  props: {
    id: String,
    barId: String,
    graphData: {
      type: Object,
      required: false,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      graph: {},
      stencil: {},
      Shape: Shape,
    };
  },
  methods: {
    init() {
      let dagContainer = document.getElementById("dagContainer");
      let graphContainer = document.getElementById(this.id);
      let minimapContainer = document.getElementById("minimapId");
      console.log(
        "dagContainer: width" +
          dagContainer.clientWidth +
          ",height" +
          dagContainer.clientHeight
      );
      this.graph = new Graph({
        container: graphContainer,
        width: dagContainer.clientWidth,
        height: dagContainer.clientHeight,
        panning: {
          enabled: true,
          eventTypes: ["leftMouseDown", "mouseWheel"],
        },
        mousewheel: {
          enabled: true,
          modifiers: ["ctrl", "meta"],
          factor: 1.1,
          maxScale: 1.5,
          minScale: 0.5,
          zoomAtMousePosition: true,
        },
        highlighting: {
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#fff",
                stroke: "#31d0c6",
                strokeWidth: 4,
              },
            },
          },
        },
        connecting: {
          snap: true, //连线的过程中距离节点或者连接桩 50px 时会触发自动吸附，
          allowMulti: false,
          allowBlank: false, //是否允许连接到画布空白位置的点
          allowLoop: false, //是否允许创建循环连线
          highlight: true,
          connectionPoint: "anchor",
          anchor: "center",
          createEdge() {
            //自定义默认边
            return new DagEdge();
          },
          connector: "algo-edge",
        },
        snapline: true,

        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        keyboard: true,
        clipboard: true,
        selecting: {
          enabled: true,
          multiple: true,
          rubberEdge: true,
          rubberNode: true,
          modifiers: "shift",
          rubberband: true,
        },
        minimap: {
          enabled: true,
          container: minimapContainer,
        },
      });

      if (this.graphData !== {}) {
        this.graph.fromJSON(this.graphData);
      }

      this.stencil = new Addon.Stencil({
        title: "组件",
        target: this.graph,
        stencilGraphWidth: 300,
        stencilGraphHeight: 600,
        groups: [
          {
            name: "group1",
            title: "算子",
          },
        ],
      });

      document.getElementById(this.barId).appendChild(this.stencil.container);
      let startNodeComponent = {
        template: `<base-shape></base-shape>`,
        components: {
          BaseShape,
        },
      };
      const ports = {
        groups: {
          top: {
            position: "top",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: {
                  visibility: "hidden",
                },
              },
            },
          },
          right: {
            position: "right",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: {
                  visibility: "hidden",
                },
              },
            },
          },
          bottom: {
            position: "bottom",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: {
                  visibility: "hidden",
                },
              },
            },
          },
          left: {
            position: "left",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#5F95FF",
                strokeWidth: 1,
                fill: "#fff",
                style: {
                  visibility: "hidden",
                },
              },
            },
          },
        },
        items: [
          {
            group: "top",
          },
          {
            group: "right",
          },
          {
            group: "bottom",
          },
          {
            group: "left",
          },
        ],
      };
      let startNodeShape = {
        shape: "vue-shape",
        x: 32,
        y: 48,
        width: 180,
        height: 32,
        component: startNodeComponent,
        ports: { ...ports },
      };
      Graph.registerVueComponent(
        "start-node-component",
        startNodeComponent,
        true
      );
      const startNode = this.graph.createNode(startNodeShape);

      this.stencil.load([startNode], "group1");

      this.graph.on("node:added", ({ node, index, options }) => {
        console.log(node);
        console.log(index);
        console.log(options);
      });
      this.graph.on("edge:connected", (args) => {
        console.log(args);
        // const edge = args.edge;
        // const node = args.currentCell;
        // const elem = args.currentMagnet;
        // const portId = elem.getAttribute("port");

        // // 触发 port 重新渲染
        // node.setPortProp(portId, 'connected', true)
        // // 更新连线样式
        // edge.attr({
        //     line: {
        //         strokeDasharray: '',
        //     },
        // })
      });
      this.graph.on("node:mouseenter", ({ node }) => {
        console.log("mouse mouseenter");
        this.changePortsVisible(true);
        // 添加删除
        const type = node.store.data.type;
        const x = type === "taskNode" ? 300 : 60;
        node.addTools({
          name: "button-remove",
          args: {
            x: 0,
            y: 0,
            offset: { x: x, y: 10 },
          },
        });
      });

      this.graph.on("node:mouseleave", ({ node }) => {
        this.changePortsVisible(false);
        // 移除删除
        node.removeTools();
      });
    },
    runHandle() {
      const edges = this.graph.getEdges();
      edges.forEach((edge) => {
        edge.attr({
          line: {
            strokeDasharray: "5",
            style: {
              animation: "ant-line 30s infinite linear",
            },
          },
        });
      });
      insertCss(`
                        @keyframes ant-line {
                            to {
                                stroke-dashoffset: -1000
                            }
                        }
                `);
    },
    stopHandle() {
      const edges = this.graph.getEdges();
      edges.forEach((edge) => {
        edge.attr({
          line: {
            strokeDasharray: "",
          },
        });
      });
    },
    changePortsVisible(visible) {
      const ports = document
        .getElementById(this.id)
        .querySelectorAll(".x6-port-body");
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = visible ? "visible" : "hidden";
      }
    },
    exportPng() {
      this.graph.toPNG((dataUri) => {
        // 下载
        DataUri.downloadDataUri(dataUri, "chart.png");
      });
    },

    valFunc() {
      console.log(212121);
    },

    centerContent() {
      this.graph.centerContent();
    },
    getJSONData() {
      this.$message("按f12查看控制台");
      console.log(this.graph.toJSON());
    },
  },
  mounted() {
    this.init();
  },
  destroyed() {
    console.log(123);
    this.graph.dispose();
  },
};
</script>

<style>
/deep/ .x6-widget-stencil {
  width: 300px;
  /* height: 100vh - 100px; */
}

.canvasToolbar {
  background-color: #f7f9fb;
}

.canvasToolbar .x6-toolbar {
  height: 36px !important;
  overflow: visible;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.x6-toolbar.x6-toolbar-hover-effect {
  height: 32px;
}
.x6-toolbar {
  display: flex;
  flex-direction: row;
  height: 28px;
  margin: 0;
  padding: 0 0 0 4px;
  overflow: hidden;
}

.canvasToolbar .x6-toolbar .x6-toolbar-content {
  overflow: visible;
}
.x6-toolbar-content {
  display: flex;
  flex: 1 1;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
}

.x6-toolbar-content-extras,
.x6-toolbar-content-inner,
.x6-toolbar-group,
.x6-toolbar-item,
.x6-toolbar-item .x6-toolbar-item-icon,
.x6-toolbar-item-text {
  display: flex;
  flex-direction: row;
}

.x6-toolbar-content-extras,
.x6-toolbar-content-inner,
.x6-toolbar-group,
.x6-toolbar-item,
.x6-toolbar-item-icon,
.x6-toolbar-item-text {
  display: flex;
  flex-direction: row;
}

.canvasToolbar .x6-toolbar .x6-toolbar-content .x6-toolbar-item {
  margin: 6px 6px !important;
  padding: 0 6px !important;
}
.x6-toolbar.x6-toolbar-hover-effect .x6-toolbar-item {
  margin: 4px;
  padding: 0 4px;
  color: #595959;
  cursor: pointer;
}

.x6-toolbar-item-icon {
  font-size: 14px;
  transition: transform 50ms ease;
}
.x6-toolbar-item-icon,
.x6-toolbar-item-text {
  align-content: center;
  align-items: center;
}
.x6-toolbar-content-extras,
.x6-toolbar-content-inner,
.x6-toolbar-group,
.x6-toolbar-item,
.x6-toolbar-item-icon,
.x6-toolbar-item-text {
  display: flex;
  flex-direction: row;
}

.el-container .x6-pannel {
  padding: 0px;
  overflow: hidden;
}

.dagContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f7f7fa;
}

.app-minimap {
  position: absolute;
  bottom: 140px;
  right: 0px;
}
</style>
