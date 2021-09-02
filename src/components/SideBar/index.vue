<template>
  <div class="sidebar-container">
    <div class="avatar">
      <Avatar :url="userData.avatar" :size="130" />
    </div>
    <h1 class="title">
      <UserName />
    </h1>
    <div class="menu">
      <Menu />
    </div>
    <Contact :userData="userData" />
    <p class="footer">
      {{ userData.icp }}
    </p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/index";
import Contact from "./Contact/index.vue";
import Menu from "./Menu/index.vue";
import UserName from "@/components/Login/UserName.vue"
export default {
  components: {
    Avatar,
    Contact,
    Menu,
    UserName,
  },
  props: ["userData"],
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.sidebar-container {
  position:relative;
  width: 100%;
  height: 100%;
  background: @dark;
  box-sizing: border-box;
  //   padding: 20px 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container {
  margin: 0 auto;
}
.footer {
  position: relative;
  font-size: 12px;
  text-align: center;
  color:lighten(@gray,-30%);
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>