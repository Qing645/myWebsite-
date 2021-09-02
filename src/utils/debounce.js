//函数防抖

export default function(fun,duration=50){
    let timer = null;
    return (...arg)=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
       fun(...arg)
    },duration)
    }
}