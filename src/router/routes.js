// import Home from "@/views/Home";
// import Blog from "@/views/Blog/index";
// import Project from "@/views/Project/index";
// import About from "@/views/About/index";
// import Message from "@/views/Message";
// import BlogDetail from "@/views/Blog/Detail";

import NotFound from "@/views/NotFound";
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress"; //第三方进度条
configure({
  trickleSpeed: 20, //速度
  showSpinner: false, //去除加载圆圈
})
function getPageComponents(pagePath) {  //封装的获取异步组件，加载进度条函数，参数为一个函数，防止打包时页面地址依赖混乱
  return async () => {
    start();
    const comp = await pagePath(); //使用异步组件，打包时分包，便于提升响应速度,路由懒加载
    done();
    return comp;
  }
}
export default [ //配置较多时，单独抽离出一个配置文件
  {
    name: "Home", path: '/',
    component: getPageComponents(() =>
      import("@/views/Home")
    ),
    meta: {
      title: '首页',
    }
  },
  {
    name: "Blog",
    path: '/article',
    component: getPageComponents(() =>
      import("@/views/Blog")
    ),
    meta: {
      title: '文章',
    }
  },
  {
    name: "Category",
    path: '/article/data/:categoryId',
    component: getPageComponents(() =>
      import("@/views/Blog")
    ),
    meta: {
      title: '分类',
    }
  },
  {
    name: "BlogDetail",
    path: '/article/:id',
    component: getPageComponents(() =>
      import("@/views/Blog/Detail")
    ),
    meta: {
      title: '文章详情',
    }
  },
  {
    name: "Project",
    path: '/project',
    component: () => import(/*webpackChunkName:"Project"*/"@/views/Project"),
    meta: {
      title: '项目&效果',
      auth: true//路由元信息，帮助判断登录用户鉴权
    }
  },
  {
    name: "About",
    path: '/about',
    component: () => import(/*webpackChunkName:"About"*/"@/views/About"),
    meta: {
      title: '关于',
      auth: true
    }
  },
  {
    name: "Message",
    path: '/message',
    component: getPageComponents(() =>
      import("@/views/Message")
    ),
    meta: {
      title: '留言',
    }
  },
  {
    name: "NotFound",
    path: "*",
    component: NotFound
  },

  // 用户登录
  {
    path: "/login", component: ()=>import("@/views/Login")
  },
  {
    path: "/user", component: ()=>import("@/views/User"), meta: {
      auth: true
    }
  },
  { path: "/loading", component: ()=>import("@/views/Loading") },
]