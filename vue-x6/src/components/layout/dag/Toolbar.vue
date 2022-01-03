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

<style lang="scss" scoped>
</style>