const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
if(process.env.NODE_ENV === "production"){
    module.exports = {
    plugins:[new BundleAnalyzerPlugin()],  //打包分析插件
    externals:{  //告诉webpack，引用外部cdn,不会进行打包
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
    },
    devtool:"none", //去除源码地图
    }
}