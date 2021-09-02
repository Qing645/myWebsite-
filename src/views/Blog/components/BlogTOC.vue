<template>
  <div class="blogTOC-container">
    <h2>目录</h2>
    <Right-list :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    tocWithSelect() {
      //根据父组件传递的分类toc属性和activeAnchor数据，得到一个含有isSelect属性的映射数组
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor ? true : false,
          children: getTOC(t.children), //递归获取子数据
        }));
      };
      return getTOC(this.toc);
    },
    doms() {
      //根据toc得到分类列表对应的文章Dom元素 数组
      const doms = [];
      const addToDoms = (toc) => {
        toc.forEach((t) => {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        });
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect(selectDom) {
      //遍历dom，判断dom位置，根据位置赋予不同的select状态
      if (!selectDom) {
        return;
      }
      location.hash = null; // hash值置空
      const range = 100;
      for (const dom of this.doms) {
        //遍历dom数组，判断每个dom元素的位置，改变activeAnchor值，
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          this.activeAnchor = dom.id;
        } else if (top > range) {
          return;
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  mounted() {
    //  const setSelect_debounce = debounce(this.setSelect,30)//防抖
    this.$bus.$on("mainScroll", this.setSelect); //
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelect);
  },
};
</script>

<style scoped lang="less">
.blogTOC-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>