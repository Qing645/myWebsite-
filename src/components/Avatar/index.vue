<template>
  <img
    class="Avatar-container"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    //props验证
    url: {
      type: String, //必须为字符串
      required: true, //属性必传
    },
    size: {
      type: Number,
    },
  },
};
</script>

<style scoped> 
/* scoped 带有作用域的样式 */
.Avatar-container{
    border-radius: 50%;
    display: block;
    object-fit: cover;
    margin: 15px auto;
}
</style>