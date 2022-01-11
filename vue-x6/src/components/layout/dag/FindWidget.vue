<template>
  <div class="find-widget" ref="findWidget">
    <div class="find-part">
      <div class="find-input">
        <el-input
          placeholder="请输入内容"
          v-model="searchContent"
          clearable
          size="mini"
          ref="findWidgetInput"
          @input="search"
          @keyup.enter.exact.native="next"
          @keyup.shift.enter.native="previous"
          @keyup.esc.native="hide"
        >
        </el-input>
      </div>
      <div class="find-actions">
        <div class="matches-count" title="" style="min-width: 69px">
          {{ matchesCount }}
        </div>
        <div
          title="上一个 (Shift+Enter)"
          tabindex="-1"
          class="button"
          v-bind:class="{ disabled: previousDisabled }"
          @click="previous"
        >
          <i class="el-icon-top" />
        </div>
        <div
          title="下一个 (Enter)"
          tabindex="-2"
          class="button"
          v-bind:class="{ disabled: nextDisabled }"
          @click="next"
        >
          <i class="el-icon-bottom" />
        </div>
        <div title="关闭 (Esc)" tabindex="0" class="button" @click="hide">
          <i class="el-icon-close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: [],
    total: {
      type: Number,
      default: 0,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      searchContent: "",
      internalIndex: 0,
    };
  },
  methods: {
    show() {
      this.$refs.findWidget.style.display = "block";
      this.$refs.findWidgetInput.focus();
    },
    search() {
      this.$emit("search", this.searchContent);
    },
    next() {
      if (this.total - 1 <= this.internalIndex) {
        return false;
      }
      this.internalIndex = this.internalIndex + 1;
      this.jumpTo("next", this.internalIndex);
    },
    previous() {
      if (this.internalIndex <= 0) {
        return false;
      }
      this.internalIndex = this.internalIndex - 1;
      this.jumpTo("previous", this.internalIndex);
    },
    hide() {
      this.$refs.findWidget.style.display = "none";
      this.$emit("hide");
    },
    jumpTo(eventName, index) {
      this.$emit(eventName, index);
      if (
        this.results &&
        this.results.length > 0 &&
        this.results[index].scrollIntoView
      )
        this.results[index].scrollIntoView();
    },
  },
  computed: {
    matchesCount() {
      if (this.total == 0) return "无结果";
      else return this.internalIndex + 1 + "/" + this.total;
    },
    nextDisabled() {
      if (this.total == 0 || this.internalIndex == this.total - 1) {
        return true;
      }
      return false;
    },
    previousDisabled() {
      if (this.internalIndex > 0) {
        return false;
      }
      return true;
    },
  },
  watch: {
    total(newValue) {
      if (this.internalIndex >= newValue) {
        this.internalIndex = this.total - 1;
        this.jumpTo("jump", this.internalIndex);
      }
      if (newValue == 0) {
        this.internalIndex = 0;
      }
    },
    currentIndex: {
      immediate: true,
      handler(newValue) {
        this.internalIndex = newValue;
        this.jumpTo("jump", this.internalIndex);
      },
    },
  },
};
</script>

<style scoped>
.find-widget {
  width: 360px;
  height: 36px;
  position: absolute;
  max-width: 727px;
  top: 0px;
  right: 126px;
  color: #616161;
  box-shadow: 0 0 8px 2px rgb(0 0 0 / 16%);
  background-color: #f3f3f3;
  overflow: hidden;
  line-height: 22px;
  padding: 0 4px;
}

.find-part {
  margin: 4px 0 0 10px;
  font-size: 12px;
  display: flex;
}

.find-input {
  vertical-align: middle;
  display: flex;
  flex: 1;
  position: relative;
}

.find-actions {
  height: 28px;
  display: flex;
  align-items: center;
}

.matches-count {
  display: flex;
  margin: 0 0 0 3px;
  padding: 2px 0 0 2px;
  height: 28px;
  vertical-align: middle;
  text-align: center;
  line-height: 26px;
  min-width: 69px;
}

.find-widget .button {
  width: 16px;
  height: 16px;
  padding: 3px;
  border-radius: 5px;
  margin-left: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.find-widget .disabled {
  opacity: 0.3;
  cursor: default;
}

.find-widget .button:not(.disabled):hover {
  background-color: rgba(184, 184, 184, 0.31) !important;
}
</style>