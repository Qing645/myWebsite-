<template>
  <ul class="Contact-container">
    <li>
      <a :href="userData.github" target="_blank">
        <div class="icon"><Icon type="home" /></div>
        <span>github: {{ userData.githubName }} </span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${userData.mail}`" :title="userData.mail">
        <!--弹出邮箱-->
        <div class="icon"><Icon type="email" /></div>
          <span> {{ userData.mail }} </span>
      </a>
    </li>
    <li>
      <a :href="`tencent://message/?uin=${userData.qq}&Site=&Menu=yes`">
        <!--弹出qq对话框 -->
        <div class="icon"><Icon type="qq" /></div>
        <span> QQ:{{ userData.qq }} </span>
      </a>
    </li>
    <li>
      <a href="">
        <div class="icon"><Icon type="weixin" /></div>
        <span> 微信：{{ userData.weixin }} </span>
      </a>
      <div class="pop">
        <!-- 弹出框 -->
        <img :src="userData.weixinQrCode" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  props: ["userData"],
};
</script>

<style lang="less">
@import "~@/styles/var.less";
.Contact-container {
  padding: 20px;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: @itemHeight;
    line-height: 15px;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden; /* 超出的部分隐藏起来 */  
    white-space: nowrap;/* 不显示的地方用省略号...代替 */ 
  }
  .icon {
    width: 21px;
    margin-right: 15px;
    .iconfont {
      font-size: 21px;
    }
  }
  .pop {
    //弹出框
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background: #fff;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      bottom: -4px;
    }
  }
}
</style>