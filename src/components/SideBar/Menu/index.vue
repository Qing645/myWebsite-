<template>
  <div class="menu-container">
    <router-link
      :exact="item.exact"
      :to="{name:item.name}"
      v-for="item in items"
      :key="item.link"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false,
        },
        {
          name: "About",
          title: "关于",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
  components: {
    Icon,
  },
  methods: {
    //    isSelected(path){
    //        let link = path.toLowerCase();
    //        let curPathname = location.pathname.toLowerCase();
    //        if(link === '/blog'){       //当/blog下有多个路径时，进行模糊判断，看最开始路径是否为/blog
    //           return curPathname.startsWith(link)
    //        }else{
    //         return curPathname === link;
    //        }
    //    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/global.less";
.menu-container {
  color: @gray;
  margin: 20px 0;
  a {
    display: flex;
    padding: 0 50px;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
    &.router-link-active {
      background: #2d2d2d;
    }
  }
}
</style>