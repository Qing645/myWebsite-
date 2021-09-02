<template>
  <Layout>
    <div class="main-container" ref="container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import {fetchData,mainScroll} from "@/mixins";
import { getBlog } from "@/api/blog";
import BlogDetail from "./components/BlogDetail.vue";
import BlogTOC from "./components/BlogTOC.vue";
import BlogComment from "./components/BlogComment.vue";
import {titleController} from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mixins: [fetchData(),mainScroll("container")],
  methods: {
    async fetchData() {
     const resp = await getBlog(this.$route.params.id);
     if(!resp){ 
       this.$router.push("/404");
       return
     }
     titleController.setBlogTitle(resp.title)  //设置网站title
     return resp
    },
  },
  destroyed(){
    titleController.setBlogTitle(null)
  }
};
</script>

<style lang="less" scoped>
.main-container {
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>