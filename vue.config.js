
// vue-cli 配置文件
module.exports = {
    devServer:{
        proxy:{ //跨域进行的服务器代理
            '/api':{
                target:"http://test.my-site.com"
            }
        }
    },
    configureWebpack:require("./webpack.config"), //webpack配置
 }  