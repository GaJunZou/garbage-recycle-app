<template>
<div>
  <div v-if="index==0">
    <waste></waste>
  </div>

  <div v-if="index==1">
      <myarticle></myarticle>
  </div>

  <div v-if="index==2">
    <role></role>
  </div>
</div>
</template>
<script>
import waste from "../components/waste.vue"
import myarticle from "../components/article.vue"
import role from "../components/role.vue"
  export default {
    components:{
      waste,
      myarticle,
      role
    },
    props:['index'],
    data() {
      return {
        activeName: 'second'
      };
    },
    created () {
    },
    methods: {}
  };
</script>

<style scoped>
.avatar :hover{
  cursor: pointer;
}
</style>