<template>
  <div id="app">
    <div style="padding:0 150px">
    <h1 style="width:100%;height:50px;margin-left:52px;font-size:30px">废物回收系统管理</h1>
    <div id="nav">
      <Nav @content="content"/>
    </div>
    <div id="content">
      <Content :index="index" />
    </div>
    </div>
  </div>
</template>
<script>
import Content from './views/content.vue'
import Nav from './views/nav.vue'
export default {
  components:{
    Content,
    Nav
  },
  data(){
    return {
      index:''
    }
  },
  methods:{
    content(e){
      console.log(e);
      this.index = e;
    }
  }
}
</script>
<style>
#nav{
  float: left;
  /* position: fixed; */
  /* width: 100px; */
  top: 100px;
}
#content{
  float: left;
  
}
</style>
