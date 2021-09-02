<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>分类</h2>
    <right-list :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import RightList from "./RightList.vue";
import { getBlogcatagories } from "@/api/blog.js";
export default {
  components: {
    RightList,
  },
  mixins: [fetchData([])],
  computed: {
    categoryId() {
      //分类ID
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: "全部分类", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((item) => ({
        ...item,
        isSelect: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogcatagories();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "Category",
          query,
          params:{
          categoryId: item.id, 
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>