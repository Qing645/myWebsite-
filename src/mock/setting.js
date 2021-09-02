import Mock from "mockjs";
import img from "@/assets/mmqrcode1630056607927.png";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://iconfont.alicdn.com/t/b0b2d239-ce31-4aa4-a157-4317e4ea37e4.png",
    siteTitle: "个人空间",
    github: "https://github.com/TodayGreat-w",
    qq: "1975669909",
    weixin: "qing_life",
    weixinQrCode:img,
    mail: "wangqing_j@foxmail.com",
    icp: "京ICP备17001719号",
    githubName: "qing-www",
  },
});
