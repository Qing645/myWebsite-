import { getBanners } from "@/api/banners";

export default {
    namespaced: true,
    state: {
        data: [],
        isLoading: true
    },
    mutations: {
        setLoading(state, payload) {
            state.isLoading = payload
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async fetchBanner(ctx) {
            if (ctx.state.data.length !== 0) {
                return
            }
            ctx.commit('setLoading', true);
            const resp = await getBanners();
            ctx.commit('setData', resp);
            ctx.commit('setLoading', false);
        },
    }
}