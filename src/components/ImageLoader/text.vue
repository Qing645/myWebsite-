<template>
<div class="text-container">
   <ImageLoader @load = handleLoaded :src="require('../../assets/blackcat.jpg')"
     :placeholder="require('../../assets/800029919.jpg')" />
</div>
 
</template>

<script>
import ImageLoader from "./index";
export default {
 components:{
     ImageLoader,
 },
 methods:{
   handleLoaded(){
     console.log('ImageLoader组件load事件触发，图片加载完成')
   }
 }
}
</script>

<style scoped>
  .text-container{
   width: 500px;
   height: 400px;
   margin: 0 auto;
  }
</style>