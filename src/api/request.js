//axios拦截器
import axios from "axios";
import showMessage from "@/utils/ShowMessage";

const instance = axios.create();
instance.interceptors.response.use(function(resp){ //响应拦截器
    if(resp.data.code !== 0){
        showMessage({
            content:resp.data.msg,
            type:"error",
            duration:500,
        })
        return null
    }
  return resp.data.data
})

export default instance;