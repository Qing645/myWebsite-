<template>
<div id="app">
  <div class="test-container">
      <Menu />
  </div>
</div>
</template>

<script>
import Menu from "./index.vue";
export default {
  components:{
      Menu,
  },
}
</script>

<style>
.test-container{
    width: 400px;
    height: 600px;
    margin: 0 auto;
    background: #000;
}
</style>