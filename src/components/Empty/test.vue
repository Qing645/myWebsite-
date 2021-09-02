<template>
<div class="box" >
  <Empty />
</div>

</template>

<script>
import Empty from "./index";
export default {
  components:{
      Empty
  }
}
</script>

<style>
 .box{
     width:500px;
     height: 400px;
     border: 1px solid red;
     margin: 0 auto;
     position: relative;
 }
</style>