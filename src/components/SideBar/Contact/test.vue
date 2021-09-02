<template>
  <div class="test-container">
      <Contact />
  </div>
</template>

<script>
import Contact from "./index.vue";
import '@/styles/global.less';
export default {
  components:{
      Contact,
  }
}
</script>
<style scoped lang = "less">
@import '~@/styles/var.less';
 .test-container{
     width:400px;
     height:400px;
     border: 2px solid;
     background: #000;
     color:@gray;
     margin: 0 auto;
     padding-top:200px;
     margin-top: 20px;
 }
</style>