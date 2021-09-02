<template>
  <i class="iconfont icon-container" :class= fontClass ></i>
</template>

<script>
const classMap={
    home:'icon-shouye',
    more:'icon-gengduo',
    content:'icon-neirong',
    search:'icon-sousuo',
    weixin:'icon-weixin',
    email:'icon-youxiang',
    github:'icon-github',
    qq:'icon-qq',
    blog:'icon-wenzhang',
    code:'icon-daima',
    chat:'icon-liaotian',
    about:'icon-guanyu ',
    success:'icon-chenggong',
    warn:'icon-shibai',
    info:'icon-info',
    error:'icon-Group-',
    arrowUp:'icon-shang',
    arrowDown:'icon-xia',
    dots:'icon-weixuanzhongyuandian',
    toTop:'icon-tubiao02',
    empty:"icon-empty",
    notFound:"icon-404",
}
export default {
  props:{
      type:{
          type:String,
          required:true
      }
  },
  computed:{
    fontClass(){
        return classMap[this.type]
    }
  }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2088238_mbb3zjwy6b.css"
</style>