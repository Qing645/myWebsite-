<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="sidebar"><SideBar :userData="data" v-if="data" /></div>
      </template>
      <template>
        <router-view />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "./components/Layout";
import SideBar from "./components/SideBar";
import ToTop from "./components/ToTop";
import { mapState } from "vuex";
export default {
  components: {
    Layout,
    SideBar,
    ToTop,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
}
.sidebar {
  width: 250px;
  height: 100%;
}
</style>