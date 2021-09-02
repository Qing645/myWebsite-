import Router from "vue-router"; //1.引入
import Vue from "vue"
import routes from "./routes"//配置较多时，单独抽离配置文件
import store from "@/store";
import { titleController } from "@/utils";

if(!window.Router){
//在打包时引用cdn，像vue-router,vuex这种插件会直接挂载到window上，不需要使用Vue.use(Router)
//所以判断window.Router有没有决定是否使用Vue.use(Router)
   Vue.use(Router); //2.使用插件
}

const router = new Router({
   routes, //3.配置
   mode: "history"
});

router.beforeEach((to, from, next) => { //全局路由守卫
   const hasAuth = store.getters['loginUser/status'];
   if (to.meta.auth) { //进行鉴权 ,需要鉴权的判断加载状态添加相应的next参数
     if (hasAuth === 'loading') { //加载中
       next({    //进入loading等待页
         path:"/loading",
         query:{
           returnUrl:to.fullPath
         }
       })
     } else if (hasAuth === 'login') { //有登录用户
       next();  //进入目标页
     } else {   //没有登录用户
       alert('该页面需要登录，请先登录...')
       next({   //返回登陆页面
         path:'/login',
         query:{
           returnUrl:to.fullPath
         }
       })
     }
   }else{
     next()
   }
 })

router.afterEach((to, from) => {  //设置网站title
   if (to.meta.title) {
      titleController.setRouterTitle(to.meta.title)
   }
});
export default router;