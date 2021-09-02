<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click = handleClick(1) :class="{disabled: current===1}">|&lt;&lt;</a>
    <a @click = handleClick(current-1) :class="{disabled: current===1}">&lt;</a>
    <a @click = handleClick(n) v-for="(n,i) of numbers" :key="i" :class="{active: n === current}"> {{n}} </a>
    <a @click = handleClick(current+1) :class="{disabled: current===pageNumber}">&gt;</a>
    <a @click = handleClick(pageNumber) :class="{disabled: current===pageNumber}">&gt;&gt;|</a>
     
  </div>
</template>

<script>
export default {
    props:{
        current:{//当前页码
            type:Number,
            default:1
        },
        total:{//总数据量
            type:Number,
            default:0
        },
        limit:{//页容量
            type:Number,
            default:10
        },
        visibleNumber:{//可见页码数
            type:Number,
            default:5
        }
    },
    computed:{
        pageNumber(){  // 总页数
            return Math.ceil(this.total/this.limit)
        },
        visibleMin(){  //显示的最小页数
            let min = this.current - Math.floor(this.visibleNumber/2);
            if(min <= 1){
                min = 1
            }else if(this.current + this.visibleNumber/2 >= this.pageNumber ){  //维持可见页码数一致
                min = this.pageNumber - this.visibleNumber + 1     //当页面即将达到最大时，使显示最小页码=总页数-可见页码数+1
            }
            return min;
        },
        visibleMax(){  //显示的最大页数
            let max = this.current + Math.floor(this.visibleNumber/2);
            if(max >= this.pageNumber){
                max = this.pageNumber;
            }else if(this.current <= this.visibleNumber/2){  //维持可见页码数一致
                max = this.visibleNumber
            }
            return max;
        },
        numbers(){ 
            let nums = [];
            for(let i = this.visibleMin; i <= this.visibleMax; i++){
                nums.push(i);
            }
            return nums;
        }
    },
    methods:{
        handleClick(newPage){
            //抛出事件
            if( newPage <= 1 ){
                newPage = 1
            }
            if( newPage >= this.pageNumber ){
                newPage = this.pageNumber
            }
            if( newPage === this.current){
                return;
            }

            this.$emit('changePage',newPage)
        }
    }
};
</script>

<style lang='less'>
@import '~@/styles/var.less';
.pager-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a{
        color: @primary;
        margin: 0 6px;
        cursor: pointer;
        &.disabled{
            color:@lightWords;
            cursor: not-allowed;
        }
        &.active{
            color: @words;
            font-weight: bolder;
        }
    }
}
</style>

