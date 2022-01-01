<template>
  <div class="workspace">
    <div class="workspace-left">
      <div class="canvasToolbar">
        <div class="x6-toolbar">
          <div class="x6-toolbar-title">组件库</div>
        </div>
      </div>
      <div
        :id="barId"
        style="width: 100%; height: 100%; position: relative"
      ></div>
    </div>
    <div class="workspace-right">
      <div class="x6-pannel">
        <div class="canvasToolbar">
          <div class="x6-toolbar">
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
          <ul class="handler">
            <el-tooltip openDelay="500" content="放大" placement="left">
              <li class="item" @click="zoomIn">
                <i class="el-icon-zoom-in"></i>
              </li>
            </el-tooltip>
            <el-tooltip openDelay="500" content="缩小" placement="left">
              <li class="item" @click="zoomOut">
                <i class="el-icon-zoom-out"></i>
              </li>
            </el-tooltip>
            <el-tooltip openDelay="500" content="实际大小" placement="left">
              <li class="item" @click="resetSize">
                <i class="el-icon-c-scale-to-original" />
              </li>
            </el-tooltip>
            <el-tooltip openDelay="500" content="适应画布" placement="left">
              <li class="item" @click="zoomToFit">
                <i class="el-icon-s-grid"></i>
              </li>
            </el-tooltip>
            <el-tooltip openDelay="500" content="居中" placement="left">
              <li class="item" @click="centerContent">
                <i class="el-icon-aim"></i>
              </li>
            </el-tooltip>

            <li class="item"><i class="el-icon-full-screen"></i></li>
          </ul>
        </div>
      </div>
      <div class="config-pannel">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="属性配置" name="first">属性配置</el-tab-pane>
          <el-tab-pane label="全局属性" name="second">全局属性</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
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
      selectLine: [],
      activeName: "first",
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
        scroller: {
          enabled: true,
          pannable: true,
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
          snap: {
            radius: 20, //设置自动吸附距离
          }, //连线的过程中距离节点或者连接桩 50px 时会触发自动吸附，
          allowMulti: true,
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
        history: true,
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
          modifiers: "ctrl", //按住ctrl点击鼠标框选
          rubberband: true,
          showNodeSelectionBox: true,
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
            title: "通用组件",
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
        node.addTools({
          name: "button-remove",
          args: {
            x: 0,
            y: 0,
            offset: { x: 6, y: 5 },
          },
        });
      });

      this.graph.on("node:mouseleave", ({ node }) => {
        this.changePortsVisible(false);
        // 移除删除
        node.removeTools();
      });
      this.graph.on("edge:mouseenter", ({ edge }) => {
        edge.addTools([
          {
            name: "source-arrowhead",

            args: {
              tagName: "circle",
              attrs: {
                r: 6,
                fill: "#ffa940",
                strokeWidth: 0,
                cursor: "move",
              },
            },
          },
          {
            name: "target-arrowhead",
            args: {
              attrs: {
                fill: "#3199FF",
                cursor: "move",
              },
            },
          },
          {
            name: "button-remove",
            args: {
              distance: -30,
            },
          },
        ]);
      });

      this.graph.on("edge:mouseleave", ({ edge }) => {
        edge.removeTools();
      });
      // 选择连接线(边)事件
      this.graph.on("selection:changed", ({ added, removed }) => {
        this.selectLine = added;
        added.forEach((cell) => {
          const args = { size: 12 };
          cell.setAttrs({
            line: {
              sourceMarker: {
                args,
              },
              targetMarker: {
                args,
              },
              strokeWidth: 2,
            },
          });
        });
        removed.forEach((cell) => {
          const args = { size: 8 };
          cell.setAttrs({
            line: {
              sourceMarker: {
                args,
              },
              targetMarker: {
                args,
              },
              strokeWidth: 1,
            },
          });
        });
      });

      //删除选中的内容
      this.graph.bindKey(["Backspace", "Delete"], () => {
        for (const item of this.graph.getSelectedCells()) {
          item.remove();
        }
      });
      this.graph.bindKey("ctrl+c", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
        }
        return false;
      });
      this.graph.bindKey("ctrl+x", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.cut(cells);
        }
        return false;
      });
      this.graph.bindKey("ctrl+v", () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 });
          this.graph.cleanSelection();
          this.graph.select(cells);
        }
        return false;
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
    zoomIn() {
      this.graph.zoomTo(this.graph.zoom() + 0.1);
    },
    zoomOut() {
      this.graph.zoomTo(this.graph.zoom() - 0.1);
    },
    zoomToFit() {
      this.graph.zoomToFit();
    },

    resetSize() {
      this.graph.zoomTo(1);
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
    this.graph.dispose();
  },
};
</script>

<style>
.workspace {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.workspace-left {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-basis: 290px;
  width: 290px;
  max-height: calc(100vh - 48px);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}

.workspace-right {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: space-between;
  overflow: hidden;
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
  align-items: center;
  overflow: hidden;
}

.x6-toolbar-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  padding: 0px 10px;
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

.x6-pannel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.config-pannel {
  width: 290px;
  min-width: 290px;
}

.dagContainer {
  position: relative;
  background-color: #f7f7fa;
  flex-grow: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.app-minimap {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.handler {
  position: absolute;
  top: 61px;
  right: 14px;
  z-index: 99;
  width: 32px;
  margin: 0;
  padding: 3px 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  list-style-type: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  box-shadow: 0 0 20px rgb(0 0 0 / 1%);
}

.handler .item {
  text-align: center;
  cursor: pointer;
  padding: 8px;
}

.handler .item:hover {
  background-color: dodgerblue;
  color: #fff;
}
</style>
