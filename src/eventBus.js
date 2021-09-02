//事件总线

// const listeners = [];
// export default{
//     $on(event,handler){
//         if(!listeners[event]){
//             listeners[event] = new Set();
//         }
//         listeners.event.add(handler); 
//     },
//     $off(event,handler){
//         if(listeners[event]){
//         listeners[event].delete(handler)   
//         }
    
//     },
//     $emit(event,...args){
//         if(listeners[event]){
//          listeners[event].forEach(handler => {
//               handler(...args)
//          });
//         }
//     }
// }

import Vue from "vue";   
const eventBus = new Vue({});
Vue.prototype.$bus = eventBus;
export default eventBus;