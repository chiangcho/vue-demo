<template>
  <div class="x6-toolbar">
    <div class="x6-toolbar-content">
      <div class="x6-toolbar-content-inner">
        <div class="x6-toolbar-group">
          <div class="x6-toolbar-item" @click="exportPng">
            <i class="el-icon-download x6-toolbar-item-icon" />
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
</template>

<script>
import { DataUri } from "@antv/x6";
import insertCss from "insert-css";
export default {
  name: "Toolbar",
  props: {
    graph: {},
  },
  methods: {
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
    exportPng() {
      this.graph.toPNG((dataUri) => {
        // 下载
        DataUri.downloadDataUri(dataUri, "chart.png");
      });
    },

    getJSONData() {
      this.$message("按f12查看控制台");
      console.log(this.graph.toJSON());
    },
  },
};
</script>

<style scoped>
.x6-toolbar.x6-toolbar-hover-effect {
  height: 32px;
}
.x6-toolbar {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0 0 0 4px;
  height: 36px;
  overflow: visible;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.x6-toolbar-content {
  display: flex;
  flex: 1 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

.x6-toolbar-item {
  cursor: pointer;
}

.x6-toolbar .x6-toolbar-content .x6-toolbar-item {
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
</style>