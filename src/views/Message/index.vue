<template>
  <div class="message-container" ref="container">
    <h2>留言板</h2>
    <messageArea
      :list="data.rows"
      title="留言板"
      :subTitle="`(${data.total || 0})`"
      :isListLoading="isLoading"
      @submit="submitHandle"
    />
    <div class="blogComment-bottom" v-if="hasMore">已加载全部...</div>
  </div>
</template>

<script>
import messageArea from "@/components/MessageArea";
import { getMessage, postMessage } from "@/api/message";
import { fetchData, mainScroll } from "@/mixins";
import { vDate } from "@/utils";
export default {
  components: {
    messageArea,
  },
  mixins: [fetchData({}), mainScroll("container")],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    async submitHandle(formData, callback) {
      const resp = await postMessage(formData);
      resp.createDate = vDate(resp.createDate).date;
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("留言成功");
    },
    async fetchData() {
      return await getMessage(this.page, this.limit);
    },
    async fetchMore() {
      if (this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await getMessage();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    handleScroll(dom) {
      if (!dom || this.isLoading) {
        return;
      }
      const rang = 200;
      const remianingHeight =
        dom.scrollHeight - (dom.scrollTop + dom.clientHeight);
      if (remianingHeight <= rang) {
        this.fetchMore();
      }
    },
  },
  computed: {
    hasMore() {
      if (!this.data.rows) {
        return;
      }
      return this.data.rows.length >= this.data.total;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.message-container {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
  .messageArea-container {
    width: 700px;
    margin: 0 auto;
  }
  h2 {
    margin: 20px 10px;
  }
  .blogComment-bottom {
    display: inline-block;
    position: relative;
    margin-left: 50%;
    transform: translateX(-50%);
    color: lighten(@gray, -10%);
    bottom: 30px;
  }
}
</style>