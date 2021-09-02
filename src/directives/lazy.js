//懒加载
import bus from "@/eventBus";
import { debounce } from "@/utils";
import defaultImage from "@/assets/blackcat.jpg";

let images = [];
const domHeight = document.documentElement.clientHeight;

function setImages() {
    for (let img of images) {
        img.dom.src = defaultImage; //所有图片默认为初始图片
        const imgRect = img.dom.getBoundingClientRect();
        if (imgRect.bottom > 0 && imgRect.top < domHeight) {//判断图片是否处于视口区域
            img.dom.src = img.value;
            images = images.filter(i => i.dom !== img.dom); //把重新赋值完的图片元素从数组中移除
        }
    }
};

const de_Setimages = debounce(setImages, 100); //防抖

export default {
    bind(el, binding) {
        bus.$on('mainScroll', de_Setimages) //从事件总线上监听滚动条；    
        images.push({
            dom: el,
            value: binding.value
        })
        setImages()
    },
    unbind(el) {
        images = images.filter((img) => { return img.dom !== el })
        bus.$off('mainScroll', de_Setimages)
    }
}