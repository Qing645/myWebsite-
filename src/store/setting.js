import {getSetting} from "@/api/setting";
import {titleController} from "@/utils";
 export default{
    namespaced:true, 
    state:{
      data:null,
      isLoading:true
    },
    mutations:{
        setLoading(state, payload) {
            state.isLoading = payload
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions:{
        async fetchSetting(ctx) {
            ctx.commit('setLoading', true);
            const resp = await getSetting();
            ctx.commit('setData', resp);
            ctx.commit('setLoading', false);
            titleController.setSiteTitle(resp.siteTitle) //设置网站title
        },
    }
}