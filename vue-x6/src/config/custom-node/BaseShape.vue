<template>
  <div class="node-element">
    <i class="el-icon-s-operation" />
    <div class="notation">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "BaseShape",
  props: {
    name: {
      type: String,
      default: "test",
    },
  },
};
</script>

<style>
.node-element {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 180px;
  height: 32px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgb(0 0 0 / 8%);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 8%);
  cursor: pointer;
}
.x6-node-selected .node-element,
.node-element:hover {
  background-color: rgba(243, 249, 255, 0.92);
  border: 1px solid #1890ff;
  box-shadow: 0 0 3px 3px rgb(64 169 255 / 20%);
}

.node-element i {
  display: inline-flex;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: rgba(229, 238, 255, 0.85);
  border-radius: 4px 0 0 4px;
  color: rgb(24, 144, 255);
}

.node-element .notation {
  display: inline-flex;
  align-items: center;
  width: calc(100% - 32px);
  padding: 0 8px;
  user-select: none;
}

.x6-widget-stencil .node-element {
  margin-left: 50px;
}
</style>