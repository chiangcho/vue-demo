<template>
  <div class="workspace-wrapper">
      <div class="header">
        <div class="header-left">
          <div class="header-left-icon">
            <i class="el-icon-share" style="font-size: 20px" />
          </div>
          <span class="header-left-title">批量建模</span>
        </div>
        <div class="header-right"></div>
      </div>

      <div class="content">
          <dag id="id1" barId="bar1" />
      </div>
  </div>
</template>


<script>
import Dag from "./dag";

export default {
  name: "Layout",
  props: {
    msg: String,
  },
  mounted() {},
  components: {
    Dag,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.workspace-wrapper {
  height: 100%; border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}
.header {
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  min-height: 48px;
  overflow: hidden;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0;
}
.header-left {
  display: flex;
}

.header-right {
  display: flex;
}

.header-left-icon {
  height: 48px;
  width: 64px;
  line-height: 48px;
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  color: #fba831;
}

.header-left-title {
  height: 48px;
  margin-left: 24px;
  cursor: pointer;
}

.content {
  display: flex;
  padding: 0px;
  height: 100%;
  position: relative;
}
</style>
