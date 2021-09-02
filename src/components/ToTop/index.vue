<template>
  <div class="toTop-container" v-if="show" @click="handleClick">
    <Icon type="toTop" />
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  data() {
    return {
      show: false,
    };
  },
  components: {
    Icon,
  },
  methods: {
    handleToTop(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      const range = 300;
      if (dom.scrollTop >= range) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    handleClick() {
      this.$bus.$emit("toTopClick", 0); // toTop点击时，触发事件总线上监听的toTopClick事件
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleToTop);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleToTop);
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.toTop-container {
  width: 50px;
  height: 50px;
  line-height: 50px;
  position: fixed;
  background: @primary;
  color: #fff;
  text-align: center;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 999;
  .iconfont {
    font-size: 26px;
  }
}
</style>