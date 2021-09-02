import "./mock"
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from './router/index'
import showMessage from "./utils/ShowMessage";
import "./eventBus";
import store from "./store";
store.dispatch('setting/fetchSetting')
store.dispatch("loginUser/whoAmI");

import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";
Vue.directive('loading',vLoading);  //全局挂载loading自定义命令
Vue.directive('lazy',vLazy);//懒加载

Vue.prototype.$showMessage = showMessage;//展示消息插件加入到组件实例
Vue.config.productionTip = false; 
// window.location.pathname = ""
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')