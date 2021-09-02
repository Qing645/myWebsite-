<template>
  <div class="test-container">
    <Sidebar />
  </div>
   
</template>

<script>
import Sidebar from "./index.vue";
import "@/styles/global.less";
export default {
     components:{
         Sidebar,
     }
}
</script>

<style scoped>
  .test-container{
      width:250px;
      height: 600px;
      border: 2px solid;
      margin: 0 auto;
  }
</style>