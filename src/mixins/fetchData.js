//mixin混入
//公共的远程获取数据
//具体的组件中，需要提供一个远程获取数据的方法  fetchData()
import Loading from "@/directives/loading.js";
export default function (fetchDataValue = null) {
    return {
        data(){
            return {
                isLoading: true,
                data: fetchDataValue
            }
        },
        async created(){
            this.data = await this.fetchData();
            this.isLoading = false;
        },
        directives:{  //自定义命令
            Loading,
        }
}
}