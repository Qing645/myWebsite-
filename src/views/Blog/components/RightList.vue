<template>
  <ul class="list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">
        {{ item.name }}
      </span>
      <span
        class="articleCount"
        :class="{ active: item.isSelect }"
        @click="handleClick(item)"
        v-if="item.aside"
      >
        {{ item.aside }}
        </span>
      <List
        :list="item.children"
        @select="handleClick"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
.list-container {
  list-style: none;
  .list-container {
    margin-left: 1em;
  }
}
li {
  min-height: 40px;
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
  .active {
    color: @warn;
    font-weight: bold;
  }
}
.articleCount {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>