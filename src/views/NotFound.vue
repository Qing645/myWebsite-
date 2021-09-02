<template>
  <div class="not-found-container">
    <div class="page-content">
      <Icon type="notFound" />
      <p>404~~~</p>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
};
</script>

<style scoped lang="less">
.not-found-container {
  width: 100%;
  height: 100%;
  position: relative;
  .page-content{
      position: absolute;
      width: 120px;
      height: 200px;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .iconfont{
          font-size: 80px;
      }
  }
}
</style>