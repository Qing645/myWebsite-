<template>
  <RightList @select="handleSelect" :list="list" />
</template>

<script>
import RightList from "./rightList.vue";

export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "列表1", childen: [{ name: "列表1-1" ,isSelect: false}],isSelect: true, },
        {
          name: "列表2",
          isSelect: false,
          childen: [{ name: "列表2-1", childen: [{ name: "列表2-1-1" ,isSelect: false}],isSelect: false }],
        
        },
        { name: "列表3" ,isSelect: false},
        { name: "列表4" ,isSelect: false},
        { name: "列表5" ,isSelect: false},
      ],
    };
  },
  methods: {
    handleSelect(item) {
     for(var i = 0; i <= this.list.length-1; i++){
         if(this.list[i].name !== item.name){
        this.list[i].isSelect = false;
         }
     }
     item.isSelect = !item.isSelect
    },
  },
};
</script>

<style>
</style>