<template>
  <div class="workspace">
    <div class="workspace-left">
      <div class="pannel-toolbar">
        <div class="pannel-toolbar-title">组件库</div>
      </div>
      <div ref="componentWrapper" class="componentWrapper"></div>
    </div>
    <div class="workspace-right">
      <div class="canvas-pannel">
        <div class="pannel-toolbar">
          <toolbar :graph="graph" />
        </div>
        <div id="dagContainer" class="dagContainer">
          <div :id="id" style="flex: 1;"></div>
          <div class="app-minimap" ref="minimap" />
          <FloatToolbar :graph="graph"></FloatToolbar>
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
import { Graph, Shape } from "@antv/x6";
import "@antv/x6-vue-shape";
import { DagEdge } from "../../../config/custom-edge";
import FloatToolbar from "./FloatToolbar.vue";
import Toolbar from "./Toolbar.vue";
import { registerComponent } from "./RegisterComponent";
import {
  EdgeTools,
  NodeTools,
  DefaultEdgeAttrs,
  SelectedEdgeAttrs,
} from "./GraphConfig";
export default {
  name: "Dag",
  components: {
    FloatToolbar,
    Toolbar,
  },
  props: {
    id: String,
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
      activeName: "first",
    };
  },
  methods: {
    init() {
      // let dagContainer = document.getElementById("dagContainer");
      let graphContainer = document.getElementById(this.id);
      let minimapContainer = this.$refs.minimap;
      this.graph = new Graph({
        container: graphContainer,
        // width: dagContainer.clientWidth,
        // height: dagContainer.clientHeight,
        autoResize: true,
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
          // showNodeSelectionBox: true,
        },
        minimap: {
          enabled: true,
          container: minimapContainer,
        },
      });

      if (this.graphData !== {}) {
        this.graph.fromJSON(this.graphData);
      }
      registerComponent(this.graph, this.$refs.componentWrapper);

      this.graph.on("node:mouseenter", ({ node }) => {
        this.changePortsVisible(true);
        // console.log(node);
        // let ports = node.getPorts();
        // ports.forEach((port) => {
        //   node.portProp(port.id, "attrs/circle/style", { visibility: "true" });
        // });
        // 添加删除
        node.addTools(NodeTools);
      });

      this.graph.on("node:mouseleave", ({ node }) => {
        if (this.graph.getSelectedCells().length == 0)
          this.changePortsVisible(false);
        // let ports = node.getPorts();
        // ports.forEach((port) => {
        //   node.portProp(port.id, "attrs/circle/style", {
        //     visibility: "hidden",
        //   });
        // });
        // 移除删除
        if (!this.graph.isSelected(node)) {
          node.removeTools();
        }
      });

      this.graph.on("edge:mouseenter", ({ edge }) => {
        edge.addTools(EdgeTools);
      });
      //鼠标离开边时，如果被选中了则不移除tools
      this.graph.on("edge:mouseleave", ({ edge }) => {
        if (!this.graph.isSelected(edge)) {
          edge.removeTools();
        }
      });
      this.graph.on("edge:selected", ({ edge }) => {
        edge.addTools(EdgeTools);
        edge.setAttrs(SelectedEdgeAttrs);
      });
      this.graph.on("edge:unselected", ({ edge }) => {
        edge.removeTools();
        edge.setAttrs(DefaultEdgeAttrs);
      });
      this.graph.on("blank:click", () => {
        this.changePortsVisible(false);
      });

      //删除选中的内容
      this.graph.bindKey(["Backspace", "Delete"], () => {
        for (const item of this.graph.getSelectedCells()) {
          item.remove();
        }
      });
      //复制
      this.graph.bindKey("ctrl+c", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.copy(cells);
        }
        return false;
      });
      //剪切
      this.graph.bindKey("ctrl+x", () => {
        const cells = this.graph.getSelectedCells();
        if (cells.length) {
          this.graph.cut(cells);
        }
        return false;
      });
      //粘贴
      this.graph.bindKey("ctrl+v", () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 });
          this.graph.cleanSelection();
          this.graph.select(cells);
        }
        return false;
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

.componentWrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.pannel-toolbar {
  height: 36px;
  overflow: visible;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #f7f9fb;
}

.pannel-toolbar .pannel-toolbar-title {
  height: 36px;
  line-height: 36px;
  text-align: left;
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
}

.canvas-pannel {
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
  display: flex;
  flex: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

.app-minimap {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
