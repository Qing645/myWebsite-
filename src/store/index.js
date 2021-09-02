import Vue from "vue";
import Vuex from "vuex";
// import { Store,install } from "vuex"; //优化写法
import setting from "./setting";
import banner from "./banner";
import loginUser from "./loginUser";

if(!window.Vuex){
//在打包时引用cdn，像vue-router,vuex这种插件会直接挂载到window上，不需要使用Vue.use(Vuex)
//所以判断window.Vuex有没有决定是否使用Vue.use(Vuex)
  Vue.use(Vuex);  
}
// install(Vue)

export default new Vuex.Store({
   modules:{
       setting,
       banner,
       loginUser
   },
   strict:true
});
// export default new Store({
//     modules:{
//         setting,
//         banner
//     },
//     strict:true
//  });