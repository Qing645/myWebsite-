<template>
  <div class="home-container" @wheel="wheelHandle" v-loading="isLoading">
    <ul
      class="carousel-container"
      ref="container"
      :style="{ marginTop }"
      @transitionend="transitionendHandle"
    >
      <li v-for="item in data" :key="item.id">
        <Carouselitem :bannerData="item" />
      </li>
    </ul>
    <div
      v-show="index >= 1"
      class="icon icon-up"
      @click="changePage(index - 1)"
    >
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      class="icon icon-down"
      @click="changePage(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: i == index }"
        @click="changePage(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import Carouselitem from "./Carouselitem.vue";
import Icon from "@/components/Icon";
import {mapState} from "vuex"

export default {
  components: {
    Carouselitem,
    Icon,
  },
  data() {
    return {
      index: 0, //轮播图索引
      clientHeight: 0,
      switching: false, //是否翻页中
    };
  },
  methods: {
    changePage(num) {
      this.index = num;
    },
    wheelHandle(e) {
      //鼠标滚轮事件
      if (this.switching) {
        return;
      }
      if (e.deltaY > 0 && this.index < this.data.length - 1) {
        //上滚
        this.index++;
        this.switching = true;
      }
      if (e.deltaY < 0 && this.index >= 1) {
        //下滚
        this.index--;
        this.switching = true;
      }
    },
    transitionendHandle() {
      //过渡结束后
      this.switching = false;
    },
    handleResize() {
      //窗口大小改变后执行的函数
      this.clientHeight = this.$refs.container.clientHeight;
    },
  },
  computed: {
    marginTop() {
      return this.index * -this.clientHeight + "px";
    },
    ...mapState('banner',['data','isLoading'])
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.clientHeight = this.$refs.container.clientHeight; //dom生成后，获取窗口高度进行赋值
    window.addEventListener("resize", this.handleResize); //监听窗口改变，改变数据中的窗口高度
  },
  destroyed() {
    removeEventListener("resize", this.handleResize);
  },
  // created(){
  //  getBanners().then(r=>{
  //    this.data = r
  //  })
  // },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  // background: @dark;
  overflow: hidden; //消除bfc
}
.carousel-container {
  width: 100%;
  height: 100%;
  transition: all 500ms;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  .self-center();
  transform: translateX(-50%);
  color: @gray;
  @spacing: 25px;
  cursor: pointer;
  .iconfont {
    font-size: 30px;
  }
  &.icon-up {
    top: @spacing;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @spacing;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
}
.indicator {
  .self-center();
  transform: translateY(50%);
  left: auto;
  right: 10px;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>