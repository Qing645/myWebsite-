import Mock from "mockjs"
Mock.setup({   // 模拟网络延迟
    timeout:"300-500"
})
import './banner';
import './blog'
import './setting'
import './message'