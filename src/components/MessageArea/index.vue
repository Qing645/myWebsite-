<template>
  <div class="messageArea-container">
    <FormData v-on="$listeners" />
    <div class="list-data">
      <h3>
      {{ title }}
      <span> {{ subTitle }} </span>
    </h3>
    <ListData :list="list" />
    </div>
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import FormData from "./FormData.vue";
import ListData from "./ListData.vue";
export default {
  components: {
    FormData,
    ListData,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.list-data{
  margin: 35px 10px;
}
.loading {
  position: relative;
  height: 100px;
}
</style>