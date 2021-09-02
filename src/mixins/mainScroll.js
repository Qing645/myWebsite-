//监听滚动条和回到顶部事件

export default function (refValue) {
    return {
        mounted() {
            this.$refs[refValue].addEventListener('scroll', this.handleMainScroll)//监听滚动条
            this.$bus.$on('toTopClick', this.setMainScrollHeight) //事件总线监听toTop点击事件
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$refs[refValue].removeEventListener('scroll', this.handleMainScroll);
            this.$bus.$off('toTopClick', this.setMainScrollHeight);
        },
        methods: {
            handleMainScroll() {
                // 滚动条滚动时触发mainScroll的所有监听事件，(BlogTOC,BlogComment,ToTop)
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
            setMainScrollHeight(top){
                this.$refs[refValue].scrollTop = top;
              }
        },
    }
}