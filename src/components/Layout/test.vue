<template>
<div class="test-container">
    <Layout>
      <template #left>
          <div class="left">left</div>
      </template>
      <template>
          <div class="main">center</div>
      </template>
      <template #right>
          <div class="right">right</div>
      </template>
  </Layout>
</div>
</template>

<script>
import Layout from "./index.vue"
export default {
 components:{
     Layout,
 }
}
</script>

<style scoped>
 .test-container{
     width: 60%;
     height: 600px;
     border: 2px solid;
     margin: 0 auto;
 }
 .left{
     width: 200px;
     height: 100%;
     background:lightcoral;
 }
 .main{
     width: 100%;
     height: 100%;
     background:cadetblue;
 }
 .right{
     width: 150px;
     height: 100%;
     background: cornflowerblue;
 }
</style>