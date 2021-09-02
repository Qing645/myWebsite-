   //loading效果 自定义指令
   
   import styles from "./loading.module.less";
   import LoadingSrc from "@/assets/loading.gif";
   
   function getLoadingImage(el){  //得到el中loading效果的元素
       return el.querySelector("img[data-role=loading]")
   }
   function createLoadingImg(){ //创建img元素
       const img = document.createElement('img');
       img.dataset.role = "loading";  //添加自定义属性
       img.src = LoadingSrc;
       img.className = styles.loading;
       return img;
   }

export default function (el, binding) {
    const curImg = getLoadingImage(el);
    if(binding.value){  //根据binding.value判断创建或删除loading元素
       if(!curImg){
         const img = createLoadingImg();
         el.appendChild(img)
       }
    }else{
       if(curImg){
           curImg.remove();
       }
    }
}