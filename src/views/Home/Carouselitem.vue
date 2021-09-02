<template>
  <div class="carousel-item-container" ref="container" @mousemove="mouseMove" @mouseleave="mouseLeave">
    <div class="carousel-img" ref="innerImage" :style="imagePosition">
      <ImageLoader
        @load="this.showWords"
        :src="bannerData.bigImg"
        :placeholder="bannerData.midImg"
      />
    </div>
    <div class="content">
      <div class="title" ref="title">{{ bannerData.title }}</div>
      <div class="desc" ref="desc">{{ bannerData.description }}</div>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null,
      innerSize: null,
      mouseX: 0,
      mouseY: 0,
    };
  },
  props: ["bannerData"],
  components: {
    ImageLoader,
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.X;
    this.mouseY = this.center.Y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    showWords() {
      //动态显示文字
      this.$refs.title.style.width = 0;
      this.$refs.title.style.opacity = 1;
      this.$refs.title.clientWidth; //reflow,让浏览器强制渲染
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.width = 0;
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.clientWidth; //reflow
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    setSize() {
      this.containerSize = {
        //获取外部容器宽高
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        //获取内部图片宽高
        width: this.$refs.innerImage.clientWidth,
        height: this.$refs.innerImage.clientHeight,
      };
    },
    mouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    mouseLeave(){
      this.mouseX = this.center.X;
      this.mouseY = this.center.Y;
    }
  },
  computed: {
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const widthRatio =
        (this.innerSize.width - this.containerSize.width) /
        this.containerSize.width;
      const heightRatio =
        (this.innerSize.height - this.containerSize.height) /
        this.containerSize.height;
        const moveX = -widthRatio * this.mouseX;
        const moveY = -heightRatio * this.mouseY;
      return {
        transform: `translate(${moveX}px,${moveY}px)`, // 使用transform而不使用left,top,是因为避免重排（reflow）
      };
    },
    center(){
      return {
        X : this.containerSize.width / 2,
        Y : this.containerSize.height / 2
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  // background: @dark;
  color: #fff;
  position: relative;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    z-index: -1;
    transition:0.3s;
    left: 0;
    top: 0;
  }
  .content {
    width: 80%;
    height: 80%;
    position: absolute;
    margin: 10%;
    top: 0;
    .title {
      width: auto;
      height: 40px;
      font-size: 30px;
      font-weight: 450;
      overflow: hidden;
      opacity: 0;
    }
    .desc {
      width: auto;
      height: 25px;
      font-size: 20px;
      margin-top: 30px;
      opacity: 0;
      overflow: hidden;
    }
  }
}
</style>