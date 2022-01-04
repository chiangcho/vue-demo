<template>
  <ul class="float-toolbar">
    <el-tooltip :openDelay="openDelay" content="放大" placement="left">
      <li class="item" @click="zoomIn">
        <i class="el-icon-zoom-in"></i>
      </li>
    </el-tooltip>
    <el-tooltip :openDelay="openDelay" content="缩小" placement="left">
      <li class="item" @click="zoomOut">
        <i class="el-icon-zoom-out"></i>
      </li>
    </el-tooltip>
    <el-tooltip :openDelay="openDelay" content="实际大小" placement="left">
      <li class="item" @click="resetSize">
        <i class="el-icon-c-scale-to-original" />
      </li>
    </el-tooltip>
    <el-tooltip :openDelay="openDelay" content="适应画布" placement="left">
      <li class="item" @click="zoomToFit">
        <i class="el-icon-s-grid"></i>
      </li>
    </el-tooltip>
    <el-tooltip :openDelay="openDelay" content="居中" placement="left">
      <li class="item" @click="centerContent">
        <i class="el-icon-aim"></i>
      </li>
    </el-tooltip>

    <li class="item"><i class="el-icon-full-screen"></i></li>
  </ul>
</template>

<script>
export default {
  props: {
    graph: {},
  },
  data() {
    return {
      openDelay: 500,
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
.float-toolbar {
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

.float-toolbar .item {
  text-align: center;
  cursor: pointer;
  padding: 8px;
}

.float-toolbar .item:hover {
  background-color: dodgerblue;
  color: #fff;
}
</style>