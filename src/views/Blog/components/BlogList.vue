<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item of data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </router-link>
        </div>
        <div class="main">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">    
            <span>日期：{{ item.createDate }} </span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'Category',
                params: {
                  categoryId: item.category.id,
                },
              }"
            >
              {{ item.category.name }}
            </router-link>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>

      <Empty v-if="data.rows.length === 0 && !isLoading" />
      
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="+routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limt"
      :visibleNumber="5"
      @changePage="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import {fetchData,mainScroll} from "@/mixins";
import { getBlogs } from "@/api/blog.js";
import Empty from "@/components/Empty";
export default {
  components: {
    Pager,
    Empty
  },
  mixins: [fetchData({total:0,rows:[]}),mainScroll("container")],
  computed: {
    routeInfo() {
      //获取路由信息
      const categoryId = this.$route.params.categoryId || -1;
      const page = this.$route.query.page || 1;
      const limit = this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "Category",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      //监听路由变化
      this.isLoading = true;
      this.$refs.container.scrollTop = 0; //滚动高度为零
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth; //平滑滚动
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
