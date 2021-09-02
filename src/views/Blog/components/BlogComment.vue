<template>
  <div class="blogComment-container" ref="container">
    <h2>评论区</h2>
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
    <div class="blogComment-bottom" v-if="hasMore">
      已加载全部...
    </div>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import MessageArea from "@/components/MessageArea";
import { getComments, postComment } from "@/api/blog.js";
import debounce from "@/utils/debounce";
import { vDate } from "@/utils";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [fetchData({})],
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async fetchMore() {
      //下滑加载
      if (this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    handleScroll(dom) {   //判断滚动条高度，执行下滑加载函数
    if(this.isLoading || !dom){
      return
    }
      const range = 200;
      const remianingHeight =
        dom.scrollHeight - (dom.scrollTop + dom.clientHeight);
      if (remianingHeight <= range) {
        this.fetchMore();
      }
    },
    async handleSubmit(formData, callback) {
      //发送数据
      const request = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      request.createDate = vDate(request.createDate).date
      this.data.rows.unshift(request); //得到返回的数据添加到评论列表第一位
      this.data.total++; //模拟评论总数+1
      callback("评论成功");
    },
  },
  computed: {
    hasMore() {
      if(!this.data.rows){
        return
      }
      return this.data.rows.length >= this.data.total;
    },
  },
  created() {
    this.debounce_handleScroll = debounce(this.handleScroll, 100); //防抖
    this.$bus.$on("mainScroll", this.debounce_handleScroll); //事件总线
  },
  beforeDestroy(){
    this.$bus.$off("mainScroll",this.debounce_handleScroll)
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogComment-container {
  position: relative;
  margin: 30px 0;
  border-top: 2px dashed rgb(221, 212, 212);
  h2 {
    margin: 30px 0 20px 5px;
  }
  .blogComment-bottom{ 
     position: absolute;
      margin-left: 50%;
      transform: translateX(-50%);
      color:lighten(@gray,-10%);
      bottom:30px
   }
}
</style>